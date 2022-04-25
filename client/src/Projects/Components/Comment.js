import React, {useState, useEffect} from "react"
import styled from "styled-components"
import axios from "axios"
import {nanoid} from "nanoid"
import AddComment from "./AddComment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

    const Div = styled.div`
    background-color: ${props => props.theme.primary};
    border: ${props => props.theme.name==="gradient"?"3px solid":`3px solid ${props.theme.accent}`};
    border-image: ${props => props.theme.name==="gradient"&&props.theme.accent} 1;
    margin: 0.5em 0;

    `
    const Name = styled.h3`
    color: ${props => props.theme.text};
    font-size: 1rem;
    margin: 0 auto 0 0;
    font-weight: 600;
    word-wrap: anywhere;
    `
    const CommentText = styled.p`
    padding: 1em;
    margin: 0;
    resize: none;
    height: 100px;
    font-size: 1rem;
    font-weight: 300;
    color: ${props => props.theme.text};
    word-wrap: anywhere;
    overflow: auto;
    `
    const MainDiv = styled.div`
    width: 80%;
    margin: 0 auto;
    `
    const Wrapper = styled.div`
    padding: 1em 0;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid ${props => props.theme.text};
    margin: 0 1em;
    `
    const Time = styled.p`
    color: ${props => props.theme.text};
    margin: 0;
    font-size: 1rem;
    `
    const Delete = styled(FontAwesomeIcon)`
    color: ${props => props.theme.text};
    font-size: 1rem;
    margin: 0 0 0 1em;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
    `

export default function Comment(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    const [data, setData] = useState()
    useEffect(() => {
        if (update) {
            (axios.get(`/record/getcomment/${props.id}`).then((res) => {
                setData(res.data.comments)
                setIsLoading(false)
                setUpdate(false)
            }))  
        }
    }, [update])
    useEffect(() => {
        setUpdate(true)
    }, [])
    const CommentArr = !isLoading?props.isComments&&data.map(data => {return <Div key={nanoid()}>
        <Wrapper>
            <Name>{`${data.name} :`}</Name>
            <Time>{data.date}</Time>
            <Delete icon={faTrash} onClick={() => {
                (axios.post(`/record/deleteComment/${data._id}`, {
                    project: props.id,
                }).catch((err) => console.log(err)))
                setUpdate(true)
            }}/>
        </Wrapper>
        <CommentText>{data.comment}</CommentText>
        </Div>
    }):"Loading"
    return (
        <MainDiv>
            <AddComment id={props.id} update={setUpdate}/>
            {CommentArr}
        </MainDiv>
    )
}