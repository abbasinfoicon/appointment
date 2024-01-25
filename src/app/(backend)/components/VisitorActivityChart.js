"use client"
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
    {
        name: 'Sunday',
        active: 40,
        inactive: 38,
    },
    {
        name: 'Monday',
        active: 50,
        inactive: 45,
    },
    {
        name: 'Tuesday',
        active: 60,
        inactive: 50,
    },
    {
        name: 'Wednesday',
        active: 70,
        inactive: 60,
    },
    {
        name: 'Thursday',
        active: 80,
        inactive: 75,
    },
    {
        name: 'Friday',
        active: 90,
        inactive: 85,
    },
    {
        name: 'Saturday',
        active: 100,
        inactive: 90,
    },
];

export default function VisitorActivityChart() {
    return (
        <AreaChart
            width={1000}
            height={300}
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="active" stackId="1" stroke="#3695eb" fill="#3695eb" />
            <Area type="monotone" dataKey="inactive" stackId="1" stroke="#9acaf5" fill="#9acaf5" />
        </AreaChart>
    );
}
