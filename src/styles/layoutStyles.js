import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DineTogetherHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    color: #F5F1E8;
    padding: 25px 40px;
    margin: auto;
    background-color: #8B4513;
    box-sizing: border-box;
`;

export const HeaderLogo = styled.div`
    flex: 0 0 auto;
`;

export const HeaderNav = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    flex: 1;
    font-family: 'Lato', sans-serif;
`;

export const HeaderProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    flex: 0 0 auto;
`;

export const NavLink = styled(Link)`
    color: #F5F1E8;
    text-decoration: none;
    font-family: 'Lato', sans-serif;
    font-size: 16px;

    &:hover {
        text-decoration: underline;
    }
`;

export const SignOutButton = styled.button`
    background: none;
    border: none;
    color: #F5F1E8;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Lato', sans-serif;
    padding: 0;

    &:hover {
        text-decoration: underline;
    }
`;

export const BackgroundStyles = styled.div`
    background-color: #F5F1E8;
    min-height: 100vh;
    padding: 40px 20px;
`;

export const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 20px;
`;

export const ProfilePageContainer = styled.div`
    display: flex;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

export const ProfileInfoSection = styled.div`
    margin-top: 20px;
    flex: 0 0 300px;
    background-color: #D98560;
    padding: 40px;
    border-radius: 10px;
    height: fit-content;
`;

export const ProfileRestaurantSection = styled.div`
    margin-top: 20px;
    flex: 1;
    min-width: 0;
`;

  export const ProfileRestaurantGrid = styled.div`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      width: 100%;

      @media (max-width: 1024px) {
          grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 640px) {
          grid-template-columns: 1fr;
      }
  `;

  export const CardWrapper = styled.div`
      display: flex;
      flex-direction: column;
      gap: 4px;
      height: fit-content;
      width: 100%;
  `; 
