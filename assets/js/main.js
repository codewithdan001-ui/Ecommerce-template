// Global E-Commerce Logic
document.addEventListener('DOMContentLoaded', () => {
    // --- SAMPLE DATA (Database Simulation) ---
    const products = [
        { id: 1, name: "Minimalist Smart Watch", price: 299.00, category: "Electronics", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop", desc: "Experience the perfect blend of style and functionality. Our minimalist smart watch features a high-resolution AMOLED display, 10-day battery life, and comprehensive health tracking sensors." },
        { id: 2, name: "Studio Headphones", price: 199.00, category: "Audio", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop", desc: "High-fidelity audio with active noise cancellation. Perfect for music lovers and professionals who demand the best sound quality." },
        { id: 3, name: "Pro Sneakers", price: 149.00, category: "Footwear", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop", desc: "Lightweight, breathable, and designed for peak performance. Whether you're running or walking, these sneakers provide unmatched comfort." },
        { id: 4, name: "Leather Wallet", price: 79.00, category: "Accessories", img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1996&auto=format&fit=crop", desc: "Handcrafted from premium top-grain leather. A slim, minimalist design that fits all your essentials without the bulk." },
        { id: 5, name: "Wireless Earbuds", price: 129.00, category: "Audio", img: "https://images.unsplash.com/photo-1585333127302-d29241400827?q=80&w=2070&auto=format&fit=crop", desc: "True wireless freedom with crystal clear sound. Long-lasting battery and ergonomic design for all-day use." },
        { id: 6, name: "Classic Sunglasses", price: 59.00, category: "Accessories", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop", desc: "Timeless design meets modern protection. Polarized lenses for 100% UV protection and superior clarity." },
        { id: 7, name: "Canvas Backpack", price: 89.00, category: "Accessories", img: "https://images.unsplash.com/photo-1511499767390-903390e62bc0?q=80&w=2080&auto=format&fit=crop", desc: "Durable canvas material with plenty of space for your daily essentials. Perfect for students, travelers, and commuters." },
        { id: 8, name: "Gaming Headset", price: 159.00, category: "Audio", img: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=2069&auto=format&fit=crop", desc: "Immerse yourself in the game with 7.1 surround sound. Clear microphone for team communication and comfortable ear cushions for long sessions." }
    ];

    // --- GLOBAL UI ELEMENTS ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const searchBtn = document.getElementById('search-btn');
    const searchContainer = document.getElementById('search-container');
    const cartCount = document.querySelector('.cart-count');

    // 1. Mobile Menu Toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== mobileMenuBtn) {
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // 2. Search Toggle
    if (searchBtn && searchContainer) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            searchContainer.style.display = (searchContainer.style.display === 'none' || searchContainer.style.display === '') ? 'block' : 'none';
            if (searchContainer.style.display === 'block') {
                searchContainer.querySelector('input').focus();
            }
        });
    }

    // 3. Hero Slider (Home Page Only)
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.querySelector('.arrow-prev');
        const nextBtn = document.querySelector('.arrow-next');
        let currentSlide = 0;
        let sliderInterval;

        const updateSlider = () => {
            sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        };

        const startAutoPlay = () => {
            sliderInterval = setInterval(nextSlide, 5000);
        };

        const stopAutoPlay = () => {
            clearInterval(sliderInterval);
        };

        if (nextBtn) nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
            startAutoPlay();
        });

        dots.forEach((dot, i) => dot.addEventListener('click', () => {
            stopAutoPlay();
            currentSlide = i;
            updateSlider();
            startAutoPlay();
        }));

        startAutoPlay();
    }

    // 4. Product Detail Logic (product.html?id=X)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    if (productId && window.location.pathname.includes('product.html')) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const breadcrumbName = document.getElementById('breadcrumb-product-name');
            const mainImg = document.getElementById('main-product-img');
            const category = document.getElementById('product-detail-category');
            const name = document.getElementById('product-detail-name');
            const price = document.getElementById('product-detail-price');
            const desc = document.getElementById('product-detail-desc');

            if (breadcrumbName) breadcrumbName.textContent = product.name;
            if (mainImg) mainImg.src = product.img;
            if (category) category.textContent = product.category;
            if (name) name.textContent = product.name;
            if (price) price.textContent = `$${product.price.toFixed(2)}`;
            if (desc) desc.textContent = product.desc;
            document.title = `${product.name} | ModernStore`;
        } else {
            window.location.href = 'products.html';
        }
    }

    // 5. Cart Logic (cart.html & global counter)
    const updateCartTotals = () => {
        const cartItems = document.querySelectorAll('.cart-item');
        let subtotal = 0;
        cartItems.forEach(item => {
            const price = parseFloat(item.dataset.price);
            const qtyInput = item.querySelector('.item-qty');
            const qty = qtyInput ? parseInt(qtyInput.value) : 1;
            const itemTotal = price * qty;
            const itemTotalEl = item.querySelector('.item-total');
            if (itemTotalEl) itemTotalEl.textContent = `$${itemTotal.toFixed(2)}`;
            subtotal += itemTotal;
        });

        const subtotalEl = document.getElementById('cart-subtotal');
        const grandTotalEl = document.getElementById('cart-grand-total');
        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (grandTotalEl) grandTotalEl.textContent = `$${subtotal.toFixed(2)}`;

        if (cartItems.length === 0) {
            const wrapper = document.getElementById('cart-content-wrapper');
            const emptyMsg = document.getElementById('empty-cart-msg');
            if (wrapper) wrapper.style.display = 'none';
            if (emptyMsg) emptyMsg.style.display = 'block';
        }
    };

    if (window.location.pathname.includes('cart.html')) {
        updateCartTotals();
    }

    // Global Event Delegation for dynamic elements
    document.addEventListener('click', (e) => {
        // Quantity adjustment
        if (e.target.classList.contains('qty-btn')) {
            const input = e.target.parentElement.querySelector('input');
            let val = parseInt(input.value);
            if (e.target.classList.contains('plus')) {
                input.value = val + 1;
            } else if (val > 1) {
                input.value = val - 1;
            }
            if (window.location.pathname.includes('cart.html')) updateCartTotals();
        }

        // Cart item removal
        if (e.target.classList.contains('cart-remove-btn') || e.target.closest('.cart-remove-btn')) {
            const item = e.target.closest('.cart-item');
            if (item) {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.remove();
                    updateCartTotals();
                    if (cartCount) cartCount.textContent = Math.max(0, document.querySelectorAll('.cart-item').length);
                }, 300);
            }
        }

        // Add to cart feedback
        if (e.target.classList.contains('add-to-cart-btn')) {
            e.preventDefault();
            if (cartCount) cartCount.textContent = parseInt(cartCount.textContent) + 1;
            const originalText = e.target.textContent;
            e.target.textContent = 'Added to Cart!';
            e.target.style.backgroundColor = 'var(--success)';
            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.style.backgroundColor = '';
            }, 2000);
        }
    });

    // 6. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.9;
            if (elTop < triggerPoint) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 7. Smooth Scroll for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                }
            }
        });
    });

    // 8. Form Validation/Redirect Simulation
    const forms = document.querySelectorAll('form[data-redirect]');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const redirectPath = form.getAttribute('data-redirect');
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.textContent = 'Processing...';
            
            setTimeout(() => {
                window.location.href = redirectPath;
            }, 1000);
        });
    });
});
