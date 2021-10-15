import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { ItemTypes } from './ItemTypes';
import { Timeline } from './Timeline';
import { ReactSortable } from 'react-sortablejs';

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
    length: 5000
  },
  {
    id: '2',
    text: 'Make',
    length: 1000
  },
  {
    id: '3',
    text: 'README',
    length: 5000
  },
  {
    id: '4',
    text: 'examples',
    length: 1000
  },
  {
    id: '5',
    text: 'Spam',
    length: 5000
  },
  {
    id: '6',
    text: '???',
    length: 1000
  },
  {
    id: '7',
    text: 'PROFIT',
    length: 1000
  }
];

const time = ITEMS.reduce((a, c) => a + c.length, 0);
const timeScaleAmount = Math.ceil(time / 1000);
const timeScale = [...Array(timeScaleAmount)].map((_, i) => i * 1000);
const sequenceScale = 5;

export const Sequence = memo(() => {
  const [timelines, setTimelines] = useState(ITEMS);
  const [currentTime, setCurrentTime] = useState(0);

  const loop = (frame) => {
    const now = (frame / 60) * 1000;
    setCurrentTime(now);
    if (now >= time) return;
    requestAnimationFrame(() => loop(++frame));
  };

  return (
    <>
      <p className="px-10 py-5">
        <input type="button" value="再生" onClick={() => loop(0)} />
      </p>
      <div className="w-full overflow-x-scroll" style={{ minHeight: 200 }}>
        <div className="border-b-2 border-gray-400 relative mx-10" style={{ width: time / sequenceScale }}>
          <div
            className="absolute  rounded-md bg-gray-300 z-10"
            style={{ top: -5, left: (currentTime - 1) / sequenceScale, width: 2, height: 180 }}
          ></div>
          {timeScale.map((scale) => {
            return (
              <div key={scale} className="absolute h-2 w-0.5 bg-gray-400 z-0" style={{ left: scale / sequenceScale }}>
                <div
                  className="absolute text-sm w-10 text-gray-100 text-center"
                  style={{ top: 10, left: '50%', transform: 'translateX(-50%)' }}
                >
                  {`${scale / 1000} s`}
                </div>
              </div>
            );
          })}
        </div>
        <ReactSortable
          className="flex flex-nowrap w-min p-10"
          list={timelines}
          setList={setTimelines}
          group="groupName"
          swapThreshold={0.8}
          ghostClass={'bg-blue-400'}
          animation={200}
          delay={2}
          // onEnd={(/**Event*/ evt) => {
          //   console.log('onEnd', evt.to);
          // }}
          onUpdate={(/**Event*/ evt) => {
            console.log('onUpdate', evt);
          }}
          // onSort={(/**Event*/ evt) => {
          //   console.log('onSort', evt);
          // }}
          // onMove={(/**Event*/ evt, originalEvent) => {
          //   console.log('onMove', evt, originalEvent);
          // }}
          // onChange={(/**Event*/ evt) => {
          //   console.log('onChange', evt);
          // }}
        >
          {timelines.map((tl) => (
            <Timeline key={tl.id} item={tl} sequenceScale={sequenceScale} />
          ))}
        </ReactSortable>
      </div>
    </>
  );
});
