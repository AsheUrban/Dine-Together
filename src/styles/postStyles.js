import styled from 'styled-components';
import { GlobalContentWrapper } from './globalStyles';

export const PostWrapper = GlobalContentWrapper;

export const PostCard = styled.div`
    background-color: #FFFCF7;
    border: 2px solid #8B4513;
    margin-top: 0px;
    cursor: pointer;
    transition: opacity 0.2s ease;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);

    &:hover {
        opacity: 0.9;
    }
`;

export const PostHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    padding: 20px 24px;
    border-bottom: 2px solid #8B4513;
`;

export const PostHeaderLeft = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 14px;
    flex: 1;
`;

export const PostUserInfo = styled.div`
    flex: 1;
`;

export const PostUserMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`;

export const Username = styled.p`
    font-size: 15px;
    font-weight: 700;
    color: #8B4513;
    margin: 0;
    font-family: 'Lato', sans-serif;
`;

export const PostTime = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: #8B7355;
    font-family: 'Lato', sans-serif;
`;

export const PostCaption = styled.p`
    font-size: 15px;
    color: #5C3D2E;
    margin: 0;
    font-family: 'Lato', sans-serif;
    line-height: 1.6;
`;

export const PostFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #8B4513;
    font-family: 'Lato', sans-serif;
    font-style: italic;
`;

export const PostSavedBy = styled.span`
    font-size: 14px;
    color: #8B4513;
    font-family: 'Lato', sans-serif;
    font-style: italic;
`;

