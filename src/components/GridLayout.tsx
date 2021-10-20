import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react';
import ReactGridLayout from 'react-grid-layout';

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

type Layout = Array<Item>;

export const GridLayout = () => {
  const [layout, setLayout] = useState<Array<Item>>([
    { i: 'a', x: 0, y: 0, w: 1200, h: 1 },
    { i: 'b', x: 1200, y: 0, w: 1500, h: 1 },
    { i: 'c', x: 2700, y: 0, w: 1100, h: 1 }
  ]);

  const [scale, setScale] = useState(0.2);
  const interval = 0.1;

  const [duration, sertDuration] = useState(3800);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    sertDuration(parseInt(e.currentTarget.value));
  };

  const onLayoutChange = (newLayout: Layout) => {
    setLayout(newLayout);
  };

  return (
    <>
      <div className="flex pl-4 mb-2">
        <button
          className="w-10 py-1 bg-blue-400"
          onClick={() => {
            setScale((prev) => {
              if (prev <= 0.1) {
                return 0.1;
              }
              return prev - interval;
            });
          }}
        >
          -
        </button>
        <button
          className="w-10 py-1 bg-yellow-400"
          onClick={() => {
            setScale((prev) => prev + interval);
          }}
        >
          +
        </button>
      </div>
      <div className="w-full px-8 mb-60 " style={{ transform: `scaleX(${scale})`, transformOrigin: ' 0 0' }}>
        <ReactGridLayout
          className="layout min-w-min"
          layout={layout}
          cols={duration}
          rowHeight={30}
          width={duration}
          margin={[10 / scale, 0]}
          isBounded={true}
          transformScale={scale}
          compactType="horizontal"
          onLayoutChange={onLayoutChange}
          // onDragStop={(layout, oldItem, newItem, placeholder, e, element) => {
          //   console.log(layout, oldItem, newItem, placeholder, e, element);
          // }}
        >
          {layout.map((item) => {
            return <div key={item.i} className="bg-gray-600" />;
          })}
        </ReactGridLayout>
      </div>
    </>
  );
};
