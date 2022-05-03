import React, {useState,useEffect, createContext} from "react"
import Main from "./Main/Main"
import Projects from "./Projects/Projects"
import GlobalStyle from "./theme/globalStyle"
import styled, {ThemeProvider} from "styled-components"
import {Themes} from "./theme/Themes"
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import NavBar from "./Components/NavBar"
import Footer from "./Components/Footer"
import {nanoid} from "nanoid"
import LoginForm from "./Login/LoginForm"
import RegisterForm from "./Login/RegisterForm"
import NewProjectForm from "./Projects/NewProjectForm"

    const MainDiv = styled.main`
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.text};
    `
    const Theme = styled.li`
    padding: .50em .25em;
    &: hover {
        color: ${props => props.theme.primary};
        background-color: ${props => props.theme.text};
    }
    `
export const UserContext = createContext()
export default function App() {
    const [currentTheme, setCurrentTheme] = useState(() => {
        const saved = localStorage.getItem("theme")
        const initialValue = JSON.parse(saved)
        return initialValue || Themes[2]
    })
    const ThemeArr = Themes.map(theme => {
        return <Theme onClick={() => setCurrentTheme(theme)} key={nanoid()}>{theme.name}</Theme>
    })
    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(currentTheme))
    }, [currentTheme])
    return (
        <ThemeProvider theme={currentTheme}>
            <UserContext.Provider value={currentTheme}>
                <MainDiv>
                    <GlobalStyle/>
                    <Router>
                        <NavBar themes={ThemeArr}/>
                        <Routes>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/projects/new" element={<NewProjectForm/>}/>
                            <Route path="/projects/*" element={<Projects/>}/>
                            <Route path="/login" element={<LoginForm/>}/>
                            <Route path="/register" element={<RegisterForm/>}/>
                            <Route path="*" element={<Navigate to="/" replace/>}/>
                        </Routes>
                        <Footer/>
                    </Router>
                </MainDiv>
            </UserContext.Provider>
        </ThemeProvider>
    )
}