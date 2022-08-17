import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import type { NextPage } from 'next'
import GlobalStyle from '../styles/global'
import {
  Button,
  Card,
  Container,
  Description,
  Footer,
  Grid,
  InputNumber,
  ByName,
  Main,
  Title,
  WapperInput
} from '../styles/home'
import { INITIAL_PAREDES, ERROR, walls } from '../utils'

const Home: NextPage = () => {

  const [inputValues, setInputValues] = useState<any>(INITIAL_PAREDES);
  const [error, setError] = useState<any>(ERROR);
  const [currentWall, setCurrentWall] = useState<any>('parede_0');
  const [currentProperty, setCurrentProperty] = useState<any>(null);

  const handleOk = (currentWall: any) => {
    console.log('chega aqui?');
    if (inputValues[currentWall].janela > 0 || inputValues[currentWall].porta > 0) {
      const resultAlturaLargura = (inputValues.primeiraParede.altura * inputValues.primeiraParede.largura) / 2;
      const resultPortaJanela = ( 1.52 * inputValues[currentWall].porta) + (2.4 * inputValues[currentWall].janela);
      if (resultPortaJanela <= resultAlturaLargura) {
        console.log('Ufaa');
      } else {
        window.alert('O total de área das portas e janelas deve ser no máximo 50% da área de parede');
      }
    } 
  };

  const validateDoor = (currentWall: any, fildError?: any) => {
    if (inputValues[currentWall].door === 0) {
      handleOk(currentWall);
    } else if (inputValues[currentWall].door > 0 && inputValues[currentWall].height > 2.2) {
      handleOk(currentWall);
    } else {
      setError((prevState: any) => {
        return {
          ...prevState,
          [currentWall] : {...prevState[currentWall], [fildError]: 'A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta'}
        }
      });
    }
  };

  const validateWidth = (currentWall: any, fildError?: any) => {
    if ((inputValues[currentWall].width > 0) && (inputValues[currentWall].width) <= 15) {
      validateDoor(currentWall, fildError);
      return;
    }
    setError((prevState: any) => {
      return {
        ...prevState,
        [currentWall] : {...prevState[currentWall], [fildError]: `valor de entrada para o campo ${fildError} está inválido`}
      }
    });
  };


  const validateHeight = (currentWall: any, fildError?: any) => {
    if ((inputValues[currentWall].height > 0) && (inputValues[currentWall].height) <= 15) {
      validateDoor(currentWall, fildError);
      return;
    } 
    setError((prevState: any) => {
      return {
        ...prevState,
        [currentWall] : {...prevState[currentWall], [fildError]: `valor de entrada para o campo ${fildError} está inválido`}
      }
    });
  };
  
  const  onChange = (event: any) => {
    let currentWall = event.target.id;
    let currentProperty = event.target.name;
    setCurrentWall(currentWall);
    setCurrentProperty(currentProperty);
    setInputValues((prevState: any) => {
      return {
        ...prevState,
        [currentWall] : {...prevState[currentWall], [event.target.name]: event.target.value}
      }
    });
  }

  return (
    <Container>
      <Head>
        <title>Paint Calculator</title>
        <meta name="description" content="Paint Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GlobalStyle />

      <Main >
        <Title>
          Welcome to Paint Calculator
        </Title>

        <Description>
          Calcule a quantidade de tinta para pintar seu quarto!
        </Description>

        <Grid className="grid">
          {walls.map(({ title, subtitle }, index) => (
            <Card key={title} className="card">
              <div style={{marginBottom: "20px"}}>
                <h2>{title}</h2>
                <p>{subtitle}</p>
              </div>

              <WapperInput display="flex" justify="center" columnGap="10px" marginBottom="10px">
                <label>
                  Altura
                  <InputNumber
                    disabled={inputValues[currentWall].door === 0}
                    onBlur={() => {
                      validateHeight(currentWall, currentProperty);
                    }}
                    onChange={onChange}
                    id={`parede_${index}`}
                    name="height"
                    type="number"
                  />
                </label>

                <label>
                  Largura
                  <InputNumber
                    onBlur={() => {
                      validateWidth(currentWall, currentProperty);
                    }}
                    onChange={onChange}
                    id={`parede_${index}`}
                    name="width"
                    type="number"
                  />
                </label>
              </WapperInput>

              <WapperInput display="flex" columnGap="10px" marginBottom="10px">
                <label>
                  Porta
                  <InputNumber
                    onChange={onChange}
                    id={`parede_${index}`}
                    name="door"
                    type="number"
                  />
                </label>
                <label>
                  Janela
                  <InputNumber onChange={onChange} id={`parede_${index}`} name="window" type="number" />
                </label>
              </WapperInput>

              {error[currentWall].height && (currentWall == `parede_${index}`) && <span>{error[currentWall].height}</span>}
              {error[currentWall].width && (currentWall == `parede_${index}`) && <span>{error[currentWall].width}</span>}
              {error[currentWall].wallWithDoor && (currentWall == `parede_${index}`) && <span>{error[currentWall].wallWithDoor}</span>}
            </Card>
          ))}
        </Grid>

        <Button type="primary">Calcular</Button>
      </Main>

      <Footer className="footer">
        Developed by{' '}
        <Link href="https://github.com/joao966">
          <a target="_blank">
            <ByName>
              João Guilherme
            </ByName>
          </a>
        </Link>
      </Footer>
    </Container>
  )
};

export default Home;
