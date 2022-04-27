import React from "react"
import styled from "styled-components"
import { Formik, Form, useField } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../Components/stateSlices/registerSlice"
import { useNavigate } from "react-router-dom"

    const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    `
    const FormLabel = styled.label`
    text-align: center;
    font-size: 1.25rem;
    margin: 0 0 1em 0;
    font-weight: 600;
    `
    const FormInput = styled.input`
    font-size: 1.25rem;
    border: none;
    padding: 1em;
    `
    const FormError = styled.h4`
    color: red;
    font-weight: 300;
    margin: 0;
    text-align: center;
    font-size: 1.125rem;
    `
    const StyledForm = styled(Form)`
    min-height: 100vh;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.text};
    display: flex;
    `
    const MainWrapper = styled.div`
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    `
    const Header = styled.h2`
    margin: 0 0 1em 0;
    text-transform: uppercase;
    background: ${props => props.theme.name==="gradient"&&props.theme.accent};
    -webkit-background-clip: ${props => props.theme.name==="gradient"&&"text"};
    -webkit-text-fill-color: ${props => props.theme.name==="gradient"&&"transparent"};
    `
    const Submit = styled.button`
    border: none;
    padding: 1em;
    cursor: pointer;
    font-familiy: inherit;
    font-weight: 600;
    font-size: 1.25rem;
    text-transform: uppercase;
    margin: 1em 0;
    `
    const Error = styled.div`
    `

export default function RegisterForm() {
    const dispatch = useDispatch()
    const {status, userRegistered, error} = useSelector(state => state.register)
    const TextInput = ({label, ...props}) => {
        const [field, meta] = useField(props)
        return (
            <Wrapper>
                <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
                <FormInput {...field} {...props}/>
                {meta.touched && meta.error?(
                    <FormError className="error">{meta.error}</FormError>
                ): null}
            </Wrapper>
        )
    }
    const navigate = useNavigate()
    if (userRegistered) {
        navigate("/login")
    }
    return (
        <Formik initialValues={{firstName:"", lastName:"", email:"", password:""}}
        validationSchema={Yup.object({
            firstName: Yup.string()
            .max(20, ">20")
            .required("Enter first name"),
            lastName: Yup.string()
            .max(20, ">20")
            .required("Enter last name"),
            email: Yup.string()
            .email("Invalid")
            .required("Please enter your Email adress"),
            password: Yup.string()
            .required("Please enter your password")
        })}
        onSubmit={(values, {setSubmitting}) => {
            dispatch(registerUser(values))
            setSubmitting(false)
        }}>
            <StyledForm>
                <MainWrapper>
                    <Header>Register</Header>
                    {error?<Error>{error}</Error>:null}
                    <TextInput
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="First name"/>
                    <TextInput
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"/>
                    <TextInput
                    label="Email adress"
                    name="email"
                    type="text"
                    placeholder="Email adress"/>
                    <TextInput
                    label="Password"
                    name="password"
                    type="text"
                    placeholder="Password"/>
                    <Submit type="submit">{status === "loading"?"Loading...":"Register"}</Submit>
                </MainWrapper>
            </StyledForm>
        </Formik>
    )
}