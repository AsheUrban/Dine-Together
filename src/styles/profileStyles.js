import styled from 'styled-components';
import { colors, fonts } from './theme';

export const PageContainer = styled.div`
    max-width: 480px;
    margin: 0 auto;
    padding: 16px;
    font-family: ${fonts.primary};
`;

export const InfoSection = styled.section`
    border-bottom: 1px solid ${colors.border};
    padding-bottom: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    font-family: ${fonts.primary};
`;

export const BioSection = styled.div`
    width: 100%;
    font-size: 12px;
    line-height: 1.8;
`;

export const BioValue = styled.span`
    font-size: 12px;
    color: ${colors.text};
    font-family: ${fonts.primary};
    text-align: right;
`;

export const RestaurantSection = styled.div`
    flex: 1;
    min-width: 0;
    padding-bottom: 20px;
    font-family: ${fonts.primary};
`;

export const BioText = styled.p`
    font-family: ${fonts.primary};
    font-size: 12px;
    color: ${colors.text};
    margin: 0;
    line-height: 1.5;
    font-weight: 400;
`;

export const EditProfileLink = styled.button`
    display: none;
`;

export const TabContainer = styled.div`
    display: flex;
    gap: 32px;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 12px;
    font-family: ${fonts.primary};
`;

export const TabButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 12px;
    color: ${colors.text};
    font-family: ${fonts.primary};
    font-weight: ${props => props.active ? 700 : 400};
    opacity: ${props => props.active ? 1 : 0.5};
    padding: 0;
    text-transform: uppercase;

    &:hover {
        opacity: 1;
    }
`;

export const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-family: ${fonts.primary};
`;

export const ProfileUsername = styled.h2`
    font-family: ${fonts.primary};
    font-size: 20px;
    font-weight: 700;
    color: ${colors.text};
    margin: 0;
`;

export const BioRow = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dotted ${colors.border};
    padding-bottom: 6px;
    margin-bottom: 6px;

    &:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
`;

export const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 16px;
`;

export const ProfileHeaderInfo = styled.div`
    flex: 1;
`;
