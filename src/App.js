import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import './App.css';
import { useState } from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import TrainingChart from './components/TrainingChart';
import Calendar from './components/Calendar';

function App() {
  const [page, setPage] = useState("customers");

  const changeTab = (event, page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>PersonalTrainer</Typography>
        </Toolbar>
        <Tabs textColor='inherit' value={page} onChange={changeTab}>
          <Tab label="Customers" value="customers"></Tab>
          <Tab label="Trainings" value="trainings"></Tab>
          <Tab label="Calendar" value="calendar"></Tab>
          <Tab label="Chart" value="chart"></Tab>
        </Tabs>
      </AppBar>
      {page === "customers" && <Customerlist/>}
      {page === "trainings" && <Traininglist/>}
      {page === "calendar" && <Calendar/>}
      {page === "chart" && <TrainingChart/>}

    </div>
  );
}

export default App;
