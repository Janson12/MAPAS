const map = L.map('map').setView([-23.55, -46.63], 13); // centro SP

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const api = 'https://map-qw2a.onrender.com/semaforos';

async function carregarSemaforos() {
  const res = await fetch(api);
  const grupos = await res.json();

  grupos.forEach(grupo => {
    grupo.semaforos.forEach((semaforo, i) => {
      const circle = L.circleMarker([semaforo.lat, semaforo.lng], {
        radius: 10,
        color: i === grupo.ativo ? 'green' : 'red',
        fillOpacity: 1
      }).addTo(map);
      circle.bindPopup(`Grupo ${grupo.id} - Semáforo ${i + 1}`);
    });
  });
}

carregarSemaforos();
setInterval(carregarSemaforos, 5000); // Atualiza a cada 5s
