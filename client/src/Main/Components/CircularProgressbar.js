import React, {useState, useContext} from "react"
import { buildStyles, CircularProgressbar as ProgressBar } from "react-circular-progressbar"
import styled, {ThemeContext} from "styled-components"
import LinearGradient from "../../Components/LinearGradient"

    const Div = styled.div`
    max-width: 100px;
    max-height: 100px;
    margin: auto auto;
    &: hover {
        transform: scale(1.05);
    }
    `
    const Img = styled.img`
    height: 100%;
    width: 100%;
    object-fit: contain;
    `
export default function CircularProgressbar(props) {
    const [hover, setHover] = useState(false)
    const themeContext = useContext(ThemeContext)
    const svgGradient = <LinearGradient
    startColor={themeContext.start}
    endColor={themeContext.end}
    idCSS="gradient-linear"
    rotation={0}
   />
    return (
        <Div onClick={() => setHover(!hover)}>
            {svgGradient}
            {hover?<Img src={props.bg}/>:
            <ProgressBar value={props.value} text={`${props.roundedValue}%`} styles={buildStyles({textColor: themeContext.name==="gradient"?themeContext.text:themeContext.accent, pathColor:themeContext.name==="gradient"?"url(#gradient-linear)":themeContext.text, trailColor:themeContext.primary, pathTransition: "none"})}/>}
        </Div>
    )
}