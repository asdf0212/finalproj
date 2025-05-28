document.addEventListener('DOMContentLoaded', () => {
    // 1. 탭 활성화 로직
    const navTabs = document.querySelectorAll('.nav-tab');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const currentActiveTab = document.querySelector('.nav-tab.active');
            if (currentActiveTab) {
                currentActiveTab.classList.remove('active');
            }
            requestAnimationFrame(() => {
                this.classList.add('active');
            });
        });
    });

    function setActiveTabFromPath() {
        const currentPathname = window.location.pathname;

        navTabs.forEach(tab => tab.classList.remove('active'));

        let foundMatch = false;

        navTabs.forEach(tab => {
            // tab 자체가 <a> 태그이므로 직접 href 사용
            const linkPathname = new URL(tab.href, window.location.origin).pathname;

            const normalizedCurrentPath = (
                currentPathname === '/' ||
                currentPathname.endsWith('/index.html') ||
                currentPathname.endsWith('/index.htm')
            ) ? '/index.html' : currentPathname;

            const normalizedLinkPath = (
                linkPathname === '/' ||
                linkPathname.endsWith('/index.html') ||
                linkPathname.endsWith('/index.htm')
            ) ? '/index.html' : linkPathname;

            if (normalizedLinkPath === normalizedCurrentPath) {
                tab.classList.add('active');
                foundMatch = true;
            }
        });

        if (!foundMatch && navTabs.length > 0) {
            navTabs[0].classList.add('active');
        }
    }

    // 페이지 로드 시 현재 경로에 맞게 활성 탭 설정
    setActiveTabFromPath();

    // 2. 스크롤 애니메이션 로직
    const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .fade-up-left, .fade-up-right');

    function checkAnimationVisibility() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                element.classList.add('show');
            }
        });
    }

    // 초기 확인 (DOM 완전히 그려진 후 실행)
    requestAnimationFrame(() => {
        checkAnimationVisibility();
    });

    // 스크롤 및 리사이즈 시 재확인
    window.addEventListener('scroll', checkAnimationVisibility);
    window.addEventListener('resize', checkAnimationVisibility);
});

