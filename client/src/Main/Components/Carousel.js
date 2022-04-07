import React from "react";
import styled from "styled-components";
import { CarouselProvider, Slide, Slider, Dot, Image} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css"
import Data from "../../Projects/Components/Data"
import Introduction from "./Introduction"

    const CarouselWrapper = styled.div`
    margin-bottom: 5px;
    overflow: hidden;
    z-index:1;
    `
    const Img = styled(Image)`
    background-position: center;
    filter: brightness(25%);
    height: 100vh;
    `
    const CarouselStyled = styled(CarouselProvider)`
    height: 100vh;
    `
    const SliderStyled = styled(Slider)`
    width: 100%;
    height: 100%;
    `
export default function Carousel() {
    const ImgElement = Data.data.map(data => {
        return <Slide key={data.id} index={data.id}><Img isBgImage={true} src={data.img} tag="div"></Img></Slide>
    })
    return (
        <CarouselWrapper>
            <Introduction/>
            <CarouselStyled naturalSlideHeight={100} naturalSlideWidth={100} totalSlides={Data.data.length} infinite={true} isPlaying={true} interval={10000}>
                <SliderStyled>
                    {ImgElement}
                </SliderStyled>
            </CarouselStyled>
        </CarouselWrapper>
    )
}