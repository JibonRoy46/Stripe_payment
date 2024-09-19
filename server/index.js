import express from"express"
import Stripe from "stripe";
import cors from 'cors'
import 'dotenv/config'
const app= express();
app.use(cors())

const port= (process.env.port || 5000 );
const MY_DOMAIN = (process.env.MY_DOMAIN)
const stripeSecretKey =(process.env.stripeSecretKey)

app.post('/create-checkout-session', async (req, res) => {
  try {
    const stripe =new Stripe(stripeSecretKey)
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1Q0TJfICieato9uum3gKjfXW',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${MY_DOMAIN}?success=true`,
      cancel_url: `${MY_DOMAIN}?canceled=true`,
    });
  
    res.redirect(303, session.url);
  } catch (error) {
    console.log("error", error);
    
  }
  });
  
  
  app.listen(port, () => console.log(`server is running on port ${port}`));


