let User;
let listUser = [];

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
}

function addMsn(){
    let mensagem = document.querySelector('input');
    let chat = document.querySelector('.chat');
    chat.innerHTML = `
            <li class="mensagem">
                <p>(${hora}) <strong>${usuario}</strong> para <strong>${destinatario}</strong> ${mensagem}</p>
            </li>`
}