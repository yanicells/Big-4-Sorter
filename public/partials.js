// Utility function to load HTML partials
async function loadPartial(elementId, partialPath) {
    try {
        const response = await fetch(partialPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading partial ${partialPath}:`, error);
    }
}

// Load all partials when DOM is ready
$(document).ready(function() {
    // Load header and footer
    loadPartial('header-placeholder', '/partials/header.html');
    loadPartial('footer-placeholder', '/partials/footer.html');
    
    // Your existing jQuery code
    $("h1").on("click", function() {
        $(this).css("color", "red");
    });
});
