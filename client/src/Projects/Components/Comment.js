import React, {useState, useEffect} from "react"
import styled from "styled-components"
import axios from "axios"
import {nanoid} from "nanoid"
import AddComment from "./AddComment"

    const Div = styled.div`
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.text};
    `
    const Name = styled.h2`
    margin: 0.5em 0;
    font-size: 2rem;
    font-weight: 600;
    `
    const CommentText = styled.p`
    margin: 0.5em 0;
    font-size: 1rem;
    font-weight: 300;
    `
    const MainDiv = styled.div`
    width: 80%;
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
    const CommentArr = !isLoading?data.map(data => {return <Div key={nanoid()}>
        <Name>{data.name}</Name>
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