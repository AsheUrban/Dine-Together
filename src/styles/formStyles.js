import styled from 'styled-components';
import { Link } from 'react-router-dom';

  export const DineTogetherPosts = styled.div`
    background-color: rgba(231, 221, 238, 0.95);
    width: 350px;
    margin: auto;
    margin-top: 50px;
    padding: 60px;
    border: 2px solid #fffbc8;
    text-align: center;
    border-radius: 10px;
  `;

  export const Input = styled.input`
    border-radius: 5px;
    border: 1px solid black;
    margin: auto;
    margin-bottom: 10px;
  `;

  export const H2 = styled.h2`
    font-size: 22px;
    color: #700629;
  `;

  export const Button = styled.button`
    background-color: #700629;
    border: 2px solid #FFFBC8;
    margin: 10px;
    color: #FFFBC8;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
  `;

  export const SignUpLink = styled(Link)`
    color: #700629;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  `;

  export const Center = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    width: 1230px;
    color: #FFFBC8;
    padding: 25px;
    margin: auto;
  `;

  export const H1 = styled.h1`
    font-size: 30px;
    color: #700629;
    margin: 0;
`;