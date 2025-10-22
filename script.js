document.addEventListener('DOMContentLoaded', function() {
    // Управление прайс-группами
    document.querySelectorAll('.price-group-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const groupId = this.getAttribute('data-group');
            const table = document.getElementById(`group${groupId}`);
            
            // Закрываем все другие группы
            document.querySelectorAll('.price-table').forEach(t => {
                if (t.id !== `group${groupId}`) {
                    t.style.display = 'none';
                    t.previousElementSibling.classList.remove('active');
                }
            });

            // Открываем/закрываем текущую
            if (table.style.display === 'block') {
                table.style.display = 'none';
                this.classList.remove('active');
            } else {
                table.style.display = 'block';
                this.classList.add('active');
            }
        });
    });

    // Видео-слайдер
    const sliderTrack = document.querySelector('.slider-track');
    const videoItems = document.querySelectorAll('.video-item');
    const prevBtn = document.querySelector('.left-arrow');
    const nextBtn = document.querySelector('.right-arrow');
    let currentIndex = 0;
    const itemCount = videoItems.length;

    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        videoItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Свайпы для мобильных
    let touchStartX = 0;
    let touchEndX = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    sliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }
        if (touchEndX > touchStartX + 50) {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
            updateSlider();
        }
    }

    updateSlider();

    function createEucalyptusElements() {
        document.querySelectorAll('.price-group-btn').forEach(btn => {
            // Создаем листья эвкалипта
            for (let i = 0; i < 6; i++) {
                const leaf = document.createElement('div');
                leaf.className = 'eucalyptus-leaf';
                leaf.style.setProperty('--rotation', `${i * 60}deg`);
                leaf.style.top = `${20 + Math.random() * 60}%`;
                leaf.style.left = `${Math.random() * 80}%`;
                leaf.style.zIndex = '5'; // Листья под текстом
                leaf.style.animationDelay = `${i * 0.2}s`;
                
                // Сохраняем оригинальный clip-path в data-атрибут
                leaf.setAttribute('data-clip-path', 'M40,0 C50,10 70,30 75,60 C75,80 60,100 40,110 C20,100 5,80 5,60 C10,30 30,10 40,0 Z');
                
                btn.appendChild(leaf);
            }

            // Создаем веточки
            for (let i = 0; i < 4; i++) {
                const twig = document.createElement('div');
                twig.className = 'eucalyptus-twig';
                twig.style.transform = `rotate(${i * 90 + 45}deg)`;
                twig.style.top = `${30 + i * 15}%`;
                twig.style.left = `${40 + i * 10}%`;
                twig.style.transitionDelay = `${i * 0.15}s`;
                twig.style.zIndex = '4'; // Веточки под текстом
                btn.appendChild(twig);
            }

            // Добавляем капли росы
            for (let i = 0; i < 3; i++) {
                const dewDrop = document.createElement('div');
                dewDrop.className = 'dew-drop';
                dewDrop.style.top = `${20 + i * 25}%`;
                dewDrop.style.left = `${15 + i * 30}%`;
                dewDrop.style.animationDelay = `${i * 1}s`;
                dewDrop.style.zIndex = '3'; // Капли под текстом
                btn.appendChild(dewDrop);
            }
        });
    }

    // Вызовите эту функцию после createNatureAbstractDecorations
    createEucalyptusElements();

    function createTableDecorations() {
        document.querySelectorAll('.price-table').forEach(table => {
            // Создаем декоративные листья для таблицы
            for (let i = 0; i < 2; i++) {
                const leaf = document.createElement('div');
                leaf.className = 'table-leaf-decoration';
                table.appendChild(leaf);
            }
        });
    }

    // Вызовите эту функцию после создания таблиц
    createTableDecorations();

  // Управление раскрывающимися строками
function initServiceRows() {
    const serviceRows = document.querySelectorAll('.service-row');
    let currentlyOpen = null;

    serviceRows.forEach(row => {
        row.addEventListener('click', function() {
            // Закрываем ранее открытую строку
            if (currentlyOpen && currentlyOpen !== this) {
                currentlyOpen.classList.remove('active');
            }
            
            // Переключаем текущую строку
            this.classList.toggle('active');
            
            // Запоминаем открытую строку
            if (this.classList.contains('active')) {
                currentlyOpen = this;
            } else {
                currentlyOpen = null;
            }
        });
    });

    // Закрытие по клику вне строки
    document.addEventListener('click', function(e) {
        if (currentlyOpen && !currentlyOpen.contains(e.target) && 
            !e.target.closest('.service-row')) {
            currentlyOpen.classList.remove('active');
            currentlyOpen = null;
        }
    });
}

