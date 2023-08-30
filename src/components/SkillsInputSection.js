import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addSkill, updateSkill, removeSkill } from '../redux/slices/skillsSlice';
import { useSelector } from 'react-redux';
import Collapse from 'react-collapse';
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";

const SkillsInputSection = () => {

    const [editingIndices, setEditingIndices] = useState(-1);
    const [editedSkillsSection, setEditedSkillsSection] = useState([]); 

    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    const dispatch = useDispatch();
    const extras = useSelector(state => state.skillsSlice);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const newExtraSection = {
            skillTitle: event.target.skillTitle.value,
        };

        dispatch(addSkill(newExtraSection));

        event.target.skillTitle.value = "";
    };

    const handleEditClick = (index) => {
        setEditingIndices(index);
        
        const initialEditedSkillsSection = extras.map(extra => ({ ...extra }));
        setEditedSkillsSection(initialEditedSkillsSection);
    };

    const handleEditChange = (event, index, field) => {
        const updatedSkill = [...editedSkillsSection];
        updatedSkill[index][field] = event.target.value;
        setEditedSkillsSection(updatedSkill);
    };
    
    const handleSaveChanges = (index) => {
        const updatedSkill = editedSkillsSection[index];
        dispatch(updateSkill({ index, updatedSkill }));
        
        setEditingIndices(-1);
        setEditedSkillsSection([]);
    };

    const handleDeleteClick = (indexToRemove) => {
        dispatch(removeSkill({indexToRemove}));

        setEditingIndices(-1);
        setEditedSkillsSection([]);
    };

    console.log(editedSkillsSection);
    console.log(extras.sectionTitle);
    
    return (
        <div className="bg-white w-[600px] rounded-md p-5 my-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <div onClick={toggleExpand} className="text-black flex items-center justify-between">
            <p className="">Skills Section</p>
            {expanded?<AiOutlineMinus className="text-2xl"/>:<AiOutlinePlus className="text-2xl"/>}
            </div>
            <Collapse isOpened={expanded}>
                <form onSubmit={handleSubmit} className="flex flex-col pt-5">
                    <input type="text" name="skillTitle" required placeholder="Skill Title" className="mb-2 border-2 rounded-md p-1"/>
                    <button type="submit" className="bg-red-700 text-white rounded-md">Add Skill</button>
                    {/* {warning ? <p>Please enter Company name and </p> : null} */}
                </form>
                <div>
                    <p className="text-black my-5 font-bold">Added Skill Details:</p>
                    {extras.length > 0 && (
                        <div>
                                {extras.map((extra, index) => (
                                    <div key={index}>
                                        {editingIndices == index ? (
                                            <div className="flex flex-col my-5">
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedSkillsSection[index]?.skillTitle || ''} placeholder="Skill Name" onChange={(e) => handleEditChange(e, index, 'skillTitle')} />
                                                <button className="bg-green-600 text-white rounded-md mb-1" onClick={() => handleSaveChanges(index)}>Save Changes</button>
                                                <button className="bg-red-700 text-white px-2 rounded-md" onClick={() => handleDeleteClick(index)}>Remove Entry</button>
                                            </div>
                                        ) : (
                                            <div className="text-black">
                                                <p>Skill Name: {extra.skillTitle}</p>
                                                <button className="bg-red-700 text-white p-1 mt-2 mb-3 rounded-md" onClick={() => handleEditClick(index)}>Edit</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </Collapse>
        </div>
    )
}

export default SkillsInputSection;