let corpoTabela = document.getElementById('corpo-tabela');
let buttonPDF = document.getElementById('pdf');
let buttonCSV = document.getElementById('csv');

async function buscarCidade() {
  let resposta = await fetch('http://localhost:3000/cidades');
  let cidades = await resposta.json();

  for (let cidade of cidades) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdNome.innerText = cidade.nome;
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="cidadeFormulario.html?id=${cidade.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${cidade.id})">Excluir</button>
    `;

    tdAcoes.classList = 'text-center';
    tr.appendChild(tdNome);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir(id) {
  let confirma = confirm(
    'Deseja excluir essa cidades? Esta ação não pode ser revertida.'
  );
  if (confirma) {
    await fetch('http://localhost:3000/cidades/' + id, {
      method: 'DELETE',
    });

    window.location.reload();
  }
}

function download(content, mimeType, filename) {
  const a = document.createElement('a');
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  a.click();
}

async function baixarPdf() {
  let resposta = await fetch('http://localhost:3000/cidadePdf', {
    headers: {
      'Content-type': 'application/json',
      Accept: 'appplication/json',
    },
  });
  console.log(resposta);
  download(await resposta.blob(), 'application/x-pdf', 'cidades.pdf');
}

buttonPDF.addEventListener('click', async () => {
  await baixarPdf();
});

buttonCSV.addEventListener('click', async () => {
  await baixarCsv();
});

async function baixarCsv() {
  let csv = await fetch('http://localhost:3000/cidadeCsv', {
    headers: {
      'Content-type': 'application/json',
      Acccept: 'appplication/json',
    },
  });
  download(await csv.text(), 'text/csv', 'Cidades.csv');
}

buscarCidade();
