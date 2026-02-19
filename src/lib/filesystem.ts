


import {
  AllocationStrategy,
  BLOCK_SIZE,
  Directory,
  Disk,
  DiskBlock,
  FileSystemState,
  Inode,
  MAX_DIRECT_POINTERS,
  PermissionSet,
  POINTERS_PER_BLOCK,
  ROOT_INODE_ID,
  SerializableFileSystemState,
  TOTAL_BLOCKS
} from '@/types/filesystem';

const STORAGE_KEY = 'visual-fs-state';


export function initializeFileSystem(): FileSystemState {
  
  const blocks: DiskBlock[] = [];
  const freeBlockBitmap: boolean[] = [];

  for (let i = 0; i < TOTAL_BLOCKS; i++) {
    blocks.push({
      id: i,
      used: false,
      inodeId: null,
    });
    freeBlockBitmap.push(false); 
  }

  const disk: Disk = {
    totalBlocks: TOTAL_BLOCKS,
    blockSize: BLOCK_SIZE,
    blocks,
    freeBlockBitmap,
  };

  
  const rootInode: Inode = {
    id: ROOT_INODE_ID,
    type: 'directory',
    size: 0,
    createdAt: new Date().toISOString(),
    permissions: { read: true, write: true, execute: true },
    blockPointers: [],
  };

  
  const rootDir: Directory = {
    inodeId: ROOT_INODE_ID,
    parentInodeId: null, 
    entries: [],
  };

  const inodes = new Map<number, Inode>();
  inodes.set(ROOT_INODE_ID, rootInode);

  const directories = new Map<number, Directory>();
  directories.set(ROOT_INODE_ID, rootDir);

  const state = {
    inodes,
    directories,
    disk,
    nextInodeId: 1, 
    rootInodeId: ROOT_INODE_ID,
    currentAllocationStrategy: 'contiguous' as AllocationStrategy,
  };

  
  
  

  
  
  try {
    
    const welcomeInodeId = state.nextInodeId++;
    const welcomeSize = 256; 
    
    state.disk.freeBlockBitmap[0] = true;
    state.disk.blocks[0].used = true;
    state.disk.blocks[0].inodeId = welcomeInodeId;
    state.disk.blocks[0].blockType = 'data';

    const welcomeInode: Inode = {
      id: welcomeInodeId,
      type: 'file',
      size: welcomeSize,
      createdAt: new Date().toISOString(),
      permissions: { read: true, write: true, execute: false },
      blockPointers: [0],
      allocationStrategy: 'contiguous',
    };
    state.inodes.set(welcomeInodeId, welcomeInode);
    rootDir.entries.push({ name: 'Welcome.txt', inodeId: welcomeInodeId });

  } catch (e) {
    console.error("Failed to init welcome file", e);
  }

  return state;
}


function findContiguousBlocks(disk: Disk, blocksNeeded: number): number[] {
  let currentRun: number[] = [];

  for (let i = 0; i < disk.blocks.length; i++) {
    if (!disk.freeBlockBitmap[i]) {
      currentRun.push(i);
      if (currentRun.length === blocksNeeded) {
        return currentRun;
      }
    } else {
      currentRun = [];
    }
  }

  return [];
}


function findAnyFreeBlocks(disk: Disk, blocksNeeded: number): number[] {
  const blocks: number[] = [];

  for (let i = 0; i < disk.blocks.length && blocks.length < blocksNeeded; i++) {
    if (!disk.freeBlockBitmap[i]) {
      blocks.push(i);
    }
  }

  return blocks;
}


