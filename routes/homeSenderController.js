var express = require('express');
const { query } = require('express-validator');
const db = require('../model/db');
var router = express.Router();

/* GET shops page. */

router.get("/", async(req, res) => {
    const getOrder = await db
        .collection("cart").where('status', '==', 'accepted')
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

    const orderDetail = await db.collection("cart")
        .doc(orderId)
        .get()
        .then((querySnapshot) => querySnapshot.data());
    const orderList = orderDetail.order_detail;
    const location = orderDetail.Location;
    console.log(orderId);
    console.log(orderList);
    res.render("orderdetail", {orderList,location});
});



module.exports = router;