document.addEventListener("DOMContentLoaded", function () {
    var animationContainer = document.getElementById('animation-container');

    // Add CSS to prevent flickering
    animationContainer.style.transform = 'translateZ(0)';
    animationContainer.style.backfaceVisibility = 'hidden';
    animationContainer.style.perspective = '1000px';
    animationContainer.style.willChange = 'transform';

    // Preload the animation JSON
    fetch('./WebsiteComponents/JSON/LandingPage.json')
        .then(response => response.json())
        .then(data => {
            var animation = lottie.loadAnimation({
                container: animationContainer,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: data,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid meet',
                    clearCanvas: true,
                    progressiveLoad: true,
                    hideOnTransparent: true,
                    imagePreserveAspectRatio: 'xMidYMid meet',
                    className: 'lottie-svg',
                    filterSize: {
                        width: '100%',
                        height: '100%',
                        x: '0%',
                        y: '0%'
                    }
                }
            });

            animation.addEventListener("DOMLoaded", function () {
                console.log("Animation loaded and ready to play");
            });

            animation.addEventListener("complete", function () {
                console.log("Animation finished");
            });
        })
        .catch(error => {
            console.error("Error loading animation:", error);
        });

    // Add click handler for About Me button
    const middleImage = document.getElementById('middle-image');
    const introText = document.getElementById('intro-text');
    const aboutText = document.getElementById('about-text');
    let showingIntro = true;

    middleImage.addEventListener('click', function() {
        if (showingIntro) {
            introText.classList.add('hidden');
            aboutText.classList.remove('hidden');
        } else {
            introText.classList.remove('hidden');
            aboutText.classList.add('hidden');
        }
        showingIntro = !showingIntro;
    });
});

// Add scroll detection for the middle icon
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the element is visible
});

// Observe the middle icon
document.addEventListener('DOMContentLoaded', () => {
    const middleIcon = document.querySelector('.link-icon.middle');
    if (middleIcon) {
        observer.observe(middleIcon);
    }
});

// Add scroll detection for carousel indicator
const carouselObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const isProjectPage = entry.target.id === 'projects-container';
            const indicator = document.querySelector('.carousel-indicator');
            
            // Show/hide indicator based on whether we're on a project page
            if (isProjectPage) {
                indicator.classList.add('visible');
                // Update active dot
                document.querySelectorAll('.indicator-dot').forEach(dot => {
                    dot.classList.remove('active');
                });
                // Since this is the first project page, activate first dot
                document.querySelectorAll('.indicator-dot')[0].classList.add('active');
            } else {
                indicator.classList.remove('visible');
            }
        }
    });
}, {
    threshold: 0.5
});

// Observe all pages
document.querySelectorAll('.page').forEach(page => {
    carouselObserver.observe(page);
});

// Add click handler for the background image
document.querySelector('#projects-container').addEventListener('click', function(e) {
    // Only trigger if clicking the background (::before element)
    if (e.target === this) {
        window.open('https://dribbble.com/shots/23753071-Utility-Construction-Homepage?utm_source=Clipboard_Shot&utm_campaign=MWKDawes&utm_content=Utility%20Construction%20Homepage&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=MWKDawes&utm_content=Utility%20Construction%20Homepage&utm_medium=Social_Share', '_blank');
    }
}); 