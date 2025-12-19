import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // User's problem description
    problemDescription: '',
    attachments: [],

    // AI Classification result
    classification: null, // { category: 'labor' | 'civil' | 'criminal' | 'tax' | 'psychology', confidence: number, summary: string }

    // Selected expert
    selectedExpert: null,

    // Similar cases
    similarCases: [],

    // UI State
    isClassifying: false,
    currentStep: 1, // 1: Landing, 2: Classification, 3: Expert Selection
};

const consultationSlice = createSlice({
    name: 'consultation',
    initialState,
    reducers: {
        setProblemDescription: (state, action) => {
            state.problemDescription = action.payload;
        },
        addAttachment: (state, action) => {
            state.attachments.push(action.payload);
        },
        removeAttachment: (state, action) => {
            state.attachments = state.attachments.filter((_, index) => index !== action.payload);
        },
        setClassifying: (state, action) => {
            state.isClassifying = action.payload;
        },
        setClassification: (state, action) => {
            state.classification = action.payload;
            state.isClassifying = false;
        },
        setSimilarCases: (state, action) => {
            state.similarCases = action.payload;
        },
        setSelectedExpert: (state, action) => {
            state.selectedExpert = action.payload;
        },
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
        resetConsultation: () => initialState,
    },
});

export const {
    setProblemDescription,
    addAttachment,
    removeAttachment,
    setClassifying,
    setClassification,
    setSimilarCases,
    setSelectedExpert,
    setCurrentStep,
    resetConsultation,
} = consultationSlice.actions;

export default consultationSlice.reducer;
