import { useState } from 'react'
import { useQuery } from 'react-query'
import dayjs from 'dayjs'
import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css'

const TimeDetails = ({ slots }) => (
    <div>
        {slots.map((slot) => (
            <button>{slot}</button>
        ))}
    </div>
)

function Dates() {
    const [date, setDate] = useState(new Date())
    const [times, setTimes] = useState([])
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch(
            'https://private-37dacc-cfcalendar.apiary-mock.com/mentors/1/agenda'
        ).then((res) => res.json())
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message
    let dates = []
    let slots = {}
    const onChange = (date) => {
        setDate(date)
        let lookupDate = dayjs(date).format('YYYY-MM-DD')
        if (slots[lookupDate]) setTimes(slots[lookupDate])
    }

    data.calendar.forEach((el) => dates.push(el.date_time.split(' ', 2)))

    dates.forEach((el) => {
        if (!slots.hasOwnProperty(el[0])) {
            slots[el[0]] = []
        }
        slots[el[0]].push(el[1])
    })
    console.log(times)

    return (
        <div>
            <h1>Book a call with your mentor, {data.mentor.name}</h1>
            <Calendar
                className='mainCal'
                tileClassName='day'
                value={date}
                onChange={onChange}
                tileDisabled={({ date }) =>
                    !slots[dayjs(date).format('YYYY-MM-DD')]
                }
            />
            <TimeDetails slots={times} />
        </div>
    )
}

export default Dates
