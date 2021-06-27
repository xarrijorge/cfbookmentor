import { useState } from 'react'
import { useQuery } from 'react-query'
import firebase from 'firebase'
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
    const [index, setIndex] = useState(null)
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch(
            'https://private-37dacc-cfcalendar.apiary-mock.com/mentors/1/agenda'
        ).then((res) => res.json())
    )

    const database = firebase.database()

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
            // if clicked question is already active, then close it
            setClicked(null)
        }
        // let name = stations[index].name;
        setClicked(index)
        setIndex(index)
    }
    const writeData = () => {
        let timeListRef = database.ref(date.toString())
        let newtimeRef = timeListRef.push()
        newtimeRef.set(times[index])
        setClicked(null)
    }
    console.log(times)
    return (
        <div className='mainContainer'>
            <div className='infoBox'>
                <img src={logo} alt='' width='80px' height='80px' />
                <h4>Book a call with your mentor, </h4>
                <h3>{data.mentor.name}</h3>
                <h5>@ Career Foundry</h5>
                <div className='iconBox'>
                    <WatchLater /> <p>1 hour</p>
                </div>
                <div className='iconBox'>
                    <Duo />
                    <p>Web conferencing details provided upon confirmation.</p>
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
                    minDate={new Date()}
                    onClickDay={() => setClicked(null)}
                />
            </div>
            <div className='timeBox'>
                <h3>
                    {times.length === 0
                        ? ''
                        : dayjs(date).format('dddd, MMM DD')}
                </h3>
                <TimeDetails
                    slots={times}
                    toggle={toggle}
                    clicked={clicked}
                    sendUserData={writeData}
                />
            </div>
        </div>
    )
}

export default Dates
