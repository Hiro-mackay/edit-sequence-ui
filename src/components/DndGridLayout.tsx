import React, { ChangeEvent, CSSProperties, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import ReactGridLayout from 'react-grid-layout';
import { DndSortable } from './DndSortable';

const basepadding = 30;

interface Item {
  // A string corresponding to the component key
  i: string;

  // These are all in grid units, not pixels
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;

  // If true, equal to `isDraggable: false, isResizable: false`.
  static?: boolean;
  // If false, will not be draggable. Overrides `static`.
  isDraggable?: boolean;
  // If false, will not be resizable. Overrides `static`.
  isResizable?: boolean;
  // By default, a handle is only shown on the bottom-right (southeast) corner.
  // Note that resizing from the top or left is generally not intuitive.
  resizeHandles?: Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'>;
  // If true and draggable, item will be moved only within grid.
  isBounded?: boolean;
}

export const DndGridLayout = () => {
  const [layout, setLayout] = useState<Array<Item>>([
    { i: 'a', x: 0, y: 0, w: 100, h: 1 },
    { i: 'b', x: 100, y: 0, w: 200, h: 1 },
    { i: 'c', x: 300, y: 0, w: 300, h: 1 }
  ]);

  const originPositionX = useRef(0);
  const isResizeReverse = useRef(false);

  const [duration, sertDuration] = useState(1000);

  return (
    <div className="relative w-full overflow-y-hidden mx-8">
      <div className="overflow-x-scroll">
        <ReactGridLayout
          className="layout min-w-min"
          layout={layout}
          cols={duration}
          rowHeight={30}
          width={duration}
          preventCollision={true}
          margin={[0, 5]}
          onLayoutChange={setLayout}
          resizeHandles={['w', 'e']}
          onResizeStart={(...args) => {
            const item = args[1];
            const e = args[4];

            const target = e.target as HTMLSpanElement;
            if ([...(target.classList as any)].includes('react-resizable-handle-w')) {
              originPositionX.current = item.x;
              isResizeReverse.current = true;
            } else {
              isResizeReverse.current = false;
            }
          }}
          onResize={(...args) => {
            if (!isResizeReverse.current) return;
            const olditem = args[1];
            const newitem = args[2];
            newitem.x = originPositionX.current + (olditem.w - newitem.w);
          }}
          onDrag={(...args) => {
            const e = args[4];
            const layout = args[0];
            const oldItem = args[1];
            const newItem = args[2];

            const overlap = layout.filter((item) => {
              if (item.i === newItem.i) return false;

              const origin = e.clientX - basepadding;

              if (item.x < origin && origin < item.x + item.w) return true;

              return false;
            });

            if (overlap.length) {
              if (oldItem.x < overlap[0].x) {
                overlap[0].x = oldItem.x;
                newItem.x = overlap[0].x + overlap[0].w;
              } else {
                overlap[0].x = overlap[0].x + newItem.w;
              }
            }
          }}
        >
          {layout.map((item) => {
            return <div key={item.i} className="bg-gray-600  rounded-lg relative"></div>;
          })}
        </ReactGridLayout>
      </div>

      <div style={{ paddingTop: 100 }}>
        <DndSortable />
      </div>
    </div>
  );
};