export function allocateBlocks(
  state: FileSystemState,
  sizeInBytes: number,
  inodeId: number
): {
  blocks: number[];
  indexBlockId?: number;
  unixStructure?: {
    direct: number[];
    singleIndirect: number | null;
    doubleIndirect: number | null;
  }
} {
  const blocksNeeded = Math.max(1, Math.ceil(sizeInBytes / BLOCK_SIZE));
  const strategy = state.currentAllocationStrategy;

  if (strategy === 'contiguous') {
    const blocks = findContiguousBlocks(state.disk, blocksNeeded);

    if (blocks.length < blocksNeeded) {
      throw new Error(`Not enough contiguous space. Need ${blocksNeeded} blocks. Try defragmenting or switching to Linked allocation.`);
    }

    
    for (const blockId of blocks) {
      state.disk.freeBlockBitmap[blockId] = true;
      state.disk.blocks[blockId].used = true;
      state.disk.blocks[blockId].inodeId = inodeId;
      state.disk.blocks[blockId].blockType = 'data';
    }

    return { blocks };
  }
  else if (strategy === 'linked') {
    const blocks = findAnyFreeBlocks(state.disk, blocksNeeded);

    if (blocks.length < blocksNeeded) {
      throw new Error(`Not enough disk space. Need ${blocksNeeded} blocks.`);
    }

    
    for (let i = 0; i < blocks.length; i++) {
      const blockId = blocks[i];
      const nextBlockId = i < blocks.length - 1 ? blocks[i + 1] : null;

      state.disk.freeBlockBitmap[blockId] = true;
      state.disk.blocks[blockId].used = true;
      state.disk.blocks[blockId].inodeId = inodeId;
      state.disk.blocks[blockId].nextBlockPointer = nextBlockId;
      state.disk.blocks[blockId].blockType = 'data';
    }

    return { blocks };
  }
  else if (strategy === 'indexed') {
    
    const totalNeeded = blocksNeeded + 1;
    const blocks = findAnyFreeBlocks(state.disk, totalNeeded);

    if (blocks.length < totalNeeded) {
      throw new Error(`Not enough disk space. Need ${totalNeeded} blocks (including 1 index block).`);
    }

    const indexBlockId = blocks[0]; 
    const dataBlocks = blocks.slice(1);

    
    state.disk.freeBlockBitmap[indexBlockId] = true;
    state.disk.blocks[indexBlockId].used = true;
    state.disk.blocks[indexBlockId].inodeId = inodeId;
    state.disk.blocks[indexBlockId].blockType = 'index';

    
    for (const blockId of dataBlocks) {
      state.disk.freeBlockBitmap[blockId] = true;
      state.disk.blocks[blockId].used = true;
      state.disk.blocks[blockId].inodeId = inodeId;
      state.disk.blocks[blockId].blockType = 'data';
    }

    return { blocks: dataBlocks, indexBlockId };
  }
  else if (strategy === 'unix') {
    
    let metaBlocksNeeded = 0;
    const directCount = Math.min(blocksNeeded, MAX_DIRECT_POINTERS);
    let remData = blocksNeeded - directCount;

    
    const singleDataCount = Math.min(remData, POINTERS_PER_BLOCK);
    if (remData > 0) metaBlocksNeeded++; 
    remData -= singleDataCount;

    
    const doubleDataCount = remData; 
    let doubleIndexBlocks = 0;
    if (remData > 0) {
      metaBlocksNeeded++; 
      doubleIndexBlocks = Math.ceil(remData / POINTERS_PER_BLOCK);
      metaBlocksNeeded += doubleIndexBlocks;
    }

    const totalNeeded = blocksNeeded + metaBlocksNeeded;
    const allBlocks = findAnyFreeBlocks(state.disk, totalNeeded);

    if (allBlocks.length < totalNeeded) {
      throw new Error(`Not enough disk space. Need ${totalNeeded} blocks.`);
    }

    
    let cursor = 0;

    
    const direct: number[] = [];
    for (let i = 0; i < directCount; i++) {
      direct.push(allBlocks[cursor++]);
    }

    
    let singleIndirect: number | null = null;
    if (singleDataCount > 0) {
      singleIndirect = allBlocks[cursor++];
      state.disk.blocks[singleIndirect].blockType = 'index';
      
      for (let i = 0; i < singleDataCount; i++) {
        cursor++; 
      }
    }

    
    let doubleIndirect: number | null = null;
    if (doubleDataCount > 0) {
      doubleIndirect = allBlocks[cursor++];
      state.disk.blocks[doubleIndirect].blockType = 'index';

      
      for (let i = 0; i < doubleIndexBlocks; i++) {
        const midIndex = allBlocks[cursor++];
        state.disk.blocks[midIndex].blockType = 'index';
        
        
      }
      cursor += doubleDataCount; 
    }

    
    for (const blockId of allBlocks) {
      state.disk.freeBlockBitmap[blockId] = true;
      state.disk.blocks[blockId].used = true;
      state.disk.blocks[blockId].inodeId = inodeId;
      if (!state.disk.blocks[blockId].blockType) {
        state.disk.blocks[blockId].blockType = 'data';
      }
    }

    return {
      blocks: allBlocks,
      unixStructure: {
        direct,
        singleIndirect,
        doubleIndirect
      }
    };
  }

  throw new Error(`Unknown allocation strategy: ${strategy}`);
}


