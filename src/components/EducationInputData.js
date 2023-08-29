import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addEducation, updateEducation, removeEducation } from '../redux/slices/educationSlice';
import { useSelector } from 'react-redux';
import Collapse from 'react-collapse';
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";

const EducationInputData = () => {

    const [editingIndice, setEditingIndice] = useState(-1);
    const [editedEducations, setEditedEducations] = useState([]); 

    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    const dispatch = useDispatch();
    const educations = useSelector(state => state.educationSlice);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const newExperience = {
          schoolName: event.target.schoolName.value,
          location: event.target.location.value,
          date: event.target.date.value,
          grade: event.target.grade.value,
        };

        dispatch(addEducation(newExperience));

        event.target.schoolName.value = "";
        event.target.location.value = "";
        event.target.date.value = "";
        event.target.grade.value = "";
    };

    const handleEditClick = (index) => {
        setEditingIndice(index);
        
        const initialEditedEducations = educations.map(education => ({ ...education }));
        setEditedEducations(initialEditedEducations);
    };

    const handleEditChange = (event, index, field) => {
        const updatedEducation = [...editedEducations];
        updatedEducation[index][field] = event.target.value;
        setEditedEducations(updatedEducation);
        console.log(editedEducations);
    };
    
    const handleSaveChanges = (index) => {
        const updatedEducation = editedEducations[index];
        dispatch(updateEducation({ index, updatedEducation }));
        
        setEditingIndice(-1);
        setEditedEducations([]);
    };

    const handleDeleteClick = (indexToRemove) => {
        dispatch(removeEducation({indexToRemove}));

        setEditingIndice(-1);
        setEditedEducations([]);
    };

    console.log(editedEducations);
    
    return (
        <div className="bg-white w-[600px] rounded-md p-5 my-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <div onClick={toggleExpand} className="text-black flex items-center justify-between">
                <p className="">Education</p>
                {expanded?<AiOutlineMinus className="text-2xl"/>:<AiOutlinePlus className="text-2xl"/>}
            </div>
            <Collapse isOpened={expanded}>
                <form onSubmit={handleSubmit} className="flex flex-col pt-5">
                    <input type="text" name="schoolName" required placeholder="School Name" className="mb-2 border-2 rounded-md p-1"/>
                    <input type="text" name="location" required placeholder="Location" className="mb-2 border-2 rounded-md p-1"/>
                    <input type="text" name="date" placeholder="Date" className="mb-2 border-2 rounded-md p-1"/>
                    <textarea name="grade" placeholder="Grade" className="mb-2 border-2 rounded-md p-1"/>
                    <button type="submit" className="bg-red-700 text-white">Add Education</button>
                    {/* {warning ? <p>Please enter Company name and </p> : null} */}
                </form>
                <div>
                    <p className="text-black my-5 font-bold">Added Education Details:</p>
                    {educations.length > 0 && (
                        <div>
                                {educations.map((education, index) => (
                                    <div key={index}>
                                        {editingIndice == index ? (
                                            <div className="flex flex-col my-5">
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedEducations[index]?.schoolName || ''} placeholder="School Name" onChange={(e) => handleEditChange(e, index, 'schoolName')} />
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedEducations[index]?.location || ''} placeholder="Location" onChange={(e) => handleEditChange(e, index, 'location')} />
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedEducations[index]?.date || ''} placeholder="Date" onChange={(e) => handleEditChange(e, index, 'date')} />
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedEducations[index]?.grade || ''} placeholder="Grade" onChange={(e) => handleEditChange(e, index, 'grade')} />
                                                <button className="bg-green-600 text-white" onClick={() => handleSaveChanges(index)}>Save Changes</button>
                                                <button className="bg-red-500 text-white px-2 " onClick={() => handleDeleteClick(index)}>Remove Education</button>
                                            </div>
                                        ) : (
                                            <div className="text-black">
                                                <p>Company Name: {education.schoolName}</p>
                                                <p>Location: {education.location}</p>
                                                <p>Date: {education.date}</p>
                                                <p>Description: {education.grade}</p>
                                                <button className="bg-red-700 text-white p-1 mt-2 mb-3" onClick={() => handleEditClick(index)}>Edit</button>
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

export default EducationInputData;