let inputEmail = document.getElementById('email');
let inputSenha = document.getElementById('senha');

formulario.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let email = inputEmail.value;
  let senha = inputSenha.value;

  let payload = {
    email: email,
    senha: senha,
  };

  let resposta = await fetch('http://localhost:3333/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (resposta.ok) {
    let dados = await resposta.json();
    let authorization = `${dados.type} ${dados.token}`;

    localStorage.setItem('Authorization', authorization);

    window.location.href = 'index.html';
  } else if (resposta.status == 401) {
    let dados = await resposta.json();
    alert(dados.mensagem);
  } else {
    alert('Ops! Algo deu errado!');
  }
});
