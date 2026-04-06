document.addEventListener('DOMContentLoaded', () => {

    // 1. スクロール連動の進捗バー
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // 2. 数字のカウントアップ表示
    const counters = document.querySelectorAll('.counter');
    const counterOptions = { threshold: 0.5 };
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = +target.getAttribute('data-target');
                let current = 0;
                const increment = countTo / 50;
                const updateCount = () => {
                    current += increment;
                    if (current < countTo) {
                        target.innerText = Math.ceil(current);
                        setTimeout(updateCount, 20);
                    } else {
                        target.innerText = countTo;
                    }
                };
                updateCount();
                observer.unobserve(target);
            }
        });
    }, counterOptions);
    counters.forEach(counter => counterObserver.observe(counter));

    // 3. Before / After 切替スライダー
    const baRange = document.getElementById('ba-range');
    const baAfter = document.querySelector('.ba-after');
    if (baRange && baAfter) {
        baRange.addEventListener('input', (e) => {
            const val = e.target.value;
            baAfter.style.width = `${val}%`;
        });
    }

    // 4. FAQアコーディオン
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');
        });
    });

    // 5. 追従CTAボタンの表示・非表示
    const stickyCta = document.getElementById('sticky-cta');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            stickyCta.classList.add('show');
        } else {
            stickyCta.classList.remove('show');
        }
    });

    // 6. セクションのフェードイン表示
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => fadeObserver.observe(el));

    // 7. タブ切替で見る課題別導線
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // 8. 実績カードのスライダー表示 (簡易自動スライド)
    const cardSlider = document.getElementById('card-slider');
    let scrollPos = 0;
    setInterval(() => {
        if (cardSlider) {
            scrollPos += 1;
            if (scrollPos > cardSlider.scrollWidth - cardSlider.clientWidth) {
                scrollPos = 0;
            }
            cardSlider.scrollTo(scrollPos, 0);
        }
    }, 30);

    // 9. 入力補助付きの簡易診断フォーム (送信擬似処理)
    const form = document.getElementById('diagnosis-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = '送信中...';
            btn.disabled = true;
            setTimeout(() => {
                alert('お問い合わせありがとうございます。担当者よりご連絡いたします。');
                form.reset();
                btn.innerText = '簡易診断を相談する';
                btn.disabled = false;
            }, 1500);
        });
    }

    // 10. 離脱前の軽いポップアップCTA
    const exitPopup = document.getElementById('exit-popup');
    const closePopup = document.querySelector('.close-popup');
    let popupShown = false;

    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !popupShown) {
            exitPopup.style.display = 'flex';
            popupShown = true;
        }
    });

    if (closePopup) {
        closePopup.addEventListener('click', () => {
            exitPopup.style.display = 'none';
        });
    }

    // ポップアップの外側クリックで閉じる
    window.addEventListener('click', (e) => {
        if (e.target === exitPopup) {
            exitPopup.style.display = 'none';
        }
    });

});
