import { ref } from 'vue'

import image1 from '@/assets/test.jpeg'

const getPortfolio = () => {
  const portfolioItems = ref([
    {
      id: 1,
      title: 'Portfolio Item 1',
      description: 'This is the first portfolio item',
      image: image1,
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
      category: 'web'
    },
    {
      id: 2,
      title: 'Portfolio Item 2',
      description: 'This is the second portfolio item',
      image: image1,
      link: 'https://www.google.com',
      category: 'photo'
    }  
  ])

  return { portfolioItems }
}

export default getPortfolio
