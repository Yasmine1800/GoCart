import { useContext, useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import { FormContainer, PaymentFormContainer } from "./payment-form.styles";

import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const {totalCount} = useContext(CartContext);

    const {currentUser} = useContext(UserContext);

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);


    const paymentHandler = async(e) => {
        e.preventDefault();
        
        if(!stripe || !elements) {
            return;
        }
        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: totalCount * 100})
        }).then(res => res.json());

        const {paymentIntent: {client_secret}} = response;
       

        const paymentResult = stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'guest'
                }
            }
        });

        setIsProcessingPayment(false);

        if(paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if(paymentResult.paymentIntent && paymentResult.paymentIntent.status === 'succeeded'){
                alert('Payment Successful')
            }
        }

    }


    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment : </h2>
                <CardElement/>
                <Button isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
            </FormContainer>
        </PaymentFormContainer>
    )
};

export default PaymentForm;