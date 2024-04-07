import { useEffect, useState } from 'react'
import { useObtainMonthName } from '../hooks/useObtainMonthName'
import { centerDay } from '../services/centerDay'
import { LeftArrowIcon, RightArrowIcon, PlusIcon } from '../icons/Icons'
import { getAllEvents, getLocationById, getMunicipalityById } from '../lib/getsData'
import { TypeEvent } from './TypeEvents'
import { Link } from 'react-router-dom'

export const TimeLine = () => {
  const lang = 'es'
  const actualDate = new Date()
  const actualDay = actualDate.getDate()

  const [month, setMonth] = useState(actualDate.getMonth())
  const [year, setYear] = useState(actualDate.getFullYear())
  const [daysInMonth, setDaysInMonth] = useState(new Date(year, month + 1, 0).getDate())
  const [monthDays, setMonthDays] = useState([...Array(daysInMonth).keys()])
  const [selectedDay, setSelectedDay] = useState(actualDay)
  const [todayEvents, setTodayEvents] = useState([])

  const { monthText, changeMonthText } = useObtainMonthName({ lang, year, month })

  const [events, setEvents] = useState([])
  useEffect(() => {
    centerDay()
    const newEvents = getAllEvents()
    setEvents(newEvents)
  }, [])

  useEffect(() => {
    const newDaysInMonth = new Date(year, month + 1, 0).getDate()
    setDaysInMonth(newDaysInMonth)
    const newMonthDays = [...Array(newDaysInMonth).keys()]
    setMonthDays(newMonthDays)
  }, [month, year])

  const changeMonth = ({ change }) => {
    const newMonth = month + change
    setMonth(newMonth)
    const newYear = new Date(actualDate.getFullYear(), newMonth, 1).getFullYear()
    setYear(newYear)
    changeMonthText(newYear, newMonth)
  }

  useEffect(() => {
    const eventsToday = events.filter(e => new Date(e.fecha_inicio).toLocaleDateString() === new Date(`${month + 1}/${selectedDay - 1}/${year}`).toLocaleDateString())
    setTodayEvents(eventsToday)
  }, [selectedDay, month, year, events])

  return (
    <section className='max-w-4xl mx-auto mb-2'>
      <header className='flex text-xl items-center justify-between p-2 bg-surfacedark/50 rounded-t-md'>
        <button onClick={() => changeMonth({ change: -1 })} className='text-2xl hover:text-primary'>
          <LeftArrowIcon />
        </button>
        <h2 className='capitalize font-bold'>{monthText}</h2>
        <button onClick={() => changeMonth({ change: 1 })} className='text-2xl hover:text-primary'>
          <RightArrowIcon />
        </button>
      </header>
      <ol className='flex overflow-x-auto -m-px sanp-x'>
        {
        monthDays.map(day => {
          const eventsToday = events.filter(e => new Date(e.fecha_inicio).toLocaleDateString() === new Date(`${month + 1}/${day}/${year}`).toLocaleDateString())
          return (
            <li
              key={day}
              onClick={() => setSelectedDay(day + 1)}
              className={`
                ${day + 1 === actualDay && month === actualDate.getMonth() ? 'actual-day bg-primary' : ''}
                ${day + 1 === selectedDay ? 'border-primary' : ''}
                border size-14 min-w-14 snap-center my-1
                cursor-pointer hover:border-primary
              `}
            >
              <p className='text-center font-semibold'>{day + 1}</p>
              <div className='flex justify-evenly items-center mt-2'>
                {
                  eventsToday.slice(0, 2).map(e => {
                    return (
                      <TypeEvent key={e.id_evento} id={e.id_tipo_evento} />
                    )
                  })
                }
                {eventsToday.length > 2 ? <PlusIcon /> : ''}
              </div>
            </li>
          )
        })
      }
      </ol>
      <div>
        <p className='text-center text-lg font-semibold'>Eventos del {selectedDay} de <span className='capitalize'>{monthText}</span></p>
        <div className='flex flex-col gap-1 w-full max-w-3xl mx-auto '>
          {
            todayEvents.length > 0
              ? todayEvents.map(e => {
                const location = getLocationById({ idEvent: e.id_evento })
                const municipality = getMunicipalityById({ idEvent: e.id_evento })
                return (
                  <Link
                    to={`/evento/${e.id_evento}`}
                    key={e.id_evento}
                    className='flex flex-wrap items-center justify-center bg-surfacedark/50 rounded-md p-2 cursor-pointer hover:bg-surfacedark/75 border border-transparent hover:border-primary'
                  >
                    <div className='flex items-center gap-4'>
                      <TypeEvent id={e.id_tipo_evento} />
                      <p>{e.nombre_evento}</p>
                    </div>
                    <div className='w-full flex justify-center'>
                      <p>{location.nombre_localidad}, {municipality.nombre_municipio}</p>
                    </div>
                  </Link>
                )
              })
              : <p className='text-center'>No hay eventos esta fecha 😭</p>
          }
        </div>
      </div>
    </section>
  )
}
