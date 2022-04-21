import React, {useState, useEffect} from "react"
import styled from "styled-components"
import axios from "axios"
import {nanoid} from "nanoid"
import AddComment from "./AddComment"

    const Div = styled.div`
    background-color: ${props => props.theme.primary};
    `
    const Name = styled.h2`
    color: ${props => props.theme.name==="gradient"?null:props.theme.accent};
    background: ${props => props.theme.name==="gradient"&&props.theme.accent};
    -webkit-background-clip: ${props => props.theme.name==="gradient"&&"text"};
    -webkit-text-fill-color: ${props => props.theme.name==="gradient"&&"transparent"};
    margin: 0.5em 0;
    font-size: 2rem;
    font-weight: 600;
    `
    const CommentText = styled.p`
    padding: 1em;
    margin: 0;
    resize: none;
    height: 100px;
    font-size: 1rem;
    font-weight: 300;
    color: ${props => props.theme.primary};
    background-color: ${props => props.theme.text};
    `
    const MainDiv = styled.div`
    width: 80%;
    margin: 0 auto;
    `

export default function Comment(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    useEffect(() => {
        (axios.get(`/record/getcomment/${props.id}`).then((res) => {
            setData(res.data.comments)
            setIsLoading(false)
        }))
    }, [])
    const CommentArr = !isLoading?props.isComments&&data.map(data => {return <Div key={nanoid()}>
        <Name>{`${data.name} :`}</Name>
        <CommentText>{data.comment}</CommentText>
        </Div>
    }):"Loading"
    return (
        <MainDiv>
            <AddComment id={props.id}/>
            {CommentArr}
        </MainDiv>
    )
}