'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FetchData from '@/app/components/FetchData';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import JEditor from '@/app/(backend)/components/JEditor';
import Loading from '@/app/loading';

const Edit = () => {
    const router = useRouter();
    const docId = useParams();
    const searchParams = useSearchParams();
    const appId = searchParams.get('appId');
    const [data, setData] = useState({});
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: "app/prescriptions", method: "GET", authorization: `Bearer ${token}` });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();
                const filterApp = result.filter(item => item.appointment_id.id == appId && item.appointment_id.doctor.user.id == docId.id);
                setData(filterApp[0]);
                setContent(filterApp[0].prescription_detail);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(true);
            }
        };

        fetchData();

    }, [token, docId]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            data.prescription_detail = content;
            const res = await FetchData({ url: `app/update_prescriptions/${data.id}`, body: data, method: "PATCH", authorization: `Bearer ${token}`, contentType: "application/json" });
            const result = await res.json();

            if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
                toast.error(result.Error);
            }

            if (result.status === 201 || res.ok) {
                setData({ appointment_id: '', notes: '' });
                setContent('')
                toast.success("Prescription Update Successfull");
                router.push(`/dashboard/doctors/${docId.id}/prescription/?appId=${appId}`);
            }

        } catch (error) {
            console.error("Prescription not Updated !!!", error)
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
                        <h4>Edit Prescription</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href={`/dashboard/doctors`}>Doctors</Link></li>
                        <li className="breadcrumb-item"><Link href={`/dashboard/doctors/${docId.id}/appointment`}>Appointment</Link></li>
                        <li className="breadcrumb-item"><Link href={`/dashboard/doctors/${docId.id}/prescription/?appId=${appId}`}>Prescription</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Edit Prescription</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            {
                                data.appointment_id.id ? <ul>
                                    <li><strong>Patient Name: </strong> {data.appointment_id.patient.first_name} {data.appointment_id.patient.last_name}</li>
                                    <li><strong>Appointment Date: </strong> {data.appointment_id.slot_date}</li>
                                    <li><strong>Appointment Time: </strong> {data.appointment_id.slot_start_time} - {data.appointment_id.slot_end_time}</li>
                                    <li><strong>Appointment Status: </strong> {data.appointment_id.status}</li>
                                    <br />
                                    <li><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: data.prescription_detail }}></span></li>
                                    <li><strong>Notes: </strong> {data.notes}</li>
                                </ul> : null
                            }

                        </div>

                        <form className="reg-form" onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2 mb-3">
                                        <label htmlFor="id">Appointment Id</label>
                                        <input type="text" name="appointment_id" id="" value={data.appointment_id.id} className='form-control' readOnly disabled />
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
                                        <button type='submit' className="btn btn-primary">Update Prescription</button>
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

export default Edit