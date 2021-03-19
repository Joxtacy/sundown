import React, { useEffect, useRef } from "react";
import "./sunset.css";

interface SunsetProps {
    timeLeft: number;
}

function Sunset({ timeLeft }: SunsetProps) {
    const maxTimeDiff = 1000 * 60 * 60 * 24; // Max millis in 24 hours
    // maybe start the moving of the sun with a couple of hours left only

    let sun = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (sun !== null && sun.current !== null) {
            sun.current.style.top = `calc(50vh - (50vh * ${timeLeft/maxTimeDiff}))`;
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
