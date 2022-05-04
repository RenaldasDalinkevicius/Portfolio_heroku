import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

    const Div = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: ${props => props.theme.primary};
    `
    const Header = styled.h1`
    text-transform: uppercase;
    background: ${props => props.theme.name==="gradient"&&props.theme.accent};
    -webkit-background-clip: ${props => props.theme.name==="gradient"&&"text"};
    -webkit-text-fill-color: ${props => props.theme.name==="gradient"&&"transparent"};
    margin:0;
    font-weight: 900;
    font-size: 5rem;
    `
    const Text = styled.p`
    font-size: 1.25rem;
    color: ${props => props.theme.text};
    font-weight: 600;
    margin: 1em 0 0 0;
    `

export default function MissingPage() {
    const navigate = useNavigate()
    useEffect(() =>{
        setTimeout(() => {
            navigate("/")
        }, 1000)
    }, [])
    return (
        <Div>
            <Header>404</Header>
            <Text>Page missing</Text>
            <Text>Redirecting you back home</Text>
        </Div>
    )
}