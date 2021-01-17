import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Typography} from "@material-ui/core";
import EventAbi from "../abis/Event.json";

const Event = ({events, web3}) => {
    const { id } = useParams();
    const [bal, setBal] = useState(null);
    const event = events.find(item => item.id === id);
    const contract = new web3.eth.Contract(EventAbi.abi, id);

    contract.methods.balanceOf("0x00beE40E883485A1CD396b34e9f1a0E2AAB0592A").call().then(res => setBal(res));

    return (
        <Box>
            {event
                ? <Box>
                    <Typography>Name: {event.name}</Typography>
                    <Typography>Id: {id}</Typography>
                    <Typography>Balance: {bal ? bal : 'loading'}</Typography>
                </Box>
                : <Typography>Not event with id - {id}</Typography>
            }
        </Box>
    )
};

export default Event;
