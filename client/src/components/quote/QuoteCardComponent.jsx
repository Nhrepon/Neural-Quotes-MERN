import React, {useRef} from 'react';
import {toPng} from "html-to-image";

const QuoteCardComponent = ({data}) => {
    const cardRef = useRef();
    const downloadImage = () => {
        if (cardRef.current) {
            toPng(cardRef.current, { cacheBust: true })
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = "quote-card.png";
                    link.click();
                })
                .catch((err) => {
                    console.error("Error generating image:", err);
                });
            document.getElementById(data._id).classList.add("d-none");
        }
    };
    return (
        <div className="card shadow w-100 my-2" ref={cardRef}>
            <div className="card-body d-flex flex-column justify-content-center">
                <h2 className="fs-4 card-title">"{data.quote}"</h2>
                <p className="card-text text-end">-{data.author['name']}</p>
            </div>
            <i id={data._id} className="bi bi-download position-absolute bottom-0 end-0 me-2 mb-1" onClick={downloadImage} style={{cursor: "pointer"}} title="Download"></i>
        </div>
    );
};

export default QuoteCardComponent;