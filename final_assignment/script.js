document.addEventListener('DOMContentLoaded', () => {
    const navTabs = document.querySelectorAll('.nav-tab');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const currentActiveTab = document.querySelector('.nav-tab.active');
            if (currentActiveTab) {
                currentActiveTab.classList.remove('active');
            }

            this.classList.add('active');

        });
    });

});