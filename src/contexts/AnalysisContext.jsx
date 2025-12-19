import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AnalysisContext = createContext(null);

// Storage key for sessionStorage
const STORAGE_KEY = 'takweol_analysis';

export function AnalysisProvider({ children }) {
    // Initialize state from sessionStorage if available
    const [analysis, setAnalysis] = useState(() => {
        try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                console.log('AnalysisContext - Restored from sessionStorage:', parsed?.primaryCase?.name);
                return parsed;
            }
        } catch (e) {
            console.warn('Failed to parse stored analysis:', e);
        }
        return null;
    });

    // Save to sessionStorage whenever analysis changes
    useEffect(() => {
        if (analysis) {
            try {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(analysis));
                console.log('AnalysisContext - Saved to sessionStorage:', analysis?.primaryCase?.name);
            } catch (e) {
                console.warn('Failed to save analysis to sessionStorage:', e);
            }
        }
    }, [analysis]);

    const updateAnalysis = useCallback((newAnalysis) => {
        console.log('AnalysisContext - Setting new analysis:', newAnalysis?.primaryCase?.name);
        setAnalysis(newAnalysis);
    }, []);

    const clearAnalysis = useCallback(() => {
        sessionStorage.removeItem(STORAGE_KEY);
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
