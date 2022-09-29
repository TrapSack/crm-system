import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  /*
  1. Use a more-intuitive box-sizing model.
  */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /*
    2. Remove default margin
  */
  * {
    margin: 0;
    padding: 0;
  }

  /*
    3. Allow percentage-based heights in the application
  */
  html, body {
    font-size: 14px;
    font-family: Poppins,ui-sans-serif,system-ui,-apple-system,Arial;
  }

  /*
    Typographic tweaks!
    4. Add accessible line-height
    5. Improve text rendering
  */

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /*
    6. Improve media defaults
  */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  /*
    7. Remove built-in form typography styles
  */
  input, button, textarea, select {
    font: inherit;
  }

  /*
    8. Avoid text overflows
  */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  /*
    9. Create a root stacking context
  */
  #root, #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    isolation: isolate;
  }

  #__next.blur {
    filter: blur(10px);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3 {
    text-transform: uppercase;
  }

  h1 {
    font-size: 104px;
    line-height: 80px;
  }

  h2 {
    font-size: 64px;
    line-height: 56px;
  }

  h3 {
    font-size: 40px;
    line-height: 36px;
  }

  h4 {
    font-size: 22px;
    font-weight: 500;
    line-height: 1.2;
  }

  ul {
    list-style-type: none;
  }

  input {
    border: unset;
    outline: none;

    &:focus,
    &:focus-visible {
      border: unset;
      outline: none;
    }
  }

  .bold {
    font-weight: 700;
  }
`;
