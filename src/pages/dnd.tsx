import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndGridLayout } from '../components/DndGridLayout';

const Page = () => {
  return (
    <div>
      <div className="pt-10">
        <DndProvider backend={HTML5Backend}>
          <DndGridLayout />
        </DndProvider>
      </div>
    </div>
  );
};

export default Page;
