
        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('nav ul');

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-ellipsis-v"></i>';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
                }
            });
        });

        // Products Carousel functionality
        const productsTrack = document.querySelector('.products-track');
        const productSlides = Array.from(document.querySelectorAll('.product-slide'));
        const productsNextBtn = document.querySelector('.products-container .next');
        const productsPrevBtn = document.querySelector('.products-container .prev');
        const productsIndicators = document.querySelectorAll('.products-carousel .indicator');

        let currentProductSlide = 0;
        const productSlideWidth = productSlides[0].getBoundingClientRect().width;

        // Arrange product slides next to one another
        const setProductSlidePosition = () => {
            productSlides.forEach((slide, index) => {
                slide.style.left = `${productSlideWidth * index}px`;
            });
        };

        setProductSlidePosition();

        // Move to product slide
        const moveToProductSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = `translateX(-${targetSlide * productSlideWidth}px)`;
            currentSlide = targetSlide;
            
            // Update indicators
            productsIndicators.forEach(ind => ind.classList.remove('active'));
            productsIndicators[currentSlide].classList.add('active');
            
            return currentSlide;
        };

        // Next product slide
        productsNextBtn.addEventListener('click', () => {
            if (currentProductSlide === productSlides.length - 1) {
                currentProductSlide = moveToProductSlide(productsTrack, currentProductSlide, 0);
            } else {
                currentProductSlide = moveToProductSlide(productsTrack, currentProductSlide, currentProductSlide + 1);
            }
        });

        // Previous product slide
        productsPrevBtn.addEventListener('click', () => {
            if (currentProductSlide === 0) {
                currentProductSlide = moveToProductSlide(productsTrack, currentProductSlide, productSlides.length - 1);
            } else {
                currentProductSlide = moveToProductSlide(productsTrack, currentProductSlide, currentProductSlide - 1);
            }
        });

        // Product indicator click
        productsIndicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const targetSlide = parseInt(indicator.getAttribute('data-slide'));
                currentProductSlide = moveToProductSlide(productsTrack, currentProductSlide, targetSlide);
            });
        });

        // Locations Carousel functionality
        const locationsTrack = document.querySelector('.locations-carousel .products-track');
        const locationSlides = Array.from(document.querySelectorAll('.locations-carousel .product-slide'));
        const locationsNextBtn = document.querySelector('.locations-carousel .next');
        const locationsPrevBtn = document.querySelector('.locations-carousel .prev');
        const locationsIndicators = document.querySelectorAll('.locations-carousel .indicator');

        let currentLocationSlide = 0;
        const locationSlideWidth = locationSlides[0].getBoundingClientRect().width;

        // Arrange location slides next to one another
        const setLocationSlidePosition = () => {
            locationSlides.forEach((slide, index) => {
                slide.style.left = `${locationSlideWidth * index}px`;
            });
        };

        setLocationSlidePosition();

        // Move to location slide
        const moveToLocationSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = `translateX(-${targetSlide * locationSlideWidth}px)`;
            currentSlide = targetSlide;
            
            // Update indicators
            locationsIndicators.forEach(ind => ind.classList.remove('active'));
            locationsIndicators[currentSlide].classList.add('active');
            
            return currentSlide;
        };

        // Next location slide
        locationsNextBtn.addEventListener('click', () => {
            if (currentLocationSlide === locationSlides.length - 1) {
                currentLocationSlide = moveToLocationSlide(locationsTrack, currentLocationSlide, 0);
            } else {
                currentLocationSlide = moveToLocationSlide(locationsTrack, currentLocationSlide, currentLocationSlide + 1);
            }
        });

        // Previous location slide
        locationsPrevBtn.addEventListener('click', () => {
            if (currentLocationSlide === 0) {
                currentLocationSlide = moveToLocationSlide(locationsTrack, currentLocationSlide, locationSlides.length - 1);
            } else {
                currentLocationSlide = moveToLocationSlide(locationsTrack, currentLocationSlide, currentLocationSlide - 1);
            }
        });

        // Location indicator click
        locationsIndicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const targetSlide = parseInt(indicator.getAttribute('data-slide'));
                currentLocationSlide = moveToLocationSlide(locationsTrack, currentLocationSlide, targetSlide);
            });
        });

        // Auto-advance carousels
        let autoSlideInterval = setInterval(() => {
            // Products carousel
            if (currentProductSlide === productSlides.length - 1) {
                currentProductSlide = moveToProductSlide(productsTrack, currentProductSlide, 0);
            } else {
                currentProductSlide = moveToProductSlide(productsTrack, currentProductSlide, currentProductSlide + 1);
            }
            
            // Locations carousel
            if (currentLocationSlide === locationSlides.length - 1) {
                currentLocationSlide = moveToLocationSlide(locationsTrack, currentLocationSlide, 0);
            } else {
                currentLocationSlide = moveToLocationSlide(locationsTrack, currentLocationSlide, currentLocationSlide + 1);
            }
        }, 5000);

        // Pause auto-slide on hover
        const carouselContainers = document.querySelectorAll('.products-container, .locations-carousel .products-container');
        carouselContainers.forEach(container => {
            container.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            container.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    // Products carousel
                    if (currentProductSlide === productSlides.length - 1) {
                        currentProductSlide = moveToProductSlide(productsTrack, currentProductSlide, 0);
                    } else {
                        currentProductSlide = moveToProductSlide(productsTrack, currentProductSlide, currentProductSlide + 1);
                    }
                    
                    // Locations carousel
                    if (currentLocationSlide === locationSlides.length - 1) {
                        currentLocationSlide = moveToLocationSlide(locationsTrack, currentLocationSlide, 0);
                    } else {
                        currentLocationSlide = moveToLocationSlide(locationsTrack, currentLocationSlide, currentLocationSlide + 1);
                    }
                }, 5000);
            });
        });

        // Accessibility features
        const accessibilityBtn = document.querySelector('.accessibility-btn');
        accessibilityBtn.addEventListener('click', () => {
            // Toggle high contrast mode
            document.body.classList.toggle('high-contrast');
            
            // Announce change
            const msg = document.body.classList.contains('high-contrast') ? 
                'Modo alto contraste activado' : 'Modo alto contraste desactivado';
            const liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-9999px';
            liveRegion.textContent = msg;
            document.body.appendChild(liveRegion);
            setTimeout(() => {
                document.body.removeChild(liveRegion);
            }, 1000);
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Lazy loading for images
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading is supported
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback for browsers without native lazy loading
            const lazyLoad = () => {
                const lazyImages = document.querySelectorAll('img[loading="lazy"]');
                
                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            observer.unobserve(img);
                        }
                    });
                });
                
                lazyImages.forEach(img => {
                    observer.observe(img);
                });
            };
            
            document.addEventListener('DOMContentLoaded', lazyLoad);
        }

        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Water effect on scroll
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const waterWaves = document.querySelectorAll('.water-wave');
            
            waterWaves.forEach((wave, index) => {
                const speed = 0.2 * (index + 1);
                const movement = scrollPosition * speed;
                wave.style.transform = `translateX(-${movement % 100}px)`;
            });
        });
        
        // Generate bubbles dynamically
        function createBubbles() {
            const bubblesContainer = document.querySelector('.bubbles');
            const bubbleCount = 12;
            
            for (let i = 0; i < bubbleCount; i++) {
                const bubble = document.createElement('div');
                bubble.classList.add('bubble');
                
                // Random size between 10px and 80px
                const size = Math.random() * 70 + 10;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                
                // Random horizontal position
                bubble.style.left = `${Math.random() * 100}%`;
                
                // Random animation duration between 5s and 15s
                const duration = Math.random() * 10 + 5;
                bubble.style.animationDuration = `${duration}s`;
                
                // Random initial delay
                bubble.style.animationDelay = `${Math.random() * 5}s`;
                
                // Random opacity
                bubble.style.opacity = Math.random() * 0.4 + 0.1;
                
                bubblesContainer.appendChild(bubble);
            }
        }
        
        // Call the function when DOM is loaded
        document.addEventListener('DOMContentLoaded', createBubbles);
