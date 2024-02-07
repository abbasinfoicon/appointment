"use client"
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import { useCookies } from 'react-cookie';
import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';
import DeleteModal from '@/app/(backend)/components/DeleteModal';
import { useParams, useSearchParams } from 'next/navigation';

const Appointment = () => {
    const docId = useParams();
    const searchParams = useSearchParams();
    const appId = searchParams.get('appId');
    const [data, setData] = useState([]);
    const [deleteContent, setDeleteContent] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    const formatDate = (dateTimeString) => {
        try {
            const timestamp = Date.parse(dateTimeString);

            if (isNaN(timestamp)) {
                throw new Error('Invalid date format');
            }

            const dateObj = new Date(timestamp);

            // Format date as "YYYY-MM-DD"
            const formattedDate = dateObj.toISOString().split('T')[0];

            // Format time as "HH:mm"
            const formattedTime = dateObj.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });

            return { formattedDate, formattedTime };
        } catch (error) {
            console.error('Invalid date format:', dateTimeString);
            return { formattedDate: 'Invalid Date', formattedTime: 'Invalid Time' };
        }
    };

    const handleDeletePopup = (row) => {
        setDeleteContent(!deleteContent);
        setDeleteId(row.original.id);
    }

    const isDatePassed = (dateString) => {
        const currentDate = new Date();
        const expireDate = new Date(dateString);
        expireDate.setDate(expireDate.getDate() + 1);
        expireDate.setHours(23, 59, 59, 999);
        return currentDate > expireDate;
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                size: 50,
            },
            {
                accessorKey: 'appointment_id.patient.id',
                header: 'Patient Name',
                size: 50,
                Cell: ({ row }) => {
                    return (
                        <span>{row.original.appointment_id.patient.first_name} {row.original.appointment_id.patient.last_name}</span>
                    )
                }
            },
            {
                accessorKey: 'appointment_id.id',
                header: 'Patient Problem',
                Cell: ({ row }) => {
                    return (
                        <span dangerouslySetInnerHTML={{ __html: row.original.appointment_id.description }}></span>
                    )
                }
            },
            {
                accessorKey: 'prescription_detail',
                header: 'Prescription Detail',
                Cell: ({ row }) => {
                    return (
                        <span dangerouslySetInnerHTML={{ __html: row.original.prescription_detail }}></span>
                    )
                }
            },
            {
                accessorKey: 'notes',
                header: 'Notes',
            },
            {
                accessorKey: 'updated_at',
                header: 'Date',
                size: 100,
                Cell: ({ row }) => {
                    const { formattedDate, formattedTime } = formatDate(row.original.updated_at);
                    return (
                        <span>
                            {formattedDate} <br /> {formattedTime}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                size: 150,
                Cell: ({ row }) => (
                    <div className='d-flex'>
                        <Link href={`/dashboard/doctors/${docId.id}/prescription/edit/${row.original.id}/?appId=${appId}`} title='Edit' className={`btn rounded btn-info mx-1 ${isDatePassed(row.original.slot_date) ? 'disabled' : ''}`}><i className="icon-pencil"></i></Link>
                        <button className='btn rounded btn-danger' onClick={() => handleDeletePopup(row)} title='Delete'><i className="icon-trash"></i></button>
                    </div>
                ),
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: data || [],
        enableGlobalFilterModes: true,
        initialState: {
            showGlobalFilter: true,
        },
        positionGlobalFilter: "left",
        muiSearchTextFieldProps: {
            placeholder: 'Doctor, Patient and Date-Time',
            sx: { minWidth: '350px' },
            variant: 'outlined',
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: "app/prescriptions", method: "GET", authorization: `Bearer ${token}` });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();
                const filterApp = result.filter(item => item.appointment_id.id == appId && item.appointment_id.doctor.user.id == docId.id);
                setData(filterApp);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(true);
            }
        };

        fetchData();

    }, [token, deleteContent, docId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>All Prescription ({data.length})</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href={`/dashboard/doctors`}>Doctors</Link></li>
                        <li className="breadcrumb-item"><Link href={`/dashboard/doctors/${docId.id}/appointment`}>Appointment</Link></li>
                        <li className="breadcrumb-item"><Link href={`/dashboard/doctors/${docId.id}/prescription/?appId=${appId}`}>Prescription</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">All Prescription</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Prescription Details Lists</h4>
                            <div className="add-new text-right">
                                {data.length ? null : <Link href={`/dashboard/doctors/${docId.id}/prescription/add/?appId=${appId}`} className="btn btn-outline-primary btn-lg btn-rounded mt-1 pl-5 pr-5 add-new">Add Prescription</Link>}
                            </div>
                        </div>

                        <div className='card-body'>
                            {loading ? (
                                <Loading />
                            ) : (
                                <MaterialReactTable table={table} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page={"doctors/" + docId.id + "/prescription/?appId=" + appId} url={"app/delete_prescriptions"} />
        </div>
    )
}

export default Appointment