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
    background-color: #F5F1E8;
    border: 2px solid #D98560;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.8;
    }
`;

export const PlaceContent = styled.div`
    display: flex;
    gap: 15px;
    align-items: flex-start;
`;

export const PlaceImage = styled.div`
    width: 100px;
    height: 100px;
    min-width: 100px;
    background-color: #D4A574;
    flex-shrink: 0;
`;

export const PlaceDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
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
