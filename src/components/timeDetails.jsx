import React from 'react'
import { Button } from '@material-ui/core'

const TimeDetails = ({ slots, toggle, clicked }) => {
    return (
        <div className='timeBox'>
            {slots.map((slot, index) => {
                return (
                    <>
                        <Button
                            style={{ margin: '5px 0' }}
                            className='timeButton'
                            key={index}
                            variant='outlined'
                            color='primary'
                            size='large'
                            // onClick={toggle()}
                        >
                            {`${slot.substring(0, 2)}:00`}
                        </Button>
                        {/* {clicked && <div>confirm</div>} */}
                    </>
                )
            })}
        </div>
    )
}

export default TimeDetails
