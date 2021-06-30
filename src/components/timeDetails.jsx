import React from 'react'
import { Button, TextField } from '@material-ui/core'

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
                            style={
                                clicked === index
                                    ? {
                                          backgroundColor: '#212121',
                                          color: '#fff',
                                          margin: '5px 0',
                                      }
                                    : {
                                          margin: '5px 0',
                                          borderColor: '#006BFF',
                                          color: '#006BFF',
                                      }
                            }
                            // disabled={booked.includes(slot) ? true : false}
                            className={`timeButton ${
                                clicked === index ? 'selClass' : ''
                            }`}
                            key={index}
                            variant={
                                clicked === index ? 'contained' : 'outlined'
                            }
                            size='large'
                            onClick={() => toggle(index)}>
                            {`${slot.substring(0, 2)}:00`}
                        </Button>

                        {clicked === index ? (
                            <>
                                <TextField
                                    id='call-reason'
                                    label='reason for call'
                                    variant='outlined'
                                    value={reason}
                                    onChange={handleChange}
                                />
                                <Button
                                    style={{
                                        margin: '0 5px',
                                        fontSize: '14px',
                                    }}
                                    onClick={() => sendUserData()}
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    disabled={reason ? false : true}>
                                    confirm
                                </Button>
                            </>
                        ) : null}
                    </div>
                )
            })}
        </div>
    )
}

export default TimeDetails
