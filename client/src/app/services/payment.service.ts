import { loadStripe } from "@stripe/stripe-js";
import { API } from "../utils/axios.utils";

class PaymentService {
  stripePromise = loadStripe(`${import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY}`);

  async createCheckoutSession(shoppingCart: { price_id: string, quantity: number}[], stripeCustomerId: string) {
    try {
      const shoppingCartToStripe = shoppingCart.map((item) => ({
        price_id: item.price_id,
        quantity: item.quantity,
      }))

      const data = await API().post(
        `${
          import.meta.env.VITE_APP_API_URL
        }/payment/checkout/${stripeCustomerId}`, {
          shoppingCart: shoppingCartToStripe,
        }
      );

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
