import styled from 'styled-components';

const colors = {
    bg: '#FFFFFF',
    text: '#000000',
    border: '#000000',
};

const fonts = {
    primary: 'Courier, monospace',
};

export const FormContainer = styled.div`
    background-color: ${colors.bg};
    max-width: 350px;
    margin: auto;
    margin-top: 20px;
    padding: 24px;
    border: 1px solid ${colors.border};
    text-align: center;
    position: relative;
    font-family: ${fonts.primary};
`;

export const Input = styled.input`
    border: 1px solid ${colors.border};
    margin: auto;
    margin-bottom: 10px;
    font-family: ${fonts.primary};
    color: ${colors.text};
    padding: 8px;
    font-size: 13px;
    width: 100%;
    box-sizing: border-box;
`;

export const TextArea = styled.textarea`
    border: 1px solid ${colors.border};
    margin: auto;
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    font-family: ${fonts.primary};
    color: ${colors.text};
    resize: vertical;
    font-size: 13px;
`;

export const BioLabel = styled.label`
    font-family: ${fonts.primary};
    font-size: 12px;
    color: ${colors.text};
    text-transform: uppercase;
    opacity: 0.6;
    margin-top: 12px;
    margin-bottom: 4px;
    display: block;
    text-align: left;
`;

export const PostLabel = styled.label`
    font-family: ${fonts.primary};
    font-weight: 400;
    font-size: 12px;
    color: ${colors.text};
    text-transform: uppercase;
    opacity: 0.6;
    margin-top: 10px;
    margin-bottom: 4px;
    display: block;
    text-align: left;
`;

export const CharacterCounter = styled.p`
    font-size: 11px;
    color: ${colors.text};
    opacity: 0.6;
    margin-top: 4px;
    font-family: ${fonts.primary};
    text-align: right;
`;

export const FormButtons = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 16px;
    justify-content: center;
`;

export const InlineFormWrapper = styled.div`
    position: relative;
    width: 100%;
    font-family: ${fonts.primary};
`;
