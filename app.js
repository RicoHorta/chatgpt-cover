//CHAVE API NÃO DEVE ESTAR EXPOSTA NO GITHUB
const API_KEY = 'sk-QWOT5LGSlgusyp2453eWTBlbkFJ6pXqjBICHW2n3LMC';
//CAPTURA DO BOTAO SUBMIT
const submitButton = document.querySelector('#submit');
//CAPTURA RETORNO DA MENSAGEM DA API
const outputElement = document.querySelector('#output');
//CAPTURA A PERGUNTA DIGITADA PARA API
const inputElement = document.querySelector('input');
//CAPTURA A PERGUNTA DIGITADA PARA API E COLOCA NO HISTÓRICO
const historyElement = document.querySelector('.history');
//CAPTURA O CLICK DO BOTÃO NOVO CHAT
const buttonElement = document.querySelector('button');

async function getMessage() {
    console.log('clicked')
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputElement.value }],
            max_tokens: 200
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        //console.log(data);
        //VALOR CAPTURADO NA RESPOSTA LINHA 6 ESCOLHENDO A PRIMEIRA CHOICES E O CONTEÚDO DA MENSAGEM
        outputElement.textContent = data.choices[0].message.content;
        if (data.choices[0].message.content && inputElement.value) {
            //CRIA UM <P> PARA COLOCAR A PERGUNTA PARA GUARDAR NO HISTÓRICO
            const pElement = document.createElement('p');
            //ADICIONA O TEXTO DA PERGUNTA AO ELEMENTO <P> CRIADO
            pElement.textContent = inputElement.value;
            //CAPTURA O CLICK NA PERGUNTA QUE ESTÁ NO HISTÓRICO E CRIA A FUNÇÃO QUE VAI JOGA-LA NO BOTÃO DE PERGUNTAS LINHA 59
            pElement.addEventListener('click', () => changeInput(pElement.textContent));
            //ADICIONA O ELEMENTO <p> AO HISTÓRICO CAPTURADO
            historyElement.append(pElement);
        }
    } catch (error) {
        console.error(error);
    }
}

//CAPTURA EVENTO CLICK NO BOTAO DE PERGUNTA
submitButton.addEventListener('click', getMessage)

//CAPTURA EVENTO CLICK NO BOTÃO NOVO CHAT PARA LIMPEZA DO HISTÓRICO
function clearInput() {
    inputElement.value = '';
}
buttonElement.addEventListener('click', clearInput);

//FUNÇÃO QUE VAI RETORNAR A PERGUNTA DO HISTÓRICO PARA O BOTÃO DE PERGUNTAS LINHA 40
function changeInput(value) {
    const inputElement = document.querySelector('input');
    inputElement.value = value;
}
