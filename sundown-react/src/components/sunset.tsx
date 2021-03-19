import React, { useEffect, useRef } from "react";
import "./sunset.css";

interface SunsetProps {
    timeLeft: number;
}

function Sunset({ timeLeft }: SunsetProps) {

    const sun = useRef(null);
    useEffect(() => {
        if (sun !== null && sun.current !== null) {
            sun.current.style.top = `calc(50vh - ${42}px)`;
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
