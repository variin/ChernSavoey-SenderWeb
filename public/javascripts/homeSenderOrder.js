function testSweet() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: "warning",
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        confirmButtonColor: '#27AE60',
        cancelButtonColor: '#C0392B',
    }).then((result) => {

        console.log(result)

        if (result.value) {
            Swal.fire(
                "",
                'You are confirm this order',
                'success'
            ).then(() => {

                //TODO: get sender id from user login
                const senderId = "Plase Wait";
                const orderIdPath = window.location.pathname.split("/")
                const orderId = orderIdPath[2]
                console.log("Senddddd 1")

                fetch(`/orderSender/order/update/${orderId}/${senderId}/waiting for sender`)
                    .then((data) => {
                        console.log("Senddddd 2")
                        window.location.href = `/orderSender/${orderId}`;
                    })
                    .catch((err) => console.log('err ' + err))
            })
        } else {
            Swal.fire('', 'You are deny this order', 'error')
        }
    })

}