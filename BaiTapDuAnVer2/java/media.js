// Quản lý menu Welcome dạng dropdown và các xử lý click

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

function loadFavorites() {
    localStorage.removeItem('favSongs');
    var data = localStorage.getItem('favSongsV2');
    if (!data) return [];
    try {
        var list = JSON.parse(data);
        return Array.isArray(list) ? list : [];
    } catch (e) {
        return [];
    }
}

function saveFavorites(list) {
    localStorage.setItem('favSongsV2', JSON.stringify(list));
}

function renderFavorites() {
    var favListEl = document.getElementById('fav-list');
    if (!favListEl) return;
    var favs = loadFavorites();
    favListEl.innerHTML = '';
    if (favs.length === 0) {
        var liEmpty = document.createElement('li');
        liEmpty.textContent = 'Chưa có bài nào trong danh sách yêu thích.';
        favListEl.appendChild(liEmpty);
        return;
    }

    var overlay = document.getElementById('fav-overlay');

    favs.forEach(function (title) {
        var li = document.createElement('li');
        li.className = 'fav-item';

        var span = document.createElement('span');
        span.className = 'fav-title';
        span.textContent = title;
        span.setAttribute('data-title', title);

        var btn = document.createElement('button');
        btn.className = 'btn-remove-fav';
        btn.textContent = 'Xóa';

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var list = loadFavorites();
            var idx = list.indexOf(title);
            if (idx !== -1) {
                list.splice(idx, 1);
                saveFavorites(list);
                renderFavorites();
            }
        });

        span.addEventListener('click', function () {
            if (overlay) {
                overlay.classList.remove('show');
            }
            playSongByTitle(title);
        });

        li.appendChild(span);
        li.appendChild(btn);
        favListEl.appendChild(li);
    });
}

function playSongByTitle(title) {
    var titleBox = document.querySelector('.song-title-box[data-title="' + title + '"]');
    if (!titleBox) return;

    var row = titleBox.closest('.song-row');
    if (!row) return;

    var audio = row.querySelector('audio');
    if (audio) {
        audio.play();
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function setupFavButtons() {
    var buttons = document.querySelectorAll('.btn-fav');
    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var title = btn.getAttribute('data-title');
            var favs = loadFavorites();
            if (favs.indexOf(title) === -1) {
                favs.push(title);
                saveFavorites(favs);
                renderFavorites();
                alert('Đã thêm "' + title + '" vào danh sách yêu thích');
            } else {
                alert('Bài này đã có trong danh sách yêu thích');
            }
        });
    });
}

function setupFavoritesPopup() {
    var overlay = document.getElementById('fav-overlay');
    var closeBtn = document.getElementById('fav-close');
    if (!overlay || !closeBtn) return;

    closeBtn.addEventListener('click', function () {
        overlay.classList.remove('show');
    });

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            overlay.classList.remove('show');
        }
    });
}

function openFavoritesIfNeeded() {
    var overlay = document.getElementById('fav-overlay');
    if (!overlay) return;

    var flag = localStorage.getItem('openFavorites');
    if (flag === '1') {
        overlay.classList.add('show');
        renderFavorites();
        localStorage.removeItem('openFavorites');
    }
}

function setupViewButtons() {
    var videoFrame = document.getElementById('video-frame');
    if (!videoFrame) return;

    var buttons = document.querySelectorAll('.song-row .btn-view');
    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var row = btn.closest('.song-row');
            if (!row) return;

            var videoId = row.getAttribute('data-video-id');
            if (!videoId) return;

            var src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
            if (videoFrame.src.indexOf(videoId) === -1) {
                videoFrame.src = src;
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', function () {
    updateNavUser();
    setupUserMenu();
    setupFavButtons();
    setupFavoritesPopup();
    openFavoritesIfNeeded();
    setupViewButtons();
});
