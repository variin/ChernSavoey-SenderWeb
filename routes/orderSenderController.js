var express = require('express');
const db = require('../model/db');

var router = express.Router();

router.get('/:orderId', async function(req, res, next) {
    console.log("------------" + req.params.orderId);
    const getOrder = await db
        .collection("cart")
        .orderBy("hour", "desc")
        .get().then((querySnapshot) => {
            let orderArr = [];
            querySnapshot.forEach((cart) => orderArr.push({ orderId: cart.id, ...cart.data() }));
            return orderArr;
        });
    console.log("------------" + getOrder.length);

    const orderId = req.params.orderId;

    const orderDetails = await db.collection("cart")
        .doc(orderId)
        .get()
        .then((querySnapshot) => querySnapshot.data());

    const orderList = orderDetails;
    console.log(orderId);
    console.log(orderList);
    console.log(getOrder);

    res.render("orderSender", { getOrder, orderList, orderId });

});

router.get('/order/update/:orderId/:senderId/:status', async function(req, res) {
    const orderId = req.params.orderId;
    const senderId = req.params.senderId;
    const status = req.params.status;
    const orderDetails = await db.collection("cart")
        .doc(orderId)
        .update({
            senderId: senderId,
            status: status
        }).then((data) => {
            console.log("Update Complate")
            return res.status(200).send()
        }).catch(err => {
            return res.status(400).send()
        })
    return res.status(200).send()
})


module.exports = router;