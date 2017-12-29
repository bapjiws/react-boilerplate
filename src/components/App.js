import React from 'react';
import styled, { keyframes } from 'styled-components';

import reactLogo from '../../assets/img/react-logo.svg';

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
  // TODO: add a font
  //@font-face {
  //  font-family: '';
  //  src: url('');
  //}

  width: 100%;
  font-family: sans-serif; // TODO: add a font
  text-align: center;
  color: #8a8f9c;
`;

const Image = styled.img`
  animation: ${rotate360} 10s linear infinite;
`;

// TODO: try using '../../assets/img/react-logo.svg' as src inside Image
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
