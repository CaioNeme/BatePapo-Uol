axios.defaults.headers.common['Authorization'] = 'B3KyK8rF2fzyZiB6ivgwn4Vu';

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
let msn;

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
    <li data-test="message" class="mensagem entrada">
        <p>(${tempo})  <strong>${User}</strong>  entrou na sala...</p>
    </li>`
}


function loadError(resNok){
    console.log(resNok);
}

function loadOk(resok){
    //console.log(resok.data);
    x = [];
    x = resok.data;
    chat = '';
    chat = document.querySelector('.chat');
    for(c = 0; c < 100; c++){
        if(x[c].type == "message"){
            chat.innerHTML+= `
                <li data-test="message" class="mensagem">
                    <p>(${x[c].time}) <strong>${x[c].from}</strong> para <strong>${x[c].to}</strong>: ${x[c].text}</p>
                </li>`
        }
        else{
            chat.innerHTML+= `
                <li data-test="message" class="mensagem entrada">
                    <p>(${x[c].time}) <strong>${x[c].from}</strong> para <strong>${x[c].to}</strong>: ${x[c].text}</p>
                </li>`
        }
    }
    console.log(chat);
}


function loadChat(){
    let mensagens = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    mensagens.then(loadOk);
    mensagens.catch(loadError);    
}

function addOk(ok){
    console.log(ok.data);
    
}

function addMsn(){

    let mensagem = document.querySelector('.input');
    msn =   {
        from: User,
        to: destinatario,
        text: mensagem.value,
        type: "message"
        };

    let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', msn);
    promessa.then(addOk);
    promessa.catch(loadError)
    loadChat();
}

loadChat();
setInterval(loadChat, 10000);
nameUser();
