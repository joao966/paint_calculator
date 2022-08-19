import React, { useContext } from 'react'
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
  WapperInput,
  ContainerError
} from '../styles/home'
import { walls } from '../constants'
import { Context } from '../context/Provider'

const Home: NextPage = () => {
  const {
    onChange,
    validateHeight,
    validateWidth,
    error,
    setError,
    currentWall,
    currentProperty,
    inputValues,
    onClickResult,
    cansPaint: {
      lata05,
      lata25,
      lata36,
      lata18
    },
    reset
  } = useContext(Context);

  return (
    <Container>
      <Head>
        <title>Paint Calculator</title>
        <meta name="description" content="Paint Calculator" />
        <link rel="icon" href="/tinta.ico" />
      </Head>

      <GlobalStyle />

      <Main>
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
                    onBlur={() => {
                      if((inputValues[currentWall].height * inputValues[currentWall].width) > 50) {
                        setError((prevState: any) => {
                          return {
                            ...prevState,
                            [currentWall] : {...prevState[currentWall], space: 'A parede não pode ter mais de 50 metros!'}
                          }
                        });
                      }
                      validateHeight(currentWall, currentProperty);
                    }}
                    onChange={onChange}
                    id={`parede_${index}`}
                    name="height"
                    type="number"
                    min="1"
                    max="7"
                    value={inputValues[`parede_${index}`].height}
                  />
                </label>

                <label>
                  Largura
                  <InputNumber
                    onBlur={() => {
                      if((inputValues[currentWall].height * inputValues[currentWall].width) > 50) {
                        setError((prevState: any) => {
                          return {
                            ...prevState,
                            [currentWall] : {...prevState[currentWall], space: 'A parede não pode ter mais de 50 metros!'}
                          }
                        });
                      }
                      validateWidth(currentWall, currentProperty);
                    }}
                    onChange={onChange}
                    id={`parede_${index}`}
                    name="width"
                    type="number"
                    min="1"
                    max="7"
                    value={inputValues[`parede_${index}`].width}
                  />
                </label>
              </WapperInput>

              <WapperInput display="flex" columnGap="10px" marginBottom="10px">
                <label>
                  Porta
                  <InputNumber
                    onBlur={() => {
                      validateHeight(currentWall, currentProperty);
                    }}
                    onChange={onChange}
                    id={`parede_${index}`}
                    name="door"
                    type="number"
                    max="3"
                    value={inputValues[`parede_${index}`].door}
                  />
                </label>
                <label>
                  Janela
                  <InputNumber
                    onChange={onChange}
                    id={`parede_${index}`}
                    name="window"
                    type="number"
                    max="3"
                    value={inputValues[`parede_${index}`].window}
                  />
                </label>
              </WapperInput>
              
              <ContainerError>
                {error[currentWall].height && (currentWall == `parede_${index}`) && <span>{error[currentWall].height}</span>}
                {error[currentWall].width && (currentWall == `parede_${index}`) && <span>{error[currentWall].width}</span>}
                {error[currentWall].wallWithDoor && (currentWall == `parede_${index}`) && <span>{error[currentWall].wallWithDoor}</span>}
                {error[currentWall].space && (currentWall == `parede_${index}`) && <span>{error[currentWall].space}</span>}
              </ContainerError>
            </Card>
          ))}
        </Grid>

        <Button onClick={onClickResult} type="primary">{ reset ? "Fazer outro cálculo" : "Calcular"}</Button>

        {reset && (
          <Card>
            {lata05 > 0 && <Description>Precisa de {lata05} latas de 0.5L</Description>}
            {lata25 > 0 && <Description>Precisa de {lata25} latas de 2.5L</Description>}
            {lata36 > 0 && <Description>Precisa de {lata36} latas de 3.6L</Description>}
            {lata18 > 0 && <Description>Precisa de {lata18} latas de 18L</Description>}
          </Card>
        )}
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
