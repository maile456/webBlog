
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav a');
    const slider = document.querySelector('.slider');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const offset = targetSection.offsetLeft;
            slider.scrollTo({
                left: offset,
                behavior: 'smooth'
            });
        });
    });
});


function ciallo()
{
    alert("Ciallo～(∠・ω< )⌒★");
}
document.addEventListener('DOMContentLoaded', ciallo);
