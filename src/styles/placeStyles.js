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
    warm: '#D4956A',
    olive: '#8B956A',
};

export const PlaceWrapper = GlobalContentWrapper;

export const PlaceProfileContainer = styled.div`
    position: relative;
`;

export const PlaceContainer = styled.div`
    background-color: ${colors.card};
    width: 350px;
    margin: auto;
    margin-top: 50px;
    padding: 45px;
    border: 2px solid ${colors.border};
    text-align: center;
    position: relative;
`;

export const PlaceMenuContainer = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
`;

export const PlaceItem = styled.div`
    background-color: ${colors.bg};
    border: ${props => props.variant === 'post' ? `1px solid ${colors.border}` : `2px solid ${colors.border}`};
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    transition: opacity 0.2s ease;
    overflow: hidden;

    &:hover {
        opacity: 0.9;
    }
`;

export const PlaceImageContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const PlaceImage = styled.div`
    width: 100%;
    height: ${props => props.variant === 'post' ? '160px' : '100px'};
    background-color: ${colors.border};
`;

export const GradientBar = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${colors.accent}, ${colors.warm}, ${colors.olive});
`;

export const PlaceInfoSection = styled.div`
    padding: 12px 14px;
`;

export const PlaceNameRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 4px;
`;

export const PlaceName = styled.h3`
    font-family: 'Lato', sans-serif;
    font-size: ${props => props.variant === 'post' ? '20px' : '16px'};
    font-weight: 400;
    color: ${colors.text};
    margin: 0;
    line-height: 1.2;
`;

export const RatingPill = styled.div`
    background-color: ${colors.accent};
    color: #FFFFFF;
    padding: 2px 8px;
    font-size: ${props => props.variant === 'post' ? '12px' : '10px'};
    font-weight: 600;
    font-family: 'Lato', sans-serif;
    flex-shrink: 0;
`;

export const PlaceAddress = styled.p`
    font-size: ${props => props.variant === 'post' ? '12px' : '10px'};
    color: ${colors.muted};
    font-family: 'Lato', sans-serif;
    margin: 0 0 4px 0;
`;

export const PlacePrice = styled.span`
    font-size: ${props => props.variant === 'post' ? '14px' : '12px'};
    font-weight: 600;
    color: ${colors.text};
    font-family: 'Lato', sans-serif;
`;

// Legacy exports for compatibility
export const PlaceMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    color: ${colors.text};
`;

export const PlaceMetaDivider = styled.span`
    color: ${colors.warm};
`;

export const PlaceRating = styled.span`
    font-size: 11px;
    color: ${colors.text};
`;

export const PlaceRatingStar = styled.span`
    color: ${colors.accent};
`;

export const PlaceRatingCount = styled.span`
    font-size: 10px;
    color: ${colors.muted};
`;

export const PlacedDate = styled.p`
    font-size: 12px;
    color: ${colors.muted};
    margin-top: 8px;
    margin-bottom: 0;
    margin-left: 0;
    font-family: 'Lato', sans-serif;
    font-style: italic;
    text-align: left;
`;

export const PlaceActionButton = styled.button`
    background-color: #8B4513;
    border: 2px solid ${colors.accent};
    margin: 10px;
    color: #F5F1E8;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline;
    font-size: 16px;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${colors.accent};
        color: #FFFFFF;
        border-color: #8B4513;
    }
`;

export const PlaceGridStyles = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
    width: 100%;
`;

// Keep old exports for backwards compatibility
export const PlaceContent = styled.div`
    display: flex;
    gap: 15px;
    align-items: flex-start;
`;

export const PlaceDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
`;
