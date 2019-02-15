
let socket = new WebSocket('ws://localhost:1337/chat');
socket.addEventListener('open', () => console.log('socket geopend'));
socket.addEventListener('close', () => console.log('socket gesloten'));
socket.addEventListener('message', e => {
    let messages = document.querySelector('#messages');
    messages.innerHTML = `<li>${e.data}</li>${messages.innerHTML}`;
});

document.querySelector('#chat-form').addEventListener('submit', e => {
    e.preventDefault();
    e.stopPropagation();

    let message = document.querySelector('#input-chat').value;
    socket.send(message);
});