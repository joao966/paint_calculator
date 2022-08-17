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
  Logo,
  Main,
  Title,
  WapperInput
} from '../styles/home'
import { walls } from '../utils'

const Home: NextPage = () => {
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
          Faça calculos precisos e economize no bolso
        </Description>

        <Grid className="grid">
          {walls.map(({title, subtitle}) => (
            <Card key={title} className="card">
              <div style={{marginBottom: "20px"}}>
                <h2>{title}</h2>
                <p>{subtitle}</p>
              </div>

              <WapperInput display="flex" justify="center" columnGap="10px" marginBottom="10px">
                <label>
                  Altura
                  <InputNumber type="number" />
                </label>
                <label>
                  Largura
                  <InputNumber type="number" />
                </label>
              </WapperInput>

              <WapperInput display="flex" columnGap="10px">
                <label>
                  Porta
                  <InputNumber type="number" />
                </label>
                <label>
                  Janela
                  <InputNumber type="number" />
                </label>
              </WapperInput>
              </Card>
          ))}
        </Grid>

        <Button type="primary">Calcular</Button>
      </Main>

      <Footer className="footer">
        <Link href="https://github.com/joao966">
          <a target="_blank">
            Developed by{' '}
            <Logo>
            João Guilherme
            </Logo>
          </a>
        </Link>
      </Footer>
    </Container>
  )
};

export default Home;
