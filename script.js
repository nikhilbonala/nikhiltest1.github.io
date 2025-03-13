// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Make megamenu work on hover for desktop
    const megaMenuItems = document.querySelectorAll('.navbar-nav .dropdown');
    
    megaMenuItems.forEach(item => {
        if (window.innerWidth > 991) {
            item.addEventListener('mouseenter', function() {
                const dropdown = this.querySelector('.dropdown-menu');
                dropdown.classList.add('show');
            });
            
            item.addEventListener('mouseleave', function() {
                const dropdown = this.querySelector('.dropdown-menu');
                dropdown.classList.remove('show');
            });
        }
    });
    
    // Product image hover effect
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const actions = this.querySelector('.product-actions');
            if (actions) {
                actions.style.opacity = '1';
                actions.style.bottom = '0';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const actions = this.querySelector('.product-actions');
            if (actions) {
                actions.style.opacity = '0';
                actions.style.bottom = '-50px';
            }
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.product-action-btn:nth-child(2)');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            count++;
            cartCount.textContent = count;
            
            // Flash effect on cart icon
            const cartIcon = document.querySelector('.fa-shopping-bag').parentElement;
            cartIcon.style.color = '#d4af37';
            
            // Show added to cart notification
            const productName = this.closest('.product-card').querySelector('.product-title').textContent;
            showNotification(`${productName} added to cart!`);
            
            setTimeout(() => {
                cartIcon.style.color = '';
            }, 1000);
        });
    });
    
    // Add to wishlist functionality
    const wishlistButtons = document.querySelectorAll('.product-action-btn:nth-child(1)');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const heartIcon = this.querySelector('i');
            
            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                this.style.backgroundColor = '#d4af37';
                this.style.color = 'white';
                
                const productName = this.closest('.product-card').querySelector('.product-title').textContent;
                showNotification(`${productName} added to wishlist!`);
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                this.style.backgroundColor = '';
                this.style.color = '';
                
                const productName = this.closest('.product-card').querySelector('.product-title').textContent;
                showNotification(`${productName} removed from wishlist!`);
            }
        });
    });
    
    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.product-action-btn:nth-child(3)');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productImage = productCard.querySelector('.product-image').src;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Here you would typically open a modal with product details
            // For now, we'll just show a notification
            showNotification(`Quick view: ${productName}`);
        });
    });
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                showNotification('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Create notification function
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'rgba(212, 175, 55, 0.9)';
        notification.style.color = 'white';
        notification.style.padding = '1rem 1.5rem';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.transition = 'all 0.3s ease';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#!' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(this.getAttribute('href'));
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});