// Вызываем функцию
initServiceRows();

// Слайдер преимуществ с стекломорфизмом и голографическими эффектами
function initBenefitsSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const progressBar = document.querySelector('.progress-bar');
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    let currentSlide = 0;
    let autoSlideInterval;
    let isInteracting = false;
    const slideDuration = 5000; // 5 секунд

    // Проверка мобильного устройства
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }

    // Анимация появления элементов преимуществ
    function animateBenefitItems() {
        benefitItems.forEach((item, index) => {
            // Сброс анимации
            item.style.animation = 'none';
            item.style.opacity = '0';
            item.style.transform = 'translateY(25px)';
            
            // Запуск анимации с задержкой
            setTimeout(() => {
                item.style.animation = `benefitAppear 0.6s ease ${index * 0.1}s forwards`;
            }, 100);
        });
    }

    // Функция перехода к слайду
    function goToSlide(slideIndex) {
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.transform = 'translateX(40px)';
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Показываем выбранный слайд
        slides[slideIndex].classList.add('active');
        setTimeout(() => {
            slides[slideIndex].style.opacity = '1';
            slides[slideIndex].style.transform = 'translateX(0)';
        }, 50);
        
        dots[slideIndex].classList.add('active');
        
        // Анимируем элементы преимуществ
        setTimeout(animateBenefitItems, 300);
        
        // Сбрасываем и запускаем прогресс-бар
        progressBar.style.animation = '';
        progressBar.style.width = '0%';
        
        setTimeout(() => {
            if (!isMobileDevice()) {
                progressBar.style.animation = `progress ${slideDuration}ms linear, progressGlow 2s ease-out`;
            } else {
                progressBar.style.animation = `progress ${slideDuration}ms linear`;
            }
            progressBar.style.width = '100%';
        }, 100);
        
        currentSlide = slideIndex;
    }

    // Следующий слайд
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    // Предыдущий слайд
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    // Автопрокрутка
    function startAutoSlide() {
        stopAutoSlide(); // Останавливаем предыдущий интервал
        
        autoSlideInterval = setInterval(() => {
            if (!isInteracting) {
                nextSlide();
            }
        }, slideDuration);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Hover-эффекты для элементов преимуществ
    function initHoverEffects() {
        benefitItems.forEach(item => {
            if (!isMobileDevice()) {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px) scale(1.02)';
                    this.style.background = 'rgba(255, 255, 255, 0.12)';
                    this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.background = 'rgba(255, 255, 255, 0.07)';
                    this.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                });
            }
        });

        // Стрелки навигации
        [prevBtn, nextBtn].forEach(arrow => {
            arrow.addEventListener('mouseenter', () => {
                if (!isMobileDevice()) {
                    isInteracting = true;
                }
            });
            
            arrow.addEventListener('mouseleave', () => {
                if (!isMobileDevice()) {
                    isInteracting = false;
                }
            });
        });

        // Точки навигации
        dots.forEach(dot => {
            dot.addEventListener('mouseenter', () => {
                if (!isMobileDevice()) {
                    isInteracting = true;
                }
            });
            
            dot.addEventListener('mouseleave', () => {
                if (!isMobileDevice()) {
                    isInteracting = false;
                }
            });
        });
    }

    // Обработчики событий
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Свайпы для мобильных
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slidesContainer = document.querySelector('.slides-container');
    
    if (slidesContainer) {
        slidesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, false);

        slidesContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, false);
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Свайп влево - следующий слайд
            nextSlide();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Свайп вправо - предыдущий слайд
            prevSlide();
        }
    }

    // Пауза при наведении на весь слайдер
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', () => {
            if (!isMobileDevice()) {
                isInteracting = true;
                stopAutoSlide();
            }
        });
        
        sliderWrapper.addEventListener('mouseleave', () => {
            if (!isMobileDevice()) {
                isInteracting = false;
                startAutoSlide();
            }
        });
    }

    // Адаптация при изменении размера окна
    function handleResize() {
        // Перезапускаем автоплей при изменении размера
        stopAutoSlide();
        startAutoSlide();
        
        // Обновляем hover-эффекты
        initHoverEffects();
    }

    window.addEventListener('resize', handleResize);

    // Запуск
    goToSlide(currentSlide);
    startAutoSlide();
    initHoverEffects();

    // Возвращаем методы для внешнего управления
    return {
        nextSlide,
        prevSlide,
        goToSlide,
        stopAutoSlide,
        startAutoSlide
    };
}

// Инициализация слайдера
const benefitsSlider = initBenefitsSlider();


}); // Конец DOMContentLoaded
