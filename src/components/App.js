import React, {useEffect, useState} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Box, Container, Paper, Typography} from "@material-ui/core";
import Web3 from "web3";
import Events from "../abis/Events.json";
import Main from "./Main";
import EventsComponent from "./Events";
import Event from "./Event";
import Header from "./Header";
import {makeStyles} from "@material-ui/core/styles";

const addressContract = '0xBa8474a14e4b2545773ADecAbA7d2C4baeb3220d';

const AlertLabel = ({label}) => (
    <Box my={10} display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h6">{label}</Typography>
    </Box>
);

const useStyles = makeStyles({
    paper: {
        margin: '16px 0',
        padding: '16px',
    },
});

const App = () => {
    const [events, setEvents] = useState([{name: 'Event1', id: '0', tickets: ['1234567', '2345678', '32456778', '23456778']}, {name: 'Event2', id: '1', tickets: []}, {name: 'Event3', id: '2', tickets: ['2345678']}])
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);
    const classes = useStyles();

    const init = async () => {
        if (window.ethereum) {
            const updateAccounts = (accounts) => {
                if (accounts.length === 0) {
                    setAccount(null);
                } else if (accounts[0] !== account) {
                    setAccount(accounts[0]);
                }
            }
            const initWeb3 = new Web3(window.ethereum);
            setWeb3(initWeb3);
            const accounts = await initWeb3.eth.getAccounts();
            updateAccounts(accounts);
            window.ethereum.on('accountsChanged', updateAccounts);
        }
        else {
            setAccount(null);
        }
    }

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        if (!web3) return;
        const contract = new web3.eth.Contract(Events.abi, addressContract);
        const getEvents = async () => {
            const eventsCount = await contract.methods.getEventsData().call();
            console.log('=======getEvents', eventsCount);
        }
        const createEvents = async () => {
            const eventId = await contract.methods.addEvent('FirstEvent').send({from: account});
            console.log('========createEvents', eventId);
        }
        const isOwner = async () => {
            const res = await contract.methods.isOwner().call();
            console.log('========isOwner', res);
        }
        getEvents();
        isOwner();
        // createEvents();
    }, [web3])

    if (!web3) return <AlertLabel label="Please install MetaMask." />
    if (!account) return <AlertLabel label="Please connect to MetaMask." />

    return (
        <Container maxWidth="md">
            <BrowserRouter>
                <Header account={account} />
                <Paper className={classes.paper}>
                    <Switch>
                        <Route exact path="/">
                            <Main createEvent={(name) => console.log('createEvent - ', name)}/>
                        </Route>
                        <Route path="/events/:id">
                            <Event events={events} />
                        </Route>
                        <Route path="/events">
                            <EventsComponent events={events} />
                        </Route>
                    </Switch>
                </Paper>
            </BrowserRouter>
        </Container>
    );
}

export default App;
