import styled from "styled-components";
import { Button as ButtonAnt } from "antd";

export const Container = styled.div`
  padding: 0 2rem;
`;

export const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
`;

export const Card = styled.div`
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  max-width: 300px;
  cursor: pointer;

  :hover,
  :focus,
  :active {
    color: #696969;
    border-color: black;
  }

  h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }

  span {
    color: red;
    font-size: 0.85rem;
  }
`;

export const Title = styled.div`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;

  a {
    color: #0070f3;
    text-decoration: none;
  }

  a:hover,
  a:focus,
  a:active {
    text-decoration: underline;
  }
`;

export const Description = styled.div`
  margin: 4rem 0;
  line-height: 1.5;
  font-size: 1.5rem;
  text-align: center;
`;

export const WapperInput = styled.div<
  {
    display?: string,
    justify?: string,
    columnGap?: string,
    marginBottom?: string
  }>`
  display: ${({display}) => display};
  justify-content: ${({justify}) => justify};
  margin-bottom: ${({marginBottom}) => marginBottom ? marginBottom : ""};
  column-gap: ${({columnGap}) => columnGap ? columnGap : ""};
`;

export const InputNumber = styled.input`
  min-width: 120px;
  width: 100%;
  cursor: pointer;
`;

export const Button = styled(ButtonAnt)`
  padding: 10px;
  background: transparent;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
  }
`;


export const ByName = styled.div`
  margin-left: 0.5rem;
`;

export const Footer = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
    font-style: italic;
  }
`;
