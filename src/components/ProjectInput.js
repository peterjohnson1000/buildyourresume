import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addProject, updateProject, removeProject } from '../redux/slices/projectSlice';
import { useSelector } from 'react-redux';
import Collapse from 'react-collapse';
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";

const ProjectInput = () => {

    const [editingIndice, setEditingIndice] = useState(-1);
    const [editedProjects, setEditedProjects] = useState([]); 

    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectSlice);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const newProject = {
          projectName: event.target.projectName.value,
          link: event.target.link.value,
          description: event.target.description.value,
        };

        dispatch(addProject(newProject));

        event.target.projectName.value = "";
        event.target.link.value = "";
        event.target.description.value = "";
        
    };

    const handleEditClick = (index) => {
        setEditingIndice(index);
        
        const initialEditedProjects = projects.map(project => ({ ...project }));
        setEditedProjects(initialEditedProjects);
    };

    const handleEditChange = (event, index, field) => {
        const updatedProject = [...editedProjects];
        updatedProject[index][field] = event.target.value;
        setEditedProjects(updatedProject);
        console.log(updatedProject);
    };
    
    const handleSaveChanges = (index) => {
        const updatedProject = editedProjects[index];
        dispatch(updateProject({ index, updatedProject }));
        
        setEditingIndice(-1);
        setEditedProjects([]);
    };

    const handleDeleteClick = (indexToRemove) => {
        dispatch(removeProject({indexToRemove}));

        setEditingIndice(-1);
        setEditedProjects([]);
    };

    console.log(editedProjects);
    
    return (
        <div className="bg-white w-[600px] rounded-md p-5 my-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <div onClick={toggleExpand} className="text-black flex items-center justify-between">
                <p className="">Projects</p>
                {expanded?<AiOutlineMinus className="text-2xl"/>:<AiOutlinePlus className="text-2xl"/>}
            </div>
            <Collapse isOpened={expanded}>
                <form onSubmit={handleSubmit} className="flex flex-col pt-5">
                    <input type="text" name="projectName" required placeholder="Project Name" className="mb-2 border-2 rounded-md p-1"/>
                    <input type="text" name="link" required placeholder="link" className="mb-2 border-2 rounded-md p-1"/>
                    <textarea name="description" placeholder="description" className="mb-2 border-2 rounded-md p-1"/>
                    <button type="submit" className="bg-red-700 text-white">Add Project</button>
                    {/* {warning ? <p>Please enter Company name and </p> : null} */}
                </form>
                <div>
                    <p className="text-black my-5 font-bold">Added Project Details:</p>
                    {projects.length > 0 && (
                        <div>
                                {projects.map((project, index) => (
                                    <div key={index}>
                                        {editingIndice == index ? (
                                            <div className="flex flex-col my-5">
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedProjects[index]?.projectName || ''} placeholder="Project Name" onChange={(e) => handleEditChange(e, index, 'projectName')} />
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedProjects[index]?.link || ''} placeholder="link" onChange={(e) => handleEditChange(e, index, 'link')} />
                                                <input className="mb-2 border-2 rounded-md p-1" type="text" value={editedProjects[index]?.description || ''} placeholder="description" onChange={(e) => handleEditChange(e, index, 'description')} />
                                                <button className="bg-green-600 text-white" onClick={() => handleSaveChanges(index)}>Save Changes</button>
                                                <button className="bg-red-500 text-white px-2 " onClick={() => handleDeleteClick(index)}>Remove Project</button>
                                            </div>
                                        ) : (
                                            <div className="text-black">
                                                <p>Project Name: {project.projectName}</p>
                                                <p>Link: {project.link}</p>
                                                <p>Description: {project.description}</p>
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

export default ProjectInput;