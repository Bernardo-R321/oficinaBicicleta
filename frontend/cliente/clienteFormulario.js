const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let inputNome = document.getElementById('nome');
let inputCPF = document.getElementById('cpf');
let inputEmail = document.getElementById('email');
let inputTelefone = document.getElementById('telefone');
let inputEndereco = document.getElementById('endereco');
let campoCidades = document.getElementById('cidades');
let form = document.getElementById('formulario');

async function buscarDados() {
  let resposta = await fetch('http://localhost:3000/clientes/' + id);
  if (resposta.ok) {
    let cliente = await resposta.json();
    inputNome.value = cliente.nome;
    inputCPF.value = cliente.cpf;
    inputEmail.value = cliente.email;
    inputTelefone.value = cliente.telefone;
    inputEndereco.value = cliente.endereco;
    campoCidades.value = cliente.cidade.id;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert('Ops! Algo deu errado!');
  }
}

if (id) {
  buscarDados();
}

form.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let nome = inputNome.value;
  let cpf = inputCPF.value;
  let email = inputEmail.value;
  let telefone = inputTelefone.value;
  let endereco = inputEndereco.value;
  let id_cidade = campoCidades.value;

  let payload = {
    nome,
    cpf,
    email,
    telefone,
    endereco,
    id_cidade,
  };

  let url = 'http://localhost:3000/clientes';
  let method = 'POST';
  if (id) {
    url += '/' + id;
    method = 'PUT';
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (resposta.ok) {
    window.location.href = 'cliente.html';
  } else {
    alert('Ops! Algo deu errado!');
  }
});

async function buscarCidades() {
  let resposta = await fetch('http://localhost:3000/cidades');
  let cidades = await resposta.json();

  for (let cidade of cidades) {
    let option = document.createElement('option');

    option.innerHTML = cidade.nome;
    option.value = cidade.id;

    campoCidades.appendChild(option);
  }
}

async function init() {
  console.log('init');
  await buscarCidades();
  if (id) {
    buscarDados();
  }
}

init();
