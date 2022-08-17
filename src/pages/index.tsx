import React, { useState } from 'react'
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
import { INITIAL_PAREDES, walls } from '../utils'

const Home: NextPage = () => {

  const [inputValues, setInputValues] = useState<any>(INITIAL_PAREDES);
  const [error, setError] = useState<any>('');


  const validateDoor = (currentWall: any) => {
    if (inputValues[currentWall].door === 0) {
      // handleOk();
    } else if (inputValues[currentWall].door > 0 && inputValues[currentWall].height > 2.2) {
      // handleOk();
    } else {
      window.alert('A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta');
    }
  };

  const validateWidth = (currentWall: any) => {
    if ((inputValues[currentWall].width > 0) && (inputValues[currentWall].width) <= 15) {
      validateDoor(currentWall);
    } else {
      window.alert('Largura incorreto');
    }
  };


  const validateHeight = (currentWall: any) => {
    if ((inputValues[currentWall].height > 0) && (inputValues[currentWall].height) <= 15) {
      // validateWidth(currentWall);
    } else {
      setError('valor da altura está incorreto')
    }
  };
  
  
  
  const  onChange = (event: any) => {
    let currentWall = event.target.id;

    // validateHeight(currentWall);

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
                  <InputNumber onChange={onChange} id={`parede_${index}`} name="height" type="number" />
                </label>
                <label>
                  Largura
                  <InputNumber onChange={onChange} id={`parede_${index}`} name="width" type="number" />
                </label>
              </WapperInput>

              <WapperInput display="flex" columnGap="10px">
                <label>
                  Porta
                  <InputNumber onChange={onChange} id={`parede_${index}`} name="door" type="number" />
                </label>
                <label>
                  Janela
                  <InputNumber onChange={onChange} id={`parede_${index}`} name="window" type="number" />
                </label>
              </WapperInput>
              {/* {error && error} */}
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
