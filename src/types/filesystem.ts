


export interface PermissionSet {
  read: boolean;
  write: boolean;
  execute: boolean;
}

export interface Inode {
  
  id: number;
  
  
  type: 'file' | 'directory';
  
  
  size: number;
  
  
  createdAt: string;


  


  
  permissions: PermissionSet;
  
  
  
  blockPointers: number[];
  
  
  directPointers?: number[];        
  singleIndirectPointer?: number | null; 
  doubleIndirectPointer?: number | null; 
  tripleIndirectPointer?: number | null; 
  
  
  allocationStrategy?: AllocationStrategy;
  
  
  indexBlockId?: number | null;
}


export interface DirectoryEntry {
  
  name: string;
  
  
  inodeId: number;
}


export interface Directory {
  
  inodeId: number;
  
  
  parentInodeId: number | null;
  
  
  entries: DirectoryEntry[];
}


export interface DiskBlock {
  
  id: number;
  
  
  used: boolean;
  
  
  inodeId: number | null;
  
  
  nextBlockPointer?: number | null;
  
  
  blockType?: 'data' | 'index';
}


export interface Disk {
  
  totalBlocks: number;
  
  
  blockSize: number;
  
  
  blocks: DiskBlock[];
  
  
  freeBlockBitmap: boolean[];
}


export interface FileSystemState {
  
  inodes: Map<number, Inode>;
  
  
  directories: Map<number, Directory>;
  
  
  disk: Disk;
  
  
  nextInodeId: number;
  
  
  rootInodeId: number;
  
  
  currentAllocationStrategy: AllocationStrategy;
}


export interface SerializableFileSystemState {
  inodes: [number, Inode][];
  directories: [number, Directory][];
  disk: Disk;
  nextInodeId: number;
  rootInodeId: number;
  currentAllocationStrategy: AllocationStrategy;
}


export type AllocationStrategy = 'contiguous' | 'linked' | 'indexed' | 'unix';


export const BLOCK_SIZE = 4096; 
export const TOTAL_BLOCKS = 512; 
export const ROOT_INODE_ID = 0;


export const MAX_DIRECT_POINTERS = 12;
export const POINTERS_PER_BLOCK = 16; 
