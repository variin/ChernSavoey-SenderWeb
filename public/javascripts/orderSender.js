function updateStatus() {

    const steps = Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: false,
        progressSteps: ['1', '2', '3', '4', '5'],
        didOpen: (t) => {

            const orderIdPath = window.location.pathname.replace("/", "")
            const orderId = orderIdPath.split("/")[1]
            const senderId = "123"



            if (Swal.getQueueStep() == 1) {

                fetch(`/orderSender/order/update/${orderId}/${senderId}/arrived`)
                    .then((data) => {
                        console("update")
                    })
                    .catch((err) => console.log('err ' + err))

            }


            if (Swal.getQueueStep() == 2) {

                fetch(`/orderSender/order/update/${orderId}/${senderId}/placed`)
                    .then((data) => {
                        console("update")
                    })
                    .catch((err) => console.log('err ' + err))

            }

            if (Swal.getQueueStep() == 3) {

                fetch(`/orderSender/order/update/${orderId}/${senderId}/collected`)
                    .then((data) => {
                        console("update")
                    })
                    .catch((err) => console.log('err ' + err))

            }


            if (Swal.getQueueStep() == 4) {

                fetch(`/orderSender/order/update/${orderId}/${senderId}/shipping`)
                    .then((data) => {
                        console("update")
                    })
                    .catch((err) => console.log('err ' + err))

            }


            if (Swal.getQueueStep() == 5) {
                Swal.getConfirmButton().innerHTML = 'Thank you!'


            }
        },
    }).queue([{
        text: 'You are arrived at the shop',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/it60-42-choen-savoey.appspot.com/o/javascripts%2FBest%20of%20Behance.gif?alt=media&token=286a5562-2633-4ed4-8a0f-62032c60fce6',
        imageWidth: 350,
        imageHeight: 250,
    }, {
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/it60-42-choen-savoey.appspot.com/o/javascripts%2FMetamorphosis.gif?alt=media&token=31fc8981-b433-4f45-ba70-a207f9e50cb5',
        imageWidth: 350,
        imageHeight: 250,
        text: 'You are placed the order',
    }, {
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/it60-42-choen-savoey.appspot.com/o/javascripts%2Fbell.gif?alt=media&token=5735736c-97fc-4f4a-a4f3-f17d343741fb',
        imageWidth: 150,
        imageHeight: 150,
        text: 'You are collected the food'
    }, {
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/it60-42-choen-savoey.appspot.com/o/javascripts%2Fscooter-running.gif?alt=media&token=0385ea48-a31a-494c-8f8e-b15a7a7f72c1',
        imageWidth: 250,
        imageHeight: 200,
        text: 'Waiting for shipment'
    }, {
        text: 'Order has been delivered',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/it60-42-choen-savoey.appspot.com/o/javascripts%2FOnline%20Surveys%20for%20Cash%20_%20Earn%20Money%20online.gif?alt=media&token=08866601-ce6d-4946-b270-288a3f8401f0',

    }, ])

    steps.then((result) => {

        if (result.value) {
            const orderIdPath = window.location.pathname.replace("/", "")
            const orderId = orderIdPath.split("/")[1]
            const senderId = "123"
                // const answers = JSON.stringify(result.value)
            Swal.fire({
                title: 'Process Sucessful',
                imageUrl: 'https://firebasestorage.googleapis.com/v0/b/it60-42-choen-savoey.appspot.com/o/javascripts%2Fcheck-circle.gif?alt=media&token=48c6c548-6816-4bf7-8f23-06c09d58f0e6',
                confirmButtonText: 'Thank you!'
            }).then(() => {
                fetch(`/orderSender/order/update/${orderId}/${senderId}/success`)
                    .then((data) => {
                        console("update")
                    })
                    .catch((err) => console.log('err ' + err))
            })
        }
    })

}