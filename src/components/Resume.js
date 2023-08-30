import { useSelector } from 'react-redux';
import {AiTwotoneMail, AiFillPhone, AiFillLinkedin} from 'react-icons/ai';
import {BsGlobe2} from 'react-icons/bs';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Resume = () => {

    const data = useSelector(state => state.resumeData);
    const experiences = useSelector(state => state.experienceSlice);
    const education = useSelector(state => state.educationSlice);
    const project = useSelector(state => state.projectSlice);
    const extra = useSelector(state => state.extraSlice);
    const skills = useSelector(state => state.skillsSlice);

    console.log(extra);

    const downloadPDF = () => {
        html2canvas(document.querySelector('#content')).then((canvas) => {
          const base64image = canvas.toDataURL('image/png');
      
          // Create a PDF with A4 dimensions
          const pdf = new jsPDF('p', 'px', 'a4');
      
          // Add the image to the PDF with A4 dimensions
          pdf.addImage(base64image, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      
          // Save the PDF
          pdf.save('resume.pdf');
        });
      };

    return (
        <div className="">
            <div className="w-full flex justify-end">
                <button id="btn-print" className="mt-5 mr-7 bg-green-600 rounded-md text-white p-2" onClick={downloadPDF}>Download PDF</button>
            </div>
            <div id="content" className="w-[700px] h-[800px] bg-white p-10 my-5 mx-7 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <div>
                    {/* Basic Info */}
                    <p className="text-3xl font-bold">{data.firstname + " " + data.lastname}</p>
                    <div className="flex mt-2 text-sm items-center">
                        {data.email ? 
                        <div className="flex items-center">
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
                    <div className="text-sm">
                        <p className="mt-5">
                            {data.intro}
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="mt-10">
                        {skills.length > 0 ? <p className="font-bold text-blue-500">SKILLS</p> : null}
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                {skills.map((e,index) => {
                                    return (                        
                                        <div key={index}>
                                            <p className="font-bold"><span className=" mr-1">*</span> {e.skillTitle}</p>
                                        </div>
                                    );
                                })}
                            </div>
                    </div>
                    

                    {/* Experience */}
                    <div className="mt-10">
                        {experiences.length > 0 ? <p className="font-bold text-blue-500">EXPERIENCE</p> : null}
                            {experiences.map((e) => {
                                return (                        
                                    <div className="mt-3">
                                        <p className="font-bold">{e.companyName}</p>
                                        <p>{e.location}</p>
                                        <p>{e.date}</p>
                                        <p className="mt-2">{e.description}</p>
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
                                    <p className="font-bold">{e.schoolName}</p>
                                    <p>{e.location}</p>
                                    <p>{e.date}</p>
                                    <p className="mt-2">{e.grade}</p>
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
                                    <p className="font-bold">{e.projectName}</p>
                                    <a href={e.link} className="mt-2 underline cursor-pointer">Link</a>
                                    <p className="mt-2">{e.description}</p>
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
                                    <p className="font-bold">{e.title}</p>
                                    <p className="mt-2">{e.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;