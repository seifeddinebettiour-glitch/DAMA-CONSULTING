const ratesBody = document.getElementById("ratesBody");
const rateUpdated = document.getElementById("rateUpdated");

function formatEuro(value) {
  return `${value.toLocaleString("it-IT", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} €/kWh`;
}

function generateRateData() {
  const now = new Date();
  const dateLabel = now.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  if (rateUpdated) {
    rateUpdated.textContent = `Aggiornato il ${dateLabel}`;
  }

  const punBase = 0.214;
  const psvBase = 0.198;
  const dayFactor = now.getDate() / 30;

  const pun = punBase + (Math.sin(dayFactor * 3.2) * 0.012) + 0.006;
  const psv = psvBase + (Math.cos(dayFactor * 2.7) * 0.010) + 0.004;

  const punVar = (Math.sin(dayFactor * 5.3) * 0.0104);
  const psvVar = (Math.cos(dayFactor * 6.1) * 0.0094);

  return [
    {
      label: "PUN",
      value: formatEuro(pun),
      variation: `${punVar >= 0 ? "+" : ""}${punVar.toFixed(3)} €/kWh`,
      trend: punVar >= 0 ? "up" : "down",
      updated: dateLabel
    },
    {
      label: "PSV",
      value: formatEuro(psv),
      variation: `${psvVar >= 0 ? "+" : ""}${psvVar.toFixed(3)} €/kWh`,
      trend: psvVar >= 0 ? "up" : "down",
      updated: dateLabel
    }
  ];
}

function renderRates() {
  if (!ratesBody) return;

  const rows = generateRateData();
  ratesBody.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td>${row.label}</td>
          <td>${row.value}</td>
          <td class="${row.trend === "down" ? "down" : ""}">${row.variation}</td>
          <td>${row.updated}</td>
        </tr>
      `
    )
    .join("");
}

renderRates();
