import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);

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
    { i: 'a', x: 0, y: 0, w: 200, h: 1 },
    { i: 'b', x: 100, y: 0, w: 500, h: 1 },
    { i: 'c', x: 400, y: 0, w: 100, h: 1 }
  ]);

  const [duration, sertDuration] = useState(1000);

  const [scale, sertScale] = useState(duration);

  const [selected, setSelected] = useState<Item>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    sertDuration(parseInt(e.currentTarget.value));
  };

  const onClick = () => {
    sertScale(duration);
  };

  const onSelected = (item: Item) => {
    console.log('selected');
    setSelected(item);
  };

  const onLayoutChange = (layout) => {
    setLayout(layout);
  };

  return (
    <div className="relative w-full overflow-y-hidden px-8">
      <div className="overflow-x-scroll">
        <ReactGridLayout
          className="layout min-w-min"
          layout={layout}
          cols={scale}
          rowHeight={30}
          width={scale}
          margin={[0, 5]}
          onLayoutChange={onLayoutChange}
        >
          {layout.map((item) => {
            return <div key={item.i} className="bg-gray-600  rounded-lg" onClick={() => onSelected(item)} />;
          })}
        </ReactGridLayout>
      </div>

      <div
        onClick={() => {
          setSelected(null);
        }}
        className="inline-block"
      >
        解除
      </div>
      <p>
        <input className="border border-gray-300" type="text" defaultValue={duration} onChange={onChange} />
        <input type="button" value="実行" onClick={onClick} />
      </p>
      {selected && (
        <p>
          <label>
            <span>開始:</span>
            <input
              type="number"
              className="border border-gray-300"
              defaultValue={selected.x}
              onChange={(e) => {
                selected.x = parseInt(e.currentTarget.value);
                setLayout([...layout, selected]);
              }}
            />
          </label>

          <label>
            <span>終了:</span>
            <input
              type="number"
              className="border border-gray-300"
              defaultValue={selected.w}
              onChange={(e) => {
                selected.w = parseInt(e.currentTarget.value);
                setLayout([...layout, selected]);
              }}
            />
          </label>
        </p>
      )}
    </div>
  );
};
