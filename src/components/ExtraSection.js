import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addData, updateData, removeData } from '../redux/slices/extraSlice';
import { useSelector } from 'react-redux';
import Collapse from 'react-collapse';
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";

const ExtraSection = () => {

    const [editingIndices, setEditingIndices] = useState(-1);
    const [editedExtraSection, setEditedExtraSection] = useState([]); 
    const [sectionHeading, setSectionHeading] = useState();
    // const [warning, setWarning] = useState(false);

    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    const dispatch = useDispatch();
    const extras = useSelector(state => state.extraSlice);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const newExtraSection = {
            sectionTitle: event.target.sectionTitle.value,
            title: event.target.title.value,
            description: event.target.description.value,
        };

        dispatch(addData(newExtraSection));

        event.target.sectionTitle.value = "";
        event.target.title.value = "";
        event.target.description.value = "";
    };

    const handleEditClick = (index) => {
        setEditingIndices(index);
        
        const initialEditedExtraSection = extras.map(extra => ({ ...extra }));
        setEditedExtraSection(initialEditedExtraSection);
    };

    const handleEditChange = (event, index, field) => {
        const updatedData = [...editedExtraSection];
        updatedData[index][field] = event.target.value;
        setEditedExtraSection(updatedData);
    };
    
    const handleSaveChanges = (index) => {
        const updatedData = editedExtraSection[index];
        dispatch(updateData({ index, updatedData }));
        
        setEditingIndices(-1);
        setEditedExtraSection([]);
    };

    const handleDeleteClick = (indexToRemove) => {
        dispatch(removeData({indexToRemove}));

        setEditingIndices(-1);
        setEditedExtraSection([]);
    };

    console.log(editedExtraSection);
    console.log(extras.sectionTitle);
    
    return (
        <div className="bg-white w-[600px] rounded-md p-5 my-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] md:w-[300px]">
            <div onClick={toggleExpand} className="text-black flex items-center justify-between">
            <p className="">Additional Section</p>
            {expanded?<AiOutlineMinus className="text-2xl"/>:<AiOutlinePlus className="text-2xl"/>}
            </div>
            <Collapse isOpened={expanded}>
                <form onSubmit={handleSubmit} className="flex flex-col pt-5">
                    <input type="text" name="sectionTitle" required placeholder="Section Title" className="mb-2 border-2 rounded-md p-1" onChange={(event) => setSectionHeading(event.target.value)}/>
                    <input type="text" name="title" required placeholder="Title" className="mb-2 border-2 rounded-md p-1"/>
                    <input type="text" name="description" placeholder="Description" className="mb-2 border-2 rounded-md p-1"/>
                    <button type="submit" className="bg-red-700 text-white rounded-md">Add {sectionHeading}</button>
                    {/* {warning ? <p>Please enter Company name and </p> : null} */}
                </form>
                <div>
                    <p className="text-black my-5 font-bold">Added Details:</p>
                    {extras.length > 0 && (
                        <div>
                                {extras.map((extra, index) => (
                                    <div key={index}>
                                        {editingIndices == index ? (
                                            <div className="flex flex-col my-5">
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedExtraSection[index]?.sectionTitle || ''} placeholder="Company Name" onChange={(e) => handleEditChange(e, index, 'sectionTitle')} />
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedExtraSection[index]?.title || ''} placeholder="Location" onChange={(e) => handleEditChange(e, index, 'title')} />
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedExtraSection[index]?.description || ''} placeholder="Description" onChange={(e) => handleEditChange(e, index, 'description')} />
                                                <button className="bg-green-600 text-white rounded-md mb-1" onClick={() => handleSaveChanges(index)}>Save Changes</button>
                                                <button className="bg-red-700 text-white px-2 rounded-md" onClick={() => handleDeleteClick(index)}>Remove Entry</button>
                                            </div>
                                        ) : (
                                            <div className="text-black">
                                                <p>Section Name: {extra.sectionTitle}</p>
                                                <p>Title: {extra.title}</p>
                                                <p>Description: {extra.description}</p>
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

export default ExtraSection;