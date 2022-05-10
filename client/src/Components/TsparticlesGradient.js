import React from "react"
import styled from "styled-components"
import Particles from "react-tsparticles"
import {loadFull} from "tsparticles"
import {loadGradientUpdater} from "tsparticles-updater-gradient"

    const TsparticlesStyled = styled(Particles)`
    position: fixed;
    z-index: -1
    `

export default function TsparticlesGradient(props) {
    const particlesInit = async (main) => {
        loadGradientUpdater(main)
        await loadFull(main)
    }
    return (
        <TsparticlesStyled
                    init={particlesInit}
                    options={{
                        background: {
                            color: {
                                value: props.bg
                            },
                        },
                        fpsLimit: 60,
                        particles: {
                            gradient: [
                                {
                                    type: "linear",
                                    colors: [
                                        {
                                            stop: 0,
                                            value: props.start
                                        },
                                        {
                                            stop: 1,
                                            value: props.end
                                        }
                                    ]
                                }
                            ],
                            move: {
                                bounce: false,
                                direction: "none",
                                enable: true,
                                outModes: "out",
                                random: false,
                                speed: 0.3,
                                straight: false
                            },
                            number: {
                                density: {
                                    enable: true, area: 800 
                                },
                                value: 80 
                            },
                            opacity: {
                                value: 0.5
                            },
                            shape: {
                                type: "circle"
                            },
                            size: {
                                value: {
                                    min: 1,
                                    max: 5
                                }
                            }
                        }
                    }}/>
    )
}