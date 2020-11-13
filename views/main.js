const socket = io('http://localhost:8800')
const usernameFragment = document.getElementById('usernameFragment')
const chatFragment = document.getElementById('chatFragment')
const usersFragment = document.getElementById('usersFragment')
const usernameForm = document.getElementById('usernameForm')
const messageForm = document.getElementById('messageForm')
const username = document.getElementById('username')
const message = document.getElementById('message')
const messagecontainer = document.getElementById('message-container')
const users = document.getElementById('users')


chatFragment.hidden = true
usersFragment.hidden = true

usernameForm.addEventListener('submit',e =>{
    e.preventDefault()
    socket.emit('new-user',username.value,valid =>{
        if(valid){
            chatFragment.hidden = false
            usernameFragment.hidden = true
            usersFragment.hidden = false


        }else{
            alert('Username already taken :(')
            username.value = ''
        }
    })

})

messageForm.addEventListener('submit',e =>{
    e.preventDefault()
    socket.emit('new-message',message.value,valid =>{
        if(valid){
            message.value = ''
            
        }else{
            alert('Cannot send empty message')
        }
    })
})

socket.on('users',data =>{
    const all_users = Object.values(data)
    var temp = ''
    for(i=0; i<all_users.length; i++){
        temp += all_users[i] + '<br />'
    }
    users.innerHTML = temp
})

socket.on('send-new-message',data =>{
    // console.log(data.msg +' '+ data.username)
    const messageElement = document.createElement('div')
    messageElement.innerText = data.username + ': ' + data.msg
    messagecontainer.append(messageElement)
})
