import styled from 'styled-components';

export const FormContainer = styled.div`
    background-color: #F5F1E8;
    width: 350px;
    margin: auto;
    margin-top: 50px;
    padding: 60px;
    border: 2px solid #D4A574;
    text-align: center;
`;

export const Input = styled.input`
    border: 1px solid #2C2C2C;
    margin: auto;
    margin-bottom: 10px;
    font-family: 'Lato', sans-serif;
    color: #2C2C2C;
    padding: 8px;
`;

export const TextArea = styled.textarea`
    border: 1px solid #2C2C2C;
    margin: auto;
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    font-family: 'Lato', sans-serif;
    color: #2C2C2C;
`;

export const BioLabel = styled.label`
    font-family: 'Lato', serif;
    font-size: 18px;
    color: #2C2C2C;
    margin-top: 15px;
    margin-bottom: 5px;
    display: block;
`;

export const PostLabel = styled.label`
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #2C2C2C;
    margin-top: 10px;
    margin-bottom: 5px;
    display: block;
`;

export const CharacterCounter = styled.p`
    font-size: 12px;
    color: #666;
    margin-top: 5px;
`;

export const FormButtons = styled.div`
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 20px;
`;
