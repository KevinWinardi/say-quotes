import { createContext, useEffect, useState } from "react";

export const OpacityCardContext = createContext();

export function OpacityCardProvider({ children }) {
    const [opacityCard, setOpacityCard] = useState(() => {
        return localStorage.getItem('opacityCard') || 80
    });

    useEffect(() => {
        localStorage.setItem('opacityCard', opacityCard);
    }, [opacityCard])

    return (
        <OpacityCardContext.Provider value={{ opacityCard, setOpacityCard }}>
            {children}
        </OpacityCardContext.Provider>
    );
}