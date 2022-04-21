import React from "react"
import styled from "styled-components"
import { Formik, useField, Form, Field } from "formik"
import * as Yup from "yup"
import axios from "axios"

    const StyledForm = styled(Form)`
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.text};
    width: 100%;
    `
    const TextArea = styled(Field)`
    height: 100px;
    font-size: 1rem;
    font-family: inherit;
    resize: none;
    padding: 1em;
    border: none;
    width: 100%;
    &:focus {
        outline: none;
    }
    `
    const FormInput = styled.input`
    padding: 0;
    font-size: 1rem;
    padding: 1em;
    border: none;
    width: 100%;
    font-family: inherit;
    &:focus {
        outline: none;
    }
    `
    const FormError = styled.div`
    font-size: 1.25rem;
    font-family: inherit;
    color: red;
    position: absolute;
    z-index:5;
    `
    const Wrapper = styled.div`
    width: 100%;
    `
    const Submit = styled.button`
    background: ${props => props.theme.accent};
    color: ${props => props.theme.primary};
    border: none;
    width: 100%;
    font-size: 1rem;
    padding: 0.5em;
    transition: transform 200ms ease-in-out;
    &: hover {
        transform: scale(1.01);
    }
    `
    const Header = styled.h4`
    text-align: center;
    margin: 0.25em 0;
    `

export default function AddComment(props) {
    const TextInput = ({label, ...props}) => {
        const [field, meta] = useField(props)
        return (
            <Wrapper>
                <FormInput {...field} {...props}/>
                {meta.touched && meta.error?(
                <FormError className="error">{meta.error}</FormError>): null}
            </Wrapper>
        )
    }
    const TextAreaF = ({label, ...props}) => {
        const [field, meta] = useField(props)
        return (
            <Wrapper>
                <TextArea {...field} {...props}/>
                {meta.touched && meta.error?(
                <FormError className="error">{meta.error}</FormError>): null}
            </Wrapper>
        )
    }
    return (
        <Formik initialValues={{name: "", comment: ""}}
        validationSchema={Yup.object({
            name: Yup.string()
            .max(20, ">20")
            .required("*"),
            comment: Yup.string()
            .max(200, ">200")
            .required("*")
        })} 
        onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
                alert("Submitted")
                //update according to record
                axios.post(`/record/addcomment/${props.id}`, {
                        name: values.name,
                        comment: values.comment
                })
                .catch((err) => console.log(err))
                resetForm({values: ""})
                setSubmitting(false)
            }, 400)
          }}>
            <StyledForm>
                <Header>Comment:</Header>
                <TextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Name"/>
                <TextAreaF 
                as="textarea"
                name="comment"
                label="Comment"                    placeholder="Comment"/>
                <Submit type="submit">Submit</Submit>
            </StyledForm>
        </Formik>
    )
}