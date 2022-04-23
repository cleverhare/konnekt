const socket = io()
const name =  prompt("Enter Your Name...")
var chats = document.querySelector('.message-container')
var btn  = document.querySelector('#btn')
var messageinp = document.querySelector('#messageinp')
// var audio = Audio('ting.mp3')


// for sending messages 
btn.addEventListener('click',()=>{
   let data = {
       username : name,
       msg : messageinp.value
   }
    
    if (messageinp.value!= '') {
        appendMessage(data, 'right')
        socket.emit('message', data)
        messageinp.value = ''
    }
    
})
function appendMessage(data, status) {
    let div = document.createElement('div')
    let usercon = document.createElement('h4')
    usercon.classList.add('mine')
    div.classList.add('message', status)
    let user_content = `${data.username}`
    usercon.innerHTML = user_content
    let msgcon = `${data.msg}`
    div.innerHTML = msgcon
    // usercon.innerHTML = user_content
    chats.appendChild(usercon)
    chats.appendChild(div)
    // audio.play()
}

socket.on('message', (data)=>{
    let div = document.createElement('div')
    let usercon = document.createElement('h4')
    usercon.classList.add('sender')
    div.classList.add('message', 'left')
    let user_content = `${data.username}`
    usercon.innerHTML = user_content
    let msgcon = `${data.msg}`
    div.innerHTML = msgcon
    // usercon.innerHTML = user_content
    chats.appendChild(usercon)
    chats.appendChild(div)
    // audio.play()
    
})