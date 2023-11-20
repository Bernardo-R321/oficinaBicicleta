let corpoTabela = document.getElementById('corpo-tabela');

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

buscarOrdemServico();
