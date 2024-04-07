/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { getNextEvents } from '../lib/getsData'
import { LeftArrowIcon, RightArrowIcon } from '../icons/Icons'

export const SliderEvents = () => {
  const [events, setEvents] = useState([])
  useEffect(() => {
    const newEvents = getNextEvents()
    setEvents(newEvents)
  }, [])

  const [actualSlide, setActualSlide] = useState(0)

  const handleChangeSlide = (n) => {
    let newActualSlide = actualSlide + n
    if (newActualSlide > events.length - 1) {
      newActualSlide = 0
    }
    if (newActualSlide < 0) {
      newActualSlide = events.length - 1
    }
    setActualSlide(newActualSlide)
  }

  const handleChangeSlideByBtn = (n) => {
    const newActualSlide = n
    setActualSlide(newActualSlide)
  }

  const autoChangeSlide = () => {
    handleChangeSlide(1)
  }

  useEffect(() => {
    const interval = setInterval(autoChangeSlide, 5000)
    return () => clearInterval(interval)
  }, [actualSlide])

  return (
    <>
      <div className='mt-1'>
        <h2 className='text-2xl font-bold text-center'>Proximos <span className='text-textlight bg-primary pb-1 px-1'>eventos!</span></h2>
      </div>
      <section className='max-w-4xl mx-auto relative flex justify-between my-2'>
        <button
          className='w-fit absolute top-1/2 left-2 z-30 rounded-2xl p-1 hover:text-primary'
          onClick={() => handleChangeSlide(-1)}
        >
          <LeftArrowIcon className='text-3xl font-bold mr-1' />
        </button>
        <div className='relative w-full max-h-96'>
          {
            events.map((e, i) => <SlideEvent href={e.imagen} name={e.nombre_evento} index={i} actualSlide={actualSlide} key={e.id_evento} />)
          }
        </div>
        <div className='absolute bottom-2 w-full z-30 flex flex-row justify-center gap-2'>
          {
            events.map((e, i) => {
              return (
                <button
                  key={i}
                  className={`border size-4 rounded-full ${i === actualSlide ? 'bg-primary' : 'bg-primary/30'}`}
                  onClick={() => handleChangeSlideByBtn(i)}
                />
              )
            })
          }
        </div>
        <button
          className='w-fit absolute top-1/2 right-2 z-30 rounded-2xl p-1 hover:text-primary'
          onClick={() => handleChangeSlide(1)}
        >
          <RightArrowIcon className='text-3xl font-bold ml-1' />
        </button>
      </section>
    </>
  )
}

const SlideEvent = ({ href, name, index, actualSlide }) => {
  return (
    <div
      className={`relative h-full justify-center ${index === actualSlide ? 'flex' : 'hidden'}`}
    >
      <img
        src={href}
        alt={`${name} de fondo`}
        className='rounded-md absolute top-0 blur-md object-fill w-full h-full z-10 p-4'
      />
      <img
        src={href}
        alt={name}
        className='rounded-md relative object-contain h-96 z-20 items-center'
      />
      <p className='absolute bottom-[30px] z-40 right-0 bg-primary p-1 font-semibold rounded-tl-md text-textlight'>{name}</p>
    </div>
  )
}
