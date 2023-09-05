import './index.css';
import Resume from './components/Resume';
import InputData from './components/InputData';
import ExperienceInputData from './components/ExperienceInputData';
import EducationInputData from './components/EducationInputData';
import ProjectInput from './components/ProjectInput';
// import AdditionalSection from './components/AdditionalSection';
import SkillsInputSection from './components/SkillsInputSection';
import ExtraSection from './components/ExtraSection';
import RenderSections from './components/RenderSections';
import { useRef, useState } from 'react';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from "@dnd-kit/sortable";
import ReactToPrint from "react-to-print";

const App = () => {

  const [sections, setSections] = useState(["SkillsInputSection", "ExperienceInputData", "EducationInputData","ProjectInput", "ExtraSection"])

  const handleDragEnd = (event) => {
    const{active, over} = event;

    setSections( (items) => {
      const activeIndex = items.indexOf(active.id);
      const overIndex = items.indexOf(over.id);
      return arrayMove(items, activeIndex, overIndex);
    });
  }

  let componentRef = useRef();

  return (
        <div>
          <div className="flex justify-between h-full items-center bg-[#f7f7f7]">
            <div className="flex flex-col items-center h-screen w-screen">
              
            {/* <p className="font-light">This app is still <span className="font-semibold">under development.</span></p>
            <p className="font-light mb-5">A new feature/bug fix is pushed to production <span className="font-semibold">everyday 🙃</span></p> */}
            
              <InputData />

              {/* <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sections} strategy={verticalListSortingStrategy}>
                  {sections.map(section => <RenderSections key={section} id={section} />)}
                </SortableContext>
              </DndContext> */}

              <SkillsInputSection/>
              <ExperienceInputData />
              <EducationInputData />
              <ProjectInput />
              <ExtraSection />

            </div>
            <div>
              <div className="w-full flex justify-end">
                <ReactToPrint
                  trigger={() => <button className="mt-5 mr-7 bg-green-600 rounded-md text-white p-2">Download</button>}
                  content={() => componentRef.current}
                />
              </div>
              <Resume ref={componentRef} />
            </div>
          </div>
        </div>
    
  );
}

export default App;
