import React, { useState } from 'react';
import { ReactSortable, Sortable } from 'react-sortablejs';

interface ItemType {
  id: number;
  name: string;
}

export const SortableJS = () => {
  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: 'shrek' },
    { id: 2, name: 'fiona' },
    { id: 3, name: 'mackay' },
    { id: 4, name: 'john' },
    { id: 5, name: 'hiroki' },
    { id: 6, name: 'isogawa' }
  ]);

  return (
    <ReactSortable
      list={state}
      setList={setState}
      className="p-1 flex"
      group="groupName"
      swapThreshold={0.5}
      ghostClass={"bg-blue-100"}
      animation={200}
      delay={2}
    >
      {state.map((item) => (
        <div className="p-5 bg-gray-500 border w-44 cursor-move" key={item.id}>
          {item.name}
        </div>
      ))}
    </ReactSortable>
  );
};
