import React from "react"

export default function LinearGradient(props) {
    // Create context and pass it from App if used in multiple components
    const gradientTransform = `rotate(${props.rotation})`;
    return (
        <svg style={{ height: 0 , width: 0}}>
            <defs>
                <linearGradient id={props.idCSS} gradientTransform={gradientTransform}>
                    <stop offset="0%" stopColor={props.startColor} />
                    <stop offset="100%" stopColor={props.endColor} />
                </linearGradient>
            </defs>
        </svg>
    )
}