// import React from 'react';

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [cardError, setCardError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('error', error);
            setCardError(error.message)
        }
        else {
            console.log('payment method', paymentMethod);
            setCardError('')
        }
    }
    return (
        <>

            <form className="w-[20rem] md:w-[40rem] m-4 spa grid grid-cols-1 border-2 gap-12 justify-center items-center" onSubmit={handleSubmit}>
                <CardElement
                    options={{

                    }}
                />
                <button className="btn btn-primary justify-center items-center" type="submit" disabled={!stripe}>
                    Pay
                </button>
                {cardError && <p className="text-red-600">{cardError}</p>}
            </form>

        </>
    );
};

export default CheckoutForm;