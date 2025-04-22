const input = document.getElementById('tarefaInput')
const botao = document.getElementById('adicionarBtn')
const lista = document.getElementById('listaTarefas')

// Carregar tarefas ao iniciar a página
carregarTarefas()

// Adicionar tarefa
botao.addEventListener('click', function () {
  const textoTarefa = input.value.trim()
  if (textoTarefa !== '') {
    adicionarTarefa(textoTarefa)
    input.value = ''
  }
})

// Função para adicionar tarefa na lista e no localStorage
function adicionarTarefa(texto, concluida = false) {
  const novaTarefa = document.createElement('li')

  const spanTexto = document.createElement('span')
  spanTexto.textContent = texto
  if (concluida) spanTexto.classList.add('concluida')

  spanTexto.addEventListener('click', function () {
    spanTexto.classList.toggle('concluida')
    salvarTarefas()
  })

  const botaoRemover = document.createElement('button')
  botaoRemover.textContent = 'Remover'
  botaoRemover.style.marginLeft = '10px'
  botaoRemover.addEventListener('click', function () {
    lista.removeChild(novaTarefa)
    salvarTarefas()
  })

  novaTarefa.appendChild(spanTexto)
  novaTarefa.appendChild(botaoRemover)
  lista.appendChild(novaTarefa)

  salvarTarefas()
}

// Salvar tarefas no localStorage
function salvarTarefas() {
  const tarefas = []
  document.querySelectorAll('#listaTarefas li').forEach(li => {
    const texto = li.querySelector('span').textContent
    const concluida = li.querySelector('span').classList.contains('concluida')
    tarefas.push({ texto, concluida })
  })
  localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

// Carregar tarefas do localStorage
function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem('tarefas')
  if (tarefasSalvas) {
    const tarefas = JSON.parse(tarefasSalvas)
    tarefas.forEach(tarefa => adicionarTarefa(tarefa.texto, tarefa.concluida))
  }
}
