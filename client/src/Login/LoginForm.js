import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Formik, Form, useField } from "formik"
import * as Yup from "yup"
import { loginUser } from "../Components/stateSlices/loginSlice"
import { useSelector, useDispatch } from "react-redux"
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
    const Register = styled.p`
    `
    const LinkRegister = styled(Link)`
    `

export default function LoginForm() {
    const dispatch = useDispatch()
    const {status, loggedInUser, error} = useSelector(state => state.login)

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
    if (loggedInUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
        navigate("/")
    }
    return (
        <Formik initialValues={{email:"", password:""}}
        validationSchema={Yup.object({
            email: Yup.string()
            .email("Invalid")
            .required("Please enter your Email adress"),
            password: Yup.string()
            .required("Please enter your password")
        })}
        onSubmit={(values, {setSubmitting}) => {
            dispatch(loginUser(values))
            setSubmitting(false)
        }}>
            <StyledForm>
                <MainWrapper>
                    <Header>Login</Header>
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
                    <Submit type="submit">{status === "loading"?"Loading...":"Login"}</Submit>
                    <Register>Don't have an account?{" "}<LinkRegister to="/register">Register</LinkRegister></Register>
                </MainWrapper>
            </StyledForm>
        </Formik>
    )
}