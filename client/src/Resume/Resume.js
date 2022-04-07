import React from "react";
import styled from "styled-components"
import Data from "./Components/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

    const Div = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 50%);
    max-width: 900px;
    margin: 0 auto;
    background-color: var(--primary);
    `
    const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    margin: 1em;
    border-bottom: 5px solid var(--secondary);
    `
    const Header = styled.h2`
    text-transform: uppercase;
    letter-spacing: 0.75px;
    margin: 0 0 1em 0;
    color: var(--accent);
    `
    const Occupation = styled.h3`
    margin: 0 0 1em 0;
    color: var(--text);
    `
    const Contact = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    margin: 0 0 1em 0;
    `
    const Link = styled.a`
    margin: 0.25em 0;
    text-decoration: none;
    color: var(--text);
    &:hover {
        color: var(--accent);
    }
    `
    const Content = styled.p`
    color: var(--text);
    margin: 0;
    `
    const FlexDiv = styled.div`
    display: flex;
    margin-bottom: 1em;
    `
    const Date = styled.h3`
    margin: 0 1em 0 0;
    width: 30%;
    color: var(--accent);
    `
    const FlexContent = styled.div`
    width: 70%;
    margin: 0;
    `
    const OccupationName = styled.h3`
    margin: 0;
    color: var(--accent);
    `
    const OccupationTitle = styled.h4`
    margin: 0;
    color: var(--text);
    `
    const SpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
    `

export default function Resume() {
    return (
        <Div>
            <Wrapper>
                <Header>{Data.data.info.name}</Header>
                <Occupation>{Data.data.info.occupation}</Occupation>
                <Contact>
                    <Link href={Data.data.info.mail}><FontAwesomeIcon icon={faEnvelope}/>{Data.data.info.mail}</Link>
                    <Link href={Data.data.info.github}><FontAwesomeIcon icon={faGithub}/>{Data.data.info.github}</Link>
                </Contact>
            </Wrapper>
            <Wrapper>
                <Header>{Data.data.workexperience.title}</Header>
                <FlexDiv>
                    <Date>{Data.data.workexperience.HVIKT.date}</Date>
                    <FlexContent>
                        <OccupationName>{Data.data.workexperience.HVIKT.name}</OccupationName>
                        <OccupationTitle>{Data.data.workexperience.HVIKT.worktitle}</OccupationTitle>
                        <Content>{Data.data.workexperience.HVIKT.content}</Content>
                    </FlexContent>
                </FlexDiv>
            </Wrapper>
            <Wrapper>
                <Header>{Data.data.keyqualifications.title}</Header>
                <Content>{Data.data.keyqualifications.content}</Content>
            </Wrapper>
            <Wrapper>
                <Header>{Data.data.education.title}</Header>
                <FlexDiv>
                    <Date>{Data.data.education.intern.date}</Date>
                    <FlexContent>
                        <OccupationName>{Data.data.education.intern.title}</OccupationName>
                        <Content>{Data.data.education.intern.education}</Content>
                    </FlexContent>
                </FlexDiv>
                <FlexDiv>
                    <Date>{Data.data.education.VG2.date}</Date>
                    <FlexContent>
                        <OccupationName>{Data.data.education.VG2.title}</OccupationName>
                        <Content>{Data.data.education.VG2.education}</Content>
                    </FlexContent>
                </FlexDiv>
                <FlexDiv>
                    <Date>{Data.data.education.VG1.date}</Date>
                    <FlexContent>
                        <OccupationName>{Data.data.education.VG1.title}</OccupationName>
                        <Content>{Data.data.education.VG1.education}</Content>
                    </FlexContent>
                </FlexDiv>
            </Wrapper>
            <Wrapper>
                <Header>{Data.data.other.title}</Header>
                <Content>{Data.data.other.content}</Content>
            </Wrapper>
            <Wrapper>
                <Header>{Data.data.language.title}</Header>
                <SpaceBetween>
                    <OccupationName>{Data.data.language.Lithuanian.title}</OccupationName>
                    <Content>{Data.data.language.Lithuanian.content}</Content>
                </SpaceBetween>
                <SpaceBetween>
                    <OccupationName>{Data.data.language.Norwegian.title}</OccupationName>
                    <Content>{Data.data.language.Norwegian.content}</Content>
                </SpaceBetween>
                <SpaceBetween>
                    <OccupationName>{Data.data.language.English.title}</OccupationName>
                    <Content>{Data.data.language.English.content}</Content>
                </SpaceBetween>
            </Wrapper>
        </Div>
    )
}