/**
 * საქართველო და ქართველი გმირები — Interactive Logic
 * Zero external libraries, high performance, accessible ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       1. Theme Toggle (მუქი / კეთილშობილი თემა)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElem = document.documentElement;

    const savedTheme = localStorage.getItem('geo_heroes_theme');
    if (savedTheme) {
        htmlElem.setAttribute('data-theme', savedTheme);
    } else {
        htmlElem.setAttribute('data-theme', 'dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElem.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElem.setAttribute('data-theme', newTheme);
            localStorage.setItem('geo_heroes_theme', newTheme);
            showToast(
                newTheme === 'dark' ? 'მუქი თემა გააქტიურებულია' : 'ღია თემა გააქტიურებულია',
                'info'
            );
        });
    }

    /* ==========================================================================
       2. Scroll Progress Bar & Sticky Header
       ========================================================================== */
    const progressBar = document.getElementById('scroll-progress-bar');
    const headerWrapper = document.getElementById('navbar-header');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }

        if (headerWrapper) {
            if (scrollTop > 30) {
                headerWrapper.classList.add('scrolled');
            } else {
                headerWrapper.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollTop > 450) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       3. Mobile Navigation Drawer
       ========================================================================== */
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, #mob-cta-btn');

    const toggleMobileMenu = (forceClose = false) => {
        if (!mobileToggleBtn || !mobileDrawer) return;

        const isOpen = forceClose ? true : mobileToggleBtn.classList.contains('active');
        if (isOpen) {
            mobileToggleBtn.classList.remove('active');
            mobileToggleBtn.setAttribute('aria-expanded', 'false');
            mobileDrawer.classList.remove('open');
            mobileDrawer.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        } else {
            mobileToggleBtn.classList.add('active');
            mobileToggleBtn.setAttribute('aria-expanded', 'true');
            mobileDrawer.classList.add('open');
            mobileDrawer.setAttribute('aria-hidden', 'false');
        }
    };

    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu(true);
        });
    });

    document.addEventListener('click', (e) => {
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
            if (!mobileDrawer.contains(e.target) && !mobileToggleBtn.contains(e.target)) {
                toggleMobileMenu(true);
            }
        }
    });

    /* ==========================================================================
       4. ScrollSpy: Highlight Active Nav Link
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(sec => scrollSpyObserver.observe(sec));

    /* ==========================================================================
       5. Hero Shield Card Subtle Tilt Effect
       ========================================================================== */
    const shieldCard = document.querySelector('.regal-shield-card');
    if (shieldCard && window.innerWidth > 900) {
        shieldCard.addEventListener('mousemove', (e) => {
            const rect = shieldCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            shieldCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        shieldCard.addEventListener('mouseleave', () => {
            shieldCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    }

    /* ==========================================================================
       6. Heroes Detailed Modal (ვრცლად)
       ========================================================================== */
    const heroDetailsData = {
        david: {
            name: 'დავით IV აღმაშენებელი',
            era: 'XI – XII საუკუნე (1073 – 1125)',
            icon: '👑',
            subtitle: 'ქვეყნის გაერთიანება და დიდგორის ბრძოლა („ძლევაჲ საკვირველი“)',
            description: `დავით აღმაშენებელი სამართლიანად მიიჩნევა საქართველოს ერთ-ერთ ყველაზე ბრწყინვალე მმართველად. მან 16 წლის ასაკში ჩაიბარა დაქუცმაცებული და თურქ-სელჩუკების მიერ გაპარტახებული სამეფო, აღკვეთა ფეოდალური თვითნებობა, შექმნა მუდმივი რეგულარული არმია („მონა-სპა“), ჩაატარა რუის-ურბნისის საეკლესიო კრება და დააფუძნა გელათის აკადემია. 1121 წლის 12 აგვისტოს დიდგორის ველზე დავითმა გაანადგურა კოალიციური მტრის უზარმაზარი არმია, 1122 წელს გაათავისუფლა თბილისი და აქცია გაერთიანებული საქართველოს დედაქალაქად.`,
            facts: [
                { label: 'მნიშვნელოვანი თარიღი', value: '1121 წლის 12 აგვისტო — დიდგორის ბრძოლა' },
                { label: 'კულტურული მემკვიდრეობა', value: 'გელათის მონასტერი და აკადემია („ახალი ათენი“)' },
                { label: 'ლიტერატურული ძეგლი', value: '„გალობანი სინანულისანი“' }
            ]
        },
        tamar: {
            name: 'თამარ მეფე',
            era: 'XII – XIII საუკუნე (1166 – 1213)',
            icon: '👑',
            subtitle: 'საქართველოს ოქროს ხანა და კულტურული აღზევება',
            description: `თამარ მეფის მმართველობის პერიოდი ქართული სახელმწიფოსა და კულტურის უმაღლეს მწვერვალად არის აღიარებული. თამარმა გააძლიერა ქვეყნის გარე საზღვრები, მოიპოვა ბრწყინვალე გამარჯვებები შამქორისა (1195 წ.) და ბასიანის (1202 წ.) ბრძოლებში. მის ეპოქაში გაუქმდა სიკვდილით დასჯა და სხეულის დასახიჩრება, აშენდა ვარძია და შეიქმნა მსოფლიო შედევრი — შოთა რუსთაველის „ვეფხისტყაოსანი“. თამარი მართლმადიდებელი ეკლესიის მიერ წმინდანადაა შერაცხილი.`,
            facts: [
                { label: 'გამარჯვებები', value: 'შამქორის (1195 წ.) და ბასიანის (1202 წ.) ბრძოლები' },
                { label: 'ხუროთმოძღვრება', value: 'ვარძიის კლდეში ნაკვეთი სამონასტრო კომპლექსი' },
                { label: 'ეპოქალური ძეგლი', value: 'შოთა რუსთაველის „ვეფხისტყაოსანი“' }
            ]
        },
        aragveli: {
            name: '300 არაგველი',
            era: '1795 წელი — კრწანისის ბრძოლა',
            icon: '⚔️',
            subtitle: 'თავდადება და სამშობლოს სიყვარული',
            description: `1795 წლის 11 სექტემბერს, კრწანისის ველზე, როდესაც აღა-მაჰმად-ხანის 35-ათასიანი ურდო ერეკლე II-ის 5-ათასიან ჯარს დაუპირისპირდა, არაგვის ხეობიდან ჩამოსულმა 300-მა მეომარმა დადო ურყევი ფიცი: სიცოცხლის უკანასკნელ წვეთამდე ებრძოლათ და მამული არ დაეთმოთ. მათ საკუთარი სიცოცხლის ფასად დაიცვეს მეფე ერეკლე ტყვეობისგან და თითოეული მათგანი გმირულად დაეცა ბრძოლის ველზე. საქართველოს მართლმადიდებელმა ეკლესიამ 300 არაგველი წმინდანებად შერაცხა.`,
            facts: [
                { label: 'ბრძოლის ადგილი', value: 'კრწანისის ველი, თბილისის მისადგომები' },
                { label: 'ისტორიული ფიცი', value: '„თუ ჩვენგან ვინმე ცოცხალი დაბრუნდეს, შეჩვენებული იყოს!“' },
                { label: 'ხსოვნა', value: '300 არაგველის მემორიალი და წმინდანთა დასი' }
            ]
        },
        antsukhelidze: {
            name: 'გიორგი ანწუხელიძე',
            era: 'XXI საუკუნე (1984 – 2008)',
            icon: '🎖️',
            subtitle: 'თანამედროვე ეროვნული გმირი',
            description: `გიორგი ანწუხელიძე იყო საქართველოს შეიარაღებული ძალების IV ქვეითი ბრიგადის უმცროსი სერჟანტი. 2008 წლის აგვისტოს ომის დროს, ცხინვალში ბრძოლისას, იგი ტყვედ ჩაუვარდა მოწინააღმდეგეს. სასტიკი და არაადამიანური წამების, მუქარისა და ცემის მიუხედავად, მან უარი თქვა სამხედრო საიდუმლოებების გაცემაზე, არ შეაგინა საქართველოს და არ დააბიჯა საქართველოს სახელმწიფო დროშას. 2013 წელს მას სიკვდილის შემდეგ მიენიჭა საქართველოს ეროვნული გმირის წოდება.`,
            facts: [
                { label: 'წოდება', value: 'საქართველოს ეროვნული გმირი (2013 წელი)' },
                { label: 'სამხედრო რანგი', value: 'უმცროსი სერჟანტი, IV ქვეითი ბრიგადა' },
                { label: 'სიმბოლო', value: 'გაუტეხელი ქართული სულისა და ეროვნული ღირსების სიმბოლო' }
            ]
        }
    };

    const modal = document.getElementById('hero-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalActionClose = document.getElementById('modal-action-close');

    const modalTitle = document.getElementById('modal-hero-title');
    const modalEra = document.getElementById('modal-hero-era');
    const modalSubtitle = document.getElementById('modal-hero-subtitle');
    const modalDesc = document.getElementById('modal-hero-desc');
    const modalFacts = document.getElementById('modal-hero-facts');
    const modalAvatar = document.getElementById('modal-avatar-icon');

    const openHeroModal = (heroKey) => {
        const data = heroDetailsData[heroKey];
        if (!data || !modal) return;

        modalTitle.textContent = data.name;
        modalEra.textContent = data.era;
        modalSubtitle.textContent = data.subtitle;
        modalDesc.textContent = data.description;
        modalAvatar.textContent = data.icon;

        modalFacts.innerHTML = data.facts.map(f => `
            <div class="fact-item">
                <strong>${f.label}:</strong>
                <span>${f.value}</span>
            </div>
        `).join('');

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeHeroModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', () => {
            const heroKey = btn.getAttribute('data-modal');
            openHeroModal(heroKey);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeHeroModal);
    if (modalActionClose) modalActionClose.addEventListener('click', closeHeroModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeHeroModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeHeroModal();
        }
    });

    /* ==========================================================================
       7. Toast Notifications System
       ========================================================================== */
    const toastContainer = document.getElementById('toast-container');

    window.showToast = (message, type = 'success', duration = 4000) => {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = type === 'success' ? '✠' : (type === 'error' ? '✕' : '✦');
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-msg">${message}</span>
        `;

        toastContainer.appendChild(toast);

        void toast.offsetWidth;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toastContainer.contains(toast)) {
                    toastContainer.removeChild(toast);
                }
            }, 300);
        }, duration);
    };

    /* ==========================================================================
       8. Tribute Form Validation & Submission (ხსოვნის წიგნი)
       ========================================================================== */
    const tributeForm = document.getElementById('tribute-form');
    const submitBtn = document.getElementById('tribute-submit-btn');

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const setFieldError = (groupId, hasError) => {
        const group = document.getElementById(groupId);
        if (!group) return;
        const input = group.querySelector('.form-input');
        if (hasError) {
            group.classList.add('has-error');
            if (input) input.classList.add('error');
        } else {
            group.classList.remove('has-error');
            if (input) input.classList.remove('error');
        }
    };

    if (tributeForm) {
        tributeForm.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('input', () => {
                const group = input.closest('.form-group');
                if (group) {
                    group.classList.remove('has-error');
                    input.classList.remove('error');
                }
            });
        });

        tributeForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('user-name');
            const emailInput = document.getElementById('user-email');
            const messageInput = document.getElementById('user-message');

            let isValid = true;

            if (!nameInput.value.trim()) {
                setFieldError('group-name', true);
                isValid = false;
            } else {
                setFieldError('group-name', false);
            }

            if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
                setFieldError('group-email', true);
                isValid = false;
            } else {
                setFieldError('group-email', false);
            }

            if (!messageInput.value.trim()) {
                setFieldError('group-message', true);
                isValid = false;
            } else {
                setFieldError('group-message', false);
            }

            if (!isValid) return;

            // Loading state
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }

                showToast('მადლობა! თქვენი ჩანაწერი წარმატებით შევიდა ეროვნულ ხსოვნის წიგნში.', 'success', 5000);
                tributeForm.reset();
            }, 1200);
        });
    }
});
