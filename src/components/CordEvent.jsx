import { TypeEvent } from './TypeEvents'
import { getLocationById, getMunicipalityById, getTageById } from '../lib/getsData'
import { Link } from 'react-router-dom'

export const CardEvent = ({ event }) => {
  const location = getLocationById({ idEvent: event.id_localidad })
  const municipality = getMunicipalityById({ idEvent: event.id_municipio })
  const tags = getTageById({ idEvent: event.id_evento })
  return (
    <Link
      to={`/evento/${event.id_evento}`}
      className='group min-h-[340px] p-2 bg-surfacedark/50 rounded-md mb-1 cursor-pointer relative'
    >
      <div className='group-hover:visible invisible absolute top-0 bg-primary z-30 text-textlight left-0 right-0 rounded-t-md text-base flex items-center gap-2 justify-between px-1'>
        <TypeEvent id={event.id_tipo_evento} />
        <div className='flex flex-col'>
          <p>{location.nombre_localidad}</p>
          <hr />
          <p>{municipality.nombre_municipio}</p>
        </div>
        <p>{`${new Date(event.fecha_inicio).getDate() + 1}/${new Date(event.fecha_inicio).getMonth() + 1}`}</p>
      </div>
      <picture className='relative size-64 justify-center flex items-center'>
        <img
          src={event.imagen}
          alt={`Imagen del evento ${event.nombre_evento}`}
          className='rounded-md absolute top-0 blur-md object-fill w-full h-full z-10 p-2'
        />
        <img
          src={event.imagen}
          alt={`Imagen del evento ${event.nombre_evento}`}
          className='relative object-contain max-h-64 z-20'
        />
      </picture>
      <div className='z-30 text-textlight bg-primary absolute top-64 group-hover:top-36 left-0 right-0 bottom-0 rounded-b-md'>
        <h3 className='px-1 capitalize'>{event.nombre_evento}</h3>
        <div className='invisible group-hover:visible text-base font-normal flex flex-wrap gap-2'>
          {
            tags.map((t, i) => {
              return (
                <p key={i}>#{t}</p>
              )
            })
          }
        </div>
      </div>
    </Link>
  )
}
