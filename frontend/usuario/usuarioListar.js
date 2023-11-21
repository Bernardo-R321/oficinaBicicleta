let corpoTabela = document.getElementById('corpo-tabela');
let buttonPDF = document.getElementById('pdf');
let buttonCSV = document.getElementById('csv');

async function buscarUsuario() {
  let resposta = await fetch('http://localhost:3000/usuarios');
  let usuarios = await resposta.json();

  for (let usuario of usuarios) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdNome.innerText = usuario.nome;
    tdEmail.innerText = usuario.email;
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="usuarioFormulario.html?id=${usuario.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${usuario.id})">Excluir</button>
    `;

    tdAcoes.classList = 'text-center';
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir(id) {
  let confirma = confirm(
    'Deseja excluir esse usuário? Esta ação não pode ser revertida.'
  );
  if (confirma) {
    await fetch('http://localhost:3000/usuarios/' + id, {
      method: 'DELETE',
    });

    window.location.reload();
  }
}

async function baixarPdf() {
  let resposta = await fetch('http://localhost:3000/usuarioPdf', {
    headers: {
      'Content-type': 'application/json',
      Accept: 'appplication/json',
    },
  });
  console.log(resposta);
  download(await resposta.blob(), 'application/x-pdf', 'Usuarios.pdf');
}

buttonPDF.addEventListener('click', async () => {
  await baixarPdf();
});

buttonCSV.addEventListener('click', async () => {
  await baixarCsv();
});

async function baixarCsv() {
  let csv = await fetch('http://localhost:3000/usuarioCsv', {
    headers: {
      'Content-type': 'application/json',
      Acccept: 'appplication/json',
    },
  });
  download(await csv.text(), 'text/csv', 'Usuarios.csv');
}

function download(content, mimeType, filename) {
  const a = document.createElement('a');
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  a.click();
}

buscarUsuario();
