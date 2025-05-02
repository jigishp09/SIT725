import { io } from "https://cdn.socket.io/4.6.1/socket.io.esm.min.js";

const socket = io("http://localhost:3000");

socket.on("newInternship", (data) => {
    const list = document.getElementById("internshipList");

    const div = document.createElement("div");
    div.className = "internship-card";
    div.innerHTML = `
      <h3>${data.title}</h3>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Skills Required:</strong> ${data.skills.join(', ')}</p>
    `;
    list.appendChild(div);
  });

window.onload = function () {
    fetch("http://localhost:3000/api/internships")
      .then((response) => response.json())
      .then((data) => {
        const container = document.getElementById("internshipList");
        data.forEach((internship) => {
          const div = document.createElement("div");
          div.innerText = `📝 ${internship.title} at ${internship.company}`;
          container.appendChild(div);
        });
      })
      .catch((error) => console.error("Error fetching internships:", error));
  };
  
