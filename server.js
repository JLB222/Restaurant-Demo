import 'dotenv/config';
import express from 'express'
const App = express()
import Stripe from 'stripe'
import cors from 'cors'

const stripe = new Stripe(process.env.STRIPE_SK)
App.use(cors())
App.use(express.json());  //This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
const PORT = process.env.SERVER_PORT || 4242

App.post("/create-checkout-session", async (req,res) => {
    const {cartItems} = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: cartItems.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name 
                    },
                    unit_amount: item.price * 100 //converts your value to cents
                },
                quantity: item.quantity
            })),
            success_url: "http://localhost:3001/success",
            cancel_url: "http://localhost:3001/cancel",
        });
        res.json({url: session.url});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
});

App.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// App.get("/menu", (req,res) => {
//     console.log("This should request the menu data from the database & send it to the user.")
// })
