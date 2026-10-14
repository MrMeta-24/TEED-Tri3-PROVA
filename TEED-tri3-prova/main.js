const button = document.querySelector('button');
const inputName = document.querySelector('[name="name"]');
const inputAno = document.querySelector('[name="ano"]');
const inputDiretor = document.querySelector('[name="diretor"]');
const divResultado = document.querySelector(".resultado");

button.addEventListener('click', function(event){
    event.preventDefault();

    const newUser = {
        name: inputName.value,
        ano: inputAno.value,
        diretor: inputDiretor.value,   
    };

    createUser(newUser);
});

function createUser(newUser){
    fetch('http://localhost:3000/filmes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser),
    })
    .then(function (resultado){
        return resultado.json();
    })
    .then(function(data){
        console.log("Filme cadastrado com sucesso:", data);
        lerUser();
    })
    .catch(function(error){
        console.error("Erro ao cadastrar:", error);
    });
}

function lerUser(){
    fetch('http://localhost:3000/filmes', {
        method: "GET",
    })
    .then(function(resposta){
        return resposta.json();
    })
    .then(function(data){
        divResultado.innerHTML = "";

        for (const usuario of data) {
            criarHTML(usuario);
        }
    })
    .catch(function(error){
        console.error("Erro ao buscar filmes:", error);
    });
}

function criarHTML(usuario){
    const divCriada = document.createElement('div');
    divCriada.classList.add("bloco");

    divCriada.innerHTML = `
        <h3>Nome: <input type="text" class="usuario" value="${usuario.name || ""}"></h3>
        <h3>Ano: <input type="text" class="usuario" value="${usuario.ano || ""}"></h3>
        <h3>Diretor: <input type="text" class="usuario" value="${usuario.diretor || ""}"></h3>
    `;

    divResultado.appendChild(divCriada);
}

lerUser();