export function freeBlocks(state: FileSystemState, blockIds: number[]): void {
  for (const blockId of blockIds) {
    state.disk.freeBlockBitmap[blockId] = false;
    state.disk.blocks[blockId].used = false;
    state.disk.blocks[blockId].inodeId = null;
  }
}


export function createFile(
  state: FileSystemState,
  parentDirInodeId: number,
  name: string,
  sizeInKB: number
): Inode {
  const parentDir = state.directories.get(parentDirInodeId);
  if (!parentDir) {
    throw new Error('Parent directory not found');
  }

  
  if (parentDir.entries.some(e => e.name === name)) {
    throw new Error(`A file or folder named "${name}" already exists`);
  }

  const sizeInBytes = sizeInKB * 1024;
  const inodeId = state.nextInodeId++;

  
  const { blocks: blockPointers, indexBlockId, unixStructure } = allocateBlocks(state, sizeInBytes, inodeId);

  
  const inode: Inode = {
    id: inodeId,
    type: 'file',
    size: sizeInBytes,
    createdAt: new Date().toISOString(),
    permissions: { read: true, write: true, execute: false },
    blockPointers,
    allocationStrategy: state.currentAllocationStrategy,
    indexBlockId,
    directPointers: unixStructure?.direct,
    singleIndirectPointer: unixStructure?.singleIndirect,
    doubleIndirectPointer: unixStructure?.doubleIndirect,
  };

  state.inodes.set(inodeId, inode);

  
  parentDir.entries.push({ name, inodeId });

  return inode;
}


export function createDirectory(
  state: FileSystemState,
  parentDirInodeId: number,
  name: string
): { inode: Inode; directory: Directory } {
  const parentDir = state.directories.get(parentDirInodeId);
  if (!parentDir) {
    throw new Error('Parent directory not found');
  }

  
  if (parentDir.entries.some(e => e.name === name)) {
    throw new Error(`A file or folder named "${name}" already exists`);
  }

  const inodeId = state.nextInodeId++;

  
  const inode: Inode = {
    id: inodeId,
    type: 'directory',
    size: 0,
    createdAt: new Date().toISOString(),
    permissions: { read: true, write: true, execute: true },
    blockPointers: [], 
  };

  
  const directory: Directory = {
    inodeId,
    parentInodeId: parentDirInodeId,
    entries: [],
  };

  state.inodes.set(inodeId, inode);
  state.directories.set(inodeId, directory);

  
  parentDir.entries.push({ name, inodeId });

  return { inode, directory };
}


export function renameEntry(
  state: FileSystemState,
  parentDirInodeId: number,
  oldName: string,
  newName: string
): void {
  const parentInode = state.inodes.get(parentDirInodeId);
  if (parentInode && !checkPermission(parentInode, 'write')) {
    throw new Error('Permission denied: Cannot rename in read-only directory');
  }

  const parentDir = state.directories.get(parentDirInodeId);
  if (!parentDir) {
    throw new Error('Parent directory not found');
  }

  
  if (parentDir.entries.some(e => e.name === newName)) {
    throw new Error(`A file or folder named "${newName}" already exists`);
  }

  
  const entry = parentDir.entries.find(e => e.name === oldName);
  if (!entry) {
    throw new Error(`"${oldName}" not found`);
  }

  entry.name = newName;
}


export function deleteFile(
  state: FileSystemState,
  parentDirInodeId: number,
  name: string
): void {
  const parentDir = state.directories.get(parentDirInodeId);
  if (!parentDir) throw new Error('Parent directory not found');

  const parentInode = state.inodes.get(parentDirInodeId);
  if (parentInode && !checkPermission(parentInode, 'write')) {
    throw new Error('Permission denied: Cannot delete from read-only directory');
  }

  const entryIndex = parentDir.entries.findIndex(e => e.name === name);
  if (entryIndex === -1) {
    throw new Error(`"${name}" not found`);
  }

  const entry = parentDir.entries[entryIndex];
  const inode = state.inodes.get(entry.inodeId);

  if (!inode) {
    throw new Error('Inode not found');
  }

  if (inode.type === 'directory') {
    const dir = state.directories.get(entry.inodeId);
    if (dir && dir.entries.length > 0) {
      throw new Error('Cannot delete non-empty directory');
    }
    state.directories.delete(entry.inodeId);
  }

  
  freeBlocks(state, inode.blockPointers);

  
  state.inodes.delete(entry.inodeId);

  
  parentDir.entries.splice(entryIndex, 1);
}




