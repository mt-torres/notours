import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe('pk_test_51PkQE2P5HwHVlu8LfRXGiVBf4sJEubSRx9CrJNcJC2CvrAlvncMfxDRfIYympfCKQro3iZejL6x4DEcVAVfJkdQ600BN5csYAC');

export const bookTour = async tourId => {
  try {
    //1 get checkout session from API
    const session = await axios(`/api/v1/booking/checkout-session/${tourId}`);
    //2 create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('Error', err);
  }
};
