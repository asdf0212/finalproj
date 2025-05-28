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
            // tab 자체가 <a> 태그일 경우 직접 href 사용
            // 만약 .nav-tab이 <li>이고 그 안에 <a>가 있다면, tab.querySelector('a')?.href를 사용해야 합니다.
            // 현재 코드에서는 .nav-tab이 <a>라고 가정하고 있습니다.
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
        animatedElements.forEach((element, index) => { // ★ index 파라미터 추가 ★
            const rect = element.getBoundingClientRect();

            // 요소가 아직 애니메이션되지 않았고, 뷰포트 70% 지점에 들어왔을 때
            // 그리고 요소가 화면 안에 존재할 때
            if (!element.classList.contains('show') && rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
                // ★ 애니메이션 딜레이 계산 및 적용 ★
                // 각 요소마다 0.1초씩 딜레이를 줍니다. (index 0: 0s, index 1: 0.1s, index 2: 0.2s...)
                const delay = index * 0.1; // 이 0.1을 조절하여 딜레이 간격을 변경할 수 있습니다.
                element.style.transitionDelay = `${delay}s`;

                element.classList.add('show');
            }
        });
    }

    // 초기 확인 (DOM 완전히 그려진 후 실행)
    // requestAnimationFrame을 사용하여 초기 렌더링 후 실행되도록 보장
    requestAnimationFrame(() => {
        checkAnimationVisibility();
    });

    // 스크롤 및 리사이즈 시 재확인
    window.addEventListener('scroll', checkAnimationVisibility);
    window.addEventListener('resize', checkAnimationVisibility);
});
