import React from 'react'
import { Button, TextField } from '@material-ui/core'

let buttonStyles = {
    clicked: { backgroundColor: '#212121', color: '#fff', margin: '5px 0' },
    notClicked: {
        margin: '5px 0',
        borderColor: '#006BFF',
        color: '#006BFF',
    },
}

const TimeButton = ({
    clicked,
    index,
    toggle,
    slot,
    reason,
    sendUserData,
    handleChange,
    booked = [],
}) => {
    return (
        <>
            <Button
                style={
                    clicked === index
                        ? buttonStyles.clicked
                        : buttonStyles.notClicked
                }
                disabled={booked.includes(slot) ? true : false}
                className={`timeButton ${clicked === index ? 'selClass' : ''}`}
                key={index}
                variant={clicked === index ? 'contained' : 'outlined'}
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
        </>
    )
}

export default TimeButton
