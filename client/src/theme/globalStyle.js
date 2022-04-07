import { createGlobalStyle} from "styled-components";
const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Source Sans Pro', sans-serif;
    }
    * {
        box-sizing: border-box
    }
    p {
        font-size: 1.125rem;
    }
    .carousel__dot--selected {
        background: ${props => props.theme.accent};
    }
    .active {
        color: ${props => props.theme.name==="gradient"?props.theme.secondary:props.theme.secondary};
        background: ${props => props.theme.name==="gradient"?props.theme.accent:props.theme.accent};
    }
    a {
        color: ${props => props.theme.name==="gradient"?props.theme.text:props.theme.accent};
    }
    h1 {
        font-size: 3rem;
        font-weight: 900;
        @media (max-width: 630px) {
            font-size: 2rem;
        }
    }
    h2 {
        font-size: 3rem;
        @media (max-width: 630px) {
            font-size: 2rem;
        }
    }
    h3 {
        font-size: 1.5rem;
    }
    .CircularProgressbar-text {
        font-weight: 600;
    }
    `
export default GlobalStyle