// ExportButton.js
import React from "react";

const ExportButton = ({ exportToCSV, gridData, years }) => {
  const arrayToCSV = () => {
    const csvRows = [];
    const headers = ["Year", "Fall", "Winter", "Spring", "Summer"];
    csvRows.push(headers.join(","));
    for (let yearIndex = 0; yearIndex < years.length; yearIndex++) {
      for (let classIndex = 0; classIndex < 4; classIndex++) {
        const row = [classIndex === 0 ? years[yearIndex] : ""];
        for (let quarter = 0; quarter < 4; quarter++) {
          const cellIndex = yearIndex * 4 + quarter;
          const classText = gridData[cellIndex][classIndex] || "";
          row.push(`"${classText.replace(/"/g, '""')}"`);
        }
        csvRows.push(row.join(","));
      }
    }
    return csvRows.join("\n");
  };

  const handleExport = () => {
    const csvData = arrayToCSV();
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "4-year-plan.csv";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport} style={{ marginTop: "10px" }}>
      Export to CSV
    </button>
  );
};

export default ExportButton;
