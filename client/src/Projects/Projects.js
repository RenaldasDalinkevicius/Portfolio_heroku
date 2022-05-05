import axios from "axios"
import React, {useEffect, useState} from "react"
import styled from "styled-components"
import Project from "./Components/Project"
import { Route, Routes, useNavigate} from "react-router-dom"
import Comment from "./Components/Comment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

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
    padding: 48px 1em 1em 1em;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    `
    const Exit = styled(FontAwesomeIcon)`
    cursor: pointer;
    width: 32px;
    height: 32px;
    padding: 4px;
    color: ${props => props.theme.name==="light"?`${props.theme.primary}`:`${props.theme.text}`};
    `
    const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    right: 0;
    margin-top: 48px;
    `
    const Loading = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    `
    const LoadingText = styled.h1`
    background: ${props => props.theme.name==="gradient"&&props.theme.accent};
    -webkit-background-clip: ${props => props.theme.name==="gradient"&&"text"};
    -webkit-text-fill-color: ${props => props.theme.name==="gradient"&&"transparent"};
    margin: 0;
    font-size: 5rem;
    @media (max-width: 400px) {
        2rem;
    }
    `
    const Header = styled.h2`
    display: ${props => props.loading==="true"&&"none"};
    margin: 1em 0;
    text-align: center;
    background: ${props => props.theme.name==="gradient"&&props.theme.accent};
    -webkit-background-clip: ${props => props.theme.name==="gradient"&&"text"};
    -webkit-text-fill-color: ${props => props.theme.name==="gradient"&&"transparent"};
    grid-column: 1/-1;
    text-transform: uppercase;
    color: ${props => props.theme.name==="gradient"?null:props.theme.accent};
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
    const length = (arr) => arr.length
    const ProjectElement = !isLoading?data.map(data => {
        return <Project title={data.title} text={data.text} github={data.github} live={data.live} key={data._id} img={data.img} link={data._id} length={length(data.comments)}/>
    }):<Loading><LoadingText>Loading...</LoadingText></Loading>
    const RouteElement = !isLoading&&data.map(data => {
        return <Route path={`${data._id}`} key={data._id} element={<ProjectFixed><Wrapper><Exit icon={faX} onClick={() => routeChange()}/></Wrapper><Project title={data.title} text={data.text} img={data.img} isRoute={isRoute} about={data.about} aboutOther={data.aboutOther}/><Comment id={data._id}/></ProjectFixed>}/>
    })
    return (
        <ProjectsGrid>
            <Header loading={(isLoading.toString())}>Projects</Header>
            {ProjectElement}
            <Routes>
                {RouteElement}
            </Routes>
        </ProjectsGrid>
    )
}