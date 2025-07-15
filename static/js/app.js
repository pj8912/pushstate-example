// static/js/app.js

document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content-container');
    const contentTitle = document.getElementById('content-title');
    const contentBody = document.getElementById('content-body');

    // Function to fetch data and update the page content
    const updateContent = async (url) => {
        try {

            // fetch call
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // data received from the server after the call converted to javascript object
            const data = await response.json();

            // Update the DOM with the new data
            contentTitle.textContent = data.title;
            contentBody.textContent = data.content;

        } catch (error) {
            console.error('Fetch error:', error);
            contentBody.textContent = 'Failed to load content.';
        }
    };

    // Listen for clicks on our tab links
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Stop the browser from navigating the traditional way
            const url = event.target.href;
            const path = new URL(url).pathname; // Get just the path (e.g., /data/info)

            // Update the URL in the browser's address bar without reloading
            history.pushState({ path: path }, '', path);

            // Fetch and display the new content
            updateContent(path);
        });
    });

    // Handle browser back/forward button clicks
    window.addEventListener('popstate', (event) => {
        // Load the content for the state that was popped
        const path = window.location.pathname;
        if (path === '/') {
             // Handle the root case if necessary, e.g., clear content
            contentTitle.textContent = "Welcome";
            contentBody.textContent = "Please select a tab.";
        } else {
            updateContent(path);
        }
    });
    
    // Load initial content for the "Info" tab when the page first loads
    updateContent('/data/info');
    history.replaceState({ path: '/data/info' }, '', '/data/info');

});