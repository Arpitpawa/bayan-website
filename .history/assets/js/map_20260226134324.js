document.addEventListener("DOMContentLoaded", () => {

  const mapElement = document.getElementById("amanMap");
  if (!mapElement) return;

  // 🔥 Read coordinates from HTML
  const lat = parseFloat(mapElement.dataset.lat);
  const lng = parseFloat(mapElement.dataset.lng);
  const label = mapElement.dataset.label || "Bayan Property";

  const coords = [lat, lng];

  const map = L.map("amanMap", {
    zoomControl: true,
    scrollWheelZoom: false,
    dragging: true,
    attributionControl: false,
  });

  /* --------------------------------
     START ZOOMED OUT
  -------------------------------- */
  map.setView(coords, 9);

  /* --------------------------------
     AMAN LIGHT MAP STYLE
  -------------------------------- */
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.webp",
    {
      maxZoom: 18,
    }
  ).addTo(map);

  /* --------------------------------
     DOT MARKER (AMAN STYLE)
  -------------------------------- */
  const marker = L.circleMarker(coords, {
    radius: 5,
    fillColor: "#1c1c1c",
    fillOpacity: 1,
    stroke: false,
  }).addTo(map);

  marker.bindTooltip(label, {
    permanent: true,
    direction: "top",
    offset: [0, -8],
    className: "aman-map-label",
  });

  /* --------------------------------
     AMAN ZOOM-IN EFFECT
  -------------------------------- */
  setTimeout(() => {
    map.flyTo(
      [coords[0] + 0.01, coords[1]],
      12.5,
      {
        duration: 2.4,
        easeLinearity: 0.25,
      }
    );
  }, 400);

});