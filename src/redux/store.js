import { configureStore } from '@reduxjs/toolkit';
import resumeData from './slices/resumeData';
import experienceSlice from './slices/experienceSlice';
import educationSlice from './slices/educationSlice';
import projectSlice from './slices/projectSlice';

export default configureStore({
  reducer: {
    resumeData: resumeData,
    experienceSlice: experienceSlice,
    educationSlice: educationSlice,
    projectSlice: projectSlice,
  },
});