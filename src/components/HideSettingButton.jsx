import { useContext } from "react";
import { ControlVisibleContext } from "../contexts/ControlVisibleContext";

export default function HideSettingButton() {
    const { setIsControlVisible } = useContext(ControlVisibleContext);

    function handleControlVisible(event) {
        event.stopPropagation();
        setIsControlVisible(false);

        function clickWindow() {
            setIsControlVisible(true);
            window.removeEventListener('click', clickWindow);
        }
        window.addEventListener('click', clickWindow);
    }

    return (
        <div className="absolute top-4 right-4 flex gap-4">
            <button title="Hide Control Button" id='hide-btn' className="btn btn-neutral" onClick={(event) => handleControlVisible(event)}>
                <i className="fa fa-eye-slash"></i>
            </button>
            <button title="Setting" id='setting-btn' className="btn btn-neutral" onClick={() => document.getElementById('modal-setting').showModal()}>
                <i className="fa fa-gear"></i>
            </button>
        </div>
    );
}