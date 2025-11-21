function generateMockAlerts(count) {
  const severities = ["low", "medium", "high"];
  const types = [
    "Port Scan",
    "Brute Force Login",
    "DDoS",
    "Data Exfiltration",
    "Malware C2",
    "Suspicious DNS",
  ];

  const alerts = [];
  for (let i = 0; i < count; i++) {
    const sev = severities[Math.floor(Math.random() * severities.length)];
    const type = types[Math.floor(Math.random() * types.length)];

    alerts.push({
      time: new Date(Date.now() - Math.random() * 3600 * 1000)
        .toISOString()
        .slice(11, 19),
      src: `10.0.${Math.floor(Math.random() * 50)}.${Math.floor(
        Math.random() * 255
      )}`,
      dst: `192.168.${Math.floor(Math.random() * 10)}.${Math.floor(
        Math.random() * 255
      )}`,
      severity: sev,
      type,
      model: Math.random() > 0.5 ? "RandomForest" : "Autoencoder",
    });
  }
  return alerts;
}

function severityLabel(sev) {
  if (sev === "low") return "Low";
  if (sev === "medium") return "Medium";
  return "High";
}

function bustStats(alerts) {
  const stats = {
    total: alerts.length,
    high: alerts.filter((a) => a.severity === "high").length,
    medium: alerts.filter((a) => a.severity === "medium").length,
    low: alerts.filter((a) => a.severity === "low").length,
    rf: alerts.filter((a) => a.model === "RandomForest").length,
    ae: alerts.filter((a) => a.model === "Autoencoder").length,
  };
  return stats;
}

function updateAlertTable(alerts) {
  const tbody = document.getElementById("alertsBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  alerts.forEach((a) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${a.time}</td>
      <td>${a.src}</td>
      <td>${a.dst}</td>
      <td><span class="badge ${a.severity}">${severityLabel(
      a.severity
    )}</span></td>
      <td>${a.type}</td>
      <td>${a.model}</td>
    `;
    tbody.appendChild(tr);
  });
}

function updateStatsCards(stats) {
  const map = {
    totalAlerts: stats.total,
    highAlerts: stats.high,
    mediumAlerts: stats.medium,
    lowAlerts: stats.low,
    rfCount: stats.rf,
    aeCount: stats.ae,
  };

  Object.entries(map).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
}

// Init on dashboard page
(function initIdsDashboard() {
  const alertsTable = document.getElementById("alertsBody");
  if (!alertsTable) return; // not on the dashboard page

  let alerts = generateMockAlerts(18);
  updateAlertTable(alerts);
  updateStatsCards(bustStats(alerts));

  // Refresh fake data periodically (demo only)
  setInterval(() => {
    alerts = generateMockAlerts(18);
    updateAlertTable(alerts);
    updateStatsCards(bustStats(alerts));
  }, 15000);
})();
