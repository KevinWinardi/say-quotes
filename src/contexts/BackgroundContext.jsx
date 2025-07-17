import { createContext, useEffect, useState } from "react";

export const BackgroundContext = createContext();

export function BackgroundProvider({ children }) {
    const [backgroundType, setBackgroundType] = useState(() => {
        return localStorage.getItem('backgroundType') || 'theme';
    });
    const [base64Image, setBase64Image] = useState(() => {
        if (backgroundType != 'theme') {
            return localStorage.getItem('base64Image') || null;
        }
        return null;
    });

    useEffect(() => {
        localStorage.setItem('backgroundType', backgroundType);
        if (backgroundType == 'theme') {
            localStorage.removeItem('base64Image');
        }
    }, [backgroundType]);

    useEffect(() => {
        if(base64Image==null){
            localStorage.removeItem('base64Image')
        } else {
            localStorage.setItem('base64Image', base64Image)
        }
    }, [base64Image]);

    return (
        <BackgroundContext.Provider value={{ backgroundType, setBackgroundType, base64Image, setBase64Image }}>
            {children}
        </BackgroundContext.Provider>
    );
}