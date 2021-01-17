import React, {useEffect, useState} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Box, Container, Paper, Typography} from "@material-ui/core";
import Web3 from "web3";
import EventFactory from "../abis/EventFactory.json";
import Main from "./Main";
import EventsComponent from "./Events";
import Event from "./Event";
import Header from "./Header";
import {makeStyles} from "@material-ui/core/styles";

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
    const [events, setEvents] = useState([])
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);


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
            const accounts = await initWeb3.eth.getAccounts();
            setWeb3(initWeb3);
            setContract(new initWeb3.eth.Contract(EventFactory.abi, EventFactory.networks["5777"].address));
            updateAccounts(accounts);
            window.ethereum.on('accountsChanged', updateAccounts);
        }
        else {
            setAccount(null);
        }
    }

    const getEvents = async () => await contract.methods.getEvents().call();
    const getEventData = async (event) => {
        const eventData = await contract.methods.getEventData(event).call();
        return {...eventData, id: event};
    }
    const createEvent = async (name, date) => {
        contract.methods.createEvent(name, date).send({from: account});
    }

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        if (!account) return;
        getEvents().then((events) => Promise.all(events.map(event => getEventData(event))).then(res => setEvents(res)));
    }, [account])

    if (!web3) return <AlertLabel label="Please install MetaMask." />
    if (!account) return <AlertLabel label="Please connect to MetaMask." />

    return (
        <Container maxWidth="md">
            <BrowserRouter>
                <Header account={account} />
                <Paper className={classes.paper}>
                    <Switch>
                        <Route exact path="/">
                            <Main createEvent={createEvent}/>
                        </Route>
                        <Route path="/events/:id">
                            <Event events={events} web3={web3} />
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
