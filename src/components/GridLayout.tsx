import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react';
import ReactGridLayout, { Layout } from 'react-grid-layout';

interface Item extends Layout {
  name: string;
}

type Layouts = Array<Item>;

export const GridLayout = () => {
  const [layout, setLayout] = useState<Array<Item>>([
    { i: 'a', x: 0, y: 0, w: 1200, h: 1, name: 'a' },
    { i: 'b', x: 1200, y: 0, w: 1500, h: 1, name: 'b' },
    { i: 'c', x: 2700, y: 0, w: 1100, h: 1, name: 'c' }
  ]);

  const [scale, setScale] = useState(0.2);
  const interval = 0.1;

  const [duration, sertDuration] = useState(3800);

  const onLayoutChange = (newLayout: Layouts) => {
    console.log(newLayout);
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
        >
          {layout.map((item) => {
            return <div key={item.i} className="bg-gray-600" />;
          })}
        </ReactGridLayout>
      </div>
    </>
  );
};
