import React, {useState} from "react"
import styled from "styled-components"
import Data from "./Components/Data"
import Info from "./Components/Info"
import AnimatedProgressProvider from "./Components/AnimatedProgressProvider"
import CircularProgressbar from "./Components/CircularProgressbar"
import "react-circular-progressbar/dist/styles.css"
import { easeQuadIn } from "d3-ease"
import Carousel from "./Components/Carousel"
import ReactVisibilitySensor from "react-visibility-sensor"
import Contact from "../Contact/Contact"

    const MainDiv = styled.div`
    color: ${props => props.theme.text};
    `
    const InfoDiv = styled.div`
    display: flex;
    flex-direction: row;
    height: 70vh;
    @media (max-width: 630px) {
        height: 100vh;
        flex-direction: column;
    }
    `
    const InfoButtons = styled.div`
    background-color: ${props => props.theme.primary};
    display: flex;
    padding: 1em;
    overflow-y: auto;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 0;
    width: 50%;
    @media (max-width: 630px) {
        width: 100%;
        height: 50%;
    }
    `
    const InfoButton = styled.div`
    display: flex;
    margin: 0 1em;
    flex-direction: column;
    `
    const ProgressName = styled.p`
    color: ${props => props.theme.text};
    font-size: 1.25rem;
    margin: 1em 0 0 0;
    text-align: center;
    font-weight: 600;
    `
    const ProgressTitle = styled.h2`
    width: 100%;
    text-transform: uppercase;
    font-weight: 900;
    margin: 0.5em 0;
    text-align: center;
    color: ${props => props.theme.name==="gradient"?null:props.theme.accent};
    background: ${props => props.theme.name==="gradient"&&props.theme.accent};
    -webkit-background-clip: ${props => props.theme.name==="gradient"&&"text"};
    -webkit-text-fill-color: ${props => props.theme.name==="gradient"&&"transparent"};
    `
export default function Main() {
    const [isVisable, setIsVisable] = useState(false)
    const buttonsArray = Data.skills.map(data => {
        return <InfoButton key={data.id}>
                    <AnimatedProgressProvider valueStart={0} valueEnd={data.progress} duration={2} easingFunction={easeQuadIn} isVisable={isVisable}>
                        {value => {
                            const roundedValue = Math.round(value) 
                            return(<CircularProgressbar value={value} roundedValue={roundedValue} bg={data.background}/>)}}
                        </AnimatedProgressProvider>
                    <ProgressName>{data.title}</ProgressName>
                </InfoButton>
    })
    return (
        <MainDiv>
            <Carousel/>
            <InfoDiv>
                <Info/>
                <ReactVisibilitySensor partialVisibility onChange={(isVisable) => {setIsVisable(isVisable)}}>
                    <InfoButtons>
                        <ProgressTitle>Skills</ProgressTitle>
                        {buttonsArray}
                    </InfoButtons>
                </ReactVisibilitySensor>
            </InfoDiv>
            <Contact/>
        </MainDiv>
    )
}