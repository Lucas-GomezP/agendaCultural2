import { useState, useEffect } from 'react'

export const useObtainWeekDaysName = ({ lang, long }) => {
  // Creamos el formato de nuestra fecha para obtener los textos de los dias de la semana
  const [formatWeekDays, setFormatWeekDays] = useState(
    Intl.DateTimeFormat(lang, { weekday: 'short' })
  )

  // Obtenemos los nombres de los dias de la semana
  const [weekDayText, setWeekDayText] = useState([])

  useEffect(() => {
    // Creamos el array que almacenara los nombres
    const weekdays = [...Array(7).keys()]
    const weekdaysName = weekdays.map((i) => {
      const weekname = formatWeekDays.format(new Date(2023, 7, i))
      return weekname
    })
    setWeekDayText(weekdaysName)
  }, [formatWeekDays])

  useEffect(() => {
    const newFormatWeekDays = Intl.DateTimeFormat(lang, { weekday: long })
    setFormatWeekDays(newFormatWeekDays)
  }, [lang])

  return { weekDayText }
}
