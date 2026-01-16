import styled from 'styled-components';
import { GlobalContentWrapper } from './globalStyles';

export const PostWrapper = GlobalContentWrapper;

export const PostCard = styled.div`
    background-color: #F5F1E8;
    border: 2px solid #8B4513;
    padding: 20px;
    margin-top: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: opacity 0.2s ease;
    width: 100%;
    box-sizing: border-box;

    &:hover {
        opacity: 0.8;
    }
`;

export const PostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 15px;
    padding-bottom: 12px;
    border-bottom: 1px solid #8B4513;
`;

export const PostHeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const Username = styled.p`
    font-size: 16px;
    font-weight: 700;
    color: #8B4513;
    margin: 0;
    font-family: 'Lato', sans-serif;
`;

export const PostCaption = styled.p`
    font-size: 14px;
    color: #2C2C2C;
    margin: 15px 0;
    font-family: 'Lato', sans-serif;
    line-height: 1.5;
`;