export function getPath(state: FileSystemState, inodeId: number): string {
  if (inodeId === ROOT_INODE_ID) {
    return '/';
  }

  const parts: string[] = [];
  let currentId: number | null = inodeId;

  while (currentId !== null && currentId !== ROOT_INODE_ID) {
    const dir = state.directories.get(currentId);
    if (!dir) break;

    
    const parentDir = state.directories.get(dir.parentInodeId!);
    if (parentDir) {
      const entry = parentDir.entries.find(e => e.inodeId === currentId);
      if (entry) {
        parts.unshift(entry.name);
      }
    }
    currentId = dir.parentInodeId;
  }

  return '/' + parts.join('/');
}


export function getDiskStats(state: FileSystemState): {
  totalBlocks: number;
  usedBlocks: number;
  freeBlocks: number;
  totalSizeKB: number;
  usedSizeKB: number;
  freeSizeKB: number;
} {
  const usedBlocks = state.disk.freeBlockBitmap.filter(used => used).length;
  const freeBlocks = state.disk.totalBlocks - usedBlocks;

  return {
    totalBlocks: state.disk.totalBlocks,
    usedBlocks,
    freeBlocks,
    totalSizeKB: (state.disk.totalBlocks * BLOCK_SIZE) / 1024,
    usedSizeKB: (usedBlocks * BLOCK_SIZE) / 1024,
    freeSizeKB: (freeBlocks * BLOCK_SIZE) / 1024,
  };
}




export function saveToStorage(state: FileSystemState): void {
  const serializable: SerializableFileSystemState = {
    inodes: Array.from(state.inodes.entries()),
    directories: Array.from(state.directories.entries()),
    disk: state.disk,
    nextInodeId: state.nextInodeId,
    rootInodeId: state.rootInodeId,
    currentAllocationStrategy: state.currentAllocationStrategy,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
}


export function loadFromStorage(): FileSystemState | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return null;
  }

  try {
    const serializable: SerializableFileSystemState = JSON.parse(data);

    
    const inodes = new Map(serializable.inodes);
    for (const inode of inodes.values()) {
      if (typeof inode.permissions === 'string') {
        const p = inode.permissions as unknown as string;
        inode.permissions = {
          read: p.includes('r'),
          write: p.includes('w'),
          execute: p.includes('x') || inode.type === 'directory',
        };
      }
    }

    return {
      inodes,
      directories: new Map(serializable.directories),
      disk: serializable.disk,
      nextInodeId: serializable.nextInodeId,
      rootInodeId: serializable.rootInodeId,
      currentAllocationStrategy: serializable.currentAllocationStrategy || 'contiguous', 
    };
  } catch {
    console.error('Failed to parse file system state');
    return null;
  }
}


export function resetFileSystem(): FileSystemState {
  localStorage.removeItem(STORAGE_KEY);
  return initializeFileSystem();
}


export function switchAllocationStrategy(
  state: FileSystemState,
  newStrategy: AllocationStrategy
): void {
  state.currentAllocationStrategy = newStrategy;
}


export function calculateFragmentation(disk: Disk): number {
  
  

  let maxContiguous = 0;
  let currentContiguous = 0;
  let totalFree = 0;

  for (let i = 0; i < disk.totalBlocks; i++) {
    if (!disk.freeBlockBitmap[i]) {
      
      totalFree++;
      currentContiguous++;
    } else {
      
      maxContiguous = Math.max(maxContiguous, currentContiguous);
      currentContiguous = 0;
    }
  }
  maxContiguous = Math.max(maxContiguous, currentContiguous);

  if (totalFree === 0) return 0;

  return Math.round((1 - (maxContiguous / totalFree)) * 100);
}

export function checkPermission(inode: Inode, operation: 'read' | 'write' | 'execute'): boolean {
  if (!inode.permissions) return true; 
  return inode.permissions[operation];
}

export function updateFilePermissions(
  state: FileSystemState,
  inodeId: number,
  permissions: PermissionSet
): void {
  const inode = state.inodes.get(inodeId);
  if (!inode) {
    throw new Error('Inode not found');
  }
  inode.permissions = permissions;
}
