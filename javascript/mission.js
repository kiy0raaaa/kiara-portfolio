document.querySelectorAll('.mission-header').forEach((header) => {
    header.addEventListener('click', () => {
        const entry = header.parentElement;
        const isActive = entry.classList.contains('active');
        
        // Close all entries
        document.querySelectorAll('.mission-entry').forEach(e => e.classList.remove('active'));
        
        // Open clicked one if it wasn't already open
        if (!isActive) {
            entry.classList.add('active');
        }
    });
});