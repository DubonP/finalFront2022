import React from "react";
import { BotaoLeitura, CardNoticia, DateCardNoticia, DescriptionCardNoticia, ImageCardNoticia, TituloCardNoticia } from "./styled";

interface ICardNewsProps {
    title: string;
    description: string | undefined;
    date: string | number;
    image: string;
    handleButton: React.MouseEventHandler;
}

export function CardNews({ title, description, date, image, handleButton }: ICardNewsProps) {
    return (
        <CardNoticia>
            <ImageCardNoticia src={image} />
            <TituloCardNoticia>{title}</TituloCardNoticia>
            <DescriptionCardNoticia>{description}</DescriptionCardNoticia>
            <DateCardNoticia>{date}</DateCardNoticia>
            <BotaoLeitura onClick={handleButton}>Ler mais</BotaoLeitura>
        </CardNoticia>
    )
}