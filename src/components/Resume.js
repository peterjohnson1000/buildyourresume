import { useSelector } from 'react-redux';
import {AiTwotoneMail, AiFillPhone, AiFillLinkedin} from 'react-icons/ai';
import {BsGlobe2} from 'react-icons/bs';
import { forwardRef } from 'react';


const Resume = forwardRef((props, ref) => {

    const data = useSelector(state => state.resumeData);
    const experiences = useSelector(state => state.experienceSlice);
    const education = useSelector(state => state.educationSlice);
    const project = useSelector(state => state.projectSlice);
    const extra = useSelector(state => state.extraSlice);
    const skills = useSelector(state => state.skillsSlice);

    // document.title = `${data.firstname + data.lastname + "_" + "resume"}`

    return (
        <div>
            <div className="max-h-[12in] max-w-[8.5in] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:transform scale-95">
                <div className="p-10 md:p-5" ref={ref}>
                <div>
                    {/* Basic Info */}
                    <p className="text-3xl font-bold">{data.firstname + " " + data.lastname}</p>
                    <div className="flex mt-2 text-md items-center">
                        {data.email ? 
                        <div className="flex items-center ">
                            <AiTwotoneMail/>
                            <p className="mr-3 ml-1">{data.email}</p>
                        </div> : null
                        }
                        {data.number ? 
                        <div className="flex items-center">
                            <AiFillPhone />
                            <p className="mr-3 ml-1">{data.number}</p>
                        </div> : null
                        }
                        {data.linkedin ? 
                        <div className="flex items-center">
                            <AiFillLinkedin />
                            {/* <p className="mr-3 ml-1">{data.linkedin}</p>  */}
                            <a href={data.linkedin} className="lowercase mr-3 ml-1">{data.firstname + data.lastname}</a>   
                        </div> : null
                        }
                        {data.website ? 
                        <div className="flex items-center">
                            <BsGlobe2 />
                            {/* <p className="mr-3 ml-1">{data.linkedin}</p>  */}
                            <a href={data.website} className="mr-3 ml-1">Portfolio</a>   
                        </div> : null
                        }
                    </div>
                    <div className="text-md">
                        <p className="mt-5">
                            {data.intro}
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="mt-10">
                        {skills.length > 0 ? <p className="font-bold text-md text-blue-500">SKILLS</p> : null}
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                {skills.map((e,index) => {
                                    return (                        
                                        <div key={index}>
                                            <p className="text-md"><span className="mr-1 font-bold">*</span> {e.skillTitle}</p>
                                        </div>
                                    );
                                })}
                            </div>
                    </div>

                    {/* Experience */}
                    <div className="mt-10">
                        {experiences.length > 0 ? <p className="font-bold text-md text-blue-500">EXPERIENCE</p> : null}
                            {experiences.map((e) => {
                                return (                        
                                    <div className="mt-3">
                                        <p className="font-bold text-md">{e.companyName}</p>
                                        <p className="text-md">{e.location}</p>
                                        <p className="text-md">{e.date}</p>
                                        <p className="mt-2 test-md">{e.description}</p>
                                    </div>
                                );
                            })}
                    </div>

                    {/* Education */}
                    <div className="mt-10">
                        {education.length > 0 ? <p className="font-bold text-blue-500">EDUCATION</p> : null}
                        {education.map((e) => {
                            return (
                                <div className="mt-3">
                                    <p className="font-bold text-md">{e.schoolName}</p>
                                    <p className="text-md">{e.location}</p>
                                    <p className="text-md">{e.date}</p>
                                    <p className="mt-2 text-md">{e.grade}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Projects */}
                    <div className="mt-10">
                        {project.length > 0 ? <p className="font-bold text-blue-500">PROJECTS</p> : null}
                        {project.map((e) => {
                            return (
                                <div className="mt-3">
                                    <p className="font-bold text-md">{e.projectName}</p>
                                    <a href={e.link} className="mt-2 underline cursor-pointer text-md">Link</a>
                                    <p className="mt-2 text-md">{e.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional */}
                    <div className="mt-10">
                        {extra.map((e) => {
                            return (
                                <div className="mt-3">
                                    {extra.length > 0 ? <p className="font-bold text-blue-500">{e.sectionTitle}</p> : null}  
                                    <p className="font-bold text-md">{e.title}</p>
                                    <p className="mt-2 text-md">{e.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
});

export default Resume;