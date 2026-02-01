import styled from 'styled-components';
import { GlobalContentWrapper } from './globalStyles';

// Design system colors
const colors = {
    bg: '#FFFFFF',
    card: '#F5F1E8',
    text: '#3D3328',
    muted: '#9D9485',
    border: '#D4CFC6',
    accent: '#C4663D',
};

export const PostWrapper = GlobalContentWrapper;

export const PostCard = styled.div`
    background-color: ${colors.card};
    border: 2px solid ${colors.border};
    margin-top: 0px;
    cursor: pointer;
    transition: opacity 0.2s ease;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;

    &:hover {
        opacity: 0.95;
    }
`;

export const PostHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px;
    padding-bottom: 14px;
`;

export const PostHeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
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

export const Username = styled.span`
    font-size: 15px;
    font-weight: 400;
    color: ${colors.text};
    font-family: 'Lato', sans-serif;
`;

export const PostTime = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${colors.muted};
    font-family: 'Lato', sans-serif;
`;

export const PostCaption = styled.p`
    font-size: 15px;
    color: ${colors.text};
    margin: 0;
    padding: 0 20px 16px 20px;
    font-family: 'Lato', sans-serif;
    line-height: 1.55;
`;

export const PostFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: ${colors.muted};
    font-family: 'Lato', sans-serif;
    font-style: italic;
`;

export const PostSavedBy = styled.span`
    font-size: 12px;
    color: ${colors.muted};
    font-family: 'Lato', sans-serif;
    font-style: italic;
`;
