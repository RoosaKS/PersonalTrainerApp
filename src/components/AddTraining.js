import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react";
import { MenuItem } from '@mui/material';

function AddTraining(props){
    const [training, setTraining] = React.useState({
        date: '', 
        duration: '', 
        activity: '', 
        customer: '', 
        
    })

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
      fetch('https://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }, []);


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick'){
            setOpen(false);
        }
    };

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
        setTraining({
            date: '', 
            duration: '', 
            activity: '', 
            customer: '', 
        })
    };

    return(
        <div>
            <Button variant ="outlined" onClick={handleClickOpen}>
                New Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Training</DialogTitle>
                <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DateTimePicker
                    label="Date"
                    views={['year', 'month', 'day']}
                    value={training.date}
                    TextFieldProps={{variant:'standard'}}

                    onChange={date => setTraining({...training, date: date})}
                    />
                    </LocalizationProvider>

                    <TextField
                    margin="dense"
                    label="Duration"
                    type="number"
                    value={training.duration}
                    onChange={(e) => setTraining({...training, duration: e.target.value})}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    margin="dense"
                    label="Activity"
                    value={training.activity}
                    onChange={(e) => setTraining({...training, activity: e.target.value})}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    margin="dense"
                    label="Customer"
                    value={training.customer}
                    onChange={(e) => setTraining({...training, customer: e.target.value})}
                    fullWidth
                    variant="standard"
                    select>
                    {customers.map(customer => (
                        <MenuItem key={customer.links[0].href} value={customer.links[0].href}>
                            {customer.firstname} {customer.lastname}
                        </MenuItem>
                    ))}
                    
                    </TextField>

                  
                </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTraining