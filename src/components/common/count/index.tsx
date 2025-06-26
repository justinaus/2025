'use client';

import { Button } from '@/components/ui/button';
import { useBoundStore } from '@/store';

export function Count() {
  const count = useBoundStore((state) => state.count);
  const increaseCount = useBoundStore((state) => state.increaseCount);

  return (
    <div>
      <div>count: {count}</div>
      <Button onClick={increaseCount} className="mt-2">
        Click
      </Button>
    </div>
  );
}
