import React, { useEffect } from "react"
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
    text-align: center;
    font-size: 1.25rem;
    margin: 0 0 0.5em 0;
    font-weight: 600;
    `
    const FormInput = styled.input`
    font-size: 1.25rem;
    border: none;
    padding: 1em;
    margin: 0 0 0.5em 0;
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
    margin: 0 0 0.5em 0;
    text-transform: uppercase;
    background: ${props => props.theme.name==="gradient"&&props.theme.accent};
    -webkit-background-clip: ${props => props.theme.name==="gradient"&&"text"};
    -webkit-text-fill-color: ${props => props.theme.name==="gradient"&&"transparent"};
    `
    const Submit = styled.button`
    border: 3px solid;
    padding: 1em;
    cursor: pointer;
    font-familiy: inherit;
    font-weight: 600;
    font-size: 1.25rem;
    margin: 0.5em 0 1em 0;
    color: ${props => props.theme.text};
    border-image: ${props => props.theme.name==="gradient"&&props.theme.accent} 1;
    background: ${props => props.theme.name==="gradient"?props.theme.primary:props.theme.accent};
    color: ${props => props.theme.name==="gradient"?props.theme.text:props.theme.primary};
    transition: transform 200ms ease-in-out;
    &:hover, &:focus {
        transform: scale(1.1);
    };
    `
    const Register = styled.p`
    margin: 0;
    font-size: 1.25rem;
    `
    const LinkRegister = styled(Link)`
    font-weight: 600;
    `
    const Error = styled.p`
    font-size:1.25rem;
    color: red;
    font-weight: 600;
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
    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
            navigate("/")
        }
    }, [loggedInUser])
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
                    {error?<Error>{error}</Error>:null}
                    <TextInput
                    label="Email adress"
                    name="email"
                    type="text"
                    placeholder="Email adress"/>
                    <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"/>
                    <Submit type="submit">{status}</Submit>
                    <Register>Don't have an account?{" "}<LinkRegister to="/register">Register</LinkRegister></Register>
                </MainWrapper>
            </StyledForm>
        </Formik>
    )
}