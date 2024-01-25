'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FetchData from '@/app/components/FetchData';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useGetAllDoctorQuery, useGetSlotByDrQuery } from '@/redux/slices/serviceApi';
import JEditor from '@/app/(backend)/components/JEditor';

const Add = () => {
    const router = useRouter();
    const [data, setData] = useState({ slot_date: '', slot_start_time: '', slot_end_time: '', doctor: '', patient: '', description: '' });
    const [content, setContent] = useState('');
    const [drid, setDrId] = useState("");
    const [drdate, setDrdate] = useState("");
    const [slot, setSlot] = useState([]);
    const [dataByDate, setDataByDate] = useState([]);
    const [patient, setPatient] = useState([]);
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;
    const allDoctor = useGetAllDoctorQuery();
    const slotbydr = useGetSlotByDrQuery(drid || 0);
    const dr = allDoctor?.data;
    const drSlot = slotbydr?.data?.data;
    const pr = patient;

    const fetchData = async () => {
        try {
            const res = await FetchData({ url: "user/all_patient", method: "POST", authorization: `Bearer ${token}` });

            if (!res.ok) {
                throw new Error('Failed to fetch data from user/all_patient');
            }

            const result = await res.json();
            setPatient(result.data);


            if (drid) {
                const res2 = await FetchData({ url: `app/all_slot_v/${drid}`, method: "POST" });
                if (!res2.ok) {
                    throw new Error('Failed to fetch data from app/all_slot_v');
                }

                const result2 = await res2.json();
                setSlot(result2.data);
            }

            if (drid && drdate) {
                const res3 = await FetchData({ url: `app/all_slot/${drid}/${drdate}`, method: "GET" });
                if (!res3.ok) {
                    throw new Error('Failed to fetch data from app/all_slot');
                }

                const result3 = await res3.json();
                setDataByDate(result3.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token, drid, drdate]);


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleChangeDr = (e) => {
        setDrId(e.target.value);
    }
    const handleChangeDate = (e) => {
        setDrdate(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { slot_start_time, slot_end_time, patient, description } = data;

        try {
            if (!drdate || !slot_start_time || !slot_end_time || !drid || !patient || !content) {
                toast.error("All (*) fields Required!!!");
                return;
            }

            data.doctor = drid;
            data.slot_date = drdate;
            data.description = content;
            const res = await FetchData({ url: "app/c_appointment", body: data, method: "POST", authorization: `Bearer ${token}`, contentType: "application/json" });
            const result = await res.json();

            if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
                toast.error(result.Error);
            }

            if (result.status === 201 || res.ok) {
                setData({ name: '', email: '', phone_no: '', subject: '', description: '' });
                toast.success("Appointment Submit Successfull");
                router.push('/dashboard/appointments');
            }

        } catch (error) {
            console.error("Appointment not added !!!", error)
        }
    }

    const onlyUnique = (value, index, array) => {
        const firstIndex = array.findIndex(item => item.slot_date === value.slot_date);
        return index === firstIndex;
    };

    const today = new Date().toISOString().split('T')[0];
    const filteredSlots = slot.filter(item => item.slot_date >= today);
    const unique = filteredSlots.filter(onlyUnique);


    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>Add New Appointments</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/appointments">Appointments</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Add Appointments</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <form className="reg-form" onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label className="form-label">Patient Lists</label>
                                            <select name="patient" value={data.patient} onChange={handleChange} id="" className="form-control">
                                                <option value="">select patient</option>
                                                {
                                                    pr ? pr?.map((item, i) => <option value={item?.id} key={i}>{item?.first_name} {item?.last_name}</option>) : <option>Patient not found</option>
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label className="form-label">Doctor Lists</label>
                                            <select name="doctor" value={drid} onChange={(e) => handleChangeDr(e)} id="" className="form-control">
                                                <option value="">select doctor</option>
                                                {
                                                    dr ? dr?.map((item, i) => <option value={item?.user?.id} key={i}>{item?.user?.first_name} {item?.user?.last_name}</option>) : <option>Doctor not found</option>
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-label">Slot Date</label>
                                            <select name="slot_date" className="form-control" value={drdate} onChange={(e) => handleChangeDate(e)}>
                                                <option value="">select date</option>
                                                {
                                                    unique.length > 0 ? unique?.map((item, i) => <option key={i} value={item.slot_date}>{item.slot_date}</option>) : <option value="">Slot Not Avalable</option>
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label className="form-label">Start Time</label>
                                        <select name="slot_start_time" className="form-control" value={data.slot_start_time} onChange={handleChange}>
                                            <option value="">start time</option>
                                            {
                                                dataByDate ? dataByDate?.map((item, i) => <option key={i} value={item.slot_start_time}>{item.slot_start_time}</option>) : <option value="">Slot Not Avalable</option>
                                            }
                                        </select>
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label className="form-label">End Time</label>
                                        <select name="slot_end_time" className="form-control" value={data.slot_end_time} onChange={handleChange}>
                                            <option value="">end date</option>
                                            {
                                                dataByDate ? dataByDate?.map((item, i) => <option key={i} value={item.slot_end_time}>{item.slot_end_time}</option>) : <option value="">Slot Not Avalable</option>
                                            }
                                        </select>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label">Description *</label>
                                            <JEditor content={content} setContent={setContent} />
                                            {/* <textarea name="description" value={data.description} onChange={handleChange} rows="4" className="form-control" placeholder="Your Message..." required></textarea> */}
                                        </div>
                                    </div>

                                    <div className="col-xs-12">
                                        <button type='submit' className="btn btn-primary">Make An Appointment</button>
                                        <button type="reset" className="btn">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add