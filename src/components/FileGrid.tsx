import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { cn } from '@/lib/utils';
import { Directory, FileSystemState } from '@/types/filesystem';
import { Edit2, File, Folder, Trash2 } from 'lucide-react';

interface FileGridProps {
  state: FileSystemState | null;
  currentDirectory: Directory | null;
  currentPath: string;
  onSelectFile: (inodeId: number, name: string) => void;
  onOpenDirectory: (inodeId: number) => void;
  onRenameEntry: (oldName: string, newName: string) => void;
  onDeleteEntry: (name: string) => void;
  selectedFileId: number | null;
}

export function FileGrid({
  state,
  currentDirectory,
  onSelectFile,
  onOpenDirectory,
  onRenameEntry,
  onDeleteEntry,
  selectedFileId,
}: FileGridProps) {
  if (!state || !currentDirectory) {
    return (
      <div className="p-8 text-center text-muted-foreground text-sm">
        Select a directory
      </div>
    );
  }

  if (currentDirectory.entries.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground text-sm">
        This directory is empty
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {currentDirectory.entries.map((entry) => {
          const inode = state.inodes.get(entry.inodeId);
          if (!inode) return null;

          const isDir = inode.type === 'directory';
          const isSelected = selectedFileId === entry.inodeId;

          return (
            <ContextMenu key={entry.inodeId}>
              <ContextMenuTrigger>
                <button
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors w-full",
                    isSelected && "bg-accent ring-2 ring-primary"
                  )}
                  onClick={() => {
                    if (isDir) {
                      onOpenDirectory(entry.inodeId);
                    } else {
                      onSelectFile(entry.inodeId, entry.name);
                    }
                  }}
                  onDoubleClick={() => {
                    if (isDir) {
                      onOpenDirectory(entry.inodeId);
                    }
                  }}
                >
                  {isDir ? (
                    <Folder className="w-12 h-12 text-blue-500" fill="currentColor" fillOpacity={0.2} />
                  ) : (
                    <File className="w-12 h-12 text-gray-500" />
                  )}
                  <span className="text-xs text-center break-words line-clamp-2 w-full">
                    {entry.name}
                  </span>
                </button>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => onRenameEntry(entry.name, entry.name)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Rename
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => onDeleteEntry(entry.name)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>
    </div>
  );
}
