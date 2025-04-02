/**
 * Main JavaScript file for Rushikesh Ghule's portfolio website
 * 
 * Contains all interactive functionality including animations,
 * project filtering, modals, form handling, and more.
 * 
 * @author Rushikesh Ghule
 * @version 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 50
    });
    
    // Initialize variables
    const loadingScreen = document.querySelector('.loading-screen');
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    const themeToggle = document.querySelector('.theme-toggle');
    const backToTop = document.querySelector('.back-to-top');
    const skillBars = document.querySelectorAll('.skill-progress');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetailsBtns = document.querySelectorAll('.project-details-btn');
    const modal = document.getElementById('projectModal');
    const modalBody = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal-close');
    const contactForm = document.getElementById('contactForm');
    
    // Remove loading screen after a delay
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 2000);
    
    // Initialize typing effect
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        new Typed('#typing-text', {
            strings: [
                '4.4 years of experience',
                'Python & Django expertise',
                'Angular development skills',
                'OutSystems proficiency',
                'SQL database knowledge',
                'Docker containerization'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 500,
            loop: true
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Animate skill bars when in viewport
        animateSkillBars();
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Dark mode toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Update icon
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
            
            // Save preference to localStorage
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
        
        // Check for saved theme preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    // Back to top button click event
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate skill bars when in viewport
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (barPosition < screenPosition) {
                const percentage = bar.getAttribute('data-percent');
                bar.style.width = percentage;
            }
        });
    }
    
    // Project filtering
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Project details modal
    if (projectDetailsBtns.length > 0) {
        projectDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                const projectData = getProjectData(projectId);
                
                if (projectData) {
                    populateProjectModal(projectData);
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (name && email && subject && message) {
                // Normally you would send this data to a server
                // For now, we'll just show a success message
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message, ${name}! I'll get back to you soon.</p>
                `;
                
                // Replace form with success message
                contactForm.style.display = 'none';
                contactForm.parentNode.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Optional: If you want to show the form again after a delay
                setTimeout(() => {
                    successMessage.remove();
                    contactForm.style.display = 'block';
                }, 5000);
            } else {
                alert('Please fill in all fields');
            }
        });
    }
    
    // Project data
    function getProjectData(projectId) {
        const projects = {
            'wbws': {
                title: 'Willing Buyer Willing Seller (WBWS) Platform',
                category: 'Full Stack',
                client: 'Law Firm Management',
                duration: '8 months',
                description: `
                    <p>The Willing Buyer Willing Seller (WBWS) Platform is a comprehensive project management solution tailored for law firms. The platform centralizes the process of assembling teams, managing resources, and tracking projects.</p>
                    <p>It aims to enhance collaboration by providing a unified interface for partners and employees, ensuring seamless communication and efficient utilization of resources. By integrating role-based access, the platform ensures secure and appropriate access to functionalities based on user roles, thereby aligning with the hierarchical structure of law firms.</p>
                    <p>The system also incorporates workflows for project tracking and team assembly, allowing firms to monitor project progress, allocate tasks effectively, and meet deadlines with better resource planning.</p>
                `,
                technologies: ['Angular', 'Django', 'RESTful Web Services', 'Docker', 'MSSQL'],
                responsibilities: [
                    'Developed APIs and frontend modules for resource identification and project collaboration',
                    'Integrated user roles (partners, employees) for access management',
                    'Implemented project tracking and team assembly workflows',
                    'Handled development, bug fixing, and requirements analysis',
                    'Utilized NumPy and Pandas for data processing, analysis, and manipulation to enhance project tracking and reporting functionalities'
                ],
                image: 'assets/images/projects/wbws.jpg'
            },
            'cir': {
                title: 'CIR Application',
                category: 'Full Stack',
                client: 'Document Management Firm',
                duration: '10 months',
                description: `
                    <p>The CIR (Centralized Information Review) Application is a document review and management system designed to streamline the allocation, review, and quality control of large volumes of documents.</p>
                    <p>The application features robust role-based access controls (RBAC) to ensure secure handling of sensitive information and seamless collaboration between team members with different roles (reviewers, quality analysts, and administrators).</p>
                    <p>Integration with Microsoft Office tools enhances the efficiency of document handling, enabling users to open, edit, and review documents directly within their familiar Microsoft environment. The application includes automated notification workflows for project tracking, ensuring that users are informed about deadlines, document statuses, and quality feedback.</p>
                `,
                technologies: ['Django', 'Angular', 'Microsoft Integration', 'RESTful Web Services', 'PostgreSQL'],
                responsibilities: [
                    'Architected the document allocation and role-based access control system',
                    'Integrated with Microsoft Office for streamlined document handling',
                    'Implemented automated notification workflows for improved project tracking',
                    'Conducted performance testing to ensure responsiveness and stability',
                    'Added test cases for database operations and API endpoints'
                ],
                image: 'assets/images/projects/cir.jpg'
            },
            'ewallet': {
                title: 'Ewallet System for Mobile and Web Application',
                category: 'Full Stack',
                client: 'Financial Technology Company',
                duration: '6 months',
                description: `
                    <p>The Ewallet System is a cross-platform mobile and web application designed to provide users with a secure, easy-to-use method for managing their finances and performing digital transactions.</p>
                    <p>Built using OutSystems, the platform allows for the seamless handling of payment transactions, user accounts, and digital wallets across both web and mobile platforms.</p>
                    <p>The system supports features such as balance management, transaction history, fund transfers, and bill payments, ensuring users can manage their financial needs effectively from any device.</p>
                `,
                technologies: ['OutSystems', 'Outsystem Database', 'Mobile Development', 'Web Development'],
                responsibilities: [
                    'Built backend services for transaction processing and account management',
                    'Designed secure, responsive interfaces for both web and mobile',
                    'Ensured compliance with payment security standards',
                    'Optimized performance for mobile and web to provide a seamless user experience'
                ],
                image: 'assets/images/projects/ewallet.jpg'
            },
            'project-intake': {
                title: 'Project Intake',
                category: 'Full Stack',
                client: 'Corporate Management',
                duration: '7 months',
                description: `
                    <p>The Project Intake system was designed as a comprehensive solution to streamline the initiation and management of projects for an organization.</p>
                    <p>It focused on providing administrators with robust tools to manage clients, set up projects, assign roles, and monitor form submissions.</p>
                    <p>The system ensured seamless collaboration between different user roles while maintaining secure access to functionalities through role-based permissions. The features were built to reduce manual overhead, enhance productivity, and ensure efficient handling of project requests from inception to execution.</p>
                `,
                technologies: ['Angular', 'Django', 'RESTful Web Services', 'PostgreSQL'],
                responsibilities: [
                    'Built client and project management modules for administrative use',
                    'Implemented user assignment workflows, including roles like reviewer, supervisor, and client users',
                    'Developed a form submission feature for client users to submit project requests',
                    'Ensured user roles and permissions aligned with project requirements for streamlined management',
                    'Added test cases for database operations and API endpoints',
                    'Utilized NumPy and Pandas for data processing, analysis, and reporting, improving the efficiency of project tracking and resource management'
                ],
                image: 'assets/images/projects/project-intake.jpg'
            },
            'healthcare': {
                title: 'General Health Care Service',
                category: 'Backend',
                client: 'Healthcare Provider',
                duration: '5 months',
                description: `
                    <p>Developed a comprehensive healthcare data management system to streamline record-keeping for patients and medical staff.</p>
                    <p>The software generates unique IDs for each patient and automatically stores patient and staff details.</p>
                    <p>Users can check room availability, doctor schedules, and patient details efficiently, enhancing data management in hospital settings.</p>
                `,
                technologies: ['Python', 'Django', 'RESTful Web Services', 'Angular', 'MySQL'],
                responsibilities: [
                    'Integrated user-facing elements developed by frontend developers with server-side logic',
                    'Wrote and translated use cases into functional requirements',
                    'Coded and developed backend functionalities using Django and MySQL',
                    'Handled development, bug fixing, and requirements analysis',
                    'Maintained and enhanced code for optimal performance'
                ],
                image: 'assets/images/projects/healthcare.jpg'
            },
            'interior-loan': {
                title: 'Company Interior Loan',
                category: 'Backend',
                client: 'Furniture Retail Company',
                duration: '6 months',
                description: `
                    <p>Created an Ecommerce platform for modular and multifunctional furniture, designed to cater to the rising demand for engineered wood furniture.</p>
                    <p>The application enabled seamless purchasing and assembly processes, promoting convenience in home decoration.</p>
                `,
                technologies: ['Python', 'Django', 'Django-ORM', 'RESTful Web Services', 'Angular', 'MySQL'],
                responsibilities: [
                    'Developed database repositories for efficient data access',
                    'Integrated frontend elements with backend server logic',
                    'Conducted bug fixing, requirement gathering, and enhancement analysis'
                ],
                image: 'assets/images/projects/interior-loan.jpg'
            }
        };
        
        return projects[projectId];
    }
    
    // Populate project modal with data
    function populateProjectModal(project) {
        // Create technologies HTML
        const techHTML = project.technologies.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('');
        
        // Create responsibilities HTML
        const responsibilitiesHTML = project.responsibilities.map(resp => `<li>${resp}</li>`).join('');
        
        // Populate modal content
        modalBody.innerHTML = `
            <div class="project-modal-content">
                <div class="project-modal-header">
                    <h2 class="project-modal-title">${project.title}</h2>
                    <span class="project-modal-category">${project.category}</span>
                </div>
                
                <div class="project-modal-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                
                <div class="project-modal-details">
                    <div class="project-modal-info">
                        <div class="project-modal-info-item">
                            <h4>Client</h4>
                            <p>${project.client}</p>
                        </div>
                        <div class="project-modal-info-item">
                            <h4>Duration</h4>
                            <p>${project.duration}</p>
                        </div>
                    </div>
                    
                    <div class="project-modal-section">
                        <h3>Project Description</h3>
                        <div class="project-modal-description">
                            ${project.description}
                        </div>
                    </div>
                    
                    <div class="project-modal-section">
                        <h3>Technologies Used</h3>
                        <div class="project-modal-technologies">
                            ${techHTML}
                        </div>
                    </div>
                    
                    <div class="project-modal-section">
                        <h3>Responsibilities</h3>
                        <ul class="project-modal-responsibilities">
                            ${responsibilitiesHTML}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .project-modal-content {
                color: var(--dark);
            }
            
            .project-modal-header {
                margin-bottom: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 15px;
            }
            
            .project-modal-title {
                font-size: 2rem;
                color: var(--primary);
                margin: 0;
            }
            
            .project-modal-category {
                background-color: var(--accent);
                color: var(--white);
                padding: 5px 15px;
                border-radius: var(--radius-full);
                font-size: 0.9rem;
                font-weight: 600;
            }
            
            .project-modal-image {
                margin-bottom: 30px;
                border-radius: var(--radius-md);
                overflow: hidden;
                box-shadow: var(--shadow);
            }
            
            .project-modal-image img {
                width: 100%;
                height: auto;
                display: block;
            }
            
            .project-modal-info {
                display: flex;
                gap: 30px;
                margin-bottom: 30px;
                flex-wrap: wrap;
            }
            
            .project-modal-info-item {
                flex: 1;
                min-width: 200px;
            }
            
            .project-modal-info-item h4 {
                font-size: 1.1rem;
                color: var(--primary);
                margin-bottom: 5px;
            }
            
            .project-modal-info-item p {
                color: var(--gray);
            }
            
            .project-modal-section {
                margin-bottom: 30px;
            }
            
            .project-modal-section h3 {
                font-size: 1.3rem;
                color: var(--dark);
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 2px solid var(--light-gray);
            }
            
            .project-modal-description {
                color: var(--gray);
                line-height: 1.6;
            }
            
            .project-modal-description p {
                margin-bottom: 15px;
            }
            
            .project-modal-technologies {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .modal-tech-tag {
                background-color: rgba(99, 102, 241, 0.1);
                color: var(--primary);
                padding: 8px 15px;
                border-radius: var(--radius-full);
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .project-modal-responsibilities {
                padding-left: 20px;
            }
            
            .project-modal-responsibilities li {
                color: var(--gray);
                margin-bottom: 10px;
                position: relative;
                padding-left: 15px;
            }
            
            .project-modal-responsibilities li::before {
                content: '';
                position: absolute;
                left: 0;
                top: 10px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: var(--primary);
            }
            
            @media (max-width: 768px) {
                .project-modal-title {
                    font-size: 1.7rem;
                }
                
                .project-modal-info {
                    flex-direction: column;
                    gap: 15px;
                }
            }
        `;
        
        document.head.appendChild(modalStyle);
    }

    // Custom cursor effect
    function setupCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            
            // Add a slight delay for the dot
            setTimeout(() => {
                cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }, 50);
        });
        
        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .filter-btn, .project-card, .social-link, .tech-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorDot.classList.add('active');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorDot.classList.remove('active');
            });
        });
    }

    // Initialize custom cursor on desktop devices
    if (window.innerWidth > 768) {
        setupCustomCursor();
    }

    // Advanced skill animation
    function initSkillAnimation() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const percentage = item.querySelector('.skill-progress').getAttribute('data-percent');
            const percentValue = parseInt(percentage);
            
            // Create a circular progress indicator
            const skillIcon = item.querySelector('.skill-icon-container');
            const progressCircle = document.createElement('svg');
            progressCircle.classList.add('skill-circle');
            progressCircle.setAttribute('width', '40');
            progressCircle.setAttribute('height', '40');
            progressCircle.setAttribute('viewBox', '0 0 40 40');
            
            // Background circle
            const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            bgCircle.setAttribute('cx', '20');
            bgCircle.setAttribute('cy', '20');
            bgCircle.setAttribute('r', '18');
            bgCircle.setAttribute('fill', 'none');
            bgCircle.setAttribute('stroke', 'rgba(99, 102, 241, 0.1)');
            bgCircle.setAttribute('stroke-width', '3');
            
            // Progress circle
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '20');
            circle.setAttribute('cy', '20');
            circle.setAttribute('r', '18');
            circle.setAttribute('fill', 'none');
            circle.setAttribute('stroke', 'url(#gradient)');
            circle.setAttribute('stroke-width', '3');
            circle.setAttribute('stroke-linecap', 'round');
            
            // Calculate the circumference and offset
            const circumference = 2 * Math.PI * 18;
            const offset = circumference - (percentValue / 100) * circumference;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;
            
            // Add gradient definition
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'gradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', '#6366f1');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', '#4f46e5');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            
            // Assemble the SVG
            progressCircle.appendChild(defs);
            progressCircle.appendChild(bgCircle);
            progressCircle.appendChild(circle);
            
            // Add it to the DOM
            skillIcon.appendChild(progressCircle);
            
            // Animate the progress when in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            circle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                            circle.style.strokeDashoffset = offset;
                        }, 300);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(item);
        });
    }

    document.addEventListener('DOMContentLoaded', initSkillAnimation);

    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#4f46e5" },
                "shape": {
                    "type": "circle",
                    "stroke": { "width": 0, "color": "#000000" },
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                },
                "size": {
                    "value": 3,
                    "random": true,
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4f46e5",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.6 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    function createSkillCircles() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const percentage = item.querySelector('.skill-progress').getAttribute('data-percent');
            const percentValue = parseInt(percentage);
            const skillName = item.querySelector('.skill-info h4').textContent;
            const iconClass = item.querySelector('.skill-icon-container i').className;
            
            // Create new markup
            item.innerHTML = `
                <div class="skill-circle-container">
                    <div class="skill-circle">
                        <svg width="120" height="120" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" stroke-width="12" />
                            <circle class="skill-circle-progress" cx="60" cy="60" r="54" fill="none" stroke="url(#skillGradient)" stroke-width="12" stroke-linecap="round" />
                            <defs>
                                <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="${getComputedStyle(document.documentElement).getPropertyValue('--primary-light')}" />
                                    <stop offset="100%" stop-color="${getComputedStyle(document.documentElement).getPropertyValue('--primary-dark')}" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div class="skill-circle-icon"><i class="${iconClass}"></i></div>
                        <div class="skill-circle-percentage">${percentValue}%</div>
                    </div>
                    <div class="skill-circle-name">${skillName}</div>
                </div>
            `;
            
            // Calculate and set the circle progress
            const circle = item.querySelector('.skill-circle-progress');
            const radius = circle.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            const offset = circumference - (percentValue / 100) * circumference;
                            circle.style.transition = 'stroke-dashoffset 2s ease-in-out';
                            circle.style.strokeDashoffset = offset;
                        }, 300);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(item);
        });
    }

    document.addEventListener('DOMContentLoaded', createSkillCircles);

    function animateTimeline() {
        const timelineContents = document.querySelectorAll('.timeline-content');
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 200); // Staggered animation
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineContents.forEach(content => {
            observer.observe(content);
        });
    }

    document.addEventListener('DOMContentLoaded', animateTimeline);

    // Fix timeline visibility and add animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay for each item to create a cascade effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});