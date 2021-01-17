import React from "react";
import {Link} from "react-router-dom";
import {Typography, List, ListItem, Box, Divider} from "@material-ui/core";

const ListItemLink = ({event}) => {
    const to = `/events/${event.id}`;
    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
        [to],
    );
    console.log('====', event)
    return (
        <li>
            <ListItem button divider component={renderLink}>
                <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{event[0]}</Typography>
                    <Box display="flex" alignItems="center">
                        <Typography variant="subtitle2">Date:&nbsp;</Typography>
                        <Typography variant="body2">{event[1]}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                        <Typography variant="subtitle2">Creator:&nbsp;</Typography>
                        <Typography variant="body2">0x23576583H46457457</Typography>
                    </Box>
                </Box>
            </ListItem>

        </li>
    );
}

const Events = ({events}) => {
    return (
        <List>
            {events.map(item => <ListItemLink key={item.id} event={item} />)}
        </List>
    )
};

export default Events;
