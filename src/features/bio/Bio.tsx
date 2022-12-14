import { useState } from "react";
import { NomesSimpsons, INFO_SIMPSONS } from "./constants";
import { BioContainer, BioImage, BioNome, BioDescription, ContainerBotoes, BotaoBio } from "./styles";

const Bio = () => {
  const [bioActive, setBioActive] = useState(INFO_SIMPSONS[NomesSimpsons.BART]);

  const onClick: (nome: NomesSimpsons) => void = (nome) =>
    setBioActive(INFO_SIMPSONS[nome]);

  const criarBotoes = () => {
    return Object.keys(INFO_SIMPSONS).map((nome: string) => (

      <BotaoBio
        active={bioActive.id === nome? true : false}
        onClick={() => onClick(nome as NomesSimpsons)}
      >
        {nome}
      </BotaoBio>
    ));
  };

  return (
    <BioContainer>
      <ContainerBotoes>{criarBotoes()}</ContainerBotoes>
      <div>
        <div>
          <BioImage
          src={bioActive.image}
          alt={bioActive.nome}
          />
        </div>
        <div>
          <BioNome>{bioActive.nome}</BioNome>
          <BioDescription>{bioActive.description}</BioDescription>
        </div>
      </div>
    </BioContainer>
  );
};

export default Bio;
