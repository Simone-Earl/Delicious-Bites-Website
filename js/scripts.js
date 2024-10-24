// Mock data structure for HTML files
const htmlFiles = [
    { title: "Bagnet", path: "recipes/bagnet.html" },
    { title: "Beef Stir Fry", path: "recipes/beef-stir-fry.html" },
    { title: "Beef Stroganoff", path: "recipes/beef-stroganoff.html" },
    { title: "Chicken Adobo", path: "recipes/chicken-adobo.html" },
    { title: "Chicken Alfredo", path: "recipes/chicken-alfredo.html" },
    { title: "Chicken Tikka Masala", path: "recipes/chicken-tikka-masala.html" },
    { title: "Chocolate Lava Cake", path: "recipes/chocolate-lava-cake.html" },
    { title: "Egg Sandwich", path: "recipes/egg-sandwich.html" },
    { title: "Greek Salad", path: "recipes/greek-salad.html" },
    { title: "Maki Roll", path: "recipes/maki-roll.html" },
    { title: "Mushroom Risotto", path: "recipes/mushroom-risotto.html" },
    { title: "Shrimp Tacos", path: "recipes/shrimp-tacos.html" },
    { title: "Sinigang", path: "recipes/sinigang.html" },
    { title: "Spaghetti Carbonara", path: "recipes/spaghetti-carbonara.html" },
    { title: "Sushi Bake", path: "recipes/sushi-bake.html" },
    { title: "Sweet Potato Bites", path: "recipes/sweet-potato-bites.html" }
];

// Search Script
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestions');

// Event listener for the search button
searchBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission
    const query = searchInput.value.trim().toLowerCase(); // Get the trimmed query

    if (query) {
        const file = htmlFiles.find(file => file.title.toLowerCase().includes(query));
        if (file) {
            window.location.href = file.path; // Redirect to the matching HTML file
        } else {
            alert("No results found!"); // Notify user if no matches
        }
    } else {
        if (searchInput.classList.contains('show')) {
            hideSearchInput();
        } else {
            showSearchInput();
        }
    }
});

// Function to show the search input
function showSearchInput() {
    searchInput.style.display = 'inline-block'; // Show input
    setTimeout(() => {
        searchInput.classList.add('show'); // Add class to animate
        searchInput.focus(); // Automatically focus on the input
    }, 10); // Delay to allow display change to take effect
}

// Function to hide the search input
function hideSearchInput() {
    searchInput.classList.remove('show'); // Hide input
    setTimeout(() => {
        searchInput.style.display = 'none'; // Ensure it doesn't take up space
    }, 300); // Match the timeout to the CSS transition duration
}

// Add event listener for the Enter key to submit the form
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission
        const query = searchInput.value.trim().toLowerCase(); // Get the trimmed query
        if (query) {
            const file = htmlFiles.find(file => file.title.toLowerCase().includes(query));
            if (file) {
                window.location.href = file.path; // Redirect to the matching HTML file
            } else {
                alert("No results found!"); // Notify user if no matches
            }
        }
    }
});

// Suggestion Search Script
searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase(); // Get the trimmed query

    if (query.length > 0) {
        showSuggestions(query);
    } else {
        suggestionsContainer.style.display = 'none'; // Hide suggestions when input is empty
    }
});

// Function to show search suggestions
function showSuggestions(query) {
    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';

    // Filter and show new suggestions
    const suggestions = htmlFiles.filter(file => file.title.toLowerCase().includes(query));
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('a');
            suggestionItem.href = suggestion.path; // Redirect to the corresponding HTML file
            suggestionItem.textContent = suggestion.title;
            suggestionsContainer.appendChild(suggestionItem);
        });
        suggestionsContainer.style.display = 'block'; // Show the suggestions container
    } else {
        suggestionsContainer.style.display = 'none'; // Hide suggestions if none found
    }
}

// Optional: Hide suggestions when the input is blurred
searchInput.addEventListener('blur', () => {
    setTimeout(() => {
        suggestionsContainer.style.display = 'none'; // Hide suggestions after losing focus
    }, 200);
});

// Image scaling on scroll
window.addEventListener("scroll", function () {
    const heroImage = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero-content");
    const featuredText = document.querySelector(".featured-text");
    const scrollPosition = window.scrollY;

    // Ensure elements exist before applying styles
    if (heroImage) {
        const scaleValue = 1 + scrollPosition / 1000;
        heroImage.style.transform = `scale(${scaleValue})`;
    }

    if (heroContent) {
        const scaleValue = 1 + scrollPosition / 1000;
        heroContent.style.transform = `translate(-50%, -50%) scale(${scaleValue})`;
    }

    if (featuredText) {
        const scaleValue = 1 + scrollPosition / 1000;
        featuredText.style.transform = `scale(${scaleValue})`;
    }
});

const posts = document.querySelectorAll('.post');

posts.forEach(post => {
    post.addEventListener('click', () => {
        let expandedPost = document.querySelector('.post-expanded');

        // Check if an expanded post already exists
        if (!expandedPost) {
            expandedPost = document.createElement('div');
            expandedPost.className = 'post-expanded';

            const img = post.querySelector('img').cloneNode();
            const title = post.querySelector('h3').cloneNode(true);
            const description = post.querySelector('p').cloneNode(true);

            expandedPost.appendChild(img);
            expandedPost.appendChild(title);
            expandedPost.appendChild(description);

            // Create scroll button
            const scrollButton = document.createElement('button');
            scrollButton.className = 'scroll-btn';
            scrollButton.textContent = 'Scroll Down';
            expandedPost.appendChild(scrollButton);

            document.body.appendChild(expandedPost);
            setTimeout(() => {
                expandedPost.classList.add('visible');
            }, 10);

            // Remove expanded post on click
            expandedPost.addEventListener('click', () => {
                expandedPost.classList.remove('visible');
                setTimeout(() => {
                    expandedPost.remove();
                }, 300);
            });

            // Scroll button functionality
            scrollButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent closing the expanded post
                window.scrollTo({
                    top: window.scrollY + window.innerHeight,
                    behavior: 'smooth'
                });
            });
        } else {
            // If the expanded post already exists, you might want to close it
            expandedPost.classList.remove('visible');
            setTimeout(() => {
                expandedPost.remove();
            }, 300);
        }
    });
});

// Menu Toggle
document.getElementById("menuToggle").addEventListener("click", function () {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.classList.toggle("active"); // Toggle active class for showing/hiding
});

// Close side menu when clicking outside
document.addEventListener("click", function (event) {
    const sideMenu = document.getElementById("sideMenu");
    const menuToggle = document.getElementById("menuToggle");

    // Check if the click was outside the side menu and the menu toggle button
    if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        sideMenu.classList.remove("active"); // Hide the menu
    }
});

document.getElementById("backButton").addEventListener("click", function() {
    window.history.back(); // Go back to the previous page
});