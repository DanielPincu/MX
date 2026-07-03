import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollType(targetText, options = {}) {
  const { speed = 40, rootMargin = '0px 0px -80px 0px', once = true } = options

  const displayedText = ref('')
  const isTyping = ref(false)
  const hasFired = ref(false)

  let observer = null
  let typeTimer = null
  let elRef = null
  let isMounted = false

  const typeChar = (index) => {
    if (index <= targetText.length) {
      displayedText.value = targetText.substring(0, index)
      if (index < targetText.length) {
        const delay = speed * (0.5 + Math.random())
        typeTimer = setTimeout(() => typeChar(index + 1), delay)
      } else {
        isTyping.value = false
      }
    }
  }

  const start = () => {
    if (hasFired.value) return
    hasFired.value = true
    isTyping.value = true
    typeTimer = setTimeout(() => typeChar(0), 1000)
  }

  const observe = (el) => {
    if (!el || !observer) return
    observer.observe(el)
  }

  const setRef = (el) => {
    elRef = el
    if (isMounted && el) {
      observe(el)
    }
  }

  onMounted(() => {
    isMounted = true

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start()
            if (once && observer) {
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { rootMargin, threshold: 0.1 }
    )

    // If elRef was already set by template ref callback (which fires before onMounted), observe it now
    if (elRef) {
      observe(elRef)
    }
  })

  onUnmounted(() => {
    isMounted = false
    if (observer) {
      observer.disconnect()
      observer = null
    }
    if (typeTimer) {
      clearTimeout(typeTimer)
      typeTimer = null
    }
  })

  return { displayedText, isTyping, setRef, hasFired }
}
