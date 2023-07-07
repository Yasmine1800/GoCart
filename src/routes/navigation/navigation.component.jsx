import { Fragment, useContext} from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactComponent as CrownLogo} from '../../assets/crown.svg' ;


import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { selectCurrentUser } from "../../store/user/user.selector";

import {signOutUser} from '../../utils/firebase/firebase.utils';

import { NavigationContainer, LogoContainer, NavLink, NavLinks } from "./navigation.styles";

import {selectIsCartOpen} from '../../store/cart/cart.selector';

const Navigation = () => {

    const currentUser = useSelector(selectCurrentUser);
    // const {isCartOpen} = useContext(CartContext);
    const isCartOpen = useSelector(selectIsCartOpen)
    


    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                        ) : 
                                (<NavLink className="nav-link" to='/auth'>
                                    Sign In
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