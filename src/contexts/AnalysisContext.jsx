import React, { createContext, useContext, useState, useCallback } from 'react';

const AnalysisContext = createContext(null);

export function AnalysisProvider({ children }) {
    const [analysis, setAnalysis] = useState(null);

    const updateAnalysis = useCallback((newAnalysis) => {
        console.log('AnalysisContext - Setting new analysis:', newAnalysis);
        setAnalysis(newAnalysis);
    }, []);

    const clearAnalysis = useCallback(() => {
        setAnalysis(null);
    }, []);

    return (
        <AnalysisContext.Provider value={{ analysis, updateAnalysis, clearAnalysis }}>
            {children}
        </AnalysisContext.Provider>
    );
}

export function useAnalysis() {
    const context = useContext(AnalysisContext);
    if (!context) {
        throw new Error('useAnalysis must be used within an AnalysisProvider');
    }
    return context;
}

export default AnalysisContext;
