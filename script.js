document.addEventListener('DOMContentLoaded', () => {
    // Select all navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    // Function to load content via AJAX
    const loadContent = (file) => {
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok.');
                return response.text();
            })
            .then(html => {
                document.getElementById('content').innerHTML = html;
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior

            // Get the target section file from the data-section attribute
            const section = link.getAttribute('data-section');
            const file = `${section}.html`; // Construct the filename

            // Load the content of the target section
            loadContent(file);
        });
    });
});
