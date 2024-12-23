import { ref } from 'vue'
import image1 from '@/assets/test.jpeg'

const getPortfolio = () => {
  const portfolioItems = ref([
    {
      id: 1,
      title: 'Trapholt Museum',
      description: "I'm proud to present a project where I contributed and executed a comprehensive redesign for Trapholt Museum, renowned cultural institution in Kolding",
      extra_description: "The project was a collaboration with the design agency Kontrapunkt, where I was responsible for the design and development of the website. The website was built with a focus on user experience and accessibility, and the design was based on the visual identity of the museum. The project was a collaboration with the design agency Kontrapunkt, where I was responsible for the design and development of the website. ",
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
      description: 'This is the fourth portfolio item',
      image: image1,
      link: 'https://www.google.com',
      category: 'photo'
    },
    {
      id: 5,
      title: 'Portfolio Item 5',
      description: 'This is the fifth portfolio item',
      image: image1,
      link: 'https://www.google.com',
      category: 'web'
    },
    {
      id: 6,
      title: 'Portfolio Item 6',
      description: 'This is the sixth portfolio item',
      image: image1,
      link: 'https://www.google.com',
      category: 'photo'
    },
    {
      id: 7,
      title: 'Portfolio Item 7',
      description: 'This is the seventh portfolio item',
      image: image1,
      link: 'https://www.google.com',
      category: 'web'
    },
    {
      id: 8,
      title: 'Portfolio Item 8',
      description: 'This is the eighth portfolio item',
      image: image1,
      link: 'https://www.google.com',
      category: 'photo'
    },
    {
      id: 9,
      title: 'Portfolio Item 9',
      description: 'This is the ninth portfolio item',
      image: image1,
      link: 'https://www.google.com',
      category: 'web'
    },
    {
      id: 10,
      title: 'Portfolio Item 10',
      description: 'This is the tenth portfolio item',
      image: image1,
      link: 'https://www.google.com',
      category: 'photo'
    },
  ]);

  return { portfolioItems }
}

export default getPortfolio
