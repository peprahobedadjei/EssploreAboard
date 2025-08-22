const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = JSON.stringify(req.body);
  const sig = req.headers["stripe-signature"];
  const dateTime = new Date(req.body.created * 1000).toLocaleDateString();
  const timeString = new Date(req.body.created * 1000).toLocaleTimeString();

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("Event type:", event.type);
    console.log("Event time:", dateTime, timeString);

    // Handle different payment events
    switch (event.type) {
      case "charge.succeeded":
        // Charge succeeded
console.log ("Payment done ")
        break;

      case "charge.failed":
        // Charge failed
console.log ("Payment failed")
        break;

      case "charge.pending":
      // Charge is pending

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return success response
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return res
      .status(400)
      .json({ error: "Webhook signature verification failed" });
  }
}
