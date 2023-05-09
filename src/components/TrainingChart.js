import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

function TrainingChart(){

    const [trainings, setTrainings] = useState([]);


    useEffect(() => {
        getTrainings()
    }, []);

    const getTrainings = () => {
        fetch("https://traineeapp.azurewebsites.net/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const data = _(trainings)
    .groupBy("activity")
    .map((activity, key) => ({ activity: key, duration: _.sumBy(activity, "duration") }))
    .value();

    
    return(
        <>
            <div style={{ marginTop: "80px" }}>
                <ResponsiveContainer width="80%" height={400}>
                    <BarChart width={600} height={400} data={data}>
                        <XAxis dataKey="activity" />
                        <YAxis />
                        <YAxis label="Minutes" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="duration" fill="#8884d8" name="Duration (min)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default TrainingChart