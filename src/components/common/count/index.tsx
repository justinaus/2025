"use client";

import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useBoundStore } from "@/store";

export function Count() {
  const count = useBoundStore((state) => state.count);
  const increaseCount = useBoundStore((state) => state.increaseCount);
  const getCountPlusFishes = useBoundStore((state) => state.getCountPlusFishes);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClick = () => {
    if (count % 2 === 0) {
      setIsAlertOpen(true);

      return;
    }

    increaseCount();
  };

  return (
    <div>
      <div>count: {count}</div>
      <div>countPlusFishes: {getCountPlusFishes()}</div>
      <Button onClick={handleClick} className="mt-2">
        Click
      </Button>
      <CountAlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen} />
    </div>
  );
}

function CountAlertDialog({ ...rest }: AlertDialogProps) {
  return (
    <AlertDialog {...rest}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
