function clearLoginErrors() {
    document.getElementById('login-username-error').textContent = '';
    document.getElementById('login-password-error').textContent = '';
    document.getElementById('login-both-error').textContent = '';
}

function clearRegisterErrors() {
    document.getElementById('reg-username-error').textContent = '';
    document.getElementById('reg-password-error').textContent = '';
    document.getElementById('reg-both-error').textContent = '';
}

function showSection(showLogin) {
    var loginCard = document.getElementById('login-card');
    var registerCard = document.getElementById('register-card');
    if (showLogin) {
        loginCard.classList.remove('hidden');
        registerCard.classList.add('hidden');
    } else {
        loginCard.classList.add('hidden');
        registerCard.classList.remove('hidden');
    }
}

window.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo danh sách tài khoản, luôn có admin/1234
    var raw = localStorage.getItem('musicUser');
    var users = [];
    if (raw) {
        try {
            var parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                users = parsed;
            } else if (parsed && parsed.username && parsed.password) {
                users = [parsed];
            }
        } catch (e) {
            users = [];
        }
    }

    var hasAdmin = users.some(function (u) {
        return u.username === 'admin';
    });
    if (!hasAdmin) {
        users.push({ username: 'admin', password: '1234' });
    }
    localStorage.setItem('musicUser', JSON.stringify(users));

    var loginForm = document.getElementById('login-form');
    var registerForm = document.getElementById('register-form');

    document.getElementById('show-register').addEventListener('click', function (e) {
        e.preventDefault();
        clearLoginErrors();
        clearRegisterErrors();
        showSection(false);
    });

    document.getElementById('show-login').addEventListener('click', function (e) {
        e.preventDefault();
        clearLoginErrors();
        clearRegisterErrors();
        showSection(true);
    });

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearRegisterErrors();

        var user = document.getElementById('reg-username').value.trim();
        var pass = document.getElementById('reg-password').value.trim();

        if (!user && !pass) {
            document.getElementById('reg-both-error').textContent = 'Chưa nhập cả 2';
            return;
        }

        if (!user) {
            document.getElementById('reg-username-error').textContent = 'Vui lòng nhập tên';
            return;
        }

        if (!pass) {
            document.getElementById('reg-password-error').textContent = 'Vui lòng nhập mật khẩu';
            return;
        }

        // Lưu thêm tài khoản vào danh sách trong localStorage
        var rawList = localStorage.getItem('musicUser');
        var list = [];
        if (rawList) {
            try {
                var parsedList = JSON.parse(rawList);
                if (Array.isArray(parsedList)) {
                    list = parsedList;
                }
            } catch (e) {
                list = [];
            }
        }

        list.push({ username: user, password: pass });
        localStorage.setItem('musicUser', JSON.stringify(list));

        alert('Đăng ký thành công! Chuyển sang trang đăng nhập.');
        showSection(true);
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearLoginErrors();

        var user = document.getElementById('login-username').value.trim();
        var pass = document.getElementById('login-password').value.trim();

        if (!user && !pass) {
            document.getElementById('login-both-error').textContent = 'Chưa nhập cả 2';
            return;
        }

        if (!user) {
            document.getElementById('login-username-error').textContent = 'Vui lòng nhập tên';
            return;
        }

        if (!pass) {
            document.getElementById('login-password-error').textContent = 'Vui lòng nhập mật khẩu';
            return;
        }

        var saved = localStorage.getItem('musicUser');
        if (!saved) {
            alert('Chưa có tài khoản, vui lòng đăng ký.');
            return;
        }

        try {
            var list = JSON.parse(saved);
            if (!Array.isArray(list)) {
                list = [];
            }

            var found = list.some(function (u) {
                return u.username === user && u.password === pass;
            });

            if (found) {
                localStorage.setItem('currentUser', user);
                alert('Đăng nhập thành công! Chuyển đến trang Media.');
                window.location.href = 'media.html';
            } else {
                document.getElementById('login-both-error').textContent = 'Sai tên đăng nhập hoặc mật khẩu';
            }
        } catch (err) {
            document.getElementById('login-both-error').textContent = 'Có lỗi dữ liệu, hãy đăng ký lại.';
        }
    });
});
