'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FetchData from '@/app/components/FetchData';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import JEditor from '@/app/(backend)/components/JEditor';
import Loading from '@/app/loading';

const Add = () => {
    const router = useRouter();
    const docId = useParams();
    const searchParams = useSearchParams();
    const appId = searchParams.get('appId');
    const [appointment, setAppointment] = useState([]);
    const [data, setData] = useState({ appointment_id: appointment.id || '', notes: '' });
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: `app/appointment/${appId}`, method: "GET", authorization: `Bearer ${token}`, contentType: "application/json" });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();
                setAppointment(result.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        fetchData();

    }, [token, docId, appId]);

    useEffect(() => {
        if (appointment.id) {
            setData({ appointment_id: appointment.id, notes: '' });
        }
    }, [appointment]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { appointment_id, notes } = data;

        try {
            if (!appointment_id || !content) {
                toast.error("All (*) fields Required!!!");
                return;
            }
            data.appointment_id = appointment.id
            data.prescription_detail = content;
            const res = await FetchData({ url: `app/createPrescription/${appointment.id}`, body: data, method: "POST", authorization: `Bearer ${token}`, contentType: "application/json" });
            const result = await res.json();

            if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
                toast.error(result.Error);
            }

            if (result.status === 201 || res.ok) {
                setData({ appointment_id: '', notes: '' });
                toast.success("Prescription Submit Successfull");
                router.push(`/dashboard/doctors/${docId.id}/prescription/?appId=${appId}`);
            }

        } catch (error) {
            console.error("Prescription not added !!!", error)
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>Add Prescription</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href={`/dashboard/doctors`}>Doctors</Link></li>
                        <li className="breadcrumb-item"><Link href={`/dashboard/doctors/${docId.id}/appointment`}>Appointment</Link></li>
                        <li className="breadcrumb-item"><Link href={`/dashboard/doctors/${docId.id}/prescription/?appId=${appId}`}>Prescription</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Add Appointment</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            {appointment.patient && (
                                <ul>
                                    <li><strong>Patient Name: </strong> {appointment.patient.first_name} {appointment.patient.last_name}</li>
                                    <li><strong>Appointment Date: </strong> {appointment.slot_date}</li>
                                    <li><strong>Appointment Time: </strong> {appointment.slot_start_time} - {appointment.slot_end_time}</li>
                                    <br />
                                    <li><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: appointment.description }}></span></li>
                                </ul>
                            )}
                        </div>


                        <form className="reg-form" onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2 mb-3">
                                        <label htmlFor="id">Appointment Id</label>
                                        <input type="text" name="appointment_id" id="" value={appointment.id} className='form-control' readOnly disabled />
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label">Prescription *</label>
                                            <JEditor content={content} setContent={setContent} />
                                            {/* <textarea name="prescription_detail" value={data.prescription_detail} onChange={handleChange} rows="4" className="form-control" placeholder="Your Prescription..." required></textarea> */}
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label">Notes</label>
                                            <input type="text" name="notes" onChange={handleChange} value={data.notes} className="form-control" placeholder='Enter Prescription Notes' />
                                        </div>
                                    </div>

                                    <div className="col-xs-12">
                                        <button type='submit' className="btn btn-primary">Add Prescription</button>
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