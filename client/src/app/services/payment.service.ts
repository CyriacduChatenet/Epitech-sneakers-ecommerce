import { loadStripe } from "@stripe/stripe-js";
import { API } from "../utils/axios.utils";

class PaymentService {
  stripePromise = loadStripe(`${import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY}`);

  async createCheckoutSession(shoppingCart: any, stripeCustomerId: string) {
    try {
      console.log(shoppingCart);
      const data = await API().post(
        `${
          import.meta.env.VITE_APP_API_URL
        }/payment/checkout/${stripeCustomerId}`,
        {
          location: `Bordeaux, Gironde, France`,
          amount: 10000,
          price_id: shoppingCart[0].stripe_price_id,
        }
      );
      console.log(data);

      const stripe = await this.stripePromise;
      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: data.data.sessionId,
        });
        if (result.error) {
          console.error(result.error.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default PaymentService;
