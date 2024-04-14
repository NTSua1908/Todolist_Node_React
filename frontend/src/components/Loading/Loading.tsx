import React from "react";
import "./loading.css";

interface LoadingProps {
    fullScreen?: boolean;
}

function Loading({ fullScreen }: LoadingProps) {
    return (
        <div className={`loading ${fullScreen ? "fullScreen" : ""}`}>
            <div className='loading-container'>
                <div className='loading-wave'></div>
                <div className='loading-wave'></div>
                <div className='loading-wave'></div>
                <div className='loading-wave'></div>
                <div className='loading-wave'></div>
                <div className='loading-wave'></div>
                <div className='loading-wave'></div>
                <div className='loading-wave'></div>
                <div className='loading-wave'></div>
                <div className='loading-wave'></div>
            </div>
        </div>
    );
}

export default Loading;
