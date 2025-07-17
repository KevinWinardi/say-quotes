import * as htmlToImage from 'html-to-image';
import { useContext } from 'react';
import { ControlVisibleContext } from '../contexts/ControlVisibleContext';
import { ErrorContext } from '../contexts/ErrorContext';

export default function ShareDownloadButton({ mainContent }) {
    const { setIsControlVisible } = useContext(ControlVisibleContext);
    const { showErrorModal} = useContext(ErrorContext);

    async function shareQuote() {
        try {
            setIsControlVisible(false);
            const blob = await htmlToImage.toBlob(mainContent.current)
            const filesArray = [
                new File(
                    [blob],
                    'Quotes.png',
                    {
                        type: blob.type,
                        lastModified: new Date().getTime()
                    }
                )
            ];

            const shareData = {
                files: filesArray
            };

            if (navigator.share) {
                navigator.share(shareData);
            } else {
                showErrorModal('Browser not support navigator.share');
            }
        } catch (error) {
            showErrorModal(error.message);
        } finally {
            setIsControlVisible(true);
        }
    }

    async function downloadQuote() {
        try {
            setIsControlVisible(false);
            const dataUrl = await htmlToImage.toPng(mainContent.current);
            const link = document.createElement('a');
            link.download = 'quote.png';
            link.href = dataUrl;
            link.click();
        } catch (error) {
            showErrorModal(error.message);
        } finally {
            setIsControlVisible(true);
        }
    }

    return (
        <div className="absolute bottom-4 right-4 flex gap-4">
            <button title="Share" id="share-btn" className="btn btn-circle btn-xl btn-secondary" onClick={shareQuote}><i className="fa fa-share-nodes"></i></button>
            <button title="Download" id="download-btn" className="btn btn-circle btn-xl btn-secondary" onClick={downloadQuote}><i className="fa fa-download"></i></button>
        </div>
    );
}