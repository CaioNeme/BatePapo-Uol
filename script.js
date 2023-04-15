axios.defaults.headers.common['Authorization'] = 'F6toHgNbIjrMErn8Z21A2QYy';

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
    alert(`Seja bem-vindo, ${User}`)
    loadChat();
    setInterval(loadChat, 3000);
    setInterval(taOn, 5000);

}

function TratarErro(erro){
    console.log(erro.data);
    alert(`O nome de usuario: ${User}, não esta disponivel por favor digite outro`);
    nameUser();
}

function nameUser(){
    User = prompt('Qual é o seu nome?');
    listUser = {name : User}
    const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', listUser);
    promessa.then(tratarSucesso);
    promessa.catch(TratarErro);

}

function onNehBB(res){
    console.log('Online');
}

function desOn(res){
    alert('Você está offline');
    nameUser();
}


function taOn(){
    let on = {
        name: User
      };
    let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', on);
    promessa.then(onNehBB);
    promessa.catch(desOn);
}

function loadError(resNok){
    console.log(resNok);
    alert('Erro ao carregar as mensagens');
}

function loadOk(resok){
    x = [];
    x = resok.data;
    
    chat.innerHTML = null;
    for(c = 0; c < 100; c++){
        if(x[c].type == "message"){
            chat.innerHTML+= `
                <li data-test="message" class="mensagem">
                    <p>(${x[c].time}) <strong>${x[c].from}</strong> para <strong>${x[c].to}</strong>: ${x[c].text}</p>
                </li>`
        }
        else if(x[c].type == "private_message"){
            chat.innerHTML+= `
                <li data-test="message" class="mensagem privada">
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
}


function loadChat(){
    let mensagens = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    mensagens.then(loadOk);
    mensagens.catch(loadError);    
}

function addOk(ok){
    console.log(ok.data);
    loadChat();
    
}

function addErro(erro){
    console.log(erro.data);
    alert('Você está offline no chat de BatePapo da UOL ou digitou uma mensagem invalida')
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
    promessa.catch(addErro)
    mensagem.value = null;
}

document.addEventListener('keypress', function(e){
    if(e.which == 13){
        addMsn();
    }
    }, false);


nameUser();
