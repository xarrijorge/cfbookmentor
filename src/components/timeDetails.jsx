import React, { useState } from 'react'
import { Button } from '@material-ui/core'

const TimeDetails = ({ slots, toggle, clicked, sendUserData }) => {
    const confirmation = {}
    return (
        <div className='timeBox'>
            {slots.map((slot, index) => {
                return (
                    <div>
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
                            <Button
                                style={{
                                    margin: '0 5px',
                                    width: '90px',
                                    fontSize: '14px',
                                }}
                                onClick={() => sendUserData()}
                                variant='contained'
                                color='primary'
                                size='large'>
                                confirm
                            </Button>
                        ) : null}
                    </div>
                )
            })}
        </div>
    )
}

export default TimeDetails
