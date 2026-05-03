document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Efek Background Navbar saat di-scroll ---
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Memberikan background gelap saat halaman di-scroll ke bawah
            header.style.backgroundColor = 'rgba(18, 18, 20, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
            header.style.transition = 'all 0.3s ease';
        } else {
            // Kembali transparan saat di paling atas
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // --- 2. Animasi Circular Skill Bar ---
    const circles = document.querySelectorAll('.circle');
    let skillsAnimated = false;

    // Fungsi untuk menjalankan animasi angka dan garis lingkaran
    const animateSkills = () => {
        circles.forEach(circle => {
            // Mengambil nilai target dari atribut style="--p:..." di HTML
            let styleAttr = circle.getAttribute('style');
            let targetMatch = styleAttr.match(/--p:\s*([\d.]+)/);
            
            if (targetMatch) {
                let targetValue = parseFloat(targetMatch[1]);
                let currentValue = 0;
                let innerText = circle.querySelector('.inner');
                
                // Kecepatan animasi (semakin kecil pembagi, semakin lambat)
                let increment = targetValue / 100; 

                let interval = setInterval(() => {
                    currentValue += increment;
                    
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(interval);
                    }
                    
                    // Update tampilan UI (Garis lingkaran dan teks persentase)
                    circle.style.setProperty('--p', currentValue);
                    innerText.innerText = currentValue.toFixed(1) + '%';
                }, 15); // Update setiap 15 milidetik
            }
        });
    };

    // Menggunakan Intersection Observer untuk mendeteksi kapan section About Me terlihat di layar
    const aboutSection = document.querySelector('.about');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Jika section about terlihat di layar dan animasi belum pernah dijalankan
            if (entry.isIntersecting && !skillsAnimated) {
                // Reset nilai awal lingkaran ke 0 sebelum animasi dimulai
                circles.forEach(circle => circle.style.setProperty('--p', 0));
                
                // Jalankan animasi
                animateSkills();
                skillsAnimated = true; // Pastikan animasi hanya berjalan sekali
            }
        });
    }, { threshold: 0.5 }); // threshold 0.5 berarti animasi memicu saat 50% section terlihat

    if (aboutSection) {
        observer.observe(aboutSection);
    }
});