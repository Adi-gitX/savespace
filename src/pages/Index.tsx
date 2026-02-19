/**
 * Visual File System Simulator - Main Page
 * 
 * Layout:
 * ┌─────────────────────────────────────────────────────┐
 * │                     Header                          │
 * ├──────────┬────────────────────────┬─────────────────┤
 * │          │                        │                 │
 * │   Tree   │      File List         │   Inspector     │
 * │          │                        │                 │
 * ├──────────┴────────────────────────┴─────────────────┤
 * │              Disk Block Visualization               │
 * └─────────────────────────────────────────────────────┘
 */

import { AllocationStrategySelector } from '@/components/AllocationStrategySelector';
import { DirectoryTree } from '@/components/DirectoryTree';
import { DiskBlockVisual } from '@/components/DiskBlockVisual';
import { ErrorToast } from '@/components/ErrorToast';
import { FileGrid } from '@/components/FileGrid';
import { FileInspector } from '@/components/FileInspector';
import { FileList } from '@/components/FileList';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useFileSystem } from '@/hooks/useFileSystem';
import { LayoutGrid, List, Settings2 } from 'lucide-react';
import { useState } from 'react';

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
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <Header onReset={reset} />

      {/* Control Toolbar */}
      <div className="border-b bg-muted/20 px-4 py-1.5 flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-2 bg-background">
              <Settings2 className="w-3.5 h-3.5" />
              <span className="text-xs">Strategy: <span className="font-medium capitalize">{state?.currentAllocationStrategy || 'Contiguous'}</span></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <AllocationStrategySelector 
              currentStrategy={state?.currentAllocationStrategy || 'contiguous'}
              onStrategyChange={setAllocationStrategy}
              fragmentation={fragmentation}
            />
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-r-none"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-l-none"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
            </div>
          </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Panels: Tree | Files | Inspector */}
        <div className="flex-1 flex min-h-0 border-b">
          {/* Directory Tree Panel */}
          <div className="w-56 border-r bg-panel flex-shrink-0">
            <DirectoryTree
              state={state}
              selectedDirId={selectedDirId}
              onSelectDirectory={selectDirectory}
              onCreateDirectory={createDirectory}
            />
          </div>

          {/* File List Panel */}
          <div className="flex-1 overflow-auto border rounded-lg bg-card">
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

          {/* File Inspector Panel */}
          <div className="w-72 border-l bg-panel flex-shrink-0">
            <FileInspector
              selectedFile={selectedFile}
              selectedFileName={selectedFileName}
              state={state}
              path={selectedFileName ? (currentPath === '/' ? `/${selectedFileName}` : `${currentPath}/${selectedFileName}`) : null}
              onUpdatePermissions={updatePermissions}
            />
          </div>
        </div>

        {/* Disk Block Visualization Panel */}
        <div className="h-64 bg-panel flex-shrink-0">
          <DiskBlockVisual
            disk={state?.disk ?? null}
            selectedFile={selectedFile}
            diskStats={diskStats}
            fragmentation={fragmentation}
          />
        </div>
      </div>

      {/* Error Toast */}
      <ErrorToast message={error} onDismiss={clearError} />
    </div>
  );
};

export default Index;
