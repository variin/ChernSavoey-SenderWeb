var express = require('express');
const { query } = require('express-validator');
const db = require('../model/db');
var router = express.Router();

/* GET shops page. */

router.get("/", async(req, res) => {
    const getOrder = await db
        .collection("cart")
        .orderBy("hour", "desc")
        .get().then((querySnapshot) => {
            let orderArr = [];
            querySnapshot.forEach((cart) => orderArr.push({ orderId: cart.id, ...cart.data() }));
            return orderArr;
        });
    console.log(getOrder);
    res.render("homeSender", { getOrder });

});

router.get("/:orderId", async(req, res) => {
    const orderId = req.params.orderId;
    const orderDetails = await db.collection("cart")
        .doc(orderId)
        .get()
        .then((querySnapshot) => querySnapshot.data());
    const orderList = orderDetails.detailOrder;
    console.log(orderId);
    console.log(orderList);
    res.render("homeSenderOrder", { orderList });
});



module.exports = router;