import React, {useEffect, useState} from 'react';
import { Pie } from 'react-chartjs-2';
import './chart.css';



export function TaskChart({completedTasks,tasks}) {
    const [data, setData] = useState({
        labels: ['Completed','Pending'],
        datasets: [
            {
                label: '# of Tasks',
                backgroundColor: [
                    '#5285EC',
                    '#E8ECEC'

                ],
                borderColor: [
                    '#F4F4F6',
                    '#F4F4F6'
                ],
                borderWidth: 1,
            },
        ],
    });

    useEffect(()=> {
        console.log(completedTasks, tasks);
       let newdata = {...data};
       newdata.datasets[0].data = [completedTasks,tasks-completedTasks];
        if(data.datasets) {
            setData((prevState) => ({...prevState, ...newdata}))
        }
     console.log(data)},[completedTasks,tasks]);

    return (
        <div className="chart-container">
            <Pie data={data} options={{
                responsive: true,
                maintainAspectRatio: false,
            }}/>
        </div>
    )
};

