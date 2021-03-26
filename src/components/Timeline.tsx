import { CSSProperties, FC, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { TimelineItem } from './Sequence';

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move',
  width: 300
};

export interface TimelineProps {
  item: TimelineItem;
  sequenceScale: number;
}

interface Item {
  id: string;
  originalIndex: number;
}

export const Timeline: FC<TimelineProps> = memo(function Card({ item, sequenceScale }) {
  return (
    <div
      className={`bg-red-300 cursor-move box-border p-2 rounded-lg  border border-gray-500`}
      style={{ width: item.length / sequenceScale, marginRight: 1 }}
    >
      {item.text}
    </div>
  );
});
