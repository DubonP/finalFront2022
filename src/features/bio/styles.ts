import styled, { css } from "styled-components";

export const BioContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`

export const BioImage = styled.img`
    max-width: 200px;
    max-height: 300px;
    margin-bottom: 1rem;
`

export const BioNome = styled.h1`
    font-size: 2em;
    margin-bottom: 1rem;
`

export const BioDescription= styled.p`
    font-size: 1.3em;
    width: 70%;
    margin: 1rem auto;
`

export const ContainerBotoes = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
`

export interface BotaoBioProps {
    active: boolean;
}

export const BotaoBio = styled.button<BotaoBioProps>`
    border-radius: 5px;
    border: 1px solid darkgray;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    padding: 1rem;
    margin: 1rem;
    font-family: "Homer Simpson Revised", sans-serif;
    font-size: 1.4rem;
    background-color: rgba(117, 207, 252, 0.75);
    color: whitesmoke;
    text-shadow: 2px 2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000,
      -2px -2px 0 #000000, 2px 0px 0 #000000, 0px 2px 0 #000000,
      -2px 0px 0 #000000, 0px -2px 0 #000000;

    &:hover {
        background-color: #fdd835;
        color: whitesmoke;
        cursor: pointer;
        box-shadow: 1px 1px 1px 1px rgb(255, 255, 255);
    }
  
    ${props => props.active && css`
        background-color: #fdd835;
        color: whitesmoke;
    `}
`