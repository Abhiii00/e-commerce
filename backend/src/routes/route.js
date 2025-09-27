const express = require('express')
const router = express.Router()

const paymentController = require('../Controller/checkoutController')

router.post('/paymentCheckout', paymentController.paymentCheckout)
router.get('/verifyPayment', paymentController.verifyPayment)




module.exports = router