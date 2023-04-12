let User;
let listUser = [];
let chat = document.querySelector('.chat');
let agora = new Date();
let hora = agora.getHours();
let minutos = agora.getMinutes();
let segundos = agora.getSeconds();
let tempo = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
let destinatario = 'Todos'


function nameUser(){
    User = prompt('Qual é o seu nome?');

    for(c = 0; c <= listUser; c++){
        if(User === listUser[c]){
            alert(`O nome de usuario: ${User}, não esta disponivel por favor digite outro`);
            User = prompt('Qual é o seu nome?');
        }
        else{
            listUser.push(User);
            alert(`Seja bem-vindo, ${User}`)
        }
    }
    chat.innerHTML += `
    <li class="mensagem entrada">
        <p>(${tempo})  <strong>${User}</strong>  entrou na sala...</p>
    </li>`
}

function addMsn(){
    let mensagem = document.querySelector('.input');
    console.log(mensagem);
    agora = new Date();
    hora = agora.getHours();
    minutos = agora.getMinutes();
    segundos = agora.getSeconds();
    tempo = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    
    chat.innerHTML += `
            <li class="mensagem">
                <p>(${tempo}) <strong>${User}</strong> para <strong>${destinatario}</strong>: ${mensagem.value}</p>
            </li>`
}

nameUser();