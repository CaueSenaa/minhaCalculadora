// ─────────────────────────────────────────────
//  CALCULADORA COM CALLBACKS
// ─────────────────────────────────────────────

const state = {
  current:  '0',
  previous: null,
  operator: null,
  justCalc: false,
};

const display    = document.getElementById('displayValue');
const expression = document.getElementById('expression');

// Formata número para exibição
function formatDisplay(val) {
  const n = parseFloat(val);
  if (isNaN(n)) return val;
  const s = n.toString();
  if (s.length > 10) return parseFloat(n.toPrecision(8)).toString();
  return s;
}

// Atualiza o display — recebe um callback opcional executado após a atualização
function updateDisplay(callback) {
  display.classList.add('pop');
  display.textContent = formatDisplay(state.current);
  expression.textContent =
    state.previous !== null && state.operator
      ? `${formatDisplay(state.previous)} ${state.operator}`
      : '';
  setTimeout(() => display.classList.remove('pop'), 150);
  if (callback) callback();
}

// ── Ações individuais usando callbacks ────────

function handleNumber(val, callback) {
  if (state.justCalc) {
    state.current  = val;
    state.justCalc = false;
  } else {
    state.current = state.current === '0'
      ? val
      : state.current.length < 12 ? state.current + val : state.current;
  }
  callback(updateDisplay);
}

function handleOperator(op, callback) {
  if (state.previous !== null && !state.justCalc) {
    calculate(() => {
      state.operator = op;
      state.previous = state.current;
      state.current  = '0';
      state.justCalc = false;
      callback(updateDisplay);
    });
  } else {
    state.operator = op;
    state.previous = state.current;
    state.current  = '0';
    state.justCalc = false;
    callback(updateDisplay);
  }
}

function handleDecimal(callback) {
  if (state.justCalc) {
    state.current  = '0.';
    state.justCalc = false;
  } else if (!state.current.includes('.')) {
    state.current += '.';
  }
  callback(updateDisplay);
}

function handleClear(callback) {
  state.current  = '0';
  state.previous = null;
  state.operator = null;
  state.justCalc = false;
  callback(updateDisplay);
}

function handleSign(callback) {
  state.current = (parseFloat(state.current) * -1).toString();
  callback(updateDisplay);
}

function handlePercent(callback) {
  state.current = (parseFloat(state.current) / 100).toString();
  callback(updateDisplay);
}

function calculate(callback) {
  if (state.previous === null || state.operator === null) {
    if (callback) callback();
    return;
  }
  const a = parseFloat(state.previous);
  const b = parseFloat(state.current);
  const ops = {
    '+': (x, y) => x + y,
    '−': (x, y) => x - y,
    '×': (x, y) => x * y,
    '÷': (x, y) => y === 0 ? 'Erro' : x / y,
  };
  const result = ops[state.operator] ? ops[state.operator](a, b) : b;
  state.current  = result.toString();
  state.previous = null;
  state.operator = null;
  state.justCalc = true;
  if (callback) callback();
  else updateDisplay();
}

// ── Efeito Ripple ────────────────────────────
function createRipple(btn, e) {
  const r    = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.className = 'ripple';
  r.style.cssText = `
    width:${size}px; height:${size}px;
    left:${e.clientX - rect.left - size / 2}px;
    top:${e.clientY  - rect.top  - size / 2}px;
  `;
  btn.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
}

// ── Delegação de eventos nos botões ──────────
document.getElementById('btnGrid').addEventListener('click', function(e) {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  createRipple(btn, e);

  const action = btn.dataset.action;

  // Cada caso usa um callback diferente
  if (action === 'num')     handleNumber(btn.dataset.val,  cb => cb());
  if (action === 'op')      handleOperator(btn.dataset.op, cb => cb());
  if (action === 'decimal') handleDecimal(cb => cb());
  if (action === 'clear')   handleClear(cb => cb());
  if (action === 'sign')    handleSign(cb => cb());
  if (action === 'percent') handlePercent(cb => cb());
  if (action === 'equals')  calculate();
});

// ── Suporte ao teclado ───────────────────────
document.addEventListener('keydown', function(e) {
  const key    = e.key;
  const numMap = ['0','1','2','3','4','5','6','7','8','9'];
  if (numMap.includes(key))               handleNumber(key, cb => cb());
  else if (key === '.')                   handleDecimal(cb => cb());
  else if (key === '+')                   handleOperator('+', cb => cb());
  else if (key === '-')                   handleOperator('−', cb => cb());
  else if (key === '*')                   handleOperator('×', cb => cb());
  else if (key === '/') { e.preventDefault(); handleOperator('÷', cb => cb()); }
  else if (key === 'Enter' || key === '=') calculate();
  else if (key === 'Escape')              handleClear(cb => cb());
  else if (key === '%')                   handlePercent(cb => cb());
});

// Inicializa o display
updateDisplay();