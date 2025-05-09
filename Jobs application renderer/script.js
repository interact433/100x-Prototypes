import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://suodajvvmzwyldqujhoa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1b2RhanZ2bXp3eWxkcXVqaG9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNDU1OTQsImV4cCI6MjA2MTkyMTU5NH0.iKlU6EPfBJh0C8JZ0HHYTgWfaefL4ixEMMvS84BS1rc';
const supabase = createClient(supabaseUrl, supabaseKey);

let lastSeenId = null;

async function fetchData() {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('date', { ascending: false });

  const container = document.getElementById('records');
  container.innerHTML = '';

  if (error) {
    console.error('Error:', error);
    container.textContent = 'Failed to load data.';
    return;
  }

  if (!data.length) {
    container.textContent = 'No applications yet.';
    return;
  }

  // Create table
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  thead.innerHTML = `
    <tr>
      <th>Company</th>
      <th>Role</th>
      <th>Date</th>
      <th>Round</th>
      <th>Result</th>
    </tr>
  `;

  data.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.company}</td>
      <td>${item.role}</td>
      <td>${item.date}</td>
      <td>${item.round}</td>
      <td>${item.result || 'no result yet'}</td>
    `;

    // Highlight the newest row for 30 seconds
    if (index === 0 && item.id !== lastSeenId) {
      row.classList.add('highlight');
      setTimeout(() => {
        row.classList.remove('highlight');
      }, 30000);
      lastSeenId = item.id;
    }

    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  container.appendChild(table);
}

fetchData();
setInterval(fetchData, 15000);
