import styled from 'styled-components';

const fonts = {
    primary: 'Courier, monospace',
};

export const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    max-width: 480px;
    margin: 0 auto;
    padding: 0 16px;
    font-family: ${fonts.primary};
`;
