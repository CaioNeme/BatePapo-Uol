axios.defaults.headers.common['Authorization'] = 'ttqJn7RegtZYwPr8fvIDN6Fx';

let User;
let listUser = {};
let chat = document.querySelector('.chat');
let agora = new Date();
let hora = agora.getHours();
let minutos = agora.getMinutes();
let segundos = agora.getSeconds();
let tempo = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
let destinatario = 'Todos'
let mensagens = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');

function tratarSucesso(resposta){
    console.log(resposta.data);
    alert(`Seja bem-vindo, ${User}`)

}

function TratarErro(erro){
    console.log(resposta.data);
    alert(`O nome de usuario: ${User}, não esta disponivel por favor digite outro`);
    User = prompt('Qual é o seu nome?');
}

function nameUser(){
    User = prompt('Qual é o seu nome?');
    listUser = {name : User}
    const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', listUser);
    promessa.then(tratarSucesso);
    promessa.catch(TratarErro);

    agora = new Date();
    hora = agora.getHours();
    minutos = agora.getMinutes();
    segundos = agora.getSeconds();
    tempo = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    chat.innerHTML += `
    <li class="mensagem entrada">
        <p>(${tempo})  <strong>${User}</strong>  entrou na sala...</p>
    </li>`
}


function loadError(){
    console.log('erro ao carregar as mensagens');
}

function loadChat(){
    let mensagens = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    mensagens.then(loadOk);
    mensagens.catch(loadError);

    function loadOk(ok){
        console.log(ok.data);
        for(c = 0; c < 100; c++){
            chat.innerHTML+= `
                <li class="mensagem">
                    <p>(${mensagens[c].time}) <strong>${mensagens[c].from}</strong> para <strong>${mensagens[c].to}</strong>: ${mensagens[c].text}</p>
                </li>`
        }
    }
    
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

loadChat();
nameUser();
