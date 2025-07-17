import { useContext, useEffect, useRef, useState } from 'react';

import QuoteCard from './components/QuoteCard';
import ErrorModal from './components/ErrorModal';
import SettingModal from './components/SettingModal';
import ShareDownloadButton from './components/ShareDownloadButton';
import HideSettingButton from './components/HideSettingButton';

import quotes from './assets/data/quotes.json';
import { BackgroundContext } from './contexts/BackgroundContext';
import { ErrorContext } from './contexts/ErrorContext';
import { ControlVisibleContext } from './contexts/ControlVisibleContext';

export default function App() {
    const didInit = useRef(false);
    const mainContent = useRef(null);

    const [quote, setQuote] = useState(null);
    const [author, setAuthor] = useState(null);

    const { showErrorModal } = useContext(ErrorContext);
    const { backgroundType, base64Image } = useContext(BackgroundContext);
    const { isControlVisible } = useContext(ControlVisibleContext);

    useEffect(() => {
        if (!didInit.current) {
            didInit.current = true;
            getQuote();
        }
    }, [])

    async function getQuote() {
        try {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const selected = quotes[randomIndex];
            setQuote(selected.quote);
            setAuthor(selected.author);
        } catch (e) {
            showErrorModal(e.message);
        }
    }

    return (
        <>
            <div
                ref={mainContent}
                className={`mx-auto min-h-screen flex flex-col justify-center items-center ${!base64Image && 'bg-primary-content'}`}
                style={{
                    backgroundImage: backgroundType !== 'theme' ? `url(${base64Image})` : 'none',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            >
                <QuoteCard quote={quote} author={author} changeQuote={getQuote} ></QuoteCard>
                {
                    isControlVisible && (
                        <>
                            <button title="Next quote" id="next-btn" className="btn btn-success w-4/5 sm:w-96 mt-4 py-6" onClick={getQuote}>Next <i className="fa fa-forward"></i></button>
                            <HideSettingButton></HideSettingButton>
                            <ShareDownloadButton mainContent={mainContent}></ShareDownloadButton>
                        </>
                    )
                }
            </div>
            <SettingModal></SettingModal>
            <ErrorModal></ErrorModal>
        </>
    );
}