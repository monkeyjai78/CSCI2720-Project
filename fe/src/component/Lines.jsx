//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)    Tsai Kwun Ki      (1155126289)

import React, { } from 'react';
import { Line } from 'react-chartjs-2';



function Lines({ labels, datas }) {
    const color = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1']


    const data = {
        labels,
        datasets: datas.map((it, index) => ({
            fill: false,
            backgroundColor: color[index],
            borderColor: color[index],
            label: it.label,
            data: it.data,
        }))
    };


    const option= {
        scales: {
            y: {
                beginAtZero: true,
                max: 10
            }
        }
    };
    return (
        <Line data={data}
            options={option} />
    );
}

export default Lines;
