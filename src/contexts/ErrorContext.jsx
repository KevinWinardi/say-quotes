import { createContext, useState } from "react";

export const ErrorContext = createContext();

export function ErrorProvider({ children }) {
    const [errorMessage, setErrorMessage] = useState(null);

    function showErrorModal(message) {
        setErrorMessage(message || 'Something went wrong. Please refresh the web');
        document.getElementById('modal-error').showModal();
    }

    return (
        <ErrorContext.Provider value={{ errorMessage, showErrorModal }}>
            {children}
        </ErrorContext.Provider>
    );
}