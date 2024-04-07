import { EntertainmentIcon, SeminarIcon, FairIcon, TalkIcon, SportIcon, ArtIcon } from '../icons/TypeEventsIcons'

export const TypeEvent = ({ id, className }) => {
  switch (id) {
    case 1:
      return <EntertainmentIcon className={`text-green-500 ${className}`} />
    case 2:
      return <SeminarIcon className={`text-red-500 ${className}`} />
    case 3:
      return <FairIcon className={`text-blue-500 ${className}`} />
    case 4:
      return <TalkIcon className={`text-pink-500 ${className}`} />
    case 5:
      return <SportIcon className={`text-yellow-500 ${className}`} />
    case 6:
      return <ArtIcon className={`text-purple-500 ${className}`} />
  }
}
