import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import  { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { useState } from "react";
import { FormContainer, PaymentButton, PaymentFormContainer } from "./payment-form.styles";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProccessingPayment, setIsProccessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      setIsProccessingPayment(true);
      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      console.log(response.json());
      const {
        paymentIntent: { clientSecret },
      } = await response.json();

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser ? currentUser.displayName : "Guest",
          },
        },
      });

      if (paymentResult.error) {
        alert(paymentResult.error);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        alert("payment successful");
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      // Handle error display or other actions here
    } finally {
      setIsProccessingPayment(false);
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProccessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
