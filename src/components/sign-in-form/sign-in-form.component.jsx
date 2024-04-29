import { useState, useContext} from "react";
import FormInput from "../form-input/form-input.component";

import { UserContext } from "../../contexts/user.context";

import { Title, SignInFormContainer, ButtonsContainer } from "./sign-in-form.styles.jsx";


import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import './sign-in-form.styles.jsx';

import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword 

} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email : '',
    password: ''
}

const SignInForm = () => {


    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        
    }
    
    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name] : value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            
            resetFormFields();
        } catch (error) {
            
            switch(error.code) {
                case 'auth/wrong-password' : 
                    alert('Wrong Password');
                    break;

                case 'auth/user-not-found' :  
                    alert('NO USER associated with this email'); 
                    break;
                default: 
                    console.log(error);
            }
            
            console.log(error);
        }
    }


    return(
        <SignInFormContainer>
            <Title>Already have an account ?</Title>
            <span>Sign In with your email and password</span>
           
            <form onSubmit={handleSubmit}>

                <FormInput
                label='email'
                type='email'
                required
                onChange= {handleChange}
                name="email"
                value={email}/>

                <FormInput
                label='password'
                type='password'
                required
                onChange={handleChange}
                name='password'
                value={password}/>

                <ButtonsContainer>

                    <Button buttonType='inverted' type='submit'>Sign In</Button>
                    <Button  buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>Google Sign In</Button>

                </ButtonsContainer>

            </form>
        </SignInFormContainer>
    )
}


export default SignInForm;