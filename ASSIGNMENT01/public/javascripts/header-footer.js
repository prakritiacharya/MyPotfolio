//header and footer element
const mainHeader = document.querySelector('#main-header');
const mainFooter = document.querySelector('#footer-section');

// header
mainHeader.innerHTML = `
    <div class="navbar">

        <nav class="main-nav">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#Contact Me">Products</a></li>
                <li><a href="#Contact Me">Products</a></li>
            </ul>
        </nav>
        <div class="contact-info">
            <span>Contact</span>
                <img src="profile01.jpg" alt="Profile Picture" class="profile-thumbnail">
        </div>
        
    </div>
    `;

mainFooter.innerHTML =`
            <section class="contact-section">
            <div class="get-in-touch">
                <h2>Get in Touch</h2>
                <p>"Every great journey starts with a conversation. Reach out!"</p>
                <div class="social-icons">
                    <a href="#" target="_blank"><i class="fa-solid fa-envelope"></i></a>
                    <a href="#" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" target="_blank"><i class="fa-brands fa-github"></i></a>
                </div>
            </div>
            <div class="contact-card">
                <i class="fas fa-envelope"></i>
                <span>prakritiacharya0006@gmail.com</span>
            </div>
            <div class="contact-card">
                <i class="fab fa-github"></i>
                <a href="https://github.com/prakritacharya" target="_blank">https://github.com/prakritacharya</a>
            </div>
        </section>
`