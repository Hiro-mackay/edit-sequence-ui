import {
  CSSProperties,
  Dispatch,
  FC,
  forwardRef,
  HTMLAttributes,
  memo,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { TimelineItem } from './Sequence';
import { Resizable } from 'react-resizable';

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move',
  width: 300
};

interface Item {
  id: string;
  originalIndex: number;
}

type MyHandleProps = { handleAxis: string; set: Dispatch<SetStateAction<boolean>> };

// const MyHandle = forwardRef<HTMLDivElement, any>(({ handleAxis, set, ...restProps }, ref) => {

//   return (
//     <div
//       ref={ref}
//       className={`react-resizable-handle react-resizable-handle-${handleAxis}`}
//       onMouseEnter={() => set(true)}
//       onMouseLeave={() => {
//         set(false);
//       }}
//       {...restProps}
//     />
//   );
// });
const MyHandle = forwardRef<HTMLDivElement, any>((props, ref) => {
  const { handleAxis, set, ...restProps } = props;

  return (
    <div
      ref={ref}
      className={`react-resizable-handle react-resizable-handle-${handleAxis}`}
      onMouseEnter={() => set(true)}
      onMouseLeave={() => {
        set(false);
      }}
      {...restProps}
    />
  );
});

export const DndSortableItem: FC<TimelineItem> = memo(function Card(item) {
  const [state, set] = useState({ width: item.length });
  const [re, setre] = useState(false);

  return (
    <div
      className={`bg-red-300 cursor-move box-border p-2 rounded-lg ${re ? 'resize-elements' : ''} `}
      style={{ width: item.length }}
    >
      <Resizable
        height={100}
        width={item.length}
        resizeHandles={['w', 'e']}
        onResizeStart={() => {
          console.log('start');
        }}
        onResize={(e, state) => {
          console.log(e, state);
        }}
        // handle={(handleAxis: string, ref: any) => <MyHandle innerRef={ref} handleAxis={handleAxis} set={setre} />}
        handle={<MyHandle set={setre} />}
      >
        <div className="h-full">{item.text}</div>
      </Resizable>
    </div>
  );
});
