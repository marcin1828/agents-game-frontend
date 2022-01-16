import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }  from '@mui/material';


const InfoDialog = ({isOpen, title, message, closeDialog}) => (
    <Dialog
        open={isOpen}
        aria-labelledby="dialog"
        aria-describedby="description"
    >
        <DialogTitle id="dialog">{title}</DialogTitle>
        <DialogContent>
            <DialogContentText id="description">
                {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog} autoFocus>OK</Button>
        </DialogActions>
    </Dialog>
);

export default InfoDialog;
