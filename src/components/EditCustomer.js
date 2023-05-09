import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


function EditCustomer(props){
    const [customer, setCustomer] = React.useState({
        firstname: '', 
        lastname: '', 
        streetaddress: '', 
        postcode: '', 
        city: '',
        email: '', 
        phone: ''
    })

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.params.firstname, 
            lastname: props.params.lastname, 
            streetaddress: props.params.streetaddress, 
            postcode: props.params.postcode, 
            city: props.params.city,
            email: props.params.email, 
            phone: props.params.phone
        })
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick'){
            setOpen(false);
        }
    };

    const handleSave = () => {
        props.updateCustomer(props.params.links[0].href, customer);
        setOpen(false);
    };

    return(
        <div>
            <Button size = "small" onClick={handleClickOpen}>
                Edit
            </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogContent>
                    <TextField
                    margin="dense"
                    label="Firstname"
                    value={customer.firstname}
                    onChange={(e) => setCustomer({...customer, firstname: e.target.value})}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    margin="dense"
                    label="Lastname"
                    value={customer.lastname}
                    onChange={(e) => setCustomer({...customer, lastname: e.target.value})}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    margin="dense"
                    label="Streetaddress"
                    value={customer.streetaddress}
                    onChange={(e) => setCustomer({...customer, streetaddress: e.target.value})}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    margin="dense"
                    label="Postcode"
                    value={customer.postcode}
                    onChange={(e) => setCustomer({...customer, postcode: e.target.value})}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    margin="dense"
                    label="City"
                    value={customer.city}
                    onChange={(e) => setCustomer({...customer, city: e.target.value})}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    margin="dense"
                    label="Email"
                    value={customer.email}
                    onChange={(e) => setCustomer({...customer, email: e.target.value})}
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    margin="dense"
                    label="Phone"
                    value={customer.phone}
                    onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                    fullWidth
                    variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
        </Dialog>
        </div>
    );
}

export default EditCustomer