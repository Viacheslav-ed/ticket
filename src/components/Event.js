import React from 'react';
import {useParams} from 'react-router-dom';
import {Box, Typography} from "@material-ui/core";

const Event = ({events}) => {
    const { id } = useParams();
    const event = events.find(item => item.id === id);

    return (
        <Box>
            {event
                ? <Box>
                    <Typography>Name: {event.name}</Typography>
                    <Typography>Id: {event.id}</Typography>
                    <Typography>Tickets: {event.tickets.length}</Typography>
                </Box>
                : <Typography>Not event with id - {id}</Typography>
            }
        </Box>
    )
};

export default Event;
