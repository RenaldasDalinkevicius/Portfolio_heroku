import axios from "axios"
import React, {useEffect, useState} from "react"
import styled from "styled-components"
import Project from "./Components/Project"
import { Route, Routes, useNavigate} from "react-router-dom"
import Comment from "./Components/Comment"

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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    `

export default function Projects() {
    const [isRoute, setIsRoute] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    useEffect(() => {
        (axios.get("/record").then((res) => {
            setData(res.data)
            setIsLoading(false)
        }))
    }, [])
    let navigate = useNavigate()
    const routeChange=() => {
        let path = "/projects"
        navigate(path)
    }
    const ProjectElement = !isLoading?data.map(data => {
        return <Project title={data.title} text={data.text} github={data.github} live={data.live} key={data._id} img={data.img} link={data._id}/>
    }):"Loading"
    const RouteElement = !isLoading&&data.map(data => {
        return <Route path={`${data._id}`} key={data._id} element={<ProjectFixed><Project title={data.title} text={data.text} img={data.img} isRoute={isRoute} about={data.about} aboutOther={data.aboutOther}/>{data.comments&&<Comment id={data._id}/>
        }</ProjectFixed>}/>
    })
    // New component to make comment, add in RouteElement
    // so that it gets rendered for each project
    return (
        <ProjectsGrid>
            {ProjectElement}
            <Routes>
                {RouteElement}
            </Routes>
        </ProjectsGrid>
    )
}