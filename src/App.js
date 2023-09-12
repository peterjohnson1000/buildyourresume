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
        <div className="flex justify-around py-5 items-start bg-[#f7f7f7] 2xl:flex-col 2xl:items-center">

            <div className="mt-16 2xl:mt-10">
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

            <div className="2xl:my-5">
              <div className="flex justify-end mr-5 md:justify-center md:mr-0">
                <ReactToPrint
                  trigger={() => <button className="bg-green-600 rounded-md p-2 text-white">Download</button>}
                  content={() => componentRef.current}
                />
              </div>
              <Resume ref={componentRef} />
            </div>

        </div>
    
  );
}

export default App;