let map = L.map('map').setView([-23.55, -46.63], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Ícones mockados
const greenIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/565/565825.png',
  iconSize: [30, 30]
});

const redIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/565/565844.png',
  iconSize: [30, 30]
});

// Semáforos mock
const signals = [
  { lat: -23.55, lng: -46.63, status: 'green' },
  { lat: -23.551, lng: -46.631, status: 'red' }
];

signals.forEach(sig => {
  L.marker([sig.lat, sig.lng], { icon: sig.status === 'green' ? greenIcon : redIcon }).addTo(map);
});

// Localização
let userMarker = null;
navigator.geolocation.watchPosition(pos => {
  const { latitude, longitude } = pos.coords;
  if (!userMarker) {
    userMarker = L.marker([latitude, longitude]).addTo(map);
  } else {
    userMarker.setLatLng([latitude, longitude]);
  }
}, console.error, { enableHighAccuracy: true });

// Botão para centralizar
document.getElementById('locate').onclick = () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    map.setView([latitude, longitude], 17);
  });
};

// Direção (bússola)
window.addEventListener('deviceorientation', e => {
  const alpha = e.alpha;
  document.getElementById('arrow').style.transform = `rotate(${alpha}deg)`;
});
