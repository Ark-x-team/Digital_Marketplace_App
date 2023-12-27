const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

const checkout = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
        cart: JSON.stringify(req.body.cartItems),
      },
    });

    const line_items = req.body.cartItems.map((item) => {
      return {
        price_data: {
          currency: "mad",
          product_data: {
            name: item.name,
            images: [item.image],
            description: item.desc,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.cartQuantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer: customer.id,
      success_url: `http://localhost:5173/checkout-success`,
      cancel_url: `http://localhost:5173/cart`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "Failed to checkout", error: error.message });
    console.error(error);
  }
};

module.exports = { checkout };
