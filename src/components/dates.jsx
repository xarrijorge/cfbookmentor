import { useState } from 'react'
import { useQuery } from 'react-query'
import { supabase } from '../supabaseClient'
import dayjs from 'dayjs'
import Calendar from 'react-calendar'

import { WatchLater, Duo } from '@material-ui/icons'
import logo from './career-foundry.png'
import TimeDetails from './timeDetails'

import 'react-calendar/dist/Calendar.css'

function Dates({ takenSlots }) {
    const [clicked, setClicked] = useState(false)
    const [date, setDate] = useState(new Date())
    const [times, setTimes] = useState([])
    const [index, setIndex] = useState(null)
    const [reason, setReason] = useState('')
    const [booked, setBooked] = useState([])
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
        // console.log(takenSlots)
        disableBooked()
        let lookupDate = dayjs(date).format('YYYY-MM-DD')
        if (slots[lookupDate]) setTimes(slots[lookupDate])
    }

    const disableBooked = () => {
        takenSlots.forEach((slot) => {
            if (slot.date === date) {
                setBooked([slot.slots])
            }
        })
        console.log(booked)
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

    const writeData = async () => {
        // eslint-disable-next-line no-unused-vars
        const { data, error } = await supabase
            .from('takenslots')
            .insert([{ date: date, slots: [times[index]] }], { upsert: true })
    }

    const handleChange = (event) => {
        setReason(event.target.value)
    }
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
                    onActiveStartDateChange={() => {
                        setClicked(null)
                        setTimes([])
                    }}
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
                    reason={reason}
                    handleChange={handleChange}
                    booked={booked}
                />
            </div>
        </div>
    )
}

export default Dates
