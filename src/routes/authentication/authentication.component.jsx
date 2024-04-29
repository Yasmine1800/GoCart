import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { useState } from 'react';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import {AuthenticationContainer, IllustrationImage, IllustrationImage2} from './authentication.styles.jsx';

import './authentication.styles.jsx';
import illutstartionSvg from '../../assets/shopping_woman.svg'
import coupleShopping from '../../assets/svg1_shopping_couple.svg'

const Authentication = ()=> {

    const [showSignup,setShowSignup] = useState(false);

    const handleShowSignUp = () => {
        setShowSignup(prev => !prev);
    }


    return (
        <AuthenticationContainer>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {showSignup ? (
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}>
                        <div>
                            <SignUpForm />
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <p 
                                    style={{ 
                                        fontSize: 'small', 
                                        color: 'red', 
                                        marginTop: '5px', 
                                        cursor: 'pointer', 
                                        transition: 'all 0.3s',
                                    }}
                                    onClick={handleShowSignUp}
                                    onMouseEnter={(e) => e.target.style.color = '#8B0000'}
                                    onMouseLeave={(e) => e.target.style.color = 'red'}
                                >
                                    Already have an account? Sign in now!
                                </p>
                            </div>
                        </div>
                        <div style={{ marginLeft: '100px' }}>
                            <IllustrationImage2 src={coupleShopping}/>
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <SignInForm />
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <p 
                                    style={{ 
                                        fontSize: 'small', 
                                        color: 'red', 
                                        marginTop: '5px', 
                                        cursor: 'pointer', 
                                        transition: 'all 0.3s',
                                    }}
                                    onClick={handleShowSignUp}
                                    onMouseEnter={(e) => e.target.style.color = '#8B0000'}
                                    onMouseLeave={(e) => e.target.style.color = 'red'}
                                >
                                    Don't have an account? Sign up now!
                                </p>
                            </div>
                        </div>
                        <div style={{ marginLeft: '100px' }}>
                            <IllustrationImage src={illutstartionSvg}/>
                        </div>
                    </>
                )}
            </div>
        </AuthenticationContainer>
    )
}

export default Authentication;