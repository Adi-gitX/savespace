/**
 * Header Component
 * 
 * Application header with title and reset button.
 */

import { RotateCcw, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface HeaderProps {
  onReset: () => void;
}

export function Header({ onReset }: HeaderProps) {
  return (
    <header className="h-14 border-b bg-panel flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <HardDrive className="w-6 h-6" />
        <div>
          <h1 className="font-semibold">Visual File System Simulator</h1>
          <p className="text-xs text-muted-foreground">
            Educational tool for understanding OS file system concepts
          </p>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset File System?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete all files and directories, reinitialize the disk,
              and clear all data from localStorage. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onReset}>Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
