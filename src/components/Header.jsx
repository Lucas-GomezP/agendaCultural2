import { useEffect, useState } from 'react'
import { SearchIcon } from '../icons/Icons'
import { getAllEvents, getLocationById, getMunicipalityById } from '../lib/getsData'
import { TypeEvent } from './TypeEvents'
import { Link } from 'react-router-dom'

export const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const [searchValue, setSearchValue] = useState('')
  const handleSearch = ({ val }) => {
    const newValue = val
    setSearchValue(newValue)
  }

  const [events, setEvents] = useState([])
  useEffect(() => {
    const allEvents = getAllEvents()
    let newEvents
    if (searchValue.length > 0) {
      newEvents = allEvents.filter(e => {
        const name = e.nombre_evento
        const location = getLocationById({ idEvent: e.id_evento }).nombre_localidad
        const municipality = getMunicipalityById({ idEvent: e.id_evento }).nombre_municipio
        return name.toLowerCase().includes(searchValue) || location.toLowerCase().includes(searchValue) || municipality.toLowerCase().includes(searchValue)
      })
    } else {
      newEvents = []
    }
    setEvents(newEvents)
  }, [searchValue])

  return (
    <header className='h-14 w-full bg-primary text-textlight font-bold text-3xl p-2 relative'>
      <div className='group max-w-4xl flex items-center justify-between mx-auto'>
        <Link to='/'>
          <h1>Agenda Turistica</h1>
        </Link>
        <div className='bg-background flex items-center px-2 rounded-full cursor-pointer z-50'>
          <input
            type='text'
            onChange={(e) => handleSearch({ val: e.target.value })}
            className='hidden lg:block peer bg-background text-base text-center text-text outline-none placeholder:text-text/50'
            placeholder='¿A donde vamos?'
          />
          <ModalSearch events={events} />
          <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <SearchIcon className='text-primary' />
          </button>
          <div
            className={`${showMobileMenu ? 'absolute' : 'hidden'} top-16 left-2 right-2 p-2 bg-primary lg:hidden`}
          >
            <div className='bg-background flex items-center mx-auto px-2 rounded-full cursor-pointer w-fit'>
              <input
                type='text'
                onChange={(e) => handleSearch({ val: e.target.value })}
                className='block peer bg-background text-base text-center text-text outline-none placeholder:text-text/50'
                placeholder='¿A donde vamos?'
              />
              <ModalSearch events={events} />
              <SearchIcon className='text-primary' />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const ModalSearch = ({ events }) => {
  return (
    <div
      className='absolute group-focus-within:top-32 lg:group-focus-within:top-16 -top-[-10000px] w-[400px] bg-primary z-50'
      style={{ left: 'calc(50% - 200px)' }}
    >
      {
        events.map((e, i) => {
          const location = getLocationById({ idEvent: e.id_evento })
          const municipality = getMunicipalityById({ idEvent: e.id_evento })
          return (
            <Link
              to={`/evento/${e.id_evento}`}
              key={i}
              className='text-textlight z-50 text-base flex items-center gap-2 justify-between px-1'
            >
              <TypeEvent id={e.id_tipo_evento} />
              <div className='flex flex-col justify-center text-center'>
                <p>{e.nombre_evento}</p>
                <p>{location.nombre_localidad}</p>
                <p>{municipality.nombre_municipio}</p>
                <hr />
              </div>
              <p>{`${new Date(e.fecha_inicio).getDate() + 1}/${new Date(e.fecha_inicio).getMonth() + 1}`}</p>
            </Link>
          )
        })
      }
    </div>
  )
}
