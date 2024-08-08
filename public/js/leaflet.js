export function leaflet(locationMap) {
  //const locationMap = JSON.parse(document.querySelector('#map').dataset.locations);

  const [longitude, latitude] = locationMap[0].coordinates;
  //console.log(locationMap[0].coordinates);
  //var map = L.map('map').setView(locationMap[0].coordinates, 13);
  var map = L.map('map').setView([latitude, longitude], 15);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var marker = L.marker([latitude, longitude]).addTo(map);
}
