import { createSlice } from '@reduxjs/toolkit'

export const resumeData = createSlice({
    initialState:{
        firstname:"firstname",
        lastname:"lastname",
        email:"youremail@email.com",
        number: 1234567890,
        linkedin:"",
        website:"",
        intro:"I am a front-end developer with more than 3 years of experience writing html, css, and js. I'm motivated, result-focused and seeking a successful team-oriented company with opportunity to grow.",
    },
    name:"resumeData",
    reducers: {
        updateFirstName: (state, action) => {
            state.firstname = action.payload;
        },
        updateLastName: (state, action) => {
            state.lastname = action.payload;
        },
        updateEmail: (state, action) => {
            state.email = action.payload;
        },
        updateNumber: (state, action) => {
            state.number = action.payload;
        },
        updateLinkedin: (state, action) => {
            state.linkedin = action.payload;
        },
        updateWebsite: (state, action) => {
            state.website = action.payload;
        },
        updateIntro: (state, action) => {
            state.intro = action.payload;
        },
    },
});

export const { updateFirstName, updateLastName, updateEmail, updateNumber, updateLinkedin, updateWebsite, updateIntro } = resumeData.actions;
export default resumeData.reducer;