import {createContext, useEffect, useState} from 'react';

const addCartItem = (cartItems , productToAdd) =>{
    //find if cartItems contain productToAdd
    const existingCartItem = cartItems.find((cartItem) => 
        cartItem.id == productToAdd.id
    );

    // If found increment quantity
    if(existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id == productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );

    }

    // return new array with modified cartItems/new cart item 
    return [...cartItems, {...productToAdd, quantity:1}];
}

const removeCartItem = (cartItems, cartItemToRemove) =>{
    //find the cart Item to remove
    const existingCartItem = cartItems.find(
        (cartItem)=> cartItem.id == cartItemToRemove.id
    );

    // check if quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity==1) {
        return cartItems.filter(cartItem=> cartItem.id != cartItemToRemove.id)
    }

    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
            cartItem.id == cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        );


}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem=> cartItem.id != cartItemToClear.id)
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    totalCount: 0,
    showCheckout: false,
    setShowCheckout: () => {},
    setCartItems: () => {},
    setTotalCount: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {}
   
});





export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);
    const [totalCount, setTotalCount]= useState(0);

    useEffect(()=> {
        const newCartCount = cartItems.reduce((total, cartItem)=> total+cartItem.quantity,0)
        setCartCount(newCartCount)

    }, [cartItems]);

    useEffect(()=> {
        const newTotalCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity* cartItem.price,0);
        setTotalCount(newTotalCount);

    }, [cartItems])



    


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));

    }

    const removeItemFromCart = (productToAdd) => {
        setCartItems(removeCartItem(cartItems, productToAdd));

    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear ));
    }
    

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        showCheckout,
        setShowCheckout,
        setCartItems,
        totalCount,
        setTotalCount,
        removeItemFromCart,
        clearItemFromCart
    
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}