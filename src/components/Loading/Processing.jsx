import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Processing() {
    return (
        <Box sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            /* bring your own prefixes */
            transform: "translate(-50%, -50%)",

        }}>
            <CircularProgress />
        </Box>
    );
}