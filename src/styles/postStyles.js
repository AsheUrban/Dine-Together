import styled from 'styled-components';
import { GlobalContentWrapper } from './globalStyles';

const colors = {
    bg: '#FFFFFF',
    text: '#000000',
    muted: 'rgba(0, 0, 0, 0.6)',
    border: '#000000',
};

const fonts = {
    primary: 'Courier, monospace',
};

export const PostWrapper = GlobalContentWrapper;

export const PostCard = styled.article`
    padding-bottom: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    font-family: ${fonts.primary};
`;

export const PostHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
`;

export const PostHeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
`;

export const PostUserInfo = styled.div`
    flex: 1;
`;

export const PostUserMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Username = styled.span`
    font-size: 14px;
    font-weight: 700;
    color: ${colors.text};
    font-family: ${fonts.primary};
`;

export const PostTime = styled.span`
    font-size: 11px;
    font-weight: 400;
    color: ${colors.text};
    opacity: 0.6;
    font-family: ${fonts.primary};
`;

export const PostCaption = styled.p`
    font-size: 13px;
    color: ${colors.text};
    margin: 0 0 14px 0;
    padding: 0;
    font-family: ${fonts.primary};
    font-style: italic;
    line-height: 1.5;
`;

export const PostFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: ${colors.text};
    opacity: 0.6;
    font-family: ${fonts.primary};
`;

export const PostSavedBy = styled.span`
    font-size: 11px;
    color: ${colors.text};
    opacity: 0.6;
    font-family: ${fonts.primary};
`;
