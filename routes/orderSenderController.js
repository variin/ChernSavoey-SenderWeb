var express = require('express');
const db = require('../model/db');

var router = express.Router();

router.get('/myOrder', async function (req, res, next) {
    res.render('orderSender');
});

router.get('/:orderId', async function (req, res, next) {
    const orderId = req.params.orderId;

    const orderDetail = await db.collection("cart")
        .doc(orderId)
        .get()
        .then((querySnapshot) => querySnapshot.data());
    const orderList = orderDetail.order_detail;
    const location = orderDetail.Location;
    const phoneno = orderDetail.cus_phoneno;
    const customerName = orderDetail.customer;
    const shopName = orderDetail.shopName;
    const totalprice = orderDetail.totalPrice; 
    const notetosender = orderDetail.note; 
    console.log(orderId);
    console.log(orderList);
    res.render("orderSender", {orderList,location,phoneno,customerName,shopName,totalprice,notetosender,orderId});

});

router.post('/:orderId/chat', async function (req, res, next) {
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


router.get('/:orderId/chat', async function (req, res, next) {
    const orderId = req.params.orderId;
    const orderDetail = await db.collection("cart")
        .doc(orderId)
        .get()
        .then((querySnapshot) => querySnapshot.data());
    
    const phoneno = orderDetail.cus_phoneno;
    const customerName = orderDetail.customer;
    
    console.log(orderId);
    res.render("chat", {phoneno,customerName,orderId, user: req.user});

});


router.get('/order/update/:orderId/:senderId/:status', async function (req, res) {
    const orderId = req.params.orderId;
    const senderId = req.params.senderId;
    const status = req.params.status;


	console.log("Callback ---------------------------- ==> ", req.user)
	req.session.profile = req.user;

    const orderDetails = await db.collection("cart")
        .doc(orderId)
        .update({
            senderId: req.user.displayName,
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