import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from 'react';
import ReactGridLayout, { Layout } from 'react-grid-layout';

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

const Page = () => {
  const [static1, setStatic1] = useState(false);
  const [static2, setStatic2] = useState(true);
  const [static3, setStatic3] = useState(true);

  const [layout, setLayout] = useState<Layout[]>([
    { i: 'a', x: 0, y: 0, w: 700, h: 1 },
    { i: 'b', x: 0, y: 0, w: 500, h: 1 },
    { i: 'c', x: 0, y: 0, w: 400, h: 1 }
  ]);

  const [layoutChild, setLayoutChild] = useState<Layout[]>([
    { i: 'a', x: 0, y: 0, w: 300, h: 1 },
    { i: 'b', x: 100, y: 0, w: 100, h: 1 },
    { i: 'c', x: 200, y: 0, w: 150, h: 1 }
  ]);

  const [layoutOther, setLayoutOther] = useState<Layout[]>([
    { i: 'a', x: 0, y: 0, w: 700, h: 1 },
    { i: 'b', x: 200, y: 0, w: 500, h: 1 },
    { i: 'c', x: 500, y: 0, w: 400, h: 1 },
    { i: 'd', x: 800, y: 0, w: 400, h: 1 },
    { i: 'e', x: 1000, y: 0, w: 500, h: 1 },
    { i: 'f', x: 1200, y: 0, w: 400, h: 1 }
  ]);

  const [selected, setSelected] = useState<Item>(null);

  const onSelected = (item: Item) => {
    setSelected(item);
  };

  const onLayoutChange = (layout: Layout[]) => {
    setLayout(layout);
  };

  const onLayoutChildChange = (layout: Layout[]) => {
    setLayoutChild(layout);
  };

  const onLayoutOtherChange = (layout: Layout[]) => {
    setLayoutOther(layout);
  };

  const onStatic = (s1: boolean, s2: boolean, s3: boolean) => {
    setStatic1(s1);
    setStatic2(s2);
    setStatic3(s3);
  };

  useEffect(() => {
    console.log(static1, static2, static3);
  }, [static1, static2, static3]);

  return (
    <div
      style={{
        backgroundColor: '#111',
        minHeight: 300,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div className="w-full h-auto">
        <div
          style={{ backgroundColor: '#222', minHeight: 10, minWidth: '100%', boxSizing: 'border-box' }}
          onClick={() => {
            onStatic(false, true, true);
          }}
        >
          <ReactGridLayout
            className="layout relative min-w-min"
            cols={1600}
            rowHeight={80}
            width={1600}
            margin={[5, 5]}
            compactType="horizontal"
            onLayoutChange={onLayoutChange}
          >
            {layout.map((item) => {
              return (
                <div
                  key={item.i}
                  className="bg-gray-600  rounded-lg p-1 box-border"
                  onClick={() => onSelected(item)}
                  data-grid={{ ...item, static: static1 }}
                >
                  <div className="bg-gray-800 rounded-lg" style={{ width: '100%', height: '60%' }}></div>

                  <div className="relative h-1 mt-1">
                    <ReactGridLayout
                      className="layout relative min-w-min"
                      cols={item.w}
                      width={item.w}
                      margin={[5, 5]}
                      rowHeight={4}
                      onLayoutChange={onLayoutChildChange}
                    >
                      {layoutChild.map((c) => (
                        <div
                          key={c.i}
                          data-grid={{ ...c, static: static2 }}
                          className="bg-blue-600  rounded-lg  box-border"
                        ></div>
                      ))}
                    </ReactGridLayout>
                  </div>
                </div>
              );
            })}
          </ReactGridLayout>
        </div>
        <div
          style={{ backgroundColor: '#222', minHeight: 10, minWidth: '100%', boxSizing: 'border-box', marginTop: 20 }}
          onClick={() => {
            onStatic(true, true, false);
          }}
        >
          <ReactGridLayout
            className="layout relative min-w-min"
            layout={layoutOther}
            cols={1600}
            rowHeight={5}
            width={1600}
            margin={[5, 5]}
            onLayoutChange={onLayoutOtherChange}
          >
            {layoutOther.map((c) => (
              <div
                key={c.i}
                data-grid={{ ...c, static: static3 }}
                className="bg-green-600  rounded-lg  box-border"
              ></div>
            ))}
          </ReactGridLayout>
        </div>
      </div>
    </div>
  );
};

export default Page;
