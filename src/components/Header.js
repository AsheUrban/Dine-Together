import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DineTogetherHeader = styled.div`
  text-align: center;
  width: 100vw;
  color: #FFFBC8;
  padding: 25px;
  margin: auto;
  background-color: #B16825;
  box-sizing: border-box;
`;

const H1 = styled.h1`
  font-size: 59px;
  margin: 0;
`
const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0;
`;

function Header(){
  return (
    <React.Fragment>
        <DineTogetherHeader>
          <H1>
          DINE TOGETHER
          </H1>
          <Center>
            <Link to="/"> Home </Link> &emsp;|&emsp; <Link to="/sign-in"> Sign In </Link>
        </Center>
        </DineTogetherHeader>
       
    </React.Fragment>
  );
}

export default Header;