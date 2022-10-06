import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import platedfood from '../img/platedfood.jpg';

const BackgroundStyles = styled.div`
z-index: -5;
position: fixed;
width: 100vw;
height: 100vh;
background-image: url(${platedfood});
background-size: cover;
background-repeat: no-repeat;
justify-content: space-between;
align-items: center;
display: flex;
`;

function Background(){
  return (
    <React.Fragment>
        <BackgroundStyles>
        </BackgroundStyles>
    </React.Fragment>
  );
}

export default Background;