import { ref } from 'vue'
import trap0 from '@/assets/trap0.png'
import trap1 from '@/assets/trap1.png'
import trap2 from '@/assets/trap2.png'
import trap3 from '@/assets/trap3.png'

import chat0 from '@/assets/chat0.png'
import chat1 from '@/assets/chat1.png'
import chat2 from '@/assets/chat2.png'
import chat3 from '@/assets/chat3.png'

import kate0 from '@/assets/kate0.png'
import kate1 from '@/assets/kate1.png'
import kate2 from '@/assets/kate2.png'
import kate3 from '@/assets/kate3.png'

import port0 from '@/assets/port0.png'
import port1 from '@/assets/port1.png'
import port2 from '@/assets/port2.png'
import port3 from '@/assets/port3.png'

import board0 from '@/assets/board0.png'
import board1 from '@/assets/board1.png'
import board2 from '@/assets/board2.png'
import board3 from '@/assets/board3.png'

import un0 from '@/assets/un0.png'
import un1 from '@/assets/un1.png'
import un2 from '@/assets/un2.png'
import un3 from '@/assets/un3.png'
import un4 from '@/assets/un4.png'

import task0 from '@/assets/task0.png'
import task1 from '@/assets/task1.png'
import task2 from '@/assets/task2.png'
import task3 from '@/assets/task3.png'

