import styled from 'styled-components';
import { GlobalContentWrapper } from './globalStyles';

export const PlaceWrapper = GlobalContentWrapper;

export const PlaceProfileContainer = styled.div`
    position: relative;
`;

export const PlaceContainer = styled.div`
    background-color: #F5F1E8;
    width: 350px;
    margin: auto;
    margin-top: 50px;
    padding: 45px;
    border: 2px solid #D4A574;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
`;

export const PlaceMenuContainer = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
`;

export const PlaceItem = styled.div`
    background-color: #FFFCF7;
    border: ${props => props.variant === 'post' ? 'none' : '2px solid #D98560'};
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    transition: opacity 0.2s ease;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);

    &:hover {
        opacity: 0.9;
    }
`;

export const PlaceImage = styled.div`
    width: 100%;
    height: 140px;
    background-color: #D4A574;
`;

export const PlaceInfoSection = styled.div`
    padding: 20px 24px;
    background-color: #F5F1E8;
`;

export const PlaceName = styled.h3`
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: #8B4513;
    margin: 0 0 8px 0;
    line-height: 1.2;
`;

export const PlaceMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    color: #5C3D2E;
`;

export const PlaceMetaDivider = styled.span`
    color: #D4A574;
`;

export const PlaceAddress = styled.span`
    font-size: 12px;
    color: #8B7355;
    text-decoration: underline;
    text-underline-offset: 2px;
`;

export const PlacePrice = styled.span`
    font-size: 14px;
    font-weight: 700;
    color: #5C3D2E;
`;

export const PlaceRating = styled.span`
    font-size: 14px;
    color: #5C3D2E;
`;

export const PlaceRatingStar = styled.span`
    color: #D98560;
`;

export const PlaceRatingCount = styled.span`
    font-size: 12px;
    color: #8B7355;
`;

export const PlacedDate = styled.p`
    font-size: 14px;
    color: #8B4513;
    margin-top: 0px;
    margin-bottom: 10px;
    margin-left: 0;
    font-family: 'Lato', sans-serif;
    font-style: italic;
    text-align: left;
`;

export const PlaceActionButton = styled.button`
    background-color: #8B4513;
    border: 2px solid #D98560;
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
        background-color: #D98560;
        color: #2C2C2C;
        border-color: #8B4513;
    }
`;

export const PlaceGridStyles = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 310px);
    gap: 20px;
    width: 100%;
    justify-content: center;
`;
