/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { getEventByMunicipalitys, getEventByLocations, getEventsByType, getEventByTags } from '../lib/getsData'
import { CardEvent } from './CordEvent'

export const SelectorDivider = () => {
  const filters = [
    { name: 'Municipios', action: getEventByMunicipalitys, state: 'municipality' },
    { name: 'Localidades', action: getEventByLocations, state: 'location' },
    { name: 'Tipos de eventos', action: getEventsByType, state: 'type' },
    { name: 'Etiquetas', action: getEventByTags, state: 'tag' }
  ]

  const [actualFilter, setActualFilter] = useState(0)
  const [eventsFiltered, setEventsFiltered] = useState([])
  const [stateFiltered, setStateFiltered] = useState('')

  useEffect(() => {
    const actualAction = filters[actualFilter].action
    const newEvents = actualAction()
    setEventsFiltered(newEvents)
    const newStateFiltereed = filters[actualFilter].state
    setStateFiltered(newStateFiltereed)
  }, [actualFilter])

  return (
    <section className='max-w-4xl mx-auto text-lg font-semibold'>
      <div className='flex justify-between text-textlight bg-primary p-2 rounded-md items-center'>
        <p className='text-textlight font-bold text-3xl'>Mostrar por</p>
        <ol className='hidden lg:flex gap-2'>
          {
            filters.map((f, i) => {
              return (
                <li
                  key={i}
                  onClick={() => setActualFilter(i)}
                  className={`
                    ${i === actualFilter ? 'bg-background text-text hover:bg-background' : 'text-text'}
                    px-1 hover:bg-background/50 cursor-pointer
                  `}
                >
                  {f.name}
                </li>
              )
            })
          }
        </ol>
        <ol className='lg:hidden flex flex-col'>
          {
            filters.map((f, i) => {
              return (
                <li
                  key={i}
                  onClick={() => setActualFilter(i)}
                  className={`
                    ${i === actualFilter ? 'bg-background text-text hover:bg-background' : 'text-text'}
                    px-1 hover:bg-background/50 cursor-pointer
                  `}
                >
                  {f.name}
                </li>
              )
            })
          }
        </ol>
      </div>
      <div className='mt-2'>
        {
          eventsFiltered.map((ef, i) => {
            return (
              <div key={i}>
                <h1 className='capitalize bg-surfacedark/50 p-2 text-center rounded-md my-2'>{ef[stateFiltered]}</h1>
                <div className='flex justify-evenly overflow-x-auto gap-2 min-h-96'>
                  {
                    ef.events.map((e, ii) => {
                      return (
                        <CardEvent key={ii} event={e} />
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}