const getPortfolio = () => {
  const portfolioItems = ref([
    {
      id: 1,
      title: 'Trapholt Museum',
      description: "A comprehensive digital transformation for Trapholt Museum, a renowned cultural institution in Kolding, Denmark. The redesign aimed to enhance user engagement, improve accessibility, and showcase the museum’s diverse art collection through an interactive and intuitive web experience.",
      extra_description: "The project not only delivered on its promise of intuitive navigation, immersive imagery, and interactive elements to elevate the user experience but also integrated essential functionalities like event listings,a multiple language selector, and online ticketing demo, thus optimizing visitor engagement and accessibility.",
      more: "The website was built using plain HTML/CSS/Javascript, to ensure optimal performance and SEO. The site was deployed on Vercel, ensuring fast load times and seamless user interactions. The result was a visually stunning and user-friendly website that effectively showcases Trapholt Museum’s rich history and diverse art collection.",
      technologies: ['HTML', 'CSS', 'Javascript', 'Vercel'],
      role: 'Frontend Developer',
      year: 2024,
      image: trap0,
      image1: trap1,
      image2: trap2,
      image3: trap3,
      link: 'https://semester-project-kappa.vercel.app/',
      category: 'Web Design'
    },
    {
      id: 2,
      title: 'Chatognito',
      description: 'Chatognito is a privacy-focused chat application designed to provide a seamless and secure messaging experience. It offers a dual login system, allowing you to either log in anonymously with a nickname or sign in using your Google account, with your associated Google name displayed.',
      extra_description: "Powered by Firebase as its backend database, Chatognito ensures smooth performance and real-time communication. Built with Vue 3 and the latest script setup syntax, it provides an intuitive and modern interface. The app supports GIF display and selection, adding a fun element to conversations. Whether you're chatting publicly or having a private 1-to-1 chat, Chatognito offers the flexibility to connect with others in a secure and private space.",
      more: "With its retro Y2K aesthetic, Chatognito evokes the nostalgic feel of the early 2000s, inspired by the iconic Windows XP style. Its playful design and familiar interface bring a touch of the past into the modern digital world, making every chat session feel like a journey back to a simpler time.",
      technologies: ['Vue.js', 'Firebase', 'Node.js'],
      role: 'Full-Stack Developer',
      year: 2024,
      image: chat0,
      image1: chat1,
      image2: chat2,
      image3: chat3,
      
      link: 'https://chatognito.com',
      category: 'Web Application'
    },
    {
      id: 3,
      title: "Kate's Corner",
      description: 'This webshop was built entirely in WordPress, with a custom-developed theme created from scratch as a complete tailored solution. It leverages WooCommerce for handling shop functionality and integrates Stripe as the payment processor. To ensure a high level of security, the platform also implements a two-factor authentication (2FA) system. Security was a top priority in this project. It follows the latest security best practices, including securing Advanced Custom Fields (ACF) to prevent XSS attacks. Additionally, the webshop is fully SEO-optimized, enhancing visibility and search performance.',
      extra_description: "The result was a webshop that not only met but exceeded expectations in both functionality and aesthetics, setting a new standard within our team for efficient, secure, and user-focused digital solutions. This project further strengthened my expertise in developing high-quality eCommerce platforms that drive engagement, improve accessibility, and prioritize security.",
      more: "The website supports multilingual functionality, using Polylang to provide seamless translations between English and Danish, ensuring accessibility for a broader audience. The site also features a blog section, allowing Kate to share updates, news, and insights with her customers.",
      technologies: ['Vue.js', 'Pinia', 'Stripe API'],
      role: 'Frontend Developer',
      year: 2023,
      image: kate0,
      image1: kate1,
      image2: kate2,
      image3: kate3,
      link: 'https://projects.danielpincu.com/wordpress/',
      category: 'E-commerce'
    },
    {
      id: 4,
      title: 'Interactive Portfolio Website',
      description: 'A fully interactive portfolio website designed to showcase my projects, skills, and experience through an engaging and visually dynamic interface.',
      extra_description: "The goal of this project was to create a portfolio website that reflects my expertise in UI/UX design and web development. I used Firebase as the database to handle dynamic content, ensuring smooth data flow across the site. The website features a personalized about section, a detailed project showcase, and an integrated contact form for potential clients or employers to reach out directly. One of the key features is the fully implemented dark mode and white mode toggle, which allows users to customize their experience. The website is built with reusable, dynamic components, leveraging Vue.js to ensure both high performance and user interactivity. The challenge was to balance aesthetics with performance, making sure that the visual design and functionality remain optimized without compromising load times or responsiveness.",
      technologies: ['Vue.js', 'Firebase', 'Vercel Deploy'],
      role: 'UI/UX Designer & Developer',
      year: 2024,
      image: port0,
      image1: port1,
      image2: port3,
      image3: port1,
      link: 'https://portfolio-firebase-mu.vercel.app/',
      category: 'Web Design'
    },
    {
      id: 5,
      title: 'Esbjerg Board Games',
      description: 'Esbjerg Board Games is a community-focused project aimed at bringing board game enthusiasts together for regular events in Esbjerg, Denmark, offering a platform where users can discover, join, and engage in local gaming sessions.',
      extra_description: 'Built with WordPress and PHP, the site offers full customization for the editor, allowing for easy management of content and structure. It incorporates a role-based access system, with different user permissions for admins and editors, ensuring proper content management and security. Custom post types and Advanced Custom Fields are used to create tailored content, providing flexibility in how information about events, games, and community activities is presented. For added security, the site features two-factor authentication, protecting user accounts and sensitive data. Additionally, the website is fully optimized for SEO, ensuring that it ranks well on search engines while maintaining strong security standards to protect against potential threats. The combination of these features makes Esbjerg Board Games a robust and reliable platform for its growing community. Take a look into the development process if you are curious  <a href="https://drive.google.com/file/d/1XiKCjRyyvJQ-X6UG18dOnvUTmtgvcVAJ/view?usp=sharing"></a> Yes, a glitch I have to address. But you can visit the live website by clicking the button below.',
      technologies: ['Wordpress', 'PHP', '2FA'],
      role: 'Front-End Developer',
      year: 2024,
      image: board0,
      image1: board1,
      image2: board2,
      image3: board3,
      link: 'https://esbjergboardgames.dk',
      category: 'Web Design'
    },
    {
      id: 6,
      title: 'United Nations',
      description: "For our school project focused on the UN's Sustainable Development Goal 13 (Climate Action), my teammate and I created a dynamic WordPress website to raise awareness about climate change, its effects, and sustainable living practices.",
      extra_description: "The site is designed to provide essential information on climate change, its impacts, and practical steps for sustainable living. The website features a dynamic front page where custom sections pull content directly from the WordPress dashboard, allowing for easy updates. Its responsive design ensures a seamless experience across all devices. Additionally, the site includes a blog that covers various climate-related topics, as well as a newsletter and contact form for users to subscribe or request more information. This project highlights our ability to work together to create a dynamic and responsive site that supports climate action objectives. Take a look into the development process if you're curious",
      technologies: ['Wordpress', 'PHP', 'CSS'],
      role: 'Front-End Developer',
      year: 2024,
      image: un0,
      image1: un1,
      image2: un2,
      image3: un3,
      image4: un4,
      link: 'https://projects.danielpincu.com/wordpress2/',
      category: 'Web Design'
    },
    {
      id: 7,
      title: 'TaskHub',
      description: "For our school project on TypeScript and CI/CD, I developed TaskHub, a task management web application built with Vite and TypeScript. The project focused on modern development practices, automation, and a seamless user experience.",
      extra_description: "TaskHub allows users to add, edit, and remove tasks, providing an intuitive and efficient way to manage tasks. It features a light mode and dark mode toggle, ensuring a customizable user experience. The project is integrated with GitHub Live and a test environment, leveraging CI/CD pipelines for automated deployment and testing. Designed with responsiveness in mind, the application delivers a smooth experience across all devices. This project highlights our ability to build scalable, maintainable, and user-friendly applications using modern web technologies",
      technologies: ['Vite, TypeScript, CSS, CI/CD, GitHub Live/Test Environment'],
      role: 'Front-End Developer',
      year: 2024,
      image: task1,
      image1: task0,
      image2: task2,
      image3: task3,
      link: 'https://www.youtube.com/watch?v=dIwXC3LD0uE&ab_channel=DanielPincu',
      category: 'Web Design'
    },
     {
      id: 7,
      title: 'Fantasy Quest Esbjerg',
      description: "I led the development of a fully responsive, SEO-optimized website for Fantasy Quest Esbjerg, collaborating with a design team to create a new visual identity for the brand.",
      extra_description: "For my 2nd semester’s exam, I worked together with my team on a project for Fantasy Quest Esbjerg. While I have a passion for web development, this project gave me the opportunity to expand my knowledge of UX research and designing both physical and digital products. In the video below, you can see my creations. Although you won't see the full UX conclusions from my report, I can assure you that each design was crafted with the user's best interests in mind. Alongside my teammate, I was deeply involved in coding the website, ensuring that the development aligned with the vision of the project. As a web developer, this was a core aspect of my contribution to the team. Feel free to check out the website!",
      technologies: ['Vue3', 'JS', 'CSS'],
      role: 'Front-End Developer',
      year: 2024,
      image: un0,
      image1: un1,
      image2: un2,
      image3: un3,
      image4: un4,
      link: 'https://exam-6d170.web.app/',
      category: 'Web Design'
    },
    
  ]);

  return { portfolioItems }
}

export default getPortfolio
