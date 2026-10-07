document.getElementById("menuBtn")?.addEventListener("click", () => {
  document.getElementById("mainNav")?.classList.toggle("open");
});

document.querySelector("form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Messaggio inviato con successo! Grazie.");
  this.reset();
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
