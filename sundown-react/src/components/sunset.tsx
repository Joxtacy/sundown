import React, { useEffect, useRef } from "react";
import "./sunset.css";

interface SunsetProps {
    timeLeft: number;
}

function Sunset({ timeLeft }: SunsetProps) {
    const startMovingTime = 1000 * 60 * 60 * 2;

    let sun = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (sun !== null && sun.current !== null && timeLeft < startMovingTime) {
            // sun.current.style.top = `calc(50vh - (45vh * ${timeLeft/startMovingTime}))`;
        }
    }, [timeLeft])

    return (
        <div className={"sunset"}>
            <div ref={sun} className={"sun"}></div>
            <div className={"heaven"}></div>
            <div className={"ocean"}></div>
        </div>
    );
}

export default Sunset;
