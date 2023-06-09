import { useState} from "react";

import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";


import Button from "../button/button.component";

import './sign-up-form.styles.jsx';
import { SignUpContainer, Title } from "./sign-up-form.styles.jsx";


const defaultFormFields = {
    displayName : '',
    email: '',
    password: '',
    confirmPassword: ''

}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

   
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password != confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
         
            await createUserDocumentFromAuth(user, {displayName});

            resetFormFields();

        } catch (error) {
            if(error.code == 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error',error);
                
            }
        }
        
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name] : value});
    };

    return (
        <SignUpContainer>
            <Title>Don't have an account ?</Title>
            <span>Sign Up with Your Email and Password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName} />

                
                <FormInput
                label= "Email" 
                type="email" 
                required 
                onChange={handleChange}
                 name="email"
                  value={email}/>

                
                <FormInput
                label="Password" 
                type="password"
                required
                onChange={handleChange}
                name="password"
                value={password}/>

               
                <FormInput label="Confirm Password"
                type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button buttonType ='inverted' type="submit">Sign Up</Button>

            </form>



        </SignUpContainer>
    )
}

export default SignUpForm;