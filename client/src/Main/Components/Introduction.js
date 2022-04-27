import React from "react"
import styled from "styled-components"
import CV from "../../Pdf/RenaldasCV.pdf"

    const IntroductionDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 2;
    padding: 0.5em;
    `
    const IntroductionTextDiv = styled.div`
    align-self: center;
    margin: 0 auto;
    `
    const IntrodunctionHeader = styled.h1`
    color: ${props => props.theme.name==="gradient"?null:props.theme.name==="light"?props.theme.primary:props.theme.accent};
    background: ${props => props.theme.name==="gradient"&&props.theme.accent};
    -webkit-background-clip: ${props => props.theme.name==="gradient"&&"text"};
    -webkit-text-fill-color: ${props => props.theme.name==="gradient"&&"transparent"};
    margin: 0;
    `
    const IntroductionText = styled.p`
    font-weight: 600;
    margin: 1em 0 0 0;
    color: ${props => props.theme.name==="light"?props.theme.secondary:props.theme.text};
    `
    const CvButton = styled.button`
    background: ${props => props.theme.accent};
    color: ${props => props.theme.secondary};
    border: none;
    border-radius: 5px;
    font-size: 1.25rem;
    padding: 0.5em;
    margin: 1em 0 0;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    transition: transform 200ms ease-in-out;
    &: hover {
        transform: scale(1.1);
    }
    `

export default function Introduction() {
    return (
        <IntroductionDiv>
            <IntroductionTextDiv>
                <IntrodunctionHeader>Hi. My name is Renaldas</IntrodunctionHeader>
                <IntroductionText>And this is my portfolio</IntroductionText>
                <CvButton onClick={() => window.open(CV, "_blank")} >CV download</CvButton>
            </IntroductionTextDiv>
    </IntroductionDiv>
    )
}