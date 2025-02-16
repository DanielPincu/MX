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
      link: 'https://www.google.com',
      category: 'E-commerce'
    },
    {
      id: 4,
      title: 'Interactive Portfolio Website',
      description: 'A fully interactive portfolio website designed to showcase my projects, skills, and experience through an engaging and visually dynamic interface.',
      extra_description: "The goal of this project was to create a portfolio website that reflects my expertise in UI/UX design and web development. To achieve this, I integrated animations using GSAP, providing smooth transitions and interactive elements that enhance user engagement. The website features a detailed project showcase, a personalized about section, and an integrated contact form that allows potential clients or employers to reach out directly. One of the standout features is the use of Three.js for interactive 3D elements, giving the site a unique and modern feel. The challenge was balancing aesthetics with performance optimization, ensuring that animations and visual elements do not impact load times or responsiveness. By leveraging Vue.js' reactivity and component-based architecture, I was able to create a fast, highly interactive, and aesthetically pleasing digital portfolio.",
      technologies: ['Vue.js', 'GSAP', 'Three.js'],
      role: 'UI/UX Designer & Developer',
      year: 2024,
      image: trap0,
      link: 'https://www.google.com',
      category: 'Web Design'
    }
  ]);

  return { portfolioItems }
}

export default getPortfolio
