
import { AllocationStrategySelector } from '@/components/AllocationStrategySelector';
import { DirectoryTree } from '@/components/DirectoryTree';
import { DiskBlockVisual } from '@/components/DiskBlockVisual';
import { ErrorToast } from '@/components/ErrorToast';
import { FileGrid } from '@/components/FileGrid';
import { FileInspector } from '@/components/FileInspector';
import { FileList } from '@/components/FileList';
import { Navbar } from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useFileSystem } from '@/hooks/useFileSystem';
import { LayoutGrid, List, Settings2, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const Index = () => {
  const {
    state,
    selectedDirId,
    selectedFileId,
    currentDirectory,
    selectedFile,
    selectedFileName,
    currentPath,
    diskStats,
    error,
    clearError,
    createFile,
    createDirectory,
    renameEntry,
    deleteEntry,
    selectDirectory,
    selectFile,
    updatePermissions,
    reset,
    setAllocationStrategy,
    fragmentation,
  } = useFileSystem();

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  return (
    <div className="h-screen flex flex-col bg-white text-black font-sans">
      {}
      <Navbar />

      {}
      <div className="border-b border-black flex items-center justify-between px-6 py-3 bg-white z-10">
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2 bg-white text-black border-black hover:bg-gray-50 uppercase text-[11px] font-bold tracking-widest rounded-none"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span className="truncate">
                  Strategy: {state?.currentAllocationStrategy || 'Contiguous'}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-black rounded-none" align="start">
              <AllocationStrategySelector
                currentStrategy={state?.currentAllocationStrategy || 'contiguous'}
                onStrategyChange={setAllocationStrategy}
                fragmentation={fragmentation}
              />
            </PopoverContent>
          </Popover>

          <div className="flex items-center border border-black rounded-none">
            <button
              onClick={() => setViewMode('list')}
              className={`h-9 px-3 flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-9 bg-black" />
            <button
              onClick={() => setViewMode('grid')}
              className={`h-9 px-3 flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 border-black rounded-none uppercase text-[11px] font-bold tracking-widest hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-colors">
                <RotateCcw className="w-3.5 h-3.5 mr-2" />
                Reset System
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-none border-black">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-bold">Reset File System?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete all files and directories, reinitialize the disk,
                  and clear all data. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-none border-black uppercase text-xs font-bold tracking-wider">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={reset} className="rounded-none bg-red-600 hover:bg-red-700 uppercase text-xs font-bold tracking-wider">Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {}
      <div className="flex-1 flex flex-col min-h-0">


        <div className="flex-1 flex min-h-0 border-b border-black">


          <div className="w-64 border-r border-black flex-shrink-0 bg-gray-50/50">
            <div className="h-full overflow-auto p-2">
              <DirectoryTree
                state={state}
                selectedDirId={selectedDirId}
                onSelectDirectory={selectDirectory}
                onCreateDirectory={createDirectory}
              />
            </div>
          </div>


          <div className="flex-1 overflow-auto bg-white">
            {viewMode === 'list' ? (
              <FileList
                state={state}
                currentDirectory={currentDirectory}
                currentPath={currentPath}
                selectedFileId={selectedFileId}
                onSelectFile={selectFile}
                onSelectDirectory={selectDirectory}
                onCreateFile={createFile}
                onRenameEntry={renameEntry}
                onDeleteEntry={deleteEntry}
              />
            ) : (
              <FileGrid
                state={state}
                currentDirectory={currentDirectory}
                currentPath={currentPath}
                onSelectFile={selectFile}
                onOpenDirectory={selectDirectory}
                onRenameEntry={renameEntry}
                onDeleteEntry={deleteEntry}
                selectedFileId={selectedFileId}
              />
            )}
          </div>


          <div className="w-80 border-l border-black flex-shrink-0 bg-gray-50/50">
            <FileInspector
              selectedFile={selectedFile}
              selectedFileName={selectedFileName}
              state={state}
              path={selectedFileName ? (currentPath === '/' ? `/${selectedFileName}` : `${currentPath}/${selectedFileName}`) : null}
              onUpdatePermissions={updatePermissions}
            />
          </div>
        </div>

        {}
        <div className="h-72 flex-shrink-0 bg-white p-0">
          <DiskBlockVisual
            disk={state?.disk ?? null}
            selectedFile={selectedFile}
            diskStats={diskStats}
          />
        </div>
      </div>

      <ErrorToast message={error} onDismiss={clearError} />
    </div>
  );
};

export default Index;
