const socket = io.connect("https://chernsavoey.herokuapp.com/");
let username = document.querySelector('#username');
let usernameBtn = document.querySelector('#usernameBtn');
let curUsername = document.querySelector('.card-header');

(function() {
    usernameBtn.addEventListener('click', e => {
        console.log(username.value);
        socket.emit('change_username', { username: username.value })
        curUsername.textContent = username.value
        username.value = ''
    })

    let message = document.querySelector('#message');
    let messageBtn = document.querySelector('#messageBtn');
    let messageList = document.querySelector('#message-list');
    const orderId = document.querySelector('#orderId').value;

    messageBtn.addEventListener('click', e => {
        console.log("On submit")

        let listItem = document.createElement('li')
        listItem.textContent = message.value;
        listItem.classList.add('list-group-item');
        listItem.style.textAlign = "right";
        messageList.appendChild(listItem)

        socket.emit(orderId, { message: message.value })
        message.value = ''
    })
    socket.on('connect', () => {
        console.log('successfully to server')
    })

    socket.on(orderId, data => {
        console.log(`on client from server ${orderId}  =>  ${data.message} - by ${data.username}`)

        let listItem = document.createElement('li')
        listItem.textContent = data.username + ": " + data.message;
        if (data.username != username.value) {
            listItem.style.textAlign = "left";
        }
        listItem.classList.add('list-group-item');
        messageList.appendChild(listItem)
    })

    let info = document.querySelector('.info');

    message.addEventListener('keypress', e => {
        socket.emit('typing')
    })

    socket.on('typing', data => {
        info.textContent = data.username + " is typing..."
        setTimeout(() => { info.textContent = '' }, 5000)
    })
})();