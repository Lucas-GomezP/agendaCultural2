export const centerDay = async () => {
  const element = await document.querySelector('.actual-day')
  await element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  })
}
