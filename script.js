document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("gradeForm");
  const tableBody = document.querySelector("#gradeTable tbody");
  const studentData = {};

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    if (!name || !subject || isNaN(grade)) {
      alert("Please fill all fields correctly.");
      return;
    }

    // Store grades
    if (!studentData[name]) {
      studentData[name] = [];
    }
    studentData[name].push(grade);

    const avg =
      studentData[name].reduce((a, b) => a + b, 0) / studentData[name].length;

    // Check if row already exists
    let existingRow = Array.from(tableBody.rows).find(
      (row) => row.cells[0].textContent === name
    );

    if (existingRow) {
      // Update subject, latest grade, and average
      existingRow.cells[1].textContent = subject;
      existingRow.cells[2].textContent = grade;
      existingRow.cells[3].textContent = avg.toFixed(2);
    } else {
      // Create a new row
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${name}</td>
        <td>${subject}</td>
        <td>${grade}</td>
        <td>${avg.toFixed(2)}</td>
      `;
      tableBody.appendChild(row);
    }

    form.reset();
  });
});
