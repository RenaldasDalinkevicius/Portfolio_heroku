import React from "react";
import styled from "styled-components";
import { CarouselProvider, Slide, Slider, ButtonBack, ButtonNext, Dot } from "pure-react-carousel";
import Data from "./Data"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";

    const InfoDisplay = styled.div`
    height: 100%;
    background-color: ${props => props.theme.primary};
    width: 50%;
    @media (max-width: 630px) {
        width: 100%;
        height: 50%;
    }
    `
    const InfoTitle = styled.h2`
    margin: 1em 0 0;
    text-align: center;
    text-transform: uppercase;
    color: ${props => props.theme.name==="gradient"?null:props.theme.accent};
    background: ${props => props.theme.name==="gradient"&&props.theme.accent};
    -webkit-background-clip: ${props => props.theme.name==="gradient"&&"text"};
    -webkit-text-fill-color: ${props => props.theme.name==="gradient"&&"transparent"};
    font-weight: 900;
    @media (max-width: 630px) {
        margin: 0.5em 0;
    }
    `
    const CarouselStyled = styled(CarouselProvider)`
    display: flex;
    height: 100%;
    justify-content: space-between;
    `
    const SlideStyled = styled(Slide)`
    display: block;
    `
    const SliderStyled = styled(Slider)`
    flex: 1 1 auto;
    @media (max-width: 630px) {
        overflow-y: auto;
    }
    `
    const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    `
    const StyledDot = styled(Dot)`
    padding: 1em;
    border: none;
    margin: 0.5em;
    border-radius: 50%;
    background-color: ${props => props.theme.secondary};
    `
    const DotWrapper = styled.div`
    display: flex;
    justify-content: center;
    `
    const ButtonN = styled(ButtonNext)`
    background: none;
    border: none;
    margin: 0.25em;
    padding: 0.25em;
    height: 100%;
    align-self: center;
    font-size: 2rem;
    &: hover {
        transform: scale(1.3);
    };
    @media (max-width: 630px) {
        margin: 0;
    };
    `
    const ButtonB = styled(ButtonBack)`
    background: none;
    border: none;
    margin: 0.25em;
    padding: 0.25em;
    height: 100%;
    align-self: center;
    border: none;
    font-size: 2rem;
    &: hover {
        transform: scale(1.3);
    };
    @media (max-width: 630px) {
        margin: 0;
    };
    `
    const About = styled.p`
    margin: 1em 0;
    text-align: center;
    font-size: 1.25rem;
    color: ${props => props.theme.text};
    `
    const AboutHeader = styled.h3`
    color: ${props => props.theme.accent};
    margin: 0;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    `
    const AboutOther = styled(About)`
    `
    const FontAwesomeIcon = styled(Icon)`
    color: ${props => props.theme.name==="gradient"?props.theme.text:props.theme.accent};
    `
    const TextWrapper = styled.div`
    max-width: 500px;
    margin: 0 auto;
    @media (max-width: 630px) {
        padding: 0.5em;
    }
    `
export default function Info() {
    const InfoElement = Data.about.map(data => {
        return <SlideStyled index={data.id} key={data.id} innerClassName={"infoCarousel"}>
            <TextWrapper>
                <InfoTitle>{data.title}</InfoTitle>
                <About>{data.about}</About>
                {data.header?<AboutHeader>{data.header}</AboutHeader>:null}
                {data.aboutOther?<AboutOther>{data.aboutOther}</AboutOther>:null}
            </TextWrapper>
        </SlideStyled>
    })
    const DotElement = Data.about.map(data => {
        return <StyledDot  slide={data.id-1} key={data.id} />
    })
    return (
        <InfoDisplay>
            <CarouselStyled naturalSlideHeight={100} naturalSlideWidth={100} totalSlides={Data.about.length} infinite={true} isPlaying={false} interval={10000}>
                <ButtonB><FontAwesomeIcon icon={faAngleLeft}/></ButtonB>
                <Wrapper>
                    <SliderStyled>
                        {InfoElement}
                    </SliderStyled>
                    <DotWrapper>
                        {DotElement}
                    </DotWrapper>
                </Wrapper>
                <ButtonN><FontAwesomeIcon icon={faAngleRight}/></ButtonN>
            </CarouselStyled>
        </InfoDisplay>
    )
}