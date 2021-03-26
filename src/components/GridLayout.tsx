import React from 'react';
import Grid from 'react-grid-layout';

export const GridLayout = () => {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 10, h: 1 },
    { i: 'b', x: 1, y: 0, w: 30, h: 1 },
    { i: 'c', x: 4, y: 0, w: 10, h: 1 }
  ];
  return (
    // <div className="w-full px-10 py-6" style={{ minHeight: 100 }}>
    //   <div className="pb-3">
    //     <div className="bg-gray-600 h-10 w-64 rounded-lg"></div>
    //   </div>
    //   <div className="pb-3">
    //     <div className="bg-gray-600 h-10 w-64 rounded-lg"></div>
    //   </div>
    //   <div className="pb-3">
    //     <div className="bg-gray-600 h-10 w-64 rounded-lg"></div>
    //   </div>
    // </div>
    <div className="relative w-full overflow-y-hidden px-8">
      <div className="overflow-x-scroll">
        <Grid className="layout min-w-min" layout={layout} cols={50} rowHeight={30} width={1200} margin={[1, 5]}>
          <div key="a" className="bg-gray-600 h-10 w-64 rounded-lg"></div>
          <div key="b" className="bg-gray-600 h-10 w-64 rounded-lg"></div>
          <div key="c" className="bg-gray-600 h-10 w-64 rounded-lg"></div>
        </Grid>
      </div>
    </div>
  );
};
