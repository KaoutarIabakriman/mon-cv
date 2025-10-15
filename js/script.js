document.querySelectorAll('.details-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const content = btn.nextElementSibling;
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            btn.textContent = '- détails';
        } else {
            content.style.display = 'none';
            btn.textContent = '+ détails';
        }
    });
});