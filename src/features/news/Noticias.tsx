import { useEffect, useState } from "react";
import { AssinarImage, CloseButton as Close } from "../../assets";
import { obterNoticias } from "./fakeRest";
import { CardNews } from "./Card";
import {
  CloseButton,
  CardModal,
  ContainerModal,
  DescriptionModal,
  ImageModal,
  TituloModal,
  ContainerNoticias,
  ListaNoticias,
  TituloNoticias,
  BotaoAssinar,
  ContainerTexto,
} from "./styled";

/* Toda o codigo esta dividido em ingles e portugues, uma boa pratica seria manter o codigo em um unico idioma,
porem, para isso precisariamos alterar a fakeRest e o styled, mas o projeto diz que essas paginas nao podem
ser alteradas */

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  description: string;
  date: number | string;
  premium: boolean;
  image: string;
  descriptionCurto?: string;
}

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obterInformacoes = async () => {
      const resposta = await obterNoticias();

      const data = resposta.map((n) => {
        const titulo = n.titulo
          .split(" ")
          .map((str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
          })
          .join(" ");

        const hora = new Date();
        const minutosDecorrido = Math.floor(
          (hora.getTime() - n.date.getTime()) / 60000
        );

        return {
          id: n.id,
          titulo,
          description: n.description,
          date: `Faz ${minutosDecorrido} minutos`,
          premium: n.premium,
          image: n.image,
          descriptionCurto: n.description.substring(0, 100),
        };
      });

      setNoticias(data);
    };

    obterInformacoes();
  }, []);
  /* Aqui apliquei o princípio da responsabilidade única, dando uma maior clareza para o codigo 
  e facilitando sua manutencao caso seja nescessario  */
  return (
    <ContainerNoticias>
      <TituloNoticias>Noticias dos Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <CardNews
            key={n.id}
            title={n.titulo}
            description={n.descriptionCurto}
            date={n.date}
            image={n.image}
            handleButton={() => setModal(n)}
          />
        ))}
        {modal ? (
          modal.premium ? (
            <ContainerModal>
              <CardModal>
                <CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImageModal src={AssinarImage} alt="mr-burns-excelent" />
                <ContainerTexto>
                  <TituloModal>Assine a nossa newsletter</TituloModal>
                  <DescriptionModal>
                    Assine nossa newsletter e receba novidades de nossos
                    personagens favoritos
                  </DescriptionModal>
                  <BotaoAssinar
                    onClick={() =>
                      setTimeout(() => {
                        /* O alert estava em espanhol, então mudei para o português, seguindo o padrao da 
                        pagina e aplicando os princípios e boas práticas*/
                        alert("Inscrito, obrigado por assinar nossa newsletter");
                        setModal(null);
                      }, 1000)
                    }
                  >
                    Assinar
                  </BotaoAssinar>
                </ContainerTexto>
              </CardModal>
            </ContainerModal>
          ) : (
            <ContainerModal>
              <CardModal>
                <CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImageModal src={modal.image} alt="news-image" />
                <ContainerTexto>
                  <TituloModal>{modal.titulo}</TituloModal>
                  <DescriptionModal>{modal.description}</DescriptionModal>
                </ContainerTexto>
              </CardModal>
            </ContainerModal>
          )
        ) : null}
      </ListaNoticias>
    </ContainerNoticias>
  );
};

export default Noticias;
