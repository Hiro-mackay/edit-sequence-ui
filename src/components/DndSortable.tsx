import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { ItemTypes } from './ItemTypes';
import { Timeline } from './Timeline';
import { ReactSortable } from 'react-sortablejs';
import { DndSortableItem } from './DndSortableItem';

export interface ContainerState {
  timelines: any[];
}

export interface TimelineItem {
  id: string;
  text: string;
  length: number; // ミリ秒
}

const ITEMS: Array<TimelineItem> = [
  {
    id: '1',
    text: 'Write',
    length: 200
  },
  {
    id: '2',
    text: 'Make',
    length: 200
  },
  {
    id: '3',
    text: 'README',
    length: 200
  }
];

const time = ITEMS.reduce((a, c) => a + c.length, 0);
const timeScaleAmount = Math.ceil(time / 1000);
const timeScale = [...Array(timeScaleAmount)].map((_, i) => i * 1000);
const sequenceScale = 1;

export const DndSortable = memo(() => {
  const [timelines, setTimelines] = useState(ITEMS);
  const [currentTime, setCurrentTime] = useState(0);

  const loop = (frame) => {
    const now = (frame / 60) * 1000;
    setCurrentTime(now);
    if (now >= time) return;
    requestAnimationFrame(() => loop(++frame));
  };

  return (
    <ReactSortable
      className="flex flex-nowrap w-min"
      list={timelines}
      setList={setTimelines}
      group="groupName"
      swapThreshold={0.8}
      ghostClass={'bg-blue-100'}
      filter={'.resize-elements'}
      animation={200}
      delay={1}
    >
      {timelines.map((tl) => (
        <DndSortableItem key={tl.id} {...tl} />
      ))}
    </ReactSortable>
  );
});
