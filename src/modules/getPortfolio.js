import { ref } from 'vue'
import trap0 from '@/assets/trap0.webp'
import trap1 from '@/assets/trap1.webp'
import trap2 from '@/assets/trap2.webp'
import trap3 from '@/assets/trap3.webp'

import chat0 from '@/assets/chat0.webp'
import chat1 from '@/assets/chat1.webp'
import chat2 from '@/assets/chat2.webp'
import chat3 from '@/assets/chat3.webp'

import kate0 from '@/assets/kate0.webp'
import kate1 from '@/assets/kate1.webp'
import kate2 from '@/assets/kate2.webp'
import kate3 from '@/assets/kate3.webp'

import port0 from '@/assets/port0.webp'
import port1 from '@/assets/port1.webp'
import port2 from '@/assets/port2.webp'
import port3 from '@/assets/port3.webp'

import board0 from '@/assets/board0.webp'
import board1 from '@/assets/board1.webp'
import board2 from '@/assets/board2.webp'
import board3 from '@/assets/board3.webp'

import un0 from '@/assets/un0.webp'
import un1 from '@/assets/un1.webp'
import un2 from '@/assets/un2.webp'
import un3 from '@/assets/un3.webp'
import un4 from '@/assets/un4.webp'

import task0 from '@/assets/task0.webp'
import task1 from '@/assets/task1.webp'
import task2 from '@/assets/task2.webp'
import task3 from '@/assets/task3.webp'

import fan0 from '@/assets/fan0.webp'
import fan1 from '@/assets/fan1.webp'
import fan2 from '@/assets/fan2.webp'
import fan3 from '@/assets/fan3.webp'

import ck0 from '@/assets/ck0.webp'
import ck1 from '@/assets/ck1.webp'
import ck2 from '@/assets/ck2.webp'
import ck3 from '@/assets/ck3.webp'

import glitch0 from '@/assets/glitch0.webp'
import glitch1 from '@/assets/glitch1.webp'
import glitch2 from '@/assets/glitch2.webp'
import glitch3 from '@/assets/glitch3.webp'

