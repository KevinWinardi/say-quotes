import { createContext, useState } from "react";

export const ControlVisibleContext = createContext();

export function ControlVisibleProvider({ children }) {
    const [isControlVisible, setIsControlVisible] = useState(true);

    return (
        <ControlVisibleContext.Provider value={{ isControlVisible, setIsControlVisible }}>
            {children}
        </ControlVisibleContext.Provider>
    );
}