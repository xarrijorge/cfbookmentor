import React from 'react'
import Button from './TimeButton'

const TimeDetails = ({
    slots,
    toggle,
    reason,
    clicked,
    sendUserData,
    handleChange,
    booked,
}) => {
    return (
        <div className='timeBox'>
            {slots.map((slot, index) => {
                console.log(booked)
                return (
                    <div className='buttonsBox'>
                        <Button
                            clicked={clicked}
                            slot={slot}
                            index={index}
                            toggle={toggle}
                            reason={reason}
                            handleChange={handleChange}
                            sendUserData={sendUserData}
                            key={index}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default TimeDetails
