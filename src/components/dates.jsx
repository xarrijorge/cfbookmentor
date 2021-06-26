import { useState } from 'react'
import { useQuery } from 'react-query'
import dayjs from 'dayjs'
import Calendar from 'react-calendar'

import { WatchLater, Duo } from '@material-ui/icons'
import logo from './career-foundry.png'
import TimeDetails from './timeDetails'

import 'react-calendar/dist/Calendar.css'

function Dates() {
    const [clicked, setClicked] = useState(false)
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

    const toggle = (index) => {
        if (clicked === index) {
            //if clicked question is already active, then close it
            return setClicked(null)
        }
        // let name = stations[index].name;
        setClicked(index)
    }

    return (
        <div className='mainContainer'>
            <div className='infoBox'>
                <img src={logo} alt='' width='100px' height='100px' />
                <h4>Book a call with your mentor, </h4>
                <h3>{data.mentor.name}</h3>
                <h5>@ Career Foundry</h5>
                <div>
                    <WatchLater /> <span>1 hour</span>
                </div>
                <div>
                    <Duo />
                    <span>
                        Web conferencing details provided upon confirmation.
                    </span>
                </div>
            </div>
            <div className='calBox'>
                <h3>Select a date and time</h3>
                <Calendar
                    className='mainCal'
                    tileClassName='day'
                    onChange={onChange}
                    tileDisabled={({ date }) =>
                        !slots[dayjs(date).format('YYYY-MM-DD')]
                    }
                />
            </div>
            <div className='timeBox'>
                <h3>
                    {times.length === 0
                        ? ''
                        : dayjs(date).format('dddd, MMM DD')}
                </h3>
                <TimeDetails slots={times} toggle={toggle} clicked={clicked} />
            </div>
        </div>
    )
}

export default Dates
