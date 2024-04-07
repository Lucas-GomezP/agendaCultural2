import { Header } from './components/Header'
import { SliderEvents } from './components/Slider'
import { TimeLine } from './components/TimeLine'
import { SelectorDivider } from './components/SelectorDivider'
import { LeftArrowIcon } from './icons/Icons'
import { useEffect } from 'react'
import { scrollToTop } from './services/scrollToTop'

function App () {
  useEffect(() => {
    scrollToTop()
  }, [])
  return (
    <div className='bg-background min-h-screen overflow-hidden'>
      <Header />
      <main className='p-2'>
        <SliderEvents />
        <TimeLine />
        <SelectorDivider />
      </main>
      <button id='to-top' className='fixed bottom-3 right-3 rotate-90 bg-primary p-2 rounded-full text-xl text-textlight'><LeftArrowIcon /></button>
    </div>
  )
}

export default App
