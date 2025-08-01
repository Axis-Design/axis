document.addEventListener('DOMContentLoaded', function() {
    // Other existing JavaScript code...

    // New Carousel for Portfolio Page Hero Section
    const portfolioCarouselImages = document.querySelectorAll('.carousel-container-portfolio img');
    let currentPortfolioImageIndex = 0;

    function showNextPortfolioImage() {
        // Remove active class from current image
        if (portfolioCarouselImages.length > 0) {
            portfolioCarouselImages[currentPortfolioImageIndex].classList.remove('active');

            // Increment index, reset if it goes beyond array length
            currentPortfolioImageIndex = (currentPortfolioImageIndex + 1) % portfolioCarouselImages.length;

            // Add active class to new current image
            portfolioCarouselImages[currentPortfolioImageIndex].classList.add('active');
        }
    }

    // Start the portfolio carousel if images exist
    if (portfolioCarouselImages.length > 0) {
        portfolioCarouselImages[0].classList.add('active'); // Ensure the first image is active on load
        setInterval(showNextPortfolioImage, 3000); // Change image every 3 seconds (3000ms)
    }

    // Existing Portfolio Details (Accordion) Logic
    const projectHeaders = document.querySelectorAll('.project-header');

    projectHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const projectDetails = this.nextElementSibling; // Get the .project-details div
            const icon = this.querySelector('i'); // Get the icon

            // Toggle the 'active' class on the project-details
            projectDetails.classList.toggle('active');

            // Toggle the 'active' class on the header itself for icon rotation
            this.classList.toggle('active'); // This targets the header to change the icon

            // Optionally, close other open projects
            projectHeaders.forEach(otherHeader => {
                if (otherHeader !== this && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('active');
                }
            });
        });
    });

    // Lightbox Functionality
    const projectImages = document.querySelectorAll('.project-images-grid img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev-modal');
    const nextButton = document.querySelector('.next-modal');
    let currentImageIndex = 0;
    let currentImageCollection = []; // To store images of the currently opened project

    projectImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            // Populate currentImageCollection with images from the *current* project
            const currentProjectGrid = this.closest('.project-images-grid');
            currentImageCollection = Array.from(currentProjectGrid.querySelectorAll('img'));
            currentImageIndex = currentImageCollection.indexOf(this); // Get index of clicked image within its collection

            modal.classList.add('active');
            modalImg.src = this.src;
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + currentImageCollection.length) % currentImageCollection.length;
        modalImg.src = currentImageCollection[currentImageIndex].src;
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % currentImageCollection.length;
        modalImg.src = currentImageCollection[currentImageIndex].src;
    });

    // Close modal if clicked outside image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});