import { Routes, Route} from 'react-router-dom';
import {useContext, useEffect} from "react";

import { 
  onAuthStateChangedListener,
  createUserDocumentFromAuth
  
} from "./utils/firebase/firebase.utils";

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './components/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { UserContext } from './contexts/user.context';



const App = () => {
  const { setCurrentUser } = useContext(UserContext)
  useEffect(()=> {
    const unsubscribe = onAuthStateChangedListener((user)=> {
        if(user) {
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user)
    });
    return unsubscribe;
}, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>

        <Route index element={< Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout/>} />

      </Route>
    </Routes>
  );

};

export default App;
