import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addExperience, updateExperience, removeExperience } from '../redux/slices/experienceSlice';
import { useSelector } from 'react-redux';
import Collapse from 'react-collapse';
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";

const ExperienceInputData = () => {

    const [editingIndices, setEditingIndices] = useState(-1);
    const [editedExperiences, setEditedExperiences] = useState([]); 
    // const [warning, setWarning] = useState(false);

    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    const dispatch = useDispatch();
    const experiences = useSelector(state => state.experienceSlice);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const newExperience = {
          companyName: event.target.companyName.value,
          location: event.target.location.value,
          date: event.target.date.value,
          description: event.target.description.value,
        };

        dispatch(addExperience(newExperience));

        event.target.companyName.value = "";
        event.target.location.value = "";
        event.target.date.value = "";
        event.target.description.value = "";

        // if(newExperience.companyName.length && newExperience.companyName.length > 0) 
        // {

        //     dispatch(addExperience(newExperience));
        //     setWarning(false);
        // }
        // else 
        // {
        //     setWarning(true);
        // }
    };

    const handleEditClick = (index) => {
        setEditingIndices(index);
        
        const initialEditedExperiences = experiences.map(experience => ({ ...experience }));
        setEditedExperiences(initialEditedExperiences);
    };

    const handleEditChange = (event, index, field) => {
        const updatedExperiences = [...editedExperiences];
        updatedExperiences[index][field] = event.target.value;
        setEditedExperiences(updatedExperiences);
    };
    
    const handleSaveChanges = (index) => {
        const updatedExperience = editedExperiences[index];
        dispatch(updateExperience({ index, updatedExperience }));
        
        setEditingIndices(-1);
        setEditedExperiences([]);
    };

    const handleDeleteClick = (indexToRemove) => {
        dispatch(removeExperience({indexToRemove}));

        setEditingIndices(-1);
        setEditedExperiences([]);
    };

    console.log(editedExperiences);
    
    return (
        <div className="bg-white w-[600px] rounded-md p-5 my-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] md:w-[300px]">
            <div onClick={toggleExpand} className="text-black flex items-center justify-between">
            <p className="">Experience</p>
            {expanded?<AiOutlineMinus className="text-2xl"/>:<AiOutlinePlus className="text-2xl"/>}
            </div>
            <Collapse isOpened={expanded}>
                <form onSubmit={handleSubmit} className="flex flex-col pt-5">
                    <input type="text" name="companyName" required placeholder="Company Name" className="mb-2 border-2 rounded-md p-1"/>
                    <input type="text" name="location" required placeholder="Location" className="mb-2 border-2 rounded-md p-1"/>
                    <input type="text" name="date" placeholder="Date" className="mb-2 border-2 rounded-md p-1"/>
                    <textarea name="description" placeholder="Description" className="mb-2 border-2 rounded-md p-1"/>
                    <button type="submit" className="bg-red-700 text-white rounded-md">Add Experience</button>
                    {/* {warning ? <p>Please enter Company name and </p> : null} */}
                </form>
                <div>
                    <p className="text-black my-5 font-bold">Added Experience Details:</p>
                    {experiences.length > 0 && (
                        <div>
                                {experiences.map((experience, index) => (
                                    <div key={index}>
                                        {editingIndices == index ? (
                                            <div className="flex flex-col my-5">
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedExperiences[index]?.companyName || ''} placeholder="Company Name" onChange={(e) => handleEditChange(e, index, 'companyName')} />
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedExperiences[index]?.location || ''} placeholder="Location" onChange={(e) => handleEditChange(e, index, 'location')} />
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedExperiences[index]?.date || ''} placeholder="Date" onChange={(e) => handleEditChange(e, index, 'date')} />
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedExperiences[index]?.description || ''} placeholder="Description" onChange={(e) => handleEditChange(e, index, 'description')} />
                                                <button className="bg-green-600 text-white rounded-md mb-1" onClick={() => handleSaveChanges(index)}>Save Changes</button>
                                                <button className="bg-red-700 text-white px-2 rounded-md" onClick={() => handleDeleteClick(index)}>Remove Experience</button>
                                            </div>
                                        ) : (
                                            <div className="text-black">
                                                <p>Company Name: {experience.companyName}</p>
                                                <p>Location: {experience.location}</p>
                                                <p>Date: {experience.date}</p>
                                                <p>Description: {experience.description}</p>
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

export default ExperienceInputData;