import {AiTwotoneMail, AiFillPhone, AiFillLinkedin} from 'react-icons/ai';
import {BsGlobe2} from 'react-icons/bs';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Jspdf = () => {

    const data = useSelector(state => state.resumeData);
    const experiences = useSelector(state => state.experienceSlice);
    const education = useSelector(state => state.educationSlice);
    const project = useSelector(state => state.projectSlice);


    const [fullname, setFullname] = useState("");

    setFullname(data.firstname + data.lastname);

    return (
        // <PDFViewer className="h-full">
        <Document>
            <Page>
                <View>
                    <Text className="text-3xl font-bold">{data.firstname + " " + data.lastname}</Text>
                    
                    <View className="flex items-center">
                        <AiTwotoneMail />
                        <p className="mr-3 ml-1">{data.email}</p>
                    </View>
                     
                    <View className="flex items-center">
                        <AiFillPhone />
                        <p className="mr-3 ml-1">{data.number}</p>
                    </View>

                    <div className="flex items-center">
                        <AiFillLinkedin />
                        {/* <p className="mr-3 ml-1">{data.linkedin}</p>  */}
                        <a href={data.linkedin} className="lowercase mr-3 ml-1">{data.firstname + data.lastname}</a>   
                    </div>

                    <div className="flex items-center">
                            <BsGlobe2 />
                            {/* <p className="mr-3 ml-1">{data.linkedin}</p>  */}
                            <a href={data.website} className="mr-3 ml-1">Portfolio</a>   
                    </div>   
                </View>

                <View>
                    <p className="mt-5">
                        {data.intro}
                    </p>
                </View>

                {/* Experience */}
                <View className="mt-10">                        
                    <View className="mt-3">
                        <p className="font-bold">{experiences.companyName}</p>
                        <p>{experiences.location}</p>
                        <p>{experiences.date}</p>
                        <p className="mt-2">{experiences.description}</p>
                    </View>        
                </View>

                {/* Education */}
                <View className="mt-10">    
                    <View className="mt-3">
                        <p className="font-bold">{education.schoolName}</p>
                        <p>{education.location}</p>
                        <p>{education.date}</p>
                        <p className="mt-2">{education.grade}</p>
                    </View>
                </View>

                {/* Projects */}
                <View className="mt-10">
                    <View className="mt-3">
                        <p className="font-bold">{project.projectName}</p>
                        <a href={project.link} className="mt-2 underline cursor-pointer">Link</a>
                        <p className="mt-2">{project.description}</p>
                    </View> 
                </View>
            </Page>
        </Document>
        // </PDFViewer>
    );
};

export default Jspdf;