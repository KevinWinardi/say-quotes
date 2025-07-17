import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";

export default function ErrorModal() {
    const { errorMessage } = useContext(ErrorContext);

    return (
        <dialog id="modal-error" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Error</h3>
                <p className="py-4">{errorMessage}</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-neutral">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}