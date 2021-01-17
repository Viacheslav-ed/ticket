import React from "react";
import {Typography, TextField, Button, Box} from "@material-ui/core";

const Main = ({createEvent}) => {
    const [name, setName] = React.useState('');
    const handleChange = event => setName(event.target.value);
    const handleClick = () => createEvent(name, Date.now());
    return (
        <div>
            <Typography variant="h6" align="center" paragraph>Create event</Typography>
            <Box display="flex" justifyContent="space-around" alignItems="center">
                <Box width="100%" mr={2}>
                    <TextField
                        fullWidth
                        label="Event name"
                        value={name}
                        onChange={handleChange}
                    />
                </Box>
                <Button
                    size="large"
                    disabled={!name}
                    onClick={handleClick}
                    variant="outlined"
                >
                    Create
                </Button>
            </Box>
        </div>
    )
};

export default Main;
