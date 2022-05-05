import React, {useState, useEffect} from "react"
import styled from "styled-components"
import axios from "axios"
import {nanoid} from "nanoid"
import AddComment from "./AddComment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faFaceFrown } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"

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
    @media (max-width: 350px) {
        margin: 0 0.5em 0;
        text-align: center;
    }
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
    border-bottom: 1px solid;
    border-image: ${props => props.theme.accent} 1;
    margin: 0 1em;
    @media (max-width: 350px) {
        flex-direction: column;
    }
    `
    const Time = styled.p`
    color: ${props => props.theme.text};
    margin: 0;
    font-size: 1rem;
    @media (max-width: 350px) {
        text-align: center;
        margin: 0 0 0.5em 0;
    }
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
    const Empty = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 1em 0 0 0;
    font-size: 1.25rem;
    `
    const EmptyText = styled.p`
    margin: 1em 0 0 0;
    font-size: 1.25rem;
    text-align: center;
    color: ${props => props.theme.name==="light"?props.theme.primary:props.theme.text};
    `
    const EmptyIcon = styled(FontAwesomeIcon)`
    color: ${props => props.theme.name==="light"?props.theme.primary:props.theme.text};
    font-size: 1.25rem;
    `

export default function Comment(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    const [data, setData] = useState()
    const { loggedInUser } = useSelector(state => state.login)
    useEffect(async () => {
        if (update) {
            await (axios.get(`/record/getcomment/${props.id}`).then((res) => {
                setData(res.data.comments)
                setIsLoading(false)
                setUpdate(false)
            }))  
        }
    }, [update])
    useEffect(() => {
        setUpdate(true)
    }, [])
    const length = (arr) => arr.length
    const CommentArr = !isLoading?!length(data)<=0?data.map(data => {return <Div key={nanoid()}>
        <Wrapper>
            <Name>{`${data.name} :`}</Name>
            <Time>{data.date}</Time>
            {loggedInUser&&loggedInUser.email===data.email||loggedInUser&&loggedInUser.isAdmin?<Delete icon={faTrash} onClick={() => {
                (axios.post(`/record/deleteComment/${data._id}`, {
                    project: props.id,
                }).catch((err) => console.log(err)))
                setUpdate(true)
            }}/>:null}
        </Wrapper>
        <CommentText>{data.comment}</CommentText>
        </Div>
    }):<Empty><EmptyIcon icon={faFaceFrown}/><EmptyText>The are no comments</EmptyText></Empty>:"Loading..."
    return (
        <MainDiv>
            {loggedInUser&&<AddComment id={props.id} update={setUpdate}/>}
            {CommentArr}
        </MainDiv>
    )
}