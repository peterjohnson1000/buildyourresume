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
          <div className="flex justify-around items-start h-full w-full bg-[#f7f7f7] 2xl:flex-col">
            <div className="flex flex-col items-center w-screen h-screen 2xl:h-fit pb-10 pt-20 md:pt-10">
              
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
            <div className="w-screen flex flex-col items-center overflow-hidden">
              <div className="w-[8.5in] pr-5 flex justify-end md:justify-center md:pr-0">
                <ReactToPrint
                  trigger={() => <button className="mt-5 bg-green-600 rounded-md text-white p-2 md:my-1">Download</button>}
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
