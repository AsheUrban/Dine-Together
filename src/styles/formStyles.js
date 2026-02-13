import styled from 'styled-components';
import { colors, fonts } from './theme';

export const FormContainer = styled.div`
    background-color: ${colors.bg};
    max-width: 320px;
    width: 100%;
    margin: auto;
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
    background: ${colors.inputBg};
    padding: 10px;
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

export const FormLabel = styled.label`
    font-family: ${fonts.primary};
    font-size: 11px;
    color: ${colors.text};
    text-transform: uppercase;
    opacity: 0.6;
    margin-top: 10px;
    margin-bottom: 6px;
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

export const FormDivider = styled.div`
    text-align: center;
    margin: 20px 0;
    font-size: 11px;
    opacity: 0.6;
    font-family: ${fonts.primary};
`;

export const FormMessage = styled.p`
    font-size: 12px;
    color: ${colors.text};
    font-family: ${fonts.primary};
    margin: 0 0 16px 0;
`;
