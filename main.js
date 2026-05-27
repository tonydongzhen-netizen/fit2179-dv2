const charts = [
  ["chart-01", "charts/chart-01-capital-climate-map.vl.json"],
  ["chart-02", "charts/chart-02-score-recipe.vl.json"],
  ["chart-03a", "charts/chart-03a-balanced-ranking.vl.json"],
  ["chart-03b", "charts/chart-03b-component-fingerprint.vl.json"],
  ["chart-04", "charts/chart-04-seasonal-heat-map.vl.json"],
  ["chart-05", "charts/chart-05-temperature-envelope.vl.json"],
  ["chart-06", "charts/chart-06-day-night-split.vl.json"],
  ["chart-07", "charts/chart-07-rain-burden-map.vl.json"],
  ["chart-08", "charts/chart-08-rain-rhythm-barcode.vl.json"],
  ["chart-09", "charts/chart-09-humidity-sunshine-compass.vl.json"],
  ["chart-10", "charts/chart-10-seasonal-stability-fingerprint.vl.json"],
  ["chart-11", "charts/chart-11-preference-switchboard.vl.json"],
];

const embedOptions = {
  actions: false,
  renderer: "svg",
};

const embeddedViews = [];
let resizeTimer;

function resizeCharts() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    embeddedViews.forEach((view) => view.resize().runAsync());
  }, 120);
}

async function embedCharts() {
  for (const [id, specUrl] of charts) {
    const element = document.getElementById(id);
    if (!element) continue;

    try {
      const response = await fetch(specUrl, { cache: "no-cache" });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const spec = await response.json();
      const result = await vegaEmbed(element, spec, embedOptions);
      embeddedViews.push(result.view);
    } catch (error) {
      element.innerHTML = `<p class="chart-error">Chart failed to load: ${specUrl}</p>`;
      console.error(error);
    }
  }
}

embedCharts();
window.addEventListener("resize", resizeCharts);
