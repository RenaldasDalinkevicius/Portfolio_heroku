import React, {useState, useEffect, useContext} from "react"
import styled, {ThemeContext} from "styled-components"
import { NavLink as Link } from "react-router-dom"
import { faLightbulb, faHouse, faRightToBracket, faUser} from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Spin as Hamburger} from "hamburger-react"
import { useSelector } from "react-redux"

    const NavBarDiv = styled.nav`
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.secondary};
    color: ${props => props.theme.name==="gradient"?props.theme.text:props.theme.accent};
    position: fixed;
    left: 0;
    z-index:5;
    width: ${props => props.toggle&&"20%"};
    @media (max-width: 630px) {
        width: 100%;
    }
    `
    const NavLink = styled(Link)`
    font-weight: 900;
    text-decoration: none;
    font-size: 1.5rem;
    padding: .50em .25em;
    justify-content: space-between;
    text-transform: uppercase;
    display: flex;
    &: hover, &:focus {
        color: ${props => props.theme.primary};
        background: ${props => props.theme.text};
    }
    @media (max-width: 800px) {
        font-size: 1.123rem;
    }
    `
    const ThemeChanger = styled.div`
    background: none;
    border: none;
    cursor: pointer;
    margin: 0;
    font-weight: 900;
    font-size: 1.5rem;
    text-transform: uppercase;
    font-family: inherit;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: inherit;
    `
    const FontAwesomeIconF = styled(FontAwesomeIcon)`
    font-size: 2rem;
    width: 100%;
    max-width: 35px;
    `
    const ThemeUl = styled.ul`
    list-style: none;
    padding: 0;
    width: 100%;
    ${props => props.toggled?"flex-direction: column;":"display: none;"};
    margin: 0;
    `
    const ThemeToggler = styled.div`
    width: 100%;
    display: flex;
    padding: .50em .25em;
    justify-content: space-between;
    font-size: 1.5rem;
    border-bottom: 3px solid;
    border-image: ${props => props.theme.accent} 1;
    &: hover {
        color: ${props => props.theme.primary};
        background-color: ${props => props.theme.text};
    }
    @media (max-width: 800px) {
        font-size: 1.123rem;
    }
    `
    const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 630px) {
        display: ${props => props.toggle?"flex":"none"};
    }
    `
export default function NavBar(props) {
    const themeContext = useContext(ThemeContext)
    const [navBar, setNavBar] = useState(false)
    const [themeChanger, setThemeChanger] = useState(false)
    const { loggedInUser } = useSelector(state => state.login)
    useEffect(() => {
        if (themeChanger) {
            setNavBar(true)
        }
    }, [themeChanger])
    useEffect(() => {
        if (!navBar) {
            setThemeChanger(false)
        }
    }, [navBar])
    return (
        <NavBarDiv toggle={navBar}>
            <Hamburger toggled={navBar} toggle={setNavBar} color={themeContext.name==="gradient"?themeContext.text:themeContext.accent}/>
            <Wrapper toggle={navBar}>
                <NavLink to="/"><FontAwesomeIconF icon={faHouse}/>{navBar&&"main"}</NavLink>
                <NavLink to="/projects"><FontAwesomeIconF icon={faGithub}/>{navBar&&"Projects"}</NavLink>
                {loggedInUser?<NavLink to="/login"><FontAwesomeIconF icon={faRightToBracket}/>{navBar&&"Login"}</NavLink>:<NavLink to="/projects"><FontAwesomeIconF icon={faUser}/>{navBar&&`${loggedInUser.firstName}`}</NavLink>}
                <ThemeChanger>
                    <ThemeToggler onClick={() => setThemeChanger(themeChanger?false:true)}>
                        <FontAwesomeIconF icon={faLightbulb}/>{navBar&&"Theme"}
                    </ThemeToggler>
                    <ThemeUl toggled={themeChanger}>
                        {props.themes}
                    </ThemeUl>
                </ThemeChanger>
            </Wrapper>
        </NavBarDiv>
    )
}
//<NavLink to="resume"><FontAwesomeIconF icon={faFile}/>{navBar&&"Resume"}</NavLink>