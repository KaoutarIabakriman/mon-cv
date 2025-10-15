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
    item.addEventListener('mouseenter', function(e) {
        let tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = item.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);

        let rect = item.getBoundingClientRect();
        tooltip.style.left = rect.left + window.scrollX + 'px';
        tooltip.style.top = rect.bottom + window.scrollY + 5 + 'px';
    });

    item.addEventListener('mouseleave', function() {
        let tooltip = document.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    });
});