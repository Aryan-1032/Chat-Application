const socket = io('http://localhost:8080');

const form = document.getElementById('send');
const input = document.querySelector('input');
const messageContainer = document.querySelector('.card-body');

function notificationMsg(message)
{
    const noti = document.createElement('div');
    const msg = document.createElement('span');
    msg.innerHTML=message;
    msg.classList.add('badge','bg-secondary');
    noti.append(msg);
    noti.classList.add('d-flex','flex-row','justify-content-center','mb-4');
    messageContainer.append(noti);
}
function receiveMsg(message,name){
    const msgBox = document.createElement('div');
    const msgcontainer = document.createElement('div');
    const msg = document.createElement('p');
    const strg = document.createElement('strong');
    strg.innerHTML=name;
    strg.classList.add('font-weight-bold','mb-1');
    msg.innerHTML= message;
    msg.classList.add('small','mb-1','mt-1');
    msgcontainer.classList.add('p-2','pt-0','me-3','border');
    msgcontainer.style.borderRadius="15px";
    msgcontainer.style.backgroundColor="rgba(57, 192, 237,.2)";
    msgcontainer.append(strg);
    msgcontainer.append(msg);
    msgBox.classList.add('d-flex','flex-row','justify-content-start','mb-4');
    msgBox.append(msgcontainer);
    messageContainer.append(msgBox);

}

function sendMsg(message)
{
    const msgBox = document.createElement('div');
    const msgcontainer = document.createElement('div');
    const msg = document.createElement('p');
    const strg = document.createElement('strong');
    strg.innerHTML="You";
    strg.classList.add('font-weight-bold','mb-1')
    msg.innerHTML= message;
    msg.classList.add('small','mb-1','mt-1');
    msgcontainer.classList.add('p-2','pt-0','me-3','border');
    msgcontainer.append(strg);
    msgcontainer.append(msg);
    msgcontainer.style.borderRadius="15px";
    msgcontainer.style.backgroundColor="#fbfbfb"
    msgBox.classList.add('d-flex','flex-row','justify-content-end','mb-4');
    msgBox.append(msgcontainer);
    messageContainer.append(msgBox);
    socket.emit('send',message);   
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =  input.value;
    console.log(message);
    sendMsg(`${message}`);
    input.value='';
})
const name = prompt("Enter your name");
socket.emit('new-user-joined',name);

socket.on('user-joined',({name})=>{
    notificationMsg(`${name} just slide into the chat`);
})

socket.on('receive',({message,name})=>{
    receiveMsg(message,name);
})

socket.on('user-disconnected', name => {
    notificationMsg(`${name} left the chat`);
  })