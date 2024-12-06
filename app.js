 let numeroSecreto = gerarNumAleatorio();
 let tentativas = 1;

function mudarTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}


function mensagemInicial(){
    mudarTexto('h1', 'Jogo do número secreto');
    mudarTexto('p', 'Escolha um numero entre 1 e 100');
}

mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = 'Você acertou com ' + tentativas + ' ' + palavraTentativa;

        document.getElementById('reiniciar').removeAttribute('disabled')

        mudarTexto('h1', 'ACERTOU, PARABÉNS!');
        mudarTexto('p', mensagemTentativa)
    }
    else{
        if(chute > numeroSecreto){
            mudarTexto('h1', 'O numero secreto é menor que '+ chute);
        }
        else{
            mudarTexto('h1', 'O numero secreto é maior que '+ chute);
        }
    }
    tentativas++;
    limparCampo();
}

function gerarNumAleatorio(){
    return parseInt((Math.random() * 100) + 1);
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    mensagemInicial();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}