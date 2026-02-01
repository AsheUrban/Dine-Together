import styled from 'styled-components';

// Design system colors
const colors = {
    bg: '#FFFFFF',
    card: '#F5F1E8',
    text: '#3D3328',
    muted: '#9D9485',
    border: '#D4CFC6',
    accent: '#C4663D',
};

export const PageContainer = styled.div`
    display: flex;
    gap: 32px;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 28px;
`;

export const InfoSection = styled.div`
    margin-top: 32px;
    flex: 0 0 240px;
    background-color: ${colors.card};
    border: 2px solid ${colors.border};
    padding: 28px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BioSection = styled.div`
    width: 100%;
    padding-top: 14px;
`;

export const ProfileBioLabel = styled.label`
    font-size: 10px;
    font-weight: 700;
    color: ${colors.muted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-family: 'Lato', sans-serif;
`;

export const BioValue = styled.p`
    font-size: 13px;
    color: ${colors.text};
    margin: 2px 0 12px 0;
    font-family: 'Lato', sans-serif;
`;

export const RestaurantSection = styled.div`
    margin-top: 32px;
    flex: 1;
    min-width: 0;
    padding-bottom: 32px;
`;

export const BioText = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    color: ${colors.text};
    margin: 2px 0 0 0;
    line-height: 1.5;
    font-weight: 400;
`;

export const EditProfileLink = styled.button`
    display: block;
    margin: 0 auto 16px;
    background: none;
    border: none;
    text-decoration: underline;
    color: ${colors.muted};
    cursor: pointer;
    font-size: 11px;
    font-family: 'Lato', sans-serif;
    font-style: italic;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.7;
    }
`;

export const TabContainer = styled.div`
    display: flex;
    gap: 28px;
    justify-content: center;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid ${colors.border};
`;

export const TabButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: ${colors.text};
    font-family: 'Lato', sans-serif;
    font-weight: ${props => props.active ? 700 : 400};
    border-bottom: ${props => props.active ? `3px solid ${colors.accent}` : '3px solid transparent'};
    padding-bottom: 10px;
    margin-bottom: -14px;
    text-transform: capitalize;
    transition: all 0.2s ease;

    &:hover {
        opacity: 0.8;
    }
`;

export const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
`;

export const SectionLabel = styled.span`
    font-size: 10px;
    font-weight: 700;
    color: ${colors.muted};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-family: 'Lato', sans-serif;
`;

export const SectionCount = styled.span`
    font-size: 11px;
    color: ${colors.muted};
    font-family: 'Lato', sans-serif;
`;

export const ProfileUsername = styled.h2`
    font-family: 'Lato';
    font-size: 24px;
    font-weight: 400;
    color: ${colors.text};
    margin: 0 0 4px;
    text-align: center;
`;