const getPortfolio = () => {
  const portfolioItems = ref([

    {
      id: 1,
      title: 'Chatognito',
      description: 'Chatognito is a privacy-focused chat application designed to provide a seamless and secure messaging experience. It offers a dual login system, allowing you to either log in anonymously with a nickname or sign in using your Google account, with your associated Google name displayed.',
      extra_description: "Powered by Firebase as its backend database, Chatognito ensures smooth performance and real-time communication. Built with Vue 3 and the latest script setup syntax, it provides an intuitive and modern interface. The app supports GIF display and selection, adding a fun element to conversations. Whether you're chatting publicly or having a private 1-to-1 chat, Chatognito offers the flexibility to connect with others in a secure and private space.",
      more: "With its retro Y2K aesthetic, Chatognito evokes the nostalgic feel of the early 2000s, inspired by the iconic Windows XP style. Its playful design and familiar interface bring a touch of the past into the modern digital world, making every chat session feel like a journey back to a simpler time.",
      technologies: ['Vue.js', 'Firebase', 'Node.js'],
      role: 'Full-Stack Developer',
      image: chat0,
      image1: chat1,
      image2: chat2,
      image3: chat3,
      
      liveLink: 'https://messenger-95a5d.web.app/',
      sourceCode: 'https://github.com/DanielPincu/Messenger-App',
    },

    {
      id: 2,
      title: 'Glitch Social',
      description: 'Glitch Social is a custom-built social media platform designed to replicate and explore the core mechanics of modern social networks. It allows users to create accounts, manage personal profiles, publish posts with optional media, interact through comments and likes, follow or block other users, and receive notifications based on activity.',
      extra_description: "The platform is powered by a PHP backend using an MVC-based, object-oriented architecture and a MariaDB relational database. The database is fully normalized to Third Normal Form (3NF) to ensure data integrity and scalability. PHP handles authentication, session management, input validation, and secure communication with the database via PDO and prepared statements. User-uploaded images are validated and resized server-side, and external API integration enables GIF search and embedding within posts.",
      more: "Glitch Social places a strong emphasis on security and data consistency. Features such as password hashing, CSRF protection, session-based authentication, and environment-based configuration are implemented to protect user data. Database-level constraints, indexes, triggers, and views are used to enforce business rules, improve performance, and automate tasks such as notifications and cleanup actions. The interface combines a modern social-media experience with a subtle retro-inspired aesthetic, resulting in a platform that feels both familiar and technically robust.",
      technologies: ['PHP', 'MariaDB', 'JavaScript', 'Tailwind CSS', 'PDO'],
      role: 'Full-Stack Developer',
      image: glitch0,
      image1: glitch1,
      image2: glitch2,
      image3: glitch3,
      liveLink: 'https://danielpincu.dev/',
      sourceCode: 'https://github.com/DanielPincu/glitch-social',
    },

    {
      id: 3,
      title: 'Fantasy Quest Esbjerg',
      description: "I led the development of a fully responsive, SEO-optimized website for Fantasy Quest Esbjerg, collaborating with a design team to create a new visual identity for the brand.",
      extra_description: "For my 2nd semester’s exam, I worked together with my team on a project for Fantasy Quest Esbjerg. This project gave me the opportunity to expand my knowledge of using Firebase as a database and learning more about API calls. As a web developer, this was a core aspect of my contribution to the team, ensuring that the development aligned with the vision of the project. Feel free to check out the website and the github repository!",
      technologies: ['Vue3', 'JS', 'CSS'],
      role: 'Full-stack Developer',
      image: fan0,
      image1: fan1,
      image2: fan2,
      image3: fan3,
      liveLink: 'https://exam-6d170.web.app/',
      sourceCode: 'https://github.com/DanielPincu/FantasyQuestEsbjerg',
    },

    {
      id: 4,
      title: 'Esbjerg Board Games',
      description: 'SCHEDULED MAINTENANCE - Temporary Down! Esbjerg Board Games is a community-focused project aimed at bringing board game enthusiasts together for regular events in Esbjerg, Denmark, offering a platform where users can discover, join, and engage in local gaming sessions.',
      extra_description: 'Built with WordPress and PHP, the site offers full customization for the editor, allowing for easy management of content and structure. It incorporates a role-based access system, with different user permissions for admins and editors, ensuring proper content management and security. Custom post types and Advanced Custom Fields are used to create tailored content, providing flexibility in how information about events, games, and community activities is presented. For added security, the site features two-factor authentication, protecting user accounts and sensitive data. Additionally, the website is fully optimized for SEO, ensuring that it ranks well on search engines while maintaining strong security standards to protect against potential threats. The combination of these features makes Esbjerg Board Games a robust and reliable platform for its growing community. Take a look into the development process if you are curious  <a href="https://drive.google.com/file/d/1XiKCjRyyvJQ-X6UG18dOnvUTmtgvcVAJ/view?usp=sharing"></a> Yes, a glitch I have to address. But you can visit the live website by clicking the button below.',
      technologies: ['Wordpress', 'PHP', '2FA'],
      role: 'Full-stack Developer',
      image: board0,
      image1: board1,
      image2: board2,
      image3: board3,
      liveLink: 'https://esbjergboardgames.dk',
      sourceCode: 'https://github.com/DanielPincu/Esbjerg-Board-Games',
    },


    {
  id: 5,
  title: 'CK Cookies & Cakes',
  description: "A complete web shop built from scratch for CK Cookies & Cakes, a local cookie shop in Esbjerg. The project focused on creating an intuitive and visually appealing online store that allows customers to browse and purchase delicious cookies and cakes with ease.",
  extra_description: "The site features seamless product browsing, a fully integrated WooCommerce shopping cart, and easy checkout. Additional functionalities include custom product pages, seasonal promotions, and responsive design to ensure a smooth experience on all devices.",
  more: "The website was developed using WordPress and WooCommerce, with custom PHP and CSS to tailor the design and functionality to the client's brand. Attention was given to user experience, performance, and SEO, ensuring the shop is both attractive and discoverable online.",
  technologies: ['WordPress', 'WooCommerce', 'PHP', 'HTML/CSS', 'JavaScript'],
  role: 'Full-stack Developer',
  image: ck0,
  image1: ck1,
  image2: ck2,
  image3: ck3,
  liveLink: 'https://ckcookies.dk',
  sourceCode: 'https://github.com/DanielPincu/ckcookies',
},


    {
      id: 6,
      title: 'Trapholt Museum',
      description: "A comprehensive digital transformation for Trapholt Museum, a renowned cultural institution in Kolding, Denmark. The redesign aimed to enhance user engagement, improve accessibility, and showcase the museum’s diverse art collection through an interactive and intuitive web experience.",
      extra_description: "The project not only delivered on its promise of intuitive navigation, immersive imagery, and interactive elements to elevate the user experience but also integrated essential functionalities like event listings,a multiple language selector, and online ticketing demo, thus optimizing visitor engagement and accessibility.",
      more: "The website was built using plain HTML/CSS/Javascript, to ensure optimal performance and SEO. The site was deployed on Vercel, ensuring fast load times and seamless user interactions. The result was a visually stunning and user-friendly website that effectively showcases Trapholt Museum’s rich history and diverse art collection.",
      technologies: ['HTML', 'CSS', 'Javascript', 'Vercel'],
      role: 'Front-end Developer',
      image: trap0,
      image1: trap1,
      image2: trap2,
      image3: trap3,
      liveLink: 'https://semester-project-kappa.vercel.app/',
      sourceCode: 'https://github.com/DanielPincu/Trapholt-Museum',
    },
    

    {
      id: 7,
      title: 'Interactive Portfolio Website',
      description: 'A fully interactive portfolio website designed to showcase my projects, skills, and experience through an engaging and visually dynamic interface.',
      extra_description: "The goal of this project was to create a portfolio website that reflects my expertise in UI/UX design and web development. I used Firebase as the database to handle dynamic content, ensuring smooth data flow across the site. The website features a personalized about section, a detailed project showcase, and an integrated contact form for potential clients or employers to reach out directly. One of the key features is the fully implemented dark mode and white mode toggle, which allows users to customize their experience. The website is built with reusable, dynamic components, leveraging Vue.js to ensure both high performance and user interactivity. The challenge was to balance aesthetics with performance, making sure that the visual design and functionality remain optimized without compromising load times or responsiveness.",
      technologies: ['Vue.js', 'Firebase', 'Vercel Deploy'],
      role: 'UI/UX Designer & Developer',
      image: port0,
      image1: port1,
      image2: port3,
      image3: port1,
      liveLink: 'https://portfolio-firebase-mu.vercel.app/',
      sourceCode: 'https://github.com/DanielPincu/Portfolio-Firebase',
    },

    {
      id: 8,
      title: 'TaskHub',
      description: "For our school project on TypeScript and CI/CD, I developed TaskHub, a task management web application built with Vite and TypeScript. The project focused on modern development practices, automation, and a seamless user experience.",
      extra_description: "TaskHub allows users to add, edit, and remove tasks, providing an intuitive and efficient way to manage tasks. It features a light mode and dark mode toggle, ensuring a customizable user experience. The project is integrated with GitHub Live and a test environment, leveraging CI/CD pipelines for automated deployment and testing. Designed with responsiveness in mind, the application delivers a smooth experience across all devices. This project highlights our ability to build scalable, maintainable, and user-friendly applications using modern web technologies",
      technologies: ['Vite, TypeScript, CSS, CI/CD, GitHub Live/Test Environment'],
      role: 'Front-End Developer',
      image: task1,
      image1: task0,
      image2: task2,
      image3: task3,
      liveLink: 'https://www.youtube.com/watch?v=dIwXC3LD0uE&ab_channel=DanielPincu',
      sourceCode: 'https://github.com/DanielPincu/TypeScript-Exam-App',
    },

    {
      id: 9,
      title: "Kate's Corner",
      description: 'This webshop was built entirely in WordPress, with a custom-developed theme created from scratch as a complete tailored solution. It leverages WooCommerce for handling shop functionality and integrates Stripe as the payment processor. To ensure a high level of security, the platform also implements a two-factor authentication (2FA) system. Security was a top priority in this project. It follows the latest security best practices, including securing Advanced Custom Fields (ACF) to prevent XSS attacks. Additionally, the webshop is fully SEO-optimized, enhancing visibility and search performance.',
      extra_description: "The result was a webshop that not only met but exceeded expectations in both functionality and aesthetics, setting a new standard within our team for efficient, secure, and user-focused digital solutions. This project further strengthened my expertise in developing high-quality eCommerce platforms that drive engagement, improve accessibility, and prioritize security.",
      more: "The website supports multilingual functionality, using Polylang to provide seamless translations between English and Danish, ensuring accessibility for a broader audience. The site also features a blog section, allowing Kate to share updates, news, and insights with her customers.",
      technologies: ['Vue.js', 'Pinia', 'Stripe API'],
      role: 'Full-stack Developer',
      image: kate0,
      image1: kate1,
      image2: kate2,
      image3: kate3,
      liveLink: 'https://kates-corner.danielpincu.dev/',
      sourceCode: 'https://github.com/DanielPincu/Kate-s-Corner-Theme',
    },
    
    
    {
      id: 10,
      title: 'United Nations',
      description: "For our school project focused on the UN's Sustainable Development Goal 13 (Climate Action), my teammate and I created a dynamic WordPress website to raise awareness about climate change, its effects, and sustainable living practices.",
      extra_description: "The site is designed to provide essential information on climate change, its impacts, and practical steps for sustainable living. The website features a dynamic front page where custom sections pull content directly from the WordPress dashboard, allowing for easy updates. Its responsive design ensures a seamless experience across all devices. Additionally, the site includes a blog that covers various climate-related topics, as well as a newsletter and contact form for users to subscribe or request more information. This project highlights our ability to work together to create a dynamic and responsive site that supports climate action objectives.",
      technologies: ['Wordpress', 'PHP', 'CSS'],
      role: 'Front-End Developer',
      image: un0,
      image1: un1,
      image2: un2,
      image3: un3,
      image4: un4,
      liveLink: 'https://united-nations.danielpincu.dev',
      sourceCode: 'https://github.com/DanielPincu/Laravel-Product-Management',
    },
    
     
    
  ]);

  return { portfolioItems }
}

export default getPortfolio
