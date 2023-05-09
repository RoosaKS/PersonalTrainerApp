import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState, useRef } from "react";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';



function Customerlist(){

    const [customers, setCustomers] = useState([]);

    const [open, setOpen] = useState(false);

    const [msg, setMsg] = useState('');

    const [columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true, width:150},
        {field: 'lastname', sortable: true, filter: true, width:150},
        {field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true, width: 125},
        {field: 'city', sortable: true, filter: true, width: 150},
        {field: 'email', sortable: true, filter: true, width: 175},
        {field: 'phone', sortable: true, filter: true, width: 140},
        {cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} params={params.data}/>, width: 120},
        {cellRenderer: params => 
        <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
            Delete
        </Button>, 
        width: 120}
    ])

    const gridRef = useRef();

    useEffect(() => {
        getCustomers()
    }, []);

    const getCustomers = () => {
        fetch("http://traineeapp.azurewebsites.net/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (params) => {
        if(window.confirm('Are you sure')) {
            fetch(params.data.links[0].href, {method: 'DELETE'})
            .then(response => {
                if(response.ok){
                    setMsg('Customer deleted successfully')
                    setOpen(true);
                    getCustomers();
                }
                else    
                    alert('Something went wrong in deletion: ' +response.status)
            })
            .catch(err => console.error(err))
        }
    }

    const addCustomer = (customer) =>{
        fetch("http://traineeapp.azurewebsites.net/api/customers", {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok)
                getCustomers();
            else
                alert('Something went wrong with adding a new customer')
        })
        .catch(err => console.error(err))
    }

    const updateCustomer =(url, updatedCustomer) =>{
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then (response => {
            if(response.ok){
                setMsg('Customer edited')
                setOpen(true);
                getCustomers();
            }
            else
                alert('Something went wrong in edit: ' + response.statusText)
        })
        .catch (err => console.error(err))
    }

    const exportToCsv = () => {
        let params = {
            columnKeys: ["firstname", "lastname", "streetaddress", "postcode", "city", "email", "phone"],
            fileName: "customers"
        }
        gridRef.current.api.exportDataAsCsv(params);
    }

    return(
        <>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '10px' }}>
            <div style={{ marginRight: "10px" }}>
                <AddCustomer addCustomer={addCustomer}/>
            </div>
            <div>
                <Button variant="outlined" onClick={exportToCsv}>Export customers CSV</Button>
            </div>

        </div>
            <div className="ag-theme-material" style={{height: 600, width: '90%', margin: 'auto'}}>
                <AgGridReact
                pagination={true}
                paginationPageSize={10}
                rowData={customers}
                columnDefs={columnDefs}
                ref={gridRef}
                />
            </div>

            <Snackbar 
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}   
            message={msg}      
            />
        </>
    )
}

export default Customerlist