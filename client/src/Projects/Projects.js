import React, {useState} from "react";
import styled from "styled-components";
import Data from "./Components/Data"
import Project from "./Components/Project"
import { Route, Routes, useNavigate} from "react-router-dom";

    const ProjectsGrid = styled.div`
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.text};
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
    grid-gap: 1em;
    justify-content: center;
    `
    const ProjectFixed = styled.div`
    position: fixed;
    padding: 1em;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    overflow: auto;
    `

export default function Projects() {
    const [isRoute, setIsRoute] = useState(true)
    let navigate = useNavigate()
    const routeChange=() => {
        let path = "/projects"
        navigate(path)
    }
    const ProjectElement = Data.data.map(data => {
        return <Project title={data.title} text={data.text} github={data.github} live={data.live} key={data.id} img={data.img} link={data.id}/>
    })
    const RouteElement = Data.data.map(data => {
        return <Route path={`${data.id}`} key={data.id} element={<ProjectFixed onClick={routeChange}><Project title={data.title} text={data.text} img={data.img} isRoute={isRoute} about={data.about} aboutOther={data.aboutOther}/></ProjectFixed>}/>
    })
    return (
        <ProjectsGrid>
            {ProjectElement}
            <Routes>
                {RouteElement}
            </Routes>
        </ProjectsGrid>
    )
}