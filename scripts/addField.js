//procura o botao, usando id (seletor)
document.querySelector("#add-time")
// quando clicar no botão novo horário
.addEventListener('click', cloneField)

//executa a ação
function cloneField(){
    //duplicar os campos
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) // node -> tag HTML (nó)
    // limpar os dados
    const fields = newFieldContainer.querySelectorAll('input')
    fields.forEach((field) => { // se der erro, tirar o arrow function
        //pegar o field do momento e limpa
        field.value = ""
    })
    document.querySelector('#schedule-items').appendChild(newFieldContainer)

}