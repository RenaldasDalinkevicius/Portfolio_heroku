import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { CarouselProvider, Slide, Slider, Dot, Image} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css"
import Introduction from "./Introduction"
import axios from "axios";

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
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    useEffect(() => {
        (axios.get("/record").then((res) => {
            setData(res.data)
            setIsLoading(false)
        }))
    }, [])
    const ImgElement = !isLoading?data.map(data => {
        return <Slide key={data._id} index={data._id}><Img isBgImage={true} src={data.img} tag="div"></Img></Slide>
    }):"Loading"
    return (
        <CarouselWrapper>
            <Introduction/>
            <CarouselStyled naturalSlideHeight={100} naturalSlideWidth={100} totalSlides={!isLoading?data.length:0} infinite={true} isPlaying={true} interval={10000}>
                <SliderStyled>
                    {ImgElement}
                </SliderStyled>
            </CarouselStyled>
        </CarouselWrapper>
    )
}