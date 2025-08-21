// Toggle Menu Function
function toggleMenu() {
    const overlay = document.getElementById("overlayMenu");
    const hamburger = document.querySelector(".hamburger");
    
    if (overlay.style.width === "100%" || overlay.style.width === "300px") {
        // Tutup menu
        overlay.style.width = "0";
        hamburger.classList.remove("active");
        document.body.style.overflow = "auto"; // Enable scroll
    } else {
        // Buka menu
        overlay.style.width = "300px"; // Fixed width instead of 100%
        hamburger.classList.add("active");
        document.body.style.overflow = "hidden"; // Disable scroll
    }
}

// Fungsi toggle password untuk input tertentu
function togglePasswordVisibility(inputId, eyeId) {
    const input = document.getElementById(inputId);
    const eyeIcon = document.getElementById(eyeId);

    if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.name = 'eye';
    } else {
        input.type = 'password';
        eyeIcon.name = 'eye-off';
    }
}

// Toggle untuk password utama
const toggle1 = document.getElementById('togglePassword1');
if (toggle1) {
    toggle1.addEventListener('click', function(e) {
        e.preventDefault();
        togglePasswordVisibility('password', 'eyeIcon1');
    });
}

// Toggle untuk konfirmasi password
const toggle2 = document.getElementById('togglePassword2');
if (toggle2) {
    toggle2.addEventListener('click', function(e) {
        e.preventDefault();
        togglePasswordVisibility('confirmPassword', 'eyeIcon2');
    });
}

// Input Label Animation Function
function handleInputLabel(input) {
    const label = input.nextElementSibling;
    
    if (input.value.trim() !== '') {
        input.classList.add('has-value');
    } else {
        input.classList.remove('has-value');
    }
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburger = document.querySelector(".hamburger");
    const overlay = document.getElementById("overlayMenu");
    const closeBtn = document.querySelector(".closebtn");
    const overlayButton = document.querySelector('.overlay-content .btn-login');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const form = document.querySelector('form'); // Ganti ke form yang ada di halaman

    // Event listener untuk tombol close
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Overlay dropdown toggle (Pengajuan)
    document.querySelectorAll('.overlay-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
        });
    });

    // Overlay menu link handler
    document.querySelectorAll('.overlay-content > a, .overlay-content .btn-login, .overlay-dropdown-content a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Jika klik dropdown toggle ("Pengajuan"), jangan tutup overlay
            if (this.classList.contains('overlay-dropdown-toggle')) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
                return;
            }
            // Jika klik menu lain atau item dropdown, tutup overlay
            toggleMenu();
            // Jika href="#" cegah reload
            if (this.getAttribute('href') === '#') e.preventDefault();
        });
    });

    // Hamburger event
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Tutup menu ketika user mengklik di luar area menu dan hamburger
    document.addEventListener('click', function(e) {
        if (overlay && (overlay.style.width === "300px" || overlay.style.width === "100%")) {
            if (!overlay.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMenu();
            }
        }
    });

    // Mencegah overlay menutup ketika diklik di dalam area overlay
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Input Event Listeners untuk Email
    if (emailInput) {
        emailInput.addEventListener('focus', function() {
            this.classList.add('has-value');
        });
        emailInput.addEventListener('blur', function() {
            handleInputLabel(this);
        });
        emailInput.addEventListener('input', function() {
            handleInputLabel(this);
        });
        handleInputLabel(emailInput);
    }

    // Input Event Listeners untuk Password
    if (passwordInput) {
        passwordInput.addEventListener('focus', function() {
            this.classList.add('has-value');
        });
        passwordInput.addEventListener('blur', function() {
            handleInputLabel(this);
        });
        passwordInput.addEventListener('input', function() {
            handleInputLabel(this);
        });
        handleInputLabel(passwordInput);
    }

    // Input Event Listeners untuk Confirm Password
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('focus', function() {
            this.classList.add('has-value');
        });
        confirmPasswordInput.addEventListener('blur', function() {
            handleInputLabel(this);
        });
        confirmPasswordInput.addEventListener('input', function() {
            handleInputLabel(this);
        });
        handleInputLabel(confirmPasswordInput);
    }

    // Validasi Form Registrasi
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // cegah submit langsung

            const password = passwordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            // cek konfirmasi password
            if (password !== confirmPassword) {
                alert("Konfirmasi password tidak sesuai!");
                return;
            }

            // Jika lolos semua validasi
            alert("Registrasi berhasil!");
            form.reset(); // reset form
        });
    }
});

// Handle resize window
window.addEventListener('resize', function() {
    const overlay = document.getElementById("overlayMenu");
    const hamburger = document.querySelector(".hamburger");
    
    if (window.innerWidth > 768) {
        if (overlay) overlay.style.width = "0";
        if (hamburger) hamburger.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// Dropdown desktop
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parentDropdown = this.parentElement;
        document.querySelectorAll('.dropdown').forEach(d => {
            if (d !== parentDropdown) d.classList.remove('active');
        });
        parentDropdown.classList.toggle('active');
    });
});
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) { 
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    }
});