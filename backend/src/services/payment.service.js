const razorpay = require('../config/razorpayClient');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
  async generatePaymentLink(order) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `https://illiterate-chef.onrender.com/payment/success/${order._id}`,
        cancel_url: 'https://illiterate-chef.onrender.com/cancel',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: Math.round(order.totalAmount * 100), 
              product_data: {
                name: 'Pizza Burger',
              },
            },
            quantity: 1,
          },
        ],
      });

      console.log('Session:', session);
      
      return { payment_url: session.url };
    } catch (error) {
      throw new Error(`Failed to generate payment link: ${error.message}`);
    }
  },

  
  async createRazorpayPaymentLink( order) {
    try {
        const paymentLinkRequest = {
            amount: order.totalAmount * 100,
            currency: 'INR',
            
            callback_url: `https://illiterate-chef.onrender.com/payment/success/${order._id}`,
            callback_method: 'get'
        };

     
      
          const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
      console.log("payment link",paymentLink);
         
      return { payment_url: paymentLink.short_url };
        // return paymentLink;
    } catch (err) {
        console.error(err.message);
        throw new Error(err.message);
    }
}
};
