import React, {useEffect} from "react"
import styled from "styled-components"
import { Formik, Form, useField, Field } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { newProject } from "../Components/stateSlices/newprojectSlice"
import { useNavigate } from "react-router-dom"

    const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    `
    const FormLabel = styled.label`
    font-size: 1rem;
    margin: 1em 1em 0 1em;
    font-weight: 600
    `
    const TextArea = styled(Field)`
    height: 100px;
    font-size: 1rem;
    font-family: inherit;
    resize: none;
    padding: 1em;
    border: none;
    width: 100%;
    outline: none;
    `
    const FormInput = styled.input`
    font-size: 1rem;
    border: none;
    padding: 1em;
    width: 100%;
    `
    const FormError = styled.h4`
    color: red;
    font-weight: 300;
    text-align: center;
    font-size: 1.rem;
    margin: 1em 1em 0 1em;
    `
    const StyledForm = styled(Form)`
    width: 100%;
    display: flex;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.text};
    justify-content: center;
    `
    const MainWrapper = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    max-width: 60%
    `
    const Header = styled.h2`
    margin: 0 0 1em 0;
    text-transform: uppercase;
    background: ${props => props.theme.name==="gradient"&&props.theme.accent};
    -webkit-background-clip: ${props => props.theme.name==="gradient"&&"text"};
    -webkit-text-fill-color: ${props => props.theme.name==="gradient"&&"transparent"};
    text-align: center;
    `
    const Submit = styled.button`
    border: 3px solid;
    padding: 1em;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    font-size: 1rem;
    margin: 1em 0;
    border-image: ${props => props.theme.name==="gradient"&&props.theme.accent} 1;
    background: ${props => props.theme.name==="gradient"?props.theme.primary:props.theme.accent};
    color: ${props => props.theme.name==="gradient"?props.theme.text:props.theme.primary};
    transition: transform 200ms ease-in-out;
    &:hover, &:focus {
        transform: scale(1.1);
    };
    `
    const Error = styled.p`
    font-size: 1.25rem;
    color: red;
    font-weight: 600;
    `

export default function NewProject() {
    const dispatch = useDispatch()
    const {status, posted, error} = useSelector(state => state.newProject)
    const TextInput = ({label, ...props}) => {
        const [field, meta] = useField(props)
        return (
            <Wrapper>
                <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
                {meta.touched && meta.error?(
                    <FormError className="error">{meta.error}</FormError>
                ): null}
                <FormInput {...field} {...props}/>
            </Wrapper>
        )
    }
    const TextAreaF = ({label, ...props}) => {
        const [field, meta] = useField(props)
        return (
            <Wrapper>
                <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
                {meta.touched && meta.error?(
                    <FormError className="error">{meta.error}</FormError>): null}
                <TextArea {...field} {...props}/>
            </Wrapper>
        )
    }
    const navigate = useNavigate()
    useEffect(() => {
        if (posted) {
            navigate("/projects")
        }
    }, [posted])
    return (
        <Formik initialValues={{title:"", text:"", github:"", live:"", img:"", about:"", aboutOther:""}}
        validationSchema={Yup.object({
            title: Yup.string()
            .max(40, ">40")
            .required("required"),
            text: Yup.string()
            .max(100, ">100")
            .required("required"),
            github: Yup.string()
            .max(100, ">100")
            .required("required")
            .url("Not valid URL"),
            live: Yup.string()
            .max(100, ">100")
            .required("required")
            .url("Not valid URL"),
            img: Yup.string()
            .required("required"),
            about: Yup.string()
            .max(400, ">400")
            .required("required"),
            aboutOther: Yup.string()
            .max(400, ">400")
        })}
        onSubmit={(values, {setSubmitting}) => {
            alert("New project posted")
            setTimeout(() => {
                dispatch(newProject(values))
            }, 400)
            setSubmitting(false)
        }}>
            <StyledForm>
                <MainWrapper>
                    <Header>New project</Header>
                    {error?<Error>{error}</Error>:null}
                    <TextInput 
                    label="Title"
                    name="title"
                    type="text"
                    placeholder="Title"/>
                    <TextInput 
                    label="Text"
                    name="text"
                    type="text"
                    placeholder="Text"/>
                    <TextInput 
                    label="Github repository"
                    name="github"
                    type="text"
                    placeholder="Github repository"/>
                    <TextInput 
                    label="Link to website"
                    name="live"
                    type="text"
                    placeholder="Link to website"/>
                    <TextInput 
                    label="Link to Image (make sure its a valid)"
                    name="img"
                    type="text"
                    placeholder="Link to image"/>
                    <TextAreaF
                    as="textarea"
                    label="About"
                    name="about"
                    placeholder="About"/>
                    <TextAreaF
                    as="textarea"
                    label="About other"
                    name="aboutOther"
                    placeholder="About other"/>
                    <Submit type="submit">{status==="loading"?"Loading...":"Submit"}</Submit>
                </MainWrapper>
            </StyledForm>
        </Formik>
    )
}