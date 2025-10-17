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

let competencesCategories = {};

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
        competencesCategories["Langages"] || [],
        competencesCategories["Frameworks"] || [],
        competencesCategories["Outils & Plateformes"] || [],
        competencesCategories["Bases de données"] || []
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
    const barHeight = 25;    // hauteur d'une barre
    const spacing = 20;      // espace entre les barres
    const leftMargin = 120;  // espace pour afficher le nom des compétences
    const rightMargin = 40;  // espace à droite
    const topMargin = 20;
    const maxNiveau = 5;

    const totalHeight = topMargin + competences.length * (barHeight + spacing);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Largeur fixe (tu peux ajuster selon ton CV)
    const canvasWidth = 500;
    canvas.width = canvasWidth;
    canvas.height = totalHeight + 40; // un peu d'espace en bas

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Graduation (1 à 5)
    ctx.strokeStyle = "#eee";
    ctx.fillStyle = "#444";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    for (let n = 1; n <= maxNiveau; n++) {
        const x = leftMargin + (n / maxNiveau) * (canvasWidth - leftMargin - rightMargin);
        ctx.beginPath();
        ctx.moveTo(x, topMargin);
        ctx.lineTo(x, canvas.height - 20);
        ctx.stroke();
        ctx.fillText(n, x, 15);
    }

    // Barres horizontales
    competences.forEach((c, i) => {
        const y = topMargin + i * (barHeight + spacing);
        const barWidth = (c.niveau / maxNiveau) * (canvasWidth - leftMargin - rightMargin);

        // Barre bleue
        ctx.fillStyle = "#3498db";
        ctx.fillRect(leftMargin, y, barWidth, barHeight);

        // Nom de la compétence
        ctx.fillStyle = "#333";
        ctx.textAlign = "right";
        ctx.font = "13px Arial";
        ctx.fillText(c.nom, leftMargin - 10, y + barHeight * 0.75);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    fetch('competences.json')
        .then(response => response.json())
        .then(data => {
            competencesCategories = data;
            ajouterEtoilesAuxCompetences();
            afficherHistogrammeCategorie('canvas-langages', competencesCategories["Langages"] || []);
            afficherHistogrammeCategorie('canvas-frameworks', competencesCategories["Frameworks"] || []);
            afficherHistogrammeCategorie('canvas-outils', competencesCategories["Outils & Plateformes"] || []);
            afficherHistogrammeCategorie('canvas-bd', competencesCategories["Bases de données"] || []);
        })
        .catch(err => console.error('Erreur de chargement du fichier JSON', err));
});
