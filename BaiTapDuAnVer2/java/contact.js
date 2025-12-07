

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
            alert('Bạn đã đăng xuất.');
            window.location.href = 'index.html';
        }
    });
}

function clearContactErrors() {
    document.getElementById('contact-name-error').textContent = '';
    document.getElementById('contact-email-error').textContent = '';
    document.getElementById('contact-message-error').textContent = '';
    document.getElementById('contact-both-error').textContent = '';
}

window.addEventListener('DOMContentLoaded', function () {
    updateNavUser();
    setupUserMenu();
    var form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearContactErrors();

        var name = document.getElementById('contact-name').value.trim();
        var email = document.getElementById('contact-email').value.trim();
        var msg = document.getElementById('contact-message').value.trim();

        if (!name && !email) {
            document.getElementById('contact-both-error').textContent = 'Chưa nhập cả 2';
            return;
        }

        if (!name) {
            document.getElementById('contact-name-error').textContent = 'Vui lòng nhập tên';
            return;
        }

        if (!email) {
            document.getElementById('contact-email-error').textContent = 'Vui lòng nhập gmail';
            return;
        }

        if (!msg) {
            document.getElementById('contact-message-error').textContent = 'Vui lòng nhập thông tin';
            return;
        }

        var mailtoUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' +
            encodeURIComponent(email) +
            '&su=' + encodeURIComponent('Liên hệ từ ' + name) +
            '&body=' + encodeURIComponent(msg);

        window.location.href = mailtoUrl;
    });
});
