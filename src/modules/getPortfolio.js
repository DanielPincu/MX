import { ref } from 'vue'
import trap0 from '@/assets/trap0.png'
import trap1 from '@/assets/trap1.png'
import trap2 from '@/assets/trap2.png'
import trap3 from '@/assets/trap3.png'

import chatognito from '@/assets/chatognito.png'
import tv from '@/assets/tvweb.webp'
import xp from '@/assets/xp.webp'

const getPortfolio = () => {
  const portfolioItems = ref([
    {
      id: 1,
      title: 'Trapholt Museum',
      description: "A comprehensive digital transformation for Trapholt Museum, a renowned cultural institution in Kolding, Denmark. The redesign aimed to enhance user engagement, improve accessibility, and showcase the museum’s diverse art collection through an interactive and intuitive web experience.",
      extra_description: "The project was a collaboration with the prestigious design agency Kontrapunkt. I was responsible for both the design and development of the website, ensuring a seamless and immersive experience for visitors. The website was built with a strong emphasis on user experience, employing a clean, modern design that aligns with the museum’s branding. One of the key challenges was implementing a dynamic content management system that allowed museum staff to update exhibitions and upcoming events effortlessly. Additionally, I optimized performance to ensure fast loading times, integrated advanced accessibility features such as screen-reader compatibility, and made the entire platform mobile-responsive. The project successfully elevated the museum’s online presence, resulting in increased visitor engagement and improved ticket sales.",
      technologies: ['Vue.js', 'Tailwind CSS', 'Nuxt.js', 'Vercel'],
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
      description: 'A state-of-the-art privacy-focused chat application designed to enhance user security and ensure complete anonymity. Chatognito leverages end-to-end encryption to provide a secure messaging experience without compromising on speed or usability.',
      extra_description: "Chatognito is designed with a strong focus on security and user privacy. The app provides robust encryption for messages, making them unreadable to anyone other than the intended recipient. Key features include self-destructing messages, secure group chats, and anonymous login mechanisms that ensure no personally identifiable information is stored. The backend leverages Firebase for real-time database synchronization while utilizing Node.js to handle authentication and security protocols. Additionally, the app was developed with a minimalistic yet engaging UI to ensure a seamless user experience. This project was particularly challenging due to the need for secure communication protocols while maintaining performance and responsiveness. By integrating Firebase Firestore, real-time updates are instant and smooth, making Chatognito an ideal choice for privacy-conscious users.",
      technologies: ['Vue.js', 'Firebase', 'Node.js'],
      role: 'Full-Stack Developer',
      year: 2024,
      image: chatognito,
      image1: xp,
      image2: tv,
      image3: trap3,
      link: 'https://projects.danielpincu.com/wordpress',
      category: 'Web Application'
    },
    {
      id: 3,
      title: 'E-commerce Platform',
      description: 'A highly scalable and modern e-commerce platform designed to provide users with a seamless and intuitive online shopping experience. This project integrates a powerful product filtering system, dynamic product pages, and a streamlined checkout process for maximum efficiency.',
      extra_description: "This e-commerce platform was designed to handle high volumes of traffic while providing an elegant and fluid shopping experience. A key challenge in this project was ensuring optimal performance and usability across all devices. To achieve this, I implemented a client-side state management system using Pinia, which improved responsiveness and reduced unnecessary API calls. The platform also features an advanced product filtering mechanism, enabling users to easily find their desired products using categories, price ranges, and keyword searches. Integrated with Stripe API, the checkout process is secure, fast, and hassle-free. Furthermore, the UI/UX was carefully crafted to ensure user engagement, with a focus on smooth transitions, product image zooming, and a visually appealing interface. The platform successfully increased conversion rates for businesses, making it a valuable tool for online retailers.",
      technologies: ['Vue.js', 'Pinia', 'Stripe API'],
      role: 'Frontend Developer',
      year: 2023,
      image: trap0,
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
