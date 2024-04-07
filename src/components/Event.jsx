import { useParams } from 'react-router-dom'
import { getEventById, getLocationById, getMunicipalityById, getTageById, getTypeById } from '../lib/getsData'
import { Header } from './Header'
import { TypeEvent } from './TypeEvents'
import { UbicationIcon, DescriptionIcon, TypeIcon, TagsIcon } from '../icons/Icons'

export const Event = () => {
  const { eventId } = useParams()
  const event = getEventById({ id: eventId })
  const location = getLocationById({ idEvent: event.id_evento })
  const municipality = getMunicipalityById({ idEvent: event.id_evento })
  const type = getTypeById({ idEvent: event.id_evento })
  const tags = getTageById({ idEvent: event.id_evento })
  return (
    <div className='bg-background min-h-screen overflow-hidden'>
      <Header />
      <main className='p-2'>
        <section className='max-w-4xl mx-auto'>
          <picture
            className='relative h-full justify-center flex'
          >
            <img
              src={event.imagen}
              alt={`${event.nombre_evento} de fondo`}
              className='rounded-md absolute top-0 blur-md object-fill w-full h-full z-10 p-4'
            />
            <img
              src={event.imagen}
              alt={event.nombre_evento}
              className='rounded-md relative object-contain h-96 z-20 items-center'
            />
          </picture>
          <div className='flex justify-center items-center mt-4 gap-2'>
            <TypeEvent id={event.id_tipo_evento} className='text-3xl' />
            <h2 className='font-bold text-3xl px-2 text-textlight text-center bg-primary'>{event.nombre_evento}</h2>
            <TypeEvent id={event.id_tipo_evento} className='text-3xl' />
          </div>
          <div className='text-center text-xl font-semibold'>
            <p>{`${new Date(event.fecha_inicio).getDate() + 1}/${new Date(event.fecha_inicio).getMonth() + 1}/${new Date(event.fecha_inicio).getFullYear()}`}</p>
          </div>
          <div className='flex flex-col items-center mt-2'>
            <h3 className='flex items-center text-xl text-primary font-semibold'><UbicationIcon /> <span className='ml-2'>Ubicación</span></h3>
            <div className='flex gap-2 text-lg'>
              <p>{location.nombre_localidad}</p>
              ,
              <p>{municipality.nombre_municipio}</p>
            </div>
          </div>
          <div className='flex flex-col items-center mt-2'>
            <h3 className='flex items-center text-xl text-primary font-semibold'><DescriptionIcon /> <span className='ml-2'>Descripción del evento</span></h3>
            <p>{event.descripcion}</p>
          </div>
          <div className='flex flex-col items-center mt-2'>
            <h3 className='flex items-center text-xl text-primary font-semibold'><TypeIcon /> <span className='ml-2'>Tipo de evento</span></h3>
            <p>{type.nombre_tipo_de_evento}</p>
          </div>
          <div className='flex flex-col items-center mt-2'>
            <h3 className='flex items-center text-xl text-primary font-semibold'><TagsIcon /> <span className='ml-2'>Etiquetas del evento</span></h3>
            <div className='flex gap-2 text-lg'>
              {
                tags.map((t, i) => {
                  return (
                    <p key={i}>{t}</p>
                  )
                })
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
