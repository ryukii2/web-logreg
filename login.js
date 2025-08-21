// Toggle Menu Function
function toggleMenu() {
    const overlay = document.getElementById("overlayMenu");
    const hamburger = document.querySelector(".hamburger");
    
    if (overlay.style.width === "100%" || overlay.style.width === "300px") {
        overlay.style.width = "0";
        hamburger.classList.remove("active");
        document.body.style.overflow = "auto";
    } else {
        overlay.style.width = "300px";
        hamburger.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

// Password Toggle Function
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.name = 'eye';
    } else {
        passwordInput.type = 'password';
        eyeIcon.name = 'eye-off';
    }
}

// Input Label Animation Function
function handleInputLabel(input) {
    if (input.value.trim() !== '') {
        input.classList.add('has-value');
    } else {
        input.classList.remove('has-value');
    }
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const overlay = document.getElementById("overlayMenu");
    const closeBtn = document.querySelector(".closebtn");
    const passwordToggle = document.getElementById('togglePassword');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const form = document.querySelector('form');

    // Tombol close
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

    // Hamburger click
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

    // Input Email
    if (emailInput) {
        emailInput.addEventListener('blur', function() { handleInputLabel(this); });
        emailInput.addEventListener('input', function() { handleInputLabel(this); });
        handleInputLabel(emailInput);
    }

    // Input Password
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() { handleInputLabel(this); });
        passwordInput.addEventListener('input', function() { handleInputLabel(this); });
        handleInputLabel(passwordInput);
    }

    // Password toggle
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function(e) {
            e.preventDefault();
            togglePasswordVisibility();
        });
    }
});

// Resize reset
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