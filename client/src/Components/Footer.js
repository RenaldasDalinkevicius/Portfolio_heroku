import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHouse } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

    const FooterContent = styled.footer`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    background: ${props => props.theme.accent};
    margin-top: 2em;
    color: ${props => props.theme.primary};
    width: 100%;
    `
    const FooterHeader = styled.h3`
    font-weight: 600;
    margin: 0.5em 0 0 0;
    `
    const FooterText = styled.p`
    font-weight: 600;
    margin: 0.5em 0;
    `
    const FooterSocials = styled.ul`
    display: flex;
    margin: 0;
    list-style: none;
    align-items: center;
    justify-content: center;
    padding: 0;
    overflow: hidden;
    `
    const FooterItem = styled.li`
    margin: 0 1em 1em;
    `
    const FooterLink = styled.a`
    font-size: 2rem;
    text-decoration: none;
    color: ${props => props.theme.secondary};
    &:hover {
        color: ${props => props.theme.primary};
    }
    `

export default function Footer() {
    const linksArr = [{id:1, icon: faGithub, link:"https://github.com/KodeRenaldas", newTab: true},{id:2, icon: faEnvelope, link:"mailto:renaldas.dalinkevicius@gmail.com", newTab: true}, {id: 3, icon: faHouse, link: "/", newTab: false}]
    const links = linksArr.map(data => {
        return <FooterItem key={data.id}><FooterLink href={data.link} target={data.newTab?"_blank":"_self"} rel="noopener noreferrers"><FontAwesomeIcon icon={data.icon}/></FooterLink></FooterItem>
    })
    return (
        <FooterContent>
            <FooterHeader>PORTFOLIO</FooterHeader>
            <FooterText>This is my portfolio website, to check out my Github, click on the Github icon below</FooterText>
            <FooterSocials>
                {links}
            </FooterSocials>
        </FooterContent>
    )
}