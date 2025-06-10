document.addEventListener('DOMContentLoaded', () => {
    // ------------------ 1. 탭 활성화 로직 ------------------
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

    setActiveTabFromPath();

    // ------------------ 2. 스크롤 애니메이션 로직 ------------------
    const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .fade-up-left, .fade-up-right');

    function checkAnimationVisibility() {
        animatedElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            if (!element.classList.contains('show') && rect.top < window.innerHeight && rect.bottom > 0) {
                const delay = index * 0.1;
                element.style.transitionDelay = `${delay}s`;
                element.classList.add('show');
            }
        });
    }

    requestAnimationFrame(() => {
        checkAnimationVisibility();
    });

    window.addEventListener('scroll', checkAnimationVisibility);
    window.addEventListener('resize', checkAnimationVisibility);

 // ------------------ 3. 스크롤 연동 비디오 재생 ------------------
const video = document.getElementById("sequence-video");
if (!video) return;

// 현재 페이지 이름 얻기 (예: dot.html → dot)
const path = window.location.pathname;
const pageName = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');

// 비디오 파일 이름 (index.html과 같은 위치에 있음)
const videoFileName = `video_${pageName}.mp4`;
video.src = videoFileName;

video.pause(); // 자동재생 방지

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const maxScrollTop = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;

    // 비디오 duration이 아직 로드되지 않은 경우 대비
    const duration = video.duration || 1;

    // 재생 위치 (초) 계산
    const time = duration * scrollFraction;

    // 비디오 현재시간 설정
    video.currentTime = time;
});

});
