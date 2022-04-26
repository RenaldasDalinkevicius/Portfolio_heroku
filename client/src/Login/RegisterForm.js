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
    `
    const FormInput = styled.input`
    `
    const FormError = styled.div`
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
    margin: 1em 0;
    `
    const Submit = styled.button`
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
                    {error && (
                        <Error>
                            {error}
                        </Error>
                    )}
                    <TextInput
                    label="First Name"
                    name="firstName"
                    type="text"/>
                    <TextInput
                    label="Last Name"
                    name="lastName"
                    type="text"/>
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