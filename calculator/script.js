const visor = document.getElementById('visor');
const botoes = document.querySelectorAll('.botoes button');

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const valor = botao.textContent;

    // Lógica do botão C
    if (valor === 'c') {
      visor.value = '';
      return; // evita que o "C" seja adicionado depois
    }

    // Lógica do botão =
    if (valor === '=') {
      try {
        visor.value = eval(visor.value);
      } catch {
        visor.value = 'Erro';
      }
      return;
    }

    // Adiciona o valor ao visor (números e operadores)
    visor.value += valor;
  });
});
