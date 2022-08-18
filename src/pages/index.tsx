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
  WapperInput
} from '../styles/home'
import { ERROR, walls } from '../utils'
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
    inputValues } = useContext(Context);
    // console.log('inputValues: ', inputValues);
    // console.log('error: ', error);

  
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
                    onFocus={() => {
                      setError(ERROR);  
                    }}
                    onChange={onChange}
                    id={`parede_${index}`}
                    name="height"
                    type="number"
                    min="1"
                    max="7"
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
                    onFocus={() => {
                      setError(ERROR);  
                    }}
                    onChange={onChange}
                    id={`parede_${index}`}
                    name="width"
                    type="number"
                    min="1"
                    max="7"
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
                    onFocus={() => {
                      setError(ERROR);  
                    }}
                    onChange={onChange}
                    id={`parede_${index}`}
                    name="door"
                    type="number"
                    max="3"
                  />
                </label>
                <label>
                  Janela
                  <InputNumber
                    onChange={onChange}
                    onFocus={() => {
                      setError(ERROR);  
                    }}
                    id={`parede_${index}`}
                    name="window"
                    type="number"
                    max="3"
                  />
                </label>
              </WapperInput>
              {error[currentWall].height && (currentWall == `parede_${index}`) && <span>{error[currentWall].height}</span>}
              {error[currentWall].width && (currentWall == `parede_${index}`) && <span>{error[currentWall].width}</span>}
              {error[currentWall].wallWithDoor && (currentWall == `parede_${index}`) && <span>{error[currentWall].wallWithDoor}</span>}
              {error[currentWall].space && (currentWall == `parede_${index}`) && <span>{error[currentWall].space}</span>}
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
