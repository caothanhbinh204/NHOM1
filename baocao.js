
async function fetchAndRenderCharts() {
  try {
    const res = await fetch('/api/statistics');
    const data = await res.json();

    new Chart(document.getElementById('statusChart'), {
      type: 'doughnut',
      data: {
        labels: ['Inactive', 'Activities'],
        datasets: [{
          data: [data.status.inactive, data.status.activities],
          backgroundColor: ['#80deea', '#26a69a']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        cutout: '70%'
      }
    });

    new Chart(document.getElementById('genderChart'), {
      type: 'pie',
      data: {
        labels: ['Unknown', 'Female', 'Male'],
        datasets: [{
          data: [data.gender.unknown, data.gender.female, data.gender.male],
          backgroundColor: ['#42a5f5', '#ffeb3b', '#66bb6a']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });

    new Chart(document.getElementById('frequencyChart'), {
      type: 'bar',
      data: {
        labels: Object.keys(data.frequency),
        datasets: [{
          label: 'Visits',
          data: Object.values(data.frequency),
          backgroundColor: ['#ef5350', '#ffca28', '#42a5f5', '#26c6da']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 5 } }
        }
      }
    });
  } catch (err) {
    alert('Không thể tải dữ liệu từ backend!');
  }
}

window.addEventListener('DOMContentLoaded', fetchAndRenderCharts);

function downloadPDF() {
  const element = document.getElementById('dashboard');
  html2pdf().set({
    margin: 0.5,
    filename: 'dashboard_tamly.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }).from(element).save();
}
function toggleMenu() {
  const menu = document.getElementById("profileMenu");
  menu.style.display = menu.style.display === "none" ? "block" : "none";
}
function showNotificationBox() {
    const box = document.getElementById("notificationBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
  }
  

