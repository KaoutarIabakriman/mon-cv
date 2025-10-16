document.querySelectorAll('.details-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.details-content').forEach(function(content) {
            content.classList.remove('open');
            content.style.height = '0';
            content.style.display = 'none';
        });
        document.querySelectorAll('.details-btn').forEach(function(b) {
            b.textContent = '+ détails';
        });

        const content = btn.nextElementSibling;
        if (content.classList.contains('open')) return;

        content.style.display = 'block';
        content.classList.add('open');
        content.style.height = '0';
        btn.textContent = '- détails';

        let fullHeight = content.scrollHeight;
        let currentHeight = 0;
        let step = fullHeight / 10; 

        function animate() {
            currentHeight += step;
            if (currentHeight < fullHeight) {
                content.style.height = currentHeight + 'px';
                setTimeout(animate, 20);
            } else {
                content.style.height = fullHeight + 'px';
            }
        }
        animate();
    });
});

document.querySelectorAll('.skill-item').forEach(function(item) {
    let tooltip = null;
    item.addEventListener('mouseenter', function(e) {
        tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = item.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        tooltip.style.position = 'absolute';
        tooltip.style.pointerEvents = 'none';
    });

    item.addEventListener('mousemove', function(e) {
        if (tooltip) {
            tooltip.style.left = (e.pageX + 10) + 'px';
            tooltip.style.top = (e.pageY + 15) + 'px';
        }
    });

    item.addEventListener('mouseleave', function() {
        if (tooltip) {
            tooltip.remove();
            tooltip = null;
        }
    });
});

const competencesCategories = {
    "Langages": [
        { nom: "HTML", niveau: 4 },
        { nom: "CSS", niveau: 4 },
        { nom: "JavaScript", niveau: 3 },
        { nom: "PHP", niveau: 3 },
        { nom: "Java", niveau: 4 },
        { nom: "Python", niveau: 3 }
    ],
    "Frameworks": [
        { nom: "Laravel", niveau: 4 },
        { nom: "Spring Boot", niveau: 4 },
        { nom: "React", niveau: 3 },
        { nom: "Tailwind CSS", niveau: 3 },
        { nom: "Django", niveau: 3 }
    ],
    "Outils & Plateformes": [
        { nom: "Git", niveau: 4 },
        { nom: "Docker", niveau: 4 },
        { nom: "Jenkins", niveau: 3 },
        { nom: "GitLab", niveau: 3 },
        { nom: "Kubernetes", niveau: 3 },
        { nom: "Terraform", niveau: 3 }
    ],
    "Bases de données": [
        { nom: "MySQL", niveau: 4 },
        { nom: "MongoDB", niveau: 4 },
        { nom: "Oracle", niveau: 3 },
        { nom: "PL/SQL", niveau: 4 }
    ]
};

function afficherEtoiles(niveau) {
    let etoiles = '';
    for (let i = 1; i <= 5; i++) {
        etoiles += i <= niveau
            ? '<i class="fa-solid fa-star" style="color:gold"></i>'
            : '<i class="fa-regular fa-star" style="color:gold"></i>';
    }
    return etoiles;
}

function ajouterEtoilesAuxCompetences() {
    const toutesCompetences = [].concat(
        competencesCategories["Langages"],
        competencesCategories["Frameworks"],
        competencesCategories["Outils & Plateformes"],
        competencesCategories["Bases de données"]
    );
    document.querySelectorAll('.skill-item').forEach(function(span) {
        const nom = span.textContent.trim();
        const competence = toutesCompetences.find(c => c.nom === nom);
        if (competence) {
            span.innerHTML = `${nom} ${afficherEtoiles(competence.niveau)}`;
        }
    });
}

function afficherHistogrammeCategorie(canvasId, competences) {
    const barWidth = 40;
    const spacing = 25;
    const baseY = 180;
    const maxNiveau = 5;
    const leftMargin = 50;
    const rightMargin = 30;

    const totalWidth = leftMargin + rightMargin + competences.length * barWidth + (competences.length - 1) * spacing;
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    canvas.width = totalWidth;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    competences.forEach((c, i) => {
        const x = leftMargin + i * (barWidth + spacing);
        const barHeight = c.niveau * 30;

        ctx.fillStyle = "#3498db";
        ctx.fillRect(x, baseY - barHeight, barWidth, barHeight);

        ctx.fillStyle = "#444";
        ctx.font = "13px Arial";
        ctx.textAlign = "center";
        ctx.fillText(c.nom, x + barWidth / 2, baseY + 20);
    });

    ctx.fillStyle = "#444";
    ctx.textAlign = "right";
    ctx.font = "13px Arial";
    for (let n = 1; n <= maxNiveau; n++) {
        ctx.fillText(n, leftMargin - 10, baseY - n * 30 + 5);
        ctx.beginPath();
        ctx.moveTo(leftMargin - 5, baseY - n * 30);
        ctx.lineTo(canvas.width - rightMargin, baseY - n * 30);
        ctx.strokeStyle = "#eee";
        ctx.stroke();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    ajouterEtoilesAuxCompetences();
    afficherHistogrammeCategorie('canvas-langages', competencesCategories["Langages"]);
    afficherHistogrammeCategorie('canvas-frameworks', competencesCategories["Frameworks"]);
    afficherHistogrammeCategorie('canvas-outils', competencesCategories["Outils & Plateformes"]);
    afficherHistogrammeCategorie('canvas-bd', competencesCategories["Bases de données"]);
});