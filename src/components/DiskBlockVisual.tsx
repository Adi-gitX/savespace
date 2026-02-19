


import { BLOCK_SIZE, Disk, Inode } from '@/types/filesystem';

interface DiskBlockVisualProps {
  disk: Disk | null;
  selectedFile: Inode | null;
  diskStats: {
    totalBlocks: number;
    usedBlocks: number;
    freeBlocks: number;
    totalSizeKB: number;
    usedSizeKB: number;
    freeSizeKB: number;
  } | null;
}

export function DiskBlockVisual({ disk, selectedFile, diskStats }: DiskBlockVisualProps) {
  if (!disk || !diskStats) {
    return (
      <div className="p-8 text-gray-400 text-sm font-mono uppercase tracking-widest text-center">
        Initialize Disk...
      </div>
    );
  }

  const selectedBlockIds = new Set(selectedFile?.blockPointers ?? []);


  if (selectedFile?.indexBlockId !== null && selectedFile?.indexBlockId !== undefined) {
    selectedBlockIds.add(selectedFile.indexBlockId);
  }

  return (
    <div className="flex flex-col h-full bg-white">

      <div className="flex items-center justify-between px-6 py-3 border-b border-black">
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] flex items-center gap-2">
          <span className="w-2 h-2 bg-black inline-block" />
          DISK VISUALIZATION
        </span>

        <div className="flex items-center gap-6 text-[11px] font-mono text-gray-500 uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="text-black font-bold">{diskStats.usedBlocks}</span> USED
          </span>
          <span className="flex items-center gap-2">
            <span className="text-black font-bold">{diskStats.freeBlocks}</span> FREE
          </span>
          <span className="hidden sm:inline-flex items-center gap-2">
            BLOCK SIZE: <span className="text-black">{BLOCK_SIZE / 1024}KB</span>
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 overflow-hidden">


        <div className="flex-1 overflow-auto pr-2 pb-2">
          <div className="flex flex-wrap gap-[2px]">
            {disk.blocks.map((block) => {
              const isSelected = selectedBlockIds.has(block.id);
              const isUsed = block.used;

              let blockClass = 'w-6 h-6 flex items-center justify-center text-[9px] font-mono transition-all duration-300 relative';
              let content = null;

              if (isSelected) {

                blockClass += ' bg-black text-white font-bold z-10 scale-110 shadow-lg';

                if (selectedFile?.allocationStrategy === 'indexed' || selectedFile?.allocationStrategy === 'unix') {
                  if (block.blockType === 'index' || block.id === selectedFile.indexBlockId) {
                    blockClass = 'w-6 h-6 flex items-center justify-center text-[8px] font-mono bg-indigo-600 text-white font-bold z-20 scale-125 border border-white ring-1 ring-indigo-600';
                    content = 'IDX';
                  }
                } else if (selectedFile?.allocationStrategy === 'linked') {

                  const index = selectedFile.blockPointers.indexOf(block.id);
                  if (index !== -1) {
                    content = index + 1;
                  }
                }
              } else if (isUsed) {

                const gradientIndex = block.id % 5;
                if (gradientIndex === 0) blockClass += ' bg-blue-100/80 hover:bg-blue-200 text-blue-900/0 hover:text-blue-900';
                else if (gradientIndex === 1) blockClass += ' bg-purple-100/80 hover:bg-purple-200 text-purple-900/0 hover:text-purple-900';
                else if (gradientIndex === 2) blockClass += ' bg-pink-100/80 hover:bg-pink-200 text-pink-900/0 hover:text-pink-900';
                else if (gradientIndex === 3) blockClass += ' bg-orange-100/80 hover:bg-orange-200 text-orange-900/0 hover:text-orange-900';
                else blockClass += ' bg-gray-200/80 hover:bg-gray-300 text-gray-900/0 hover:text-gray-900';
              } else {

                blockClass += ' bg-white border border-gray-100 hover:border-gray-300';
              }

              return (
                <div
                  key={block.id}
                  className={blockClass}
                  title={`Block ${block.id}${block.inodeId !== null ? ` (Inode ${block.inodeId})` : ' (Free)'}`}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>


        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-6">


          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-gray-200 bg-white" />
              <span>Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-blue-100 to-purple-100" />
              <span>Used</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-black" />
              <span className="text-black">Selected</span>
            </div>
            {(selectedFile?.allocationStrategy === 'indexed' || selectedFile?.allocationStrategy === 'unix') && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-600" />
                <span className="text-indigo-600">Index</span>
              </div>
            )}
          </div>


          <div className="flex-1 max-w-xs flex flex-col items-end gap-1">
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${(diskStats.usedBlocks / diskStats.totalBlocks) * 100}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
