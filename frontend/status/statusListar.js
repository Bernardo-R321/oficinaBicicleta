let corpoTabela = document.getElementById('corpo-tabela');

async function buscarCidade () {
  let resposta = await fetch('http://localhost:3000/status');
  let status = await resposta.json();

  for (let status of status) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdTipo = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdNome.innerText = status.nome;
    tdTipo.innerHTML = status.tipo;
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="cidadeFormulario.html?id=${status.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${status.id})">Excluir</button>
    `;

    tdAcoes.classList = "text-center";
    tr.appendChild(tdNome);
    tr.appendChild(tdTipo);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  let confirma = confirm("Deseja excluir esse status? Esta ação não pode ser revertida.")
  if(confirma) {
    await fetch('http://localhost:3000/status/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
  }
  
}

buscarCidade();