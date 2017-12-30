import React from 'react';
import styled, { keyframes, injectGlobal } from 'styled-components';

import reactLogo from '../../assets/img/react-logo.svg';
import Bungee from '../../assets/fonts/Bungee/Bungee-Regular.ttf';

const CenteringWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const VeryImportantText = styled.h1`
  width: 100%;
  font-family: 'Bungee', sans-serif;
  text-align: center;
  color: #f30808;
`;

const Image = styled.img`
  animation: ${rotate360} 10s linear infinite;
`;

/* eslint-disable no-unused-expressions */
injectGlobal`
    html {
      height: 100%;
    }
    
    body {
      margin: 0;
      padding: 0;
      min-height: 100%;
          
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    @font-face {
      font-family: 'Bungee';
      src: url(${Bungee});
    }
`;

const App = () => (
  <CenteringWrapper>
    <VeryImportantText>
      Welcome to our React application!<br />
      Things are going to get very exciting here pretty soon!
    </VeryImportantText>
    <Image src={reactLogo} alt="" />
  </CenteringWrapper>
);

export default App;
