# 🟣 Calculadora PRO

Projeto desenvolvido como **atividade acadêmica** para a disciplina de logica e programação, com o objetivo de praticar os conceitos de **HTML**, **CSS** e **JavaScript** — em especial o uso de **funções callback**.

---

## 📌 Sobre o Projeto

A calculadora foi criada com fins didáticos, demonstrando na prática como organizar um projeto front-end em arquivos separados e como aplicar o conceito de **callback** em JavaScript para controlar o fluxo de execução das operações.

O design foi desenvolvido com uma identidade visual moderna: tema escuro com paleta roxa, botões brancos nos números e verdes nos operadores, animações de ripple e fonte futurista.

---

## 📁 Estrutura de Arquivos

```
calculadora/
├── index.html   → Estrutura da página (HTML)
├── style.css    → Estilização visual (CSS)
├── script.js    → Lógica e interações (JavaScript)
└── README.md    → Documentação do projeto
```

---

## 🔁 Uso de Callbacks

O conceito de **callback** é uma função passada como argumento para outra função, sendo executada somente após a conclusão de uma operação. Neste projeto, os callbacks foram aplicados para garantir que o **display seja atualizado apenas depois que a lógica de cada ação for concluída**.

### Como funciona na prática

Cada ação da calculadora recebe um callback que, ao final, chama `updateDisplay` para renderizar o novo valor na tela:

```js
// updateDisplay é a função que atualiza a tela
function updateDisplay(callback) {
  display.textContent = formatDisplay(state.current);
  if (callback) callback(); // executa o próximo passo, se houver
}

// handleNumber recebe um callback e o repassa para updateDisplay
function handleNumber(val, callback) {
  state.current = state.current === '0' ? val : state.current + val;
  callback(updateDisplay); // chama o callback passando updateDisplay
}

// No evento de clique, um callback anônimo é passado:
handleNumber('5', cb => cb()); // cb aqui é updateDisplay
```

### Fluxo com callback

```
Usuário clica em "5"
       ↓
handleNumber('5', cb => cb())
       ↓
Atualiza state.current
       ↓
callback(updateDisplay)  →  cb => cb()  →  updateDisplay()
       ↓
Display mostra "5"
```

Isso garante que a tela nunca seja atualizada antes do estado interno estar correto — separando responsabilidades entre lógica e apresentação.

---

## ⚙️ Funcionalidades

- Operações básicas: adição, subtração, multiplicação e divisão
- Inversão de sinal (`+/−`) e porcentagem (`%`)
- Histórico da expressão exibido acima do resultado
- Efeito visual de ripple ao clicar nos botões
- Suporte completo ao teclado

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura da interface |
| CSS3 | Estilização, animações e responsividade |
| JavaScript (ES6+) | Lógica, callbacks e manipulação do DOM |
| Google Fonts | Fontes Orbitron e Share Tech Mono |

---

## 🚀 Como Executar

1. Baixe ou clone os arquivos do projeto
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Não é necessário servidor ou instalação de dependências

---

## 👨‍🎓 Contexto Acadêmico

Este projeto foi desenvolvido como atividade prática para fixação dos seguintes conteúdos:

- Separação de responsabilidades entre HTML, CSS e JavaScript
- Manipulação do DOM com JavaScript puro
- Uso de **funções callback** para controle de fluxo assíncrono e sequencial
- Eventos de clique e teclado com delegação de eventos
