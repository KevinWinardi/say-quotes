import { useContext, useRef } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { BackgroundContext } from "../contexts/BackgroundContext";
import { LoadingContext } from "../contexts/LoadingContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { OpacityCardContext } from "../contexts/OpacityCardContext";

export default function SettingModal() {
    const { theme, setTheme } = useContext(ThemeContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext)
    const { backgroundType, setBackgroundType, base64Image, setBase64Image } = useContext(BackgroundContext);
    const { showErrorModal } = useContext(ErrorContext);
    const { opacityCard, setOpacityCard } = useContext(OpacityCardContext);

    const themeCollapseRef = useRef();
    const backgroundCollapseRef = useRef();

    const themes = [
        'light', 'dark', 'cupcake', 'bumblebee', 'emerald',
        'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine',
        'halloween', 'garden', 'forest', 'aqua', 'lofi',
        'pastel', 'fantasy', 'wireframe', 'black', 'luxury',
        'dracula', 'cymk', 'autumn', 'business', 'acid',
        'lemonade', 'night', 'coffee', 'winter', 'dim',
        'nord', 'sunset', 'caramellatte', 'abyss', 'silk'
    ];

    // Generate array from 0-100 with step 10
    const transparentPercent = Array(11).fill(0).map((number, index) => number + 10 * index);

    function handleClose() {
        themeCollapseRef.current.checked = false;
        backgroundCollapseRef.current.checked = false;
    }

    function convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;

            reader.readAsDataURL(file);
        });
    }

    async function handleRandomBackground() {
        try {
            setIsLoading(true);
            setBase64Image(null);
            setBackgroundType('random');

            const width = window.innerWidth;
            const height = window.innerHeight;

            // Picsum images available image is 993. For safety using 950
            const randomPage = Math.floor(Math.random() * 950) + 1;
            const response = await fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=1`)
            const responseJSON = await response.json();

            const randomId = responseJSON[0].id;
            const imageUrl = `https://picsum.photos/id/${randomId}/${width}/${height}`;

            const imageResponse = await fetch(imageUrl);
            const blob = await imageResponse.blob();

            const base64 = await convertImageToBase64(blob);
            setBase64Image(base64);
        } catch (error) {
            showErrorModal(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleUploadBackground(event) {
        try {
            setIsLoading(true);
            const file = event.target.files[0];
            if (!file) return;

            const base64 = await convertImageToBase64(file);
            setBackgroundType('upload');
            setBase64Image(base64);
        } catch (error) {
            showErrorModal(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <dialog id="modal-setting" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Setting</h3>
                <div className="py-4">
                    <div className="mb-8">
                        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
                            <input type="checkbox" ref={themeCollapseRef} />
                            <div className="collapse-title font-semibold">Theme</div>
                            <div className="collapse-content text-sm">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" >
                                    {
                                        themes.map(item => (
                                            <label key={item} className="flex gap-4 cursor-pointer items-center">
                                                <input type="radio" name="theme-radios" className="radio radio-sm theme-controller" value={item} checked={item == theme}
                                                    onChange={(e) => setTheme(e.target.value)}
                                                />
                                                {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
                            <input type="checkbox" ref={backgroundCollapseRef} />
                            <div className="collapse-title font-semibold">Background</div>
                            <div className="collapse-content text-sm">
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="background-theme" className="flex gap-4 cursor-pointer items-center">
                                        <input type="radio" name="background" className="radio radio-sm" id="background-theme" checked={backgroundType == 'theme'} onChange={() => {
                                            setBackgroundType('theme');
                                            setBase64Image(null);
                                        }} />
                                        Use theme background
                                    </label>

                                    <label htmlFor="background-random" className="flex gap-4 cursor-pointer items-center">
                                        <input type="radio" name="background" className="radio radio-sm" id="background-random" checked={backgroundType == 'random'} onChange={handleRandomBackground} />
                                        Use random background
                                    </label>
                                    {backgroundType == 'random' && (
                                        !isLoading ? (
                                            <>
                                                <button className="btn" onClick={handleRandomBackground}>
                                                    <i className="fa fa-refresh"></i> Change
                                                </button>
                                                <div>
                                                    {
                                                        base64Image && <img src={base64Image} alt="Image" className="rounded" />
                                                    }
                                                </div>
                                            </>
                                        )
                                            :
                                            <button className="btn">
                                                <span className="loading loading-spinner"></span>
                                                Loading
                                            </button>
                                    )
                                    }

                                    <label htmlFor="background-image" className="flex gap-4 cursor-pointer items-center">
                                        <input type="radio" name="background" className="radio radio-sm" id="background-image" checked={backgroundType == 'upload'} onChange={() => {
                                            setBackgroundType('upload');
                                            setBase64Image(null)
                                        }} />
                                        Upload image
                                    </label>
                                    {backgroundType == 'upload' && (
                                        !isLoading ? (
                                            <>
                                                <label htmlFor="image" className="btn h-36 cursor-pointer flex flex-col items-center justify-center">
                                                    <input type="file" id="image" className="hidden" onChange={(event) => handleUploadBackground(event)} accept="image/*" />
                                                    <i className="fa-solid fa-upload text-2xl mb-2"></i>
                                                    Upload image
                                                </label>
                                                <div>
                                                    {
                                                        base64Image && <img src={base64Image} alt="Image" className="rounded" />
                                                    }
                                                </div>
                                            </>
                                        ) :
                                            <label className="btn h-36 flex flex-col items-center justify-center">
                                                <span className="loading loading-spinner"></span>
                                                Loading
                                            </label>
                                    )

                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
                            <input type="checkbox" ref={themeCollapseRef} />
                            <div className="collapse-title font-semibold">Opacity Card</div>
                            <div className="collapse-content text-sm">
                                <div className="w-full">
                                    <input type="range" min="0" max="100" value={opacityCard} className="range w-full" step="10" onChange={(event) => setOpacityCard(event.target.value)} />
                                    <div className="flex justify-between px-2.5 mt-2 text-xs">
                                        {
                                            transparentPercent.map(number => (
                                                <span key={number}>|</span>
                                            ))
                                        }
                                    </div>
                                    <div className="flex justify-between px-2.5 mt-2 text-xs">
                                        {
                                            transparentPercent.map(number => (
                                                <span key={number}>{number}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-neutral" onClick={handleClose}>Close</button>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    );
}