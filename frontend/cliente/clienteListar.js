let corpoTabela = document.getElementById('corpo-tabela');
let buttonPDF = document.getElementById('pdf');
let buttonCSV = document.getElementById('csv');

async function buscarCliente() {
  let resposta = await fetch('http://localhost:3000/clientes');
  let clientes = await resposta.json();

  for (let cliente of clientes) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdCPF = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdNome.innerText = cliente.nome;
    tdCPF.innerText = cliente.cpf;
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="clienteFormulario.html?id=${cliente.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${cliente.id})">Excluir</button>
    `;

    tdAcoes.classList = 'text-center';
    tr.appendChild(tdNome);
    tr.appendChild(tdCPF);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir(id) {
  let confirma = confirm(
    'Deseja excluir esse cliente? Esta ação não pode ser revertida.'
  );
  if (confirma) {
    await fetch('http://localhost:3000/clientes/' + id, {
      method: 'DELETE',
    });

    window.location.reload();
  }
}

async function baixarPdf() {
  let resposta = await fetch('http://localhost:3000/clientePdf', {
    headers: {
      'Content-type': 'application/json',
      Accept: 'appplication/json',
    },
  });
  console.log(resposta);
  download(await resposta.blob(), 'application/x-pdf', 'Clientes.pdf');
}

buttonPDF.addEventListener('click', async () => {
  await baixarPdf();
});

buttonCSV.addEventListener('click', async () => {
  await baixarCsv();
});

async function baixarCsv() {
  let csv = await fetch('http://localhost:3000/clienteCsv', {
    headers: {
      'Content-type': 'application/json',
      Acccept: 'appplication/json',
    },
  });
  download(await csv.text(), 'text/csv', 'Clientes.csv');
}

function download(content, mimeType, filename) {
  const a = document.createElement('a');
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  a.click();
}

buscarCliente();
