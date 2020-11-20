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

router.post('/:orderId/chat', async function(req, res, next) {
    const orderId = req.params.orderId;
    const receiveId = req.body.receiveId; //ผู้รับข้อความ
    const senderId = req.body.senderId; //ผู้ส่งข้อความ
    const message = req.body.message;
    const d = new Date();

    const ref = db.collection('chat').doc(orderId)
    console.log(req.body);

    const chatRef = await ref.get().then((snapshot) => snapshot.data())

    if (!chatRef.messages) {
        await ref.set({
            messages: []
        })
    }
    let newChat = []
    newChat = [...chatRef.messages, {
        receiveId,
        senderId,
        message,
        day: d,
    }]

    console.log("New Chat ", newChat)

    await ref.update({
        messages: newChat
    })

    return res.status(200);
});


router.get('/:orderId/chat', async function(req, res, next) {
    const orderId = req.params.orderId;
    res.render('chat', { orderId });
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