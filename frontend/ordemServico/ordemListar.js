let corpoTabela = document.getElementById('corpo-tabela');
let buttonPDF = document.getElementById('pdf');
let buttonCSV = document.getElementById('csv');
let buttonEmail = document.getElementById('email');

async function buscarOrdemServico() {
  let resposta = await fetch('http://localhost:3000/ordemservico');
  let ordens = await resposta.json();

  for (let ordem of ordens) {
    let tr = document.createElement('tr');
    let tdAcoes = document.createElement('td');
    let tdId = document.createElement('td');
    let tdCliente = document.createElement('td');
    let tdDescServico = document.createElement('td');
    let tdDescBicicleta = document.createElement('td');
    let tdValorTotal = document.createElement('td');
    let tdStatus = document.createElement('td');
    let tdResponsavel = document.createElement('td');

    tdId.innerText = ordem.id;
    tdCliente.innerText = ordem.cliente.nome;
    tdDescServico.innerText = ordem.descricaoserv;
    tdDescBicicleta.innerText = ordem.descricaobike;
    tdValorTotal.innerText = ordem.valorOS === null ? 0 : ordem.valorOS;
    tdStatus.innerText = ordem.status.nome;
    tdResponsavel.innerText = ordem.usuario.nome;

    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="ordemFormulario.html?id=${ordem.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${ordem.id})">Excluir</button>
      <button class="btn btn-outline-secondary btn-sm" onclick="enviarEmail(${ordem.id})">Enviar Email</button>
    `;

    tdAcoes.classList = 'text-center';
    tr.appendChild(tdId);
    tr.appendChild(tdCliente);
    tr.appendChild(tdDescServico);
    tr.appendChild(tdDescBicicleta);
    tr.appendChild(tdValorTotal);
    tr.appendChild(tdStatus);
    tr.appendChild(tdResponsavel);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir(id) {
  let confirma = confirm(
    'Deseja excluir essa ordem de serviço? Esta ação não pode ser revertida.'
  );
  if (confirma) {
    await fetch('http://localhost:3000/ordemServico/' + id, {
      method: 'DELETE',
    });

    window.location.reload();
  }
}

async function baixarPdf() {
  let resposta = await fetch('http://localhost:3000/ordemservicoPdf', {
    headers: {
      'Content-type': 'application/json',
      Accept: 'appplication/json',
    },
  });
  console.log(resposta);
  download(await resposta.blob(), 'application/x-pdf', 'Ordens.pdf');
}

buttonPDF.addEventListener('click', async () => {
  await baixarPdf();
});

buttonCSV.addEventListener('click', async () => {
  await baixarCsv();
});

async function baixarCsv() {
  let csv = await fetch('http://localhost:3000/ordemservicoCsv', {
    headers: {
      'Content-type': 'application/json',
      Acccept: 'appplication/json',
    },
  });
  download(await csv.text(), 'text/csv', 'Ordens.csv');
}

function download(content, mimeType, filename) {
  const a = document.createElement('a');
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  a.click();
}

async function enviarEmail(id) {
  let resposta = await fetch('http://localhost:3000/enviarEmail/' + id, {
    headers: {
      'Content-type': 'application/json',
      Accept: 'appplication/json',
    },
    method: 'POST',
  });
}

buscarOrdemServico();
