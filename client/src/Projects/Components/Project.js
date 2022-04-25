import React from "react";
import styled from "styled-components";
import { NavLink} from "react-router-dom";

    const ProjectDiv = styled.div`
    max-width: ${props => props.isRoute?"80%":"500px"};
    margin: ${props => props.isRoute&&"0 auto"};
    `
    const ProjectImgContainer = styled.div`
    height: 500px;
    height: ${props => props.isRoute?"50%":"500px"};
    `
    const ProjectContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: ${props => props.isRoute&&"1em 0 0 0"};
    color: ${props => props.theme.name==="light"?props.isRoute&&props.theme.primary:props.theme.text};
    @media (max-width: 360px) {
        flex-direction: ${props => props.isRoute&&"column"};
    }
    `
    const ProjectImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: ${props => props.isRoute?"fill":"cover"};
    `
    const ProjectTextDiv = styled.div`
    display: flex;
    flex-direction: column;
    ${props => !props.isRoute&&"justify-content: center"};
    margin-right: ${props => !props.isRoute&&"1em"};
    margin-bottom: ${props => props.isRoute&&"1em"};
    ${props => props.isRoute&&`border-bottom:${props.theme.name==="gradient"?`3px solid`:`3px solid ${props.theme.accent}`}`};
    border-image: ${props => props.isRoute&&props.theme.name==="gradient"&&props.theme.accent}1;
    padding-bottom: ${props => props.isRoute&&"1em"};
    @media (min-width: 360px) {
        margin-right: ${props => props.isRoute&&"1em"};
        border-bottom: ${props => props.isRoute&&"none"};
        ${props => props.isRoute&&`border-right:${props.theme.name==="gradient"?`3px solid`:`3px solid ${props.theme.accent}`}`};
        padding-bottom: ${props => props.isRoute&&"0"};
        padding-right: ${props => props.isRoute&&"1em"};
    }
    `
    const ProjectTitle = styled.h4`
    margin: 0 0 1em 0;
    `
    const ProjectText = styled.p`
    margin: ${props => props.isRoute?"0 0 1em 0": "0"};
    `
    const ProjectLinks = styled.div`
    `
    const Link = styled.a`
    display: block;
    padding: 1em 2em;
    text-decoration: none;
    margin: 1em 0;
    border: 3px solid;
    border-image: ${props => props.theme.name==="gradient"&&props.theme.accent} 1;
    background: ${props => props.theme.name==="gradient"?props.theme.primary:props.theme.accent};
    color: ${props => props.theme.name==="gradient"?props.theme.text:props.theme.primary};
    transition: transform 200ms ease-in-out;
    font-weight: 900;
    text-align: center;
    &:hover, &:focus {
        transform: scale(1.1);
    };
    `
    const ProjectAbout = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${props => props.isRoute&&"1em"};
    `
export default function Project(props) {
        return (
        <ProjectDiv isRoute={props.isRoute}>
            <ProjectImgContainer isRoute={props.isRoute}>
                    {props.link?<NavLink to={`/projects/${props.link}`} onClick={props.changeCurrent}><ProjectImg src={props.img} alt="" isRoute={props.isRoute}/></NavLink>:<ProjectImg src={props.img} alt=""/>}
            </ProjectImgContainer>
            <ProjectContainer isRoute={props.isRoute}>
                <ProjectTextDiv isRoute={props.isRoute}>
                    <ProjectTitle>{props.title}</ProjectTitle>
                    <ProjectText>{props.text}</ProjectText>
                </ProjectTextDiv>
                {!props.isRoute?<ProjectLinks>
                    <Link href={props.github}>Github</Link>
                    <Link href={props.live}>Live</Link>
                </ProjectLinks>:<ProjectAbout isRoute={props.isRoute}><ProjectText isRoute={props.isRoute}>{props.about}</ProjectText><ProjectText>{props.aboutOther}</ProjectText></ProjectAbout>}
            </ProjectContainer>
        </ProjectDiv>
    )
}