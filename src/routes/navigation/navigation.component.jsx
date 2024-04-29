import { Fragment, useContext} from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";


import { ReactComponent as CrownLogo} from '../../assets/crown.svg' ;
import { BlackButton, RedButton, ShoppingBagIcon } from "./navigation.styles";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";





import {signOutUser} from '../../utils/firebase/firebase.utils';

import { NavigationContainer, LogoContainer, NavLink, NavLinks } from "./navigation.styles";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";



const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen, clearCartItems } = useContext(CartContext)
    const navigate = useNavigate()


    const signOutHandler = () => {
        signOutUser()
        clearCartItems()
        navigate("/")
    }


    


    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                   
                <ShoppingBagIcon className="logo" />

                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutHandler}>
                                <BlackButton>
                                 SIGN OUT    
                                </BlackButton>
                            </NavLink>
                        ) : 
                                (<NavLink className="nav-link" to='/auth'>
                                    <RedButton>
                                    Sign In
                                    </RedButton>
                                </NavLink>)
                    }
                    <CartIcon/>
                   
                </NavLinks>
                {isCartOpen && <CartDropdown/>}
                
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
};

export default Navigation;