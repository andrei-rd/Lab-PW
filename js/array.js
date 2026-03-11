// ==========================================
// Exercițiile 1-4: Educație
// ==========================================
const educationList = document.querySelector("#education ol");
const items = educationList.querySelectorAll("li");

// Creăm array-ul
const educationArray = Array.from(items).map(item =>
  item.innerText.trim().replace(/\s+/g, " ")
);

// Ex. 1
console.log("1. Array educație:", educationArray);

// Ex. 2
const filter2024 = educationArray.filter(item => item.includes("2024"));
const filterCalculatoare = educationArray.filter(item => item.includes("Calculatoare"));

console.log('2. Filtru după "2024":', filter2024);
console.log('2. Filtru după "Calculatoare":', filterCalculatoare);

// Ex. 3
const firstWords = educationArray.map(item => item.split(" ")[0]);
console.log("3. Primul cuvânt din fiecare element:", firstWords);

// Ex. 4
const currentYear = new Date().getFullYear();

const totalYears = educationArray.reduce((total, item) => {
  const years = item.match(/\d{4}/g);

  if (!years || years.length === 0) return total;

  const startYear = parseInt(years[0]);
  let endYear = startYear;

  if (item.toLowerCase().includes("prezent")) {
    endYear = currentYear;
  } else if (years.length > 1) {
    endYear = parseInt(years[1]);
  }

  return total + (endYear - startYear);
}, 0);

console.log(`4. Total ani de studiu: ${totalYears}`);

// ==========================================
// Exercițiile 5 & 6: Proiecte (pe secțiunea HYFORCE)
// ==========================================
async function loadHyforceProjects() {
  try {
    const response = await fetch("data/projects.json");

    if (!response.ok) {
      throw new Error(`Eroare HTTP: ${response.status}`);
    }

    const projects = await response.json();

    // Țintim lista <ul> specifică secțiunii HYFORCE
    const hyforceList = document.querySelector("#extra .project-list");

    if (!hyforceList) {
      console.warn("Nu am găsit lista proiectelor HYFORCE în HTML.");
      return;
    }

    // 1. Generăm itemele folosind map() + join()
    hyforceList.innerHTML = projects.map(project => `
      <li>
        <span>
          <strong>${project.name}</strong> 
          <span style="opacity: 0.7;">(${project.tech})</span>
          — ${project.done ? "✅ Finalizat" : "⏳ În lucru"}
        </span>
      </li>
    `).join("");

    // 2. Calculăm câte sunt gata și afișăm sub listă
    const doneCount = projects.filter(project => project.done).length;
    
    // Creăm dinamic paragraful de status dacă nu există deja
    let statusParagraph = document.getElementById("hyforce-status");
    if (!statusParagraph) {
      statusParagraph = document.createElement("p");
      statusParagraph.id = "hyforce-status";
      statusParagraph.style.marginTop = "10px";
      statusParagraph.style.fontWeight = "bold";
      statusParagraph.style.color = "var(--primary-color)"; // Folosim culoarea ta din CSS
      
      // Îl inserăm fix după lista <ul>
      hyforceList.parentNode.insertBefore(statusParagraph, hyforceList.nextSibling);
    }
    statusParagraph.textContent = `Finalizate: ${doneCount} din ${projects.length}`;

    // 3. BONUS: Actualizăm widget-ul "5+" cu numărul real de proiecte!
    const activeProjectsStat = document.querySelector("#extra .stat:first-child .stat-number");
    if (activeProjectsStat) {
      activeProjectsStat.textContent = projects.length;
    }

  } catch (error) {
    console.error("Eroare la încărcarea proiectelor HYFORCE:", error);
  }
}

// Apelăm funcția
loadHyforceProjects();