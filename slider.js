document.addEventListener('DOMContentLoaded', () => {
    // Hero Section Carousel (Main Slider)
    const heroCarouselContainer = document.querySelector('.carousel-container');
    const heroImagesPaths = [
        'assets/images/project 4/q15.jpg',
        'assets/images/project 8/rooms_page-0009.jpg',
        'assets/images/project 2/7.jpg',
        'assets/images/project 4/q16.jpg',
        'assets/images/project 4/q6.jpg',
        'assets/images/project 2/2.jpg',
        'assets/images/project 7/frist floor_page-0003.jpg',
        'assets/images/project 6/basement_page-0002.jpg',
        'assets/images/project 6/basement_page-0003.jpg'
    ];

    let currentHeroImageIndex = 0;

    function loadHeroImages() {
        heroImagesPaths.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Interior Design Image ${index + 1}`;
            if (index === 0) {
                img.classList.add('active'); // Make the first image active initially
            }
            heroCarouselContainer.appendChild(img);
        });
    }

    function changeHeroImage() {
        const allImages = heroCarouselContainer.querySelectorAll('img');
        if (allImages.length === 0) return; // Prevent error if no images are loaded

        allImages[currentHeroImageIndex].classList.remove('active');
        currentHeroImageIndex = (currentHeroImageIndex + 1) % allImages.length;
        allImages[currentHeroImageIndex].classList.add('active');
    }

    loadHeroImages();
    if (heroImagesPaths.length > 1) { // Only start interval if there's more than one image
        setInterval(changeHeroImage, 3000);
    }


    // **********************************************
    // New Carousel Logic for Services Section - MODIFIED AND FIXED
    // **********************************************

    const serviceCarousels = document.querySelectorAll('.service-carousel');

    serviceCarousels.forEach(carousel => {
        const carouselImagesContainer = carousel.querySelector('.carousel-images');
        const images = carouselImagesContainer.querySelectorAll('img');
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');

        let currentImageIndex = 0;
        const totalImages = images.length;

        // Function to update the display of images for a specific carousel
        function updateCarouselDisplay() {
            // Remove 'active' class from all images
            images.forEach(img => {
                img.classList.remove('active');
            });
            // Add 'active' class to the current image
            if (images[currentImageIndex]) {
                images[currentImageIndex].classList.add('active');
            }
        }

        // Event listener for the 'Previous' button
        prevButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
            updateCarouselDisplay();
        });

        // Event listener for the 'Next' button
        nextButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % totalImages;
            updateCarouselDisplay();
        });

        // Initial call to display the first image correctly
        updateCarouselDisplay(); // هذا السطر يضمن ظهور أول صورة عند تحميل الصفحة
    });

    // **********************************************
    // Smooth Scroll for "View Our Works" button (الأنيميشن البسيط)
    // **********************************************
    const scrollToServicesButton = document.querySelector('.scroll-to-services');

    if (scrollToServicesButton) {
        scrollToServicesButton.addEventListener('click', function(e) {
            e.preventDefault(); // منع القفز الافتراضي للرابط (هذا هو أساس الأنيميشن)

            const targetId = this.getAttribute('href').substring(1); // الحصول على الـ ID بدون الـ #
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth' // هذا هو الجزء الذي يضيف التمرير السلس
                });
            }
        });
    }

    // **********************************************
    // Simple Page Transition Animation for "More Project" button
    // **********************************************
    const moreProjectBtn = document.querySelector('.more-project-btn');
    const transitionOverlay = document.querySelector('.transition-overlay');

    if (moreProjectBtn && transitionOverlay) {
        moreProjectBtn.addEventListener('click', function(e) {
            e.preventDefault(); // منع الانتقال الافتراضي مباشرة

            const targetUrl = this.href; // الحصول على رابط الصفحة المستهدفة

            // تفعيل شاشة التلاشي
            transitionOverlay.classList.add('active');

            // بعد انتهاء أنيميشن التلاشي (0.5 ثانية كما في CSS)، انتقل إلى الصفحة الجديدة
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500); // يجب أن تتطابق هذه المدة مع مدة transition في CSS (0.5 ثانية = 500 ملي ثانية)
        });
    }
});