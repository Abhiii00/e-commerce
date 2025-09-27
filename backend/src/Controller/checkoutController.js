const orderModel = require('../Model/orderModel')
const config = require('../Config/config')
const stripe = require('stripe')(config.STRIPEKEY);


exports.paymentCheckout = async (req, res) => {
    const { products, email } = req.body
    try {
        const lineItems = products.map((product) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.title,
                        images: [product.image],
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity,
            };
        });
        
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3001/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:3001/cancel",
        });

        res.json({
            id: session.id,
        });

        await orderModel.create({
            email: email,
            sessionId: session.id,
            transactionId: null,
            paymentStatus: "unpaid",
            products: products
        });

    } catch (error) {        
        res.json({ success: false, msg: 'Internal Server Error' });
    }
}


exports.verifyPayment = async (req, res) => {

    console.log("Received verifyPayment request with query:", req.query);
    const { session_id } = req.query;

    if (!session_id) {
        return res.status(400).json({ success: false, message: "Missing session_id" });
    }

    console.log("Verifying session_id:", session_id);

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === "paid") {
            await orderModel.findOneAndUpdate(
                { sessionId: session_id },
                {
                    $set: {
                        paymentStatus: session.payment_status,
                        transactionId: session.payment_intent
                    },
                },
                { new: true }
            );

            res.json({ success: true, message: "Payment successful" });
        } else {
            res.json({ success: false, message: "Payment not completed" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, msg: "Internal Server Error" });
    }
};
