import { ref } from 'vue'

import image1 from '@/assets/test.jpeg'

const getPortfolio = () => {
  const portfolioItems = ref([
    {
      id: 1,
      title: 'Trapholt Museum',
      description: "I'm proud to present a project where I contributed and executed a comprehensive redesign for Trapholt Museum, renowned cultural institution in Kolding",
      extra_description: "The project was a collaboration with the design agency Kontrapunkt, where I was responsible for the design and development of the website. The website was built with a focus on user experience and accessibility, and the design was based on the visual identity of the museum. The project was a collaboration with the design agency Kontrapunkt, where I was responsible for the design and development of the website. The website was built with a focus on user experience and accessibility The project was a collaboration with the design agency Kontrapunkt, where I was responsible for the design and development of the website. The website was built with a focus on user experience and accessibility, and the design was based on the visual identity of the museum. The project was a collaboration with the design agency Kontrapunkt The project was a collaboration with the design agency Kontrapunkt, where I was responsible for the design and development of the website. The website was built with a focus on user experience and accessibility, and the design was based on the visual identity of the museum. The project was a collaboration with the design agency Kontrapunkt, where I was responsible for the design and development of the website. The website was built with a focus on user experience and accessibility The project was a collaboration with the design agency Kontrapunkt, where I was responsible for the design and development of the website. The website was built with a focus on user experience and accessibility, and the design was based on the visual identity of the museum. The project was a collaboration with the design agency Kontrapunkt",
      image: image1,
      link: 'https://www.google.com',
      category: 'web'
  
    },
    {
      id: 2,
      title: 'Portfolio Item 2',
      description: 'This is the second portfolio item',
      image: image1,
      link: 'https://www.google.com',
      category: 'photo'
    },
    {
      id: 3,
      title: 'Portfolio Item 3',
      description: 'This is the third portfolio item',
      image: image1,
      link: 'https://www.google.com',
      category: 'web'
    },
    {
      id: 4,
      title: 'Portfolio Item 4',
      description: 'This is the second portfolio item',
      image: image1,
      link: 'https://www.google.com',
      category: 'photo'
    }  
  ])

  return { portfolioItems }
}

export default getPortfolio
