/* =========================================
   BAYAN LUXURY BOOKING SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("bookingForm");
  if (!form) return; // Only run on pages with booking bar

  const checkIn = document.getElementById("checkIn");
  const checkOut = document.getElementById("checkOut");
  const guestToggle = document.getElementById("guestToggle");
  const guestDropdown = document.getElementById("guestDropdown");
  const adultCount = document.getElementById("adultCount");
  const childCount = document.getElementById("childCount");
  const guestSummary = document.getElementById("guestSummary");

  /* ===============================
     FLATPICKR
  ============================== */

  if (!window.flatpickr) {
    console.error("Flatpickr not loaded");
    return;
  }

  const checkOutPicker = flatpickr(checkOut, {
    dateFormat: "Y-m-d",
    showMonths: 2,
  });

  flatpickr(checkIn, {
    dateFormat: "Y-m-d",
    minDate: "today",
    showMonths: 2,
    onChange: function (selectedDates, dateStr) {
      checkOutPicker.set("minDate", dateStr);
      checkOutPicker.open();
    },
  });

  /* ===============================
     GUEST DROPDOWN
  ============================== */

  guestToggle.addEventListener("click", () => {
    guestDropdown.classList.toggle("active");
  });

  function updateSummary() {
    guestSummary.textContent =
      adultCount.textContent +
      " Adults, " +
      childCount.textContent +
      " Children";
  }

  document.querySelectorAll(".plus").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.type === "adult") {
        adultCount.textContent = parseInt(adultCount.textContent) + 1;
      } else {
        childCount.textContent = parseInt(childCount.textContent) + 1;
      }
      updateSummary();
    });
  });

  document.querySelectorAll(".minus").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.type === "adult" && adultCount.textContent > 1) {
        adultCount.textContent = parseInt(adultCount.textContent) - 1;
      }
      if (btn.dataset.type === "child" && childCount.textContent > 0) {
        childCount.textContent = parseInt(childCount.textContent) - 1;
      }
      updateSummary();
    });
  });

  document.addEventListener("click", function (e) {
    if (!guestDropdown.contains(e.target) && !guestToggle.contains(e.target)) {
      guestDropdown.classList.remove("active");
    }
  });

  /* ===============================
     FORM SUBMIT
  ============================== */

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!checkIn.value || !checkOut.value) {
      alert("Please select your stay dates.");
      return;
    }

    const bookingURL =
      "https://www.swiftbook.io/inst/#group" +
      "?groupId=341NlfplxPrIg9W3WZzfdTQ5Njg=" +
      "&JDRN=Y" +
      "&checkIn=" +
      checkIn.value +
      "&checkOut=" +
      checkOut.value +
      "&adults=" +
      adultCount.textContent +
      "&children=" +
      childCount.textContent +
      "&rooms=1";

    window.location.href = bookingURL;
  });

});