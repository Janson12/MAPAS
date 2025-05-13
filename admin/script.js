const api = 'https://map-qw2a.onrender.com/semaforos';
const gruposDiv = document.getElementById('grupos');

// Adiciona novo grupo
document.getElementById('novoGrupoForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const coords = document.getElementById('coords').value.trim().split('\n').map(c => {
    const [lat, lng] = c.split(',').map(Number);
    return { lat, lng };
  });
  const tempo = parseInt(document.getElementById('tempo').value);

  await fetch(api, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ semaforos: coords, tempo })
  });

  carregarGrupos();
});

// Carrega grupos
async function carregarGrupos() {
  gruposDiv.innerHTML = '';
  const res = await fetch(api);
  const grupos = await res.json();

  grupos.forEach(grupo => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h4>Grupo ${grupo.id}</h4>
      Tempo: ${grupo.tempo}s<br/>
      Semáforos: ${grupo.semaforos.length}<br/>
      <button onclick="resetar(${grupo.id})">Resetar</button>
      <button onclick="remover(${grupo.id})">Remover</button>
      <hr/>
    `;
    gruposDiv.appendChild(div);
  });
}

async function resetar(id) {
  await fetch(`${api}/${id}/reset`, { method: 'POST' });
  carregarGrupos();
}

async function remover(id) {
  await fetch(`${api}/${id}`, { method: 'DELETE' });
  carregarGrupos();
}

carregarGrupos();
