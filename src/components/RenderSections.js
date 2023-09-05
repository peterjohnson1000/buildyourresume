import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EducationInputData from "./EducationInputData";
import ExperienceInputData from "./ExperienceInputData";
import ProjectInput from "./ProjectInput";
import SkillsInputSection from "./SkillsInputSection";
import { useState } from "react";
import {RxDragHandleDots1} from "react-icons/rx";
import ExtraSection from "./ExtraSection";

const RenderSections = (props) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.id,
    // disabled: !isDragActive, // Disable sorting when drag is not active
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  let DynamicComponent = null;
  switch (props.id) {
    case "EducationInputData":
      DynamicComponent = EducationInputData;
      break;
    case "ExperienceInputData":
      DynamicComponent = ExperienceInputData;
      break;
    case "ProjectInput":
      DynamicComponent = ProjectInput;
      break;
    case "SkillsInputSection":
      DynamicComponent = SkillsInputSection;
      break;
    case "ExtraSection":
      DynamicComponent = ExtraSection;
      break;
    default:
      break;
  }

  const handleDragIconClick = () => {
    setIsDragActive((prev) => !prev);
  };

  return (
    <div >
        <div className="flex items-center" >
            <div>
                {DynamicComponent && <DynamicComponent />}
            </div>
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <span onClick={handleDragIconClick} className="text-2xl px-2"><RxDragHandleDots1/></span>
            </div>
        </div>
    </div>
  );
};

export default RenderSections;
