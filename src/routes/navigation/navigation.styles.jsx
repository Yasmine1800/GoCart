import styled from 'styled-components';
import { HiShoppingBag } from "react-icons/hi2";
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`

    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;

`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
      
`;


export const NavLinks = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
  
export const NavLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`

export const ShoppingBagIcon = styled(HiShoppingBag)`
    font-size: 36px; 
    color: #DB3022; 
    
`;

export const RedButton = styled.button`
    background-color: #DB3022;
    color: white;
    border: 1px solid white;
    padding: 10px 20px; 
    cursor: pointer;
    font-size: 16px; 

    &:hover {
        background-color: #B22110; 
    }

    &:active {
        transform: scale(0.95);
    }
    
`;

export const BlackButton = styled.button`
    background-color: black; 
    color: white; 
    border: 1px solid black; 
    padding: 10px 20px; 
    cursor: pointer;
    font-size: 16px; 
    transition: background-color 0.3s;  

    &:hover {
        background-color: white; 
        color: black; 
    }
`;
 
  
