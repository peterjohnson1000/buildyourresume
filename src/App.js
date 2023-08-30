import './index.css';
import Resume from './components/Resume';
import InputData from './components/InputData';
import ExperienceInputData from './components/ExperienceInputData';
import EducationInputData from './components/EducationInputData';
import ProjectInput from './components/ProjectInput';
import CollapsibleSection from './components/CollapsibleSection';
import Jspdf from './components/Jspdf';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Fragment } from 'react';
import AdditionalSection from './components/AdditionalSection';
import ExtraSection from './components/ExtraSection';
import SkillsInputSection from './components/SkillsInputSection';

function App() {

  return (
        <div>
          <div className="flex justify-between h-full items-center bg-[#f7f7f7]">
            <div className="flex flex-col justify-center items-center h-screen w-screen">
            <p className="font-light">This app is still <span className="font-semibold">under development.</span></p>
            <p className="font-light mb-5">A new feature/bug fix is pushed to production <span className="font-semibold">everyday 🙃</span></p>
              {/* <CollapsibleSection/> */}
              <InputData />
              <SkillsInputSection />
              <ExperienceInputData />
              <EducationInputData />
              <ProjectInput />
              {/* <AdditionalSection /> */}
              <ExtraSection />

              {/* <PDFDownloadLink document={<Jspdf />} fileName="FORM">
                {(loading) => (loading ? <button>Download</button> : <button>Loading</button>)}
              </PDFDownloadLink> */}

            </div>
            <Resume />
          </div>
        </div>
    
  );
}

export default App;
