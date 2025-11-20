import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

export const InfoSection = styled.div`
    margin-top: 40px;
    flex: 0 0 300px;
    background-color: #D98560;
    padding: 40px;
    border-radius: 10px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BioSection = styled.div`
    border-radius: 10px;
    border: 2px solid #8B4513;
    width: 100%;
    padding: 10px;
    margin-top: 20px;
`;

export const RestaurantSection = styled.div`
    margin-top: 20px;
    flex: 1;
    min-width: 0;
`;

export const BioText = styled.p`
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #2C2C2C;
    margin: 12px 0;
    line-height: 1.6;
    font-weight: 400;
`;

export const EditProfileLink = styled.a`
    display: inline-block;
    text-decoration: none;
    color: #8B4513;
    cursor: pointer;
    font-size: 10px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.7;
    }
`;
