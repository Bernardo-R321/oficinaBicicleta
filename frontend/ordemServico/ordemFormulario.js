const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let campoCliente = document.getElementById('clientes');
let campoStatus = document.getElementById('status');
let campoResponsavel = document.getElementById('responsavel');
let inputDescServico = document.getElementById('servico');
let inputDescBicicleta = document.getElementById('bicicleta');
let inputValorServico = document.getElementById('valorServico');
let inputQuantPecas = document.getElementById('pecas');
let inputValorPecas = document.getElementById('valorPecas');
let inputValorTotal = document.getElementById('valorTotal');
let form = document.getElementById('formulario');

async function buscarDados() {
  let resposta = await fetch('http://localhost:3000/ordemservico/' + id);
  if (resposta.ok) {
    let ordemServico = await resposta.json();
    campoCliente.value = ordemServico.cliente.id;
    campoStatus.value = ordemServico.status.id;
    campoResponsavel.value = ordemServico.usuario.id;
    inputDescServico.value = ordemServico.descricaoserv;
    inputDescBicicleta.value = ordemServico.descricaobike;
    inputValorServico.value = ordemServico.valorservico;
    inputQuantPecas.value = ordemServico.qtdpeca;
    inputValorPecas.value = ordemServico.valorpeca;
    inputValorTotal.value = ordemServico.valorOS;
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

  let id_cliente = campoCliente.value;
  let id_status = campoStatus.value;
  let id_usuario = campoResponsavel.value;
  let descricaoserv = inputDescServico.value;
  let descricaobike = inputDescBicicleta.value;
  let valorservico = inputValorServico.value;
  let qtdpeca = inputQuantPecas.value;
  let valorpeca = inputValorPecas.value;
  let valorOS = inputValorTotal.value;

  let payload = {
    id_cliente,
    id_status,
    id_usuario,
    descricaoserv,
    descricaobike,
    valorservico,
    qtdpeca,
    valorpeca,
    valorOS,
  };

  console.log(payload);

  let url = 'http://localhost:3000/ordemservico';
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
    window.location.href = 'ordemFormulario.html';
  } else {
    alert('Ops! Algo deu errado!');
  }
});

async function buscarClientes() {
  let resposta = await fetch('http://localhost:3000/clientes');
  let clientes = await resposta.json();

  for (let cliente of clientes) {
    let option = document.createElement('option');

    option.innerHTML = cliente.nome;
    option.value = cliente.id;

    campoCliente.appendChild(option);
  }
}

async function buscarStatus() {
  let resposta = await fetch('http://localhost:3000/status');
  let status = await resposta.json();

  for (let itens of status) {
    let option = document.createElement('option');

    option.innerHTML = itens.nome;
    option.value = itens.id;

    campoStatus.appendChild(option);
  }
}

async function buscarResponsavel() {
  let resposta = await fetch('http://localhost:3000/usuarios');
  let usuarios = await resposta.json();

  for (let usuario of usuarios) {
    let option = document.createElement('option');

    option.innerHTML = usuario.nome;
    option.value = usuario.id;

    campoResponsavel.appendChild(option);
  }
}

inputValorPecas.addEventListener('focusout', (event) => {
  inputValorTotal.value =
    Number(inputValorServico.value) + Number(inputValorPecas.value);
});

inputValorServico.addEventListener('focusout', (event) => {
  inputValorTotal.value =
    Number(inputValorServico.value) + Number(inputValorPecas.value);
});

async function init() {
  console.log('init');
  await buscarClientes();
  await buscarStatus();
  await buscarResponsavel();
  if (id) {
    buscarDados();
  }
}

init();
