import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  @media (max-width: 600px) {
    .grid {
      width: 100%;
      flex-direction: column;
    }
  }


  @media (prefers-color-scheme: dark) {
    .card,
    .footer {
      border-color: #222;
    }
    .logo img {
      filter: invert(1);
    }
  }

`;

export default GlobalStyle;
