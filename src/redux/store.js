import { configureStore } from '@reduxjs/toolkit';
import resumeData from './slices/resumeData';
import experienceSlice from './slices/experienceSlice';
import educationSlice from './slices/educationSlice';
import projectSlice from './slices/projectSlice';
import extraSlice from './slices/extraSlice';
import skillsSlice from './slices/skillsSlice';

export default configureStore({
  reducer: {
    resumeData: resumeData,
    experienceSlice: experienceSlice,
    educationSlice: educationSlice,
    projectSlice: projectSlice,
    extraSlice: extraSlice,
    skillsSlice: skillsSlice,
  },
});