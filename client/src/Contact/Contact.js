import React from "react";
import styled from "styled-components";
import { Formik, useField, Form, Field} from "formik";
import * as Yup from "yup"
import axios from "axios"

    const StyledForm = styled(Form)`
    min-height: 100vh;
    background-color: ${props => props.theme.primary};
    margin-top: 2em;
    color: ${props => props.theme.text};
    `
    const FormInput = styled.input`
    padding: 0;
    font-size: 1.25rem;
    padding: 1em;
    border: none;
    width: 100%;
    font-family: inherit;
    &:focus {
        outline: none;
    }
    `
    //const FormLabel = styled.label``
    const FormError = styled.div`
    font-size: 1.25rem;
    font-family: inherit;
    color: red;
    position: absolute;
    z-index:5;
    `
    const Submit = styled.button`
    background: ${props => props.theme.accent};
    color: ${props => props.theme.primary};
    border: none;
    border-radius: 5px;
    font-size: 1.25rem;
    padding: 1em;
    margin: 0 0 1em 0;
    width: 100%;
    grid-column: 1/-1;
    transition: transform 200ms ease-in-out;
    &: hover {
        transform: scale(1.05);
    }
    `
    const TextArea = styled(Field)`
    height: 250px;
    font-size: 1.25rem;
    font-family: inherit;
    resize: none;
    padding: 1em;
    border: none;
    width: 100%;
    &:focus {
        outline: none;
    }
    `
    const MainWrapper = styled.div`
    display: grid;
    width: 50%;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    @media (max-width: 630px) {
        grid-template-columns: 1fr;
        width: 80%;
    }
    `
    const Wrapper = styled.div`
    display: flex;
    overflow: hidden;
    grid-column: ${props => props.ifEmail||props.ifAbout?"1/-1":null};
    `
    const Header = styled.h2`
    grid-column: 1/-1;
    color: ${props => props.theme.name==="gradient"?null:props.theme.accent};
    text-transform: uppercase;
    margin: 1em 0 0 0;
    text-align: center;
    background: ${props => props.theme.name==="gradient"&&props.theme.accent};
    -webkit-background-clip: ${props => props.theme.name==="gradient"&&"text"};
    -webkit-text-fill-color: ${props => props.theme.name==="gradient"&&"transparent"};
    
    `
//<FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
// Place under wrapper if need label
export default function Contact() {
    const TextInput = ({label, ...props}) => {
        const [field, meta] = useField(props)
        return (
            <Wrapper ifEmail={label==="Email"?true:false}>
                <FormInput {...field} {...props} ifEmail={label==="Email"?true:false}/>
                {meta.touched && meta.error?(
                    <FormError className="error">{meta.error}</FormError>): null}
            </Wrapper>
        )
    }
    const TextAreaF = ({label, ...props}) => {
        const [field, meta] = useField(props)
        return (
            <Wrapper ifAbout={label==="About"?true:false}>
                <TextArea {...field} {...props}/>
                {meta.touched && meta.error?(
                    <FormError className="error">{meta.error}</FormError>): null}
            </Wrapper>
        )
    }
    return (
        <Formik initialValues={{firstName:"", lastName:"", email:"", about:""}}
        validationSchema={Yup.object({
            firstName: Yup.string()
            .max(20, ">20")
            .required("*"),
            lastName: Yup.string()
            .max(20, ">20")
            .required("*"),
            email: Yup.string()
            .email("Invalid")
            .required("*"),
            about: Yup.string()
            .max(1000, ">1000")
            .required("*")
        })} 
        onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
                alert("Submitted")
                axios.post("/record/add", {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        about: values.about
                })
                .catch((err) => console.log(err))
                resetForm({values: ""})
                setSubmitting(false)
            }, 400)
          }}>
            <StyledForm>
                <MainWrapper>
                    <Header>Contact me</Header>
                    <TextInput
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="First Name"/>
                    <TextInput
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"/>
                    <TextInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email Adress"/>
                    <TextAreaF 
                    as="textarea"
                    name="about"
                    label="About"
                    placeholder="About"/>
                    <Submit type="submit">Submit</Submit>
                </MainWrapper>
            </StyledForm>
        </Formik>
    )
}