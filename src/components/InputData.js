import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {updateFirstName, updateLastName, updateEmail, updateNumber, updateLinkedin, updateWebsite, updateIntro} from '../redux/slices/resumeData';
import Collapse from 'react-collapse';
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";



const InputData = () => {

  const [expanded, setExpanded] = useState(false);
  const [additionalExpanded, setAdditionalExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const toggleAdditionalExpand = () => {
    setAdditionalExpanded(!additionalExpanded);
  };

  const dispatch = useDispatch();

  const data = useSelector(state => state.resumeData);

  const handleFirstNameChange = (event) => {
    dispatch(updateFirstName(event.target.value));
  };
  const handleLastNameChange = (event) => {
    dispatch(updateLastName(event.target.value));
  };
  const handleEmailChange = (event) => {
    dispatch(updateEmail(event.target.value));
  };
  const handleNumberChange = (event) => {
    dispatch(updateNumber(event.target.value));
  };
  const handleLinkedinChange = (event) => {
    dispatch(updateLinkedin(event.target.value));
  };
  const handleWebsiteChange = (event) => {
    dispatch(updateWebsite(event.target.value));
  };
  const handleIntroChange = (event) => {
    dispatch(updateIntro(event.target.value));
  };

    return (
        <div className="bg-white w-[600px] rounded-md p-5 my-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div onClick={toggleExpand} className="text-black flex items-center justify-between">
            <p className="">Basic Info</p>
            {expanded?<AiOutlineMinus className="text-2xl"/>:<AiOutlinePlus className="text-2xl"/>}
          </div>
            <Collapse isOpened={expanded}>
              <div className="flex flex-col w-[300px] ml-10 pt-5">
                <div className="flex">
                    <input type="text" placeholder="firstname" className="mb-2 border-2 rounded-md p-1" value={data?.firstname || ""} onChange={handleFirstNameChange} />
                    <input type="text" placeholder="lastname" className="mb-2 ml-2 border-2 rounded-md p-1" value={data?.lastname || ""} onChange={handleLastNameChange} />
                </div>
                  <input type="text" placeholder="email" className="mb-2 border-2 rounded-md p-1" value={data?.email || ""} onChange={handleEmailChange} />
                  <input type="number" placeholder="number" className="mb-2 border-2 rounded-md p-1" value={data?.number || ""} onChange={handleNumberChange} />
                  <textarea type="text" placeholder="intro" className="mb-2 border-2 rounded-md p-1 h-[150px] w-[500px]" value={data?.intro || ""} onChange={handleIntroChange} />

                  <div onClick={toggleAdditionalExpand} className="text-black flex items-center justify-between my-5">
                    <p>Additional Info</p>
                    {additionalExpanded?<AiOutlineMinus className="text-2xl"/>:<AiOutlinePlus className="text-2xl"/>}
                  </div>
                  <Collapse isOpened={additionalExpanded}>
                    <div className="mt-2">
                    <input type="text" placeholder="LinkedIn URL" className="mb-2 w-full border-2 rounded-md p-1" value={data?.linkedin || ""} onChange={handleLinkedinChange} />
                    <input type="text" placeholder="Portfolio Website" className="mb-2 w-full border-2 rounded-md p-1" value={data?.website || ""} onChange={handleWebsiteChange} />
                    </div>
                  </Collapse>

              </div>
            </Collapse>
        </div>
    );
};

export default InputData;