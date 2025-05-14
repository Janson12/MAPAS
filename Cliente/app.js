let map = L.map('map').setView([-23.55, -46.63], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Ícones de semáforos (mock)
const greenIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/565/565825.png',
  iconSize: [30, 30]
});

const redIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/565/565844.png',
  iconSize: [30, 30]
});

// Semáforos de exemplo
const signals = [
  { lat: -23.55, lng: -46.63, status: 'green' },
  { lat: -23.551, lng: -46.631, status: 'red' }
];

signals.forEach(sig => {
  const icon = sig.status === 'green' ? greenIcon : redIcon;
  L.marker([sig.lat, sig.lng], { icon }).addTo(map);
});

// Localização do usuário
let userMarker = null;
navigator.geolocation.watchPosition(pos => {
  const { latitude, longitude } = pos.coords;
  if (!userMarker) {
    userMarker = L.marker([latitude, longitude]).addTo(map);
  } else {
    userMarker.setLatLng([latitude, longitude]);
  }
}, console.error, { enableHighAccuracy: true });

// Botão de centralizar localização
document.getElementById('locate').onclick = () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    map.setView([latitude, longitude], 17);
  });
};

// Direção (bússola)
window.addEventListener('deviceorientation', e => {
  const alpha = e.alpha;
  if (alpha !== null) {
    document.getElementById('arrow').style.transform = `rotate(${alpha}deg)`;
  }
});
