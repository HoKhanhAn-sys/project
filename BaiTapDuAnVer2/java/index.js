

function updateNavUser() {
    var authLink = document.getElementById('nav-auth');
    if (!authLink) return;

    var user = localStorage.getItem('currentUser');
    if (user) {
        authLink.classList.add('user-menu');
        authLink.href = '#';
        authLink.innerHTML =
            '<span class="user-menu-label">Welcome (' +
            user +
            ')</span><span class="user-menu-caret">▼</span>' +
            '<ul class="user-dropdown">' +
            '<li data-action="favorites">Mục yêu thích</li>' +
            '<li data-action="logout">Đăng xuất</li>' +
            '</ul>';
    } else {
        authLink.textContent = 'Đăng nhập / Đăng ký';
        authLink.href = 'auth.html';
    }
}

function setupUserMenu() {
    var authLink = document.getElementById('nav-auth');
    if (!authLink) return;

    var dropdown = authLink.querySelector('.user-dropdown');
    if (!dropdown) return;

    dropdown.addEventListener('click', function (e) {
        var item = e.target.closest('li');
        if (!item) return;

        var action = item.getAttribute('data-action');
        if (action === 'favorites') {
            localStorage.setItem('openFavorites', '1');
            window.location.href = 'media.html';
        } else if (action === 'logout') {
            localStorage.removeItem('currentUser');
            alert('Đăng xuất thành công');
            window.location.href = 'index.html';
        }
    });
}

window.addEventListener('DOMContentLoaded', function () {
    updateNavUser();

    setupUserMenu();

    var startBtn = document.getElementById('btn-start');
    if (startBtn) {
        startBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var user = localStorage.getItem('currentUser');
            if (user) {
                window.location.href = 'media.html';
            } else {
                window.location.href = 'auth.html';
            }
        });
    }
});
