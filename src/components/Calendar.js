import React, { useEffect, useState } from "react";
import dayjs from 'dayjs'; 

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


function Calendar(){

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
          .then(response => response.json())
          .then(data => setTrainings(data))
          .catch(err => console.error(err))
      }, []);

    const events = trainings.map(training => ({
        title: training.activity + ' / ' + training.customer.firstname + " " + training.customer.lastname,
        start: training.date,
        end: dayjs(training.date).add(training.duration, 'minutes').toISOString(),
    }));

    return (
        <>
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
        />
        </>
    )
}

export default Calendar