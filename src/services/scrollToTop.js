export const scrollToTop = () => {
  const btn = document.getElementById('to-top')
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}
