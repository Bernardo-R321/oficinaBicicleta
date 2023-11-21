let corpoTabela = document.getElementById('corpo-tabela');
let buttonPDF = document.getElementById('pdf');
let buttonCSV = document.getElementById('csv');

async function buscarCidade() {
  let resposta = await fetch('http://localhost:3000/status');
  let status = await resposta.json();

  for (let item of status) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdTipo = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdNome.innerText = item.nome;
    tdTipo.innerHTML = item.tipo;
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="statusFormulario.html?id=${item.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${item.id})">Excluir</button>
    `;

    tdAcoes.classList = 'text-center';
    tr.appendChild(tdNome);
    tr.appendChild(tdTipo);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir(id) {
  let confirma = confirm(
    'Deseja excluir esse status? Esta ação não pode ser revertida.'
  );
  if (confirma) {
    await fetch('http://localhost:3000/status/' + id, {
      method: 'DELETE',
    });

    window.location.reload();
  }
}

async function baixarPdf() {
  let resposta = await fetch('http://localhost:3000/statusPdf', {
    headers: {
      'Content-type': 'application/json',
      Accept: 'appplication/json',
    },
  });
  console.log(resposta);
  download(await resposta.blob(), 'application/x-pdf', 'Status.pdf');
}

buttonPDF.addEventListener('click', async () => {
  await baixarPdf();
});

buttonCSV.addEventListener('click', async () => {
  await baixarCsv();
});

async function baixarCsv() {
  let csv = await fetch('http://localhost:3000/statusCsv', {
    headers: {
      'Content-type': 'application/json',
      Acccept: 'appplication/json',
    },
  });
  download(await csv.text(), 'text/csv', 'Status.csv');
}

function download(content, mimeType, filename) {
  const a = document.createElement('a');
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  a.click();
}

buscarCidade();
