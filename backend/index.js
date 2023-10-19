// Complete this variables with your own information.
const FRONTEND_DOMAIN = 'http://127.0.0.1:5500/frontend/'
const STRIPE_TEST_SECRET_KEY =
    'sk_test_51O1lHzBx1ZN5KFX7kbZDOnAwrEmyMHG3YzaYCDlYTNMENvW8MwbqLznBZ0jsj9UNZz1nLfgApJACocjk7r1i3Fi90002biTxyy'
const WEBHOOK_SECRET = ''

const stripe = require('stripe')(STRIPE_TEST_SECRET_KEY)

const cors = require('cors')

const express = require('express')
const app = express()
app.use(express.static('public'))
app.use(cors())

app.use((req, res, next) => {
    // We need the raw body to verify webhook signatures.
    if (req.originalUrl === '/webhook') {
        next()
    } else {
        express.json()(req, res, next)
    }
})

app.get('/', (req, res) => {
    res.send('Hello from the Webtech Payment Service!')
})

// This endpoint is used by the frontend to create a Stripe Checkout session.
app.post('/create-checkout-session', async (req, res) => {
    console.log('Connecting with Stripe...')
    console.log(req.body)

    const session = await stripe.checkout.sessions.create({
        line_items: req.body,
        mode: 'payment',
        success_url: `${FRONTEND_DOMAIN}/success.html`,
        cancel_url: `${FRONTEND_DOMAIN}/cancel.html`,
    })

    res.json({ url: session.url })
})

// This endpoint is used by Stripe to send us information about the payment.
app.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    (request, response) => {
        console.log('Received event from Stripe')
        const sig = request.headers['stripe-signature']

        let event
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                sig,
                WEBHOOK_SECRET
            )
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`)
            return
        }

        // Handle the event
        console.log('This is an event coming from Stripe')
        switch (event.type) {
            case 'checkout.session.completed':
                const checkoutSessionCompleted = event.data.object
                // Then define and call a function to handle the event checkout.session.completed
                console.log(checkoutSessionCompleted)

                // Send information to the API
                fetch('http://localhost:3000/orders', {
                    method: 'POST',
                    body: JSON.stringify({
                        // Send whatever information we need to the API.
                        payment_intent: checkoutSessionCompleted.payment_intent,
                        customer:
                            checkoutSessionCompleted.customer_details.name,
                        email: checkoutSessionCompleted.customer_details.email,
                    }),
                })

                break
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`)
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send()
    }
)

app.listen(4242, () => console.log('Running on port 4242'))
