import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import dayjs from 'dayjs'; 
import AddTraining from "./AddTraining";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

function Traininglist(){

    const [trainings, setTrainings] = useState([]);

    const [open, setOpen] = useState(false);

    const [msg, setMsg] = useState('');

    const [columnDefs] = useState([
        {field: 'date', sortable: true, filter: true, width: 250,
          valueFormatter: (params) => dayjs(params.value).format('DD.MM.YYYY HH:mm')},
        {field: 'duration', sortable: true, filter: true, width: 150},
        {field: 'activity', sortable: true, filter: true, width: 200},
        {field: 'Customer', sortable: true, filter: true, width: 200,
          valueGetter: (params) => `${params.data.customer.firstname} ${params.data.customer.lastname}`},
        {cellRenderer: params => 
        <Button size="small" color="error" onClick={() => deleteTraining(params.data)}>
            Delete
        </Button>, 
        width: 120}

    ])

    useEffect(() => {
        getTrainings()
    }, []);

    const getTrainings = () => {
        fetch("https://traineeapp.azurewebsites.net/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (data) => {
        if(window.confirm('Are you sure')) {
            fetch('http://traineeapp.azurewebsites.net/api/trainings/' + data.id, {method: 'DELETE'})
            .then(response => {
                if(response.ok){
                    setMsg('Training deleted successfully')
                    setOpen(true);
                    getTrainings();
                }
                else    
                    alert('Something went wrong in deletion: ' +response.status)
            })
            .catch(err => console.error(err))
        }
    }

    const addTraining = (training) =>{
        fetch("http://traineeapp.azurewebsites.net/api/trainings", {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok)
                getTrainings();
            else
                alert('Something went wrong with adding a new training')
        })
        .catch(err => console.error(err))
    }


    return(
        <>
            <div style={{marginTop: '20px', marginBottom: '10px' }}>
                <AddTraining addTraining={addTraining}/>
            </div>

            <div className="ag-theme-material" style={{height: 600, width: '90%', margin: 'auto'}}>
                <AgGridReact
                pagination={true}
                paginationPageSize={10}
                rowData={trainings}
                columnDefs={columnDefs}
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

export default Traininglist