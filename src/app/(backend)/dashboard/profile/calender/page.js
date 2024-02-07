"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calender = () => {
    const [value, onChange] = useState();

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>Calender</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/profile">Profile</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Calender</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Calender details</h4>
                        </div>

                        <div className='card-body'>
                            <Calendar onChange={onChange} value={value} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calender