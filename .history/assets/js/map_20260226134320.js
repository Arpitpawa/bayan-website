document.addEventListener("DOMContentLoaded", () => {
  // Jaibagh Palace (accurate-ish)
  const jaibaghCoords = [26.9855, 75.8546];

  const map = L.map("amanMap", {
    zoomControl: true,
    scrollWheelZoom: false,
    dragging: true,
    attributionControl: false,
  });

  /* --------------------------------
     START ZOOMED OUT (hidden feel)
  -------------------------------- */
  map.setView(jaibaghCoords, 9);

  /* --------------------------------
     AMAN LIGHT MAP STYLE
  -------------------------------- */
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.webp",
    {
      maxZoom: 18,
    },
  ).addTo(map);

  /* --------------------------------
     DOT MARKER (AMAN STYLE)
  -------------------------------- */
  const marker = L.circleMarker(jaibaghCoords, {
    radius: 5,
    fillColor: "#1c1c1c",
    fillOpacity: 1,
    stroke: false,
  }).addTo(map);

  marker.bindTooltip("The Jaibagh Palace", {
    permanent: true,
    direction: "top",
    offset: [0, -8],
    className: "aman-map-label",
  });

  /* --------------------------------
     AMAN ZOOM-IN EFFECT
     (this is the magic)
  -------------------------------- */
  setTimeout(() => {
    map.flyTo(
      [jaibaghCoords[0] + 0.01, jaibaghCoords[1]], // slight vertical offset
      12.5, // FINAL ZOOM (key value)
      {
        duration: 2.4,
        easeLinearity: 0.25,
      },
    );
  }, 400);
});
