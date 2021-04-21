import { Container } from '../components/Example';
import { GridLayout } from '../components/GridLayout';
import { Sequence } from '../components/Sequence';
import { SortableJS } from '../components/Sortable';

export default function Home() {
  return (
    <>
      <div className="bg-gray-800 w-full">
        <div className="p-10">
          <div className="grid grid-cols-2">
            <div className="w-full">
              <div className="bg-gray-300" style={{ height: 500 }}></div>
            </div>
            <div className="w-full"></div>
          </div>
        </div>
        <div className="">
          <Sequence />
        </div>
        <div></div>
      </div>
      {/* <div className="pt-10">
        <Container />
      </div> */}
      <div className="pt-10">
        <GridLayout />
      </div>
      {/* <div className="pt-10">
        <SortableJS />
      </div> */}
    </>
  );
}
