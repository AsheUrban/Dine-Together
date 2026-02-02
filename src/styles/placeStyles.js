import styled from 'styled-components';
import { GlobalContentWrapper } from './globalStyles';

const colors = {
    bg: '#FFFFFF',
    text: '#000000',
    muted: 'rgba(0, 0, 0, 0.6)',
    border: '#000000',
    borderLight: '#fafafa',
};

const fonts = {
    primary: 'Courier, monospace',
};

export const PlaceWrapper = GlobalContentWrapper;

export const PlaceProfileContainer = styled.div`
    position: relative;
`;

export const PlaceContainer = styled.div`
    background-color: ${colors.bg};
    width: 350px;
    margin: auto;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid ${colors.border};
    text-align: center;
    position: relative;
    font-family: ${fonts.primary};
`;

export const PlaceMenuContainer = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
`;

export const PlaceItem = styled.div`
    background-color: ${colors.bg};
    border: 1px solid ${colors.border};
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    font-family: ${fonts.primary};

    &:hover {
        opacity: 0.9;
    }
`;

export const PlaceImageContainer = styled.div`
    position: relative;
    width: 100%;
    border-bottom: 1px solid ${colors.border};
`;

export const PlaceImage = styled.div`
    width: 100%;
    height: ${props => props.variant === 'post' ? '200px' : '100px'};
    background-color: ${colors.borderLight};
`;

export const GradientBar = styled.div`
    display: none;
`;

export const PlaceInfoSection = styled.div`
    padding: 12px;
    font-size: 13px;
    line-height: 1.7;
`;

export const PlaceNameRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px dotted ${colors.border};
    padding-top: 8px;
    margin-top: 8px;
`;

export const PlaceName = styled.h3`
    font-family: ${fonts.primary};
    font-size: ${props => props.variant === 'post' ? '18px' : '14px'};
    font-weight: 700;
    color: ${colors.text};
    margin: 0 0 6px 0;
    line-height: 1.2;
`;

export const RatingPill = styled.span`
    font-family: ${fonts.primary};
    font-size: ${props => props.variant === 'post' ? '13px' : '12px'};
    font-weight: 400;
    color: ${colors.text};
`;

export const PlaceAddress = styled.p`
    font-size: ${props => props.variant === 'post' ? '13px' : '12px'};
    color: ${colors.text};
    opacity: 0.7;
    font-family: ${fonts.primary};
    margin: 0;
`;

export const PlacePrice = styled.span`
    font-size: ${props => props.variant === 'post' ? '13px' : '12px'};
    font-weight: 400;
    color: ${colors.text};
    font-family: ${fonts.primary};
`;

export const PlaceMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    font-family: ${fonts.primary};
    font-size: 12px;
    color: ${colors.text};
`;

export const PlaceMetaDivider = styled.span`
    opacity: 0.5;
`;

export const PlaceRating = styled.span`
    font-size: 12px;
    color: ${colors.text};
    font-family: ${fonts.primary};
`;

export const PlaceRatingStar = styled.span`
    color: ${colors.text};
`;

export const PlaceRatingCount = styled.span`
    font-size: 11px;
    color: ${colors.text};
    opacity: 0.6;
    font-family: ${fonts.primary};
`;

export const PlacedDate = styled.p`
    font-size: 11px;
    color: ${colors.text};
    opacity: 0.6;
    margin-top: 8px;
    margin-bottom: 0;
    margin-left: 0;
    font-family: ${fonts.primary};
    text-align: left;
`;

export const PlaceActionButton = styled.button`
    background-color: ${colors.bg};
    border: 1px solid ${colors.border};
    margin: 10px;
    color: ${colors.text};
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline;
    font-size: 12px;
    cursor: pointer;
    font-family: ${fonts.primary};
    font-weight: 700;

    &:hover {
        background-color: ${colors.text};
        color: ${colors.bg};
    }
`;

export const PlaceGridStyles = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    width: 100%;
`;

export const PlaceContent = styled.div`
    display: flex;
    gap: 12px;
    align-items: flex-start;
    font-family: ${fonts.primary};
`;

export const PlaceDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    font-family: ${fonts.primary};
`;
