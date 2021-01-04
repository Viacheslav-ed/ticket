import React from "react";
import {Link, useLocation} from "react-router-dom";
import {Box, Tabs, Tab, AppBar, Typography, Button} from "@material-ui/core";

const Header = ({account}) => {
    const headerValue = useLocation().pathname.split('/')[1];

    return (
        <Box>
            <Typography variant="h3" align="center" paragraph>Blockchain Ticket App</Typography>
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <Typography variant="subtitle2">Account:&nbsp;</Typography>
                <Typography variant="body2">{account}</Typography>
            </Box>
            <AppBar position="static" color="default">
                <Tabs
                    style={{flexGrow: '1'}}
                    // onChange={handleChange}
                    value={headerValue}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab value="" label="Main" component={Link} to="/" />
                    <Tab value="events" label="Events" component={Link} to="/events" />
                </Tabs>
            </AppBar>
        </Box>
    )
};

export default Header;
