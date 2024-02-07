"use client"
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import { useCookies } from 'react-cookie';
import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';
import DeleteModal from '@/app/(backend)/components/DeleteModal';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

const Appointment = () => {
    const patientId = useParams();
    const pstId = patientId.name;
    const [data, setData] = useState([]);
    const [deleteContent, setDeleteContent] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [search, setSearch] = useState('');
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

    const handleChangeStatus = async (e, row) => {
        const status = e.target.value;

        try {
            const res = await FetchData({
                url: `app/updateStatusAppointment/${row}`,
                body: { status: status },
                method: "PATCH",
                authorization: `Bearer ${token}`,
                contentType: "application/json"
            });

            if (res.ok) {
                const updatedData = data.map(appointment => {
                    if (appointment.id === row) {
                        return { ...appointment, status: status };
                    }
                    return appointment;
                });

                setData(prevData => {
                    return prevData.map(appointment => {
                        if (appointment.id === row) {
                            return { ...appointment, status: status };
                        }
                        return appointment;
                    });
                });
                toast.success("Appointment Update Successful");
            } else {
                throw new Error("Appointment status not updated!!!");
            }
        } catch (error) {
            console.error("Appointment status not updated!!!", error);
            toast.error("Appointment status not updated!!!", error);
        }
    };

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
                accessorKey: 'slot_date',
                header: 'Date',
                size: 100,
                Cell: ({ row }) => {
                    const dateObj = new Date(row.original.slot_date);
                    const year = dateObj.getFullYear();
                    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObj);
                    const day = dateObj.getDate();
                    const formattedDate = `${month}-${day}, ${year}`;
                    return <span>{formattedDate} <small className='exp'>{isDatePassed(row.original.slot_date) ? '(EXP)' : null}</small></span>;
                }
            },
            {
                accessorKey: 'slot_start_time',
                header: 'Start Time',
                size: 50,
            },
            {
                accessorKey: 'slot_end_time',
                header: 'End Time',
                size: 50,
            }, {
                accessorKey: 'doctor.user.id',
                header: 'Doctor Name',
                size: 50,
                Cell: ({ row }) => (
                    <span>{row.original.doctor.user.first_name} {row.original.doctor.user.last_name}</span>
                ),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 50,
                Cell: ({ row }) => {
                    return (
                        <select name="stauts" id="status" value={row.original.status} onChange={(e) => handleChangeStatus(e, row.original.id)} className={`form-control ${row.original.status == 'Pending' ? 'pending' : row.original.status == 'Confirmed' ? 'confirmed' : 'canceled'}`} disabled={isDatePassed(row.original.slot_date)}>
                            <option value="Pending">Pending</option>
                            <option value="Canceled">Canceled</option>
                            <option value="Confirmed">Confirmed</option>
                        </select>
                    )
                }
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
                    <div>
                        <Link href={`/dashboard/patients/${pstId}/prescription/?appId=${row.original.id}`} className={`btn rounded btn-success ${isDatePassed(row.original.slot_date) ? 'disabled' : ''}`} title='Prescription'><i className="fa fa-medkit"></i></Link>
                        <Link href={`/dashboard/appointments/${row.original.id}?pstId=${pstId}`} className='btn rounded btn-primary mx-1' title='View'><i className="icon-eye"></i></Link>
                        <Link href={`/dashboard/appointments/edit/${row.original.id}?pstId=${pstId}`} title='Edit' className={`btn rounded btn-info mx-1 ${isDatePassed(row.original.slot_date) ? 'disabled' : ''}`}><i className="icon-pencil"></i></Link>
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

    const handleDateSearch = (e) => {
        const selectedDate = e.target.value;
        setSearch(selectedDate);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: "app/appointments", method: "GET", authorization: `Bearer ${token}` });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();

                const pstIdNumber = parseInt(pstId, 10);

                const filteredData = result.data.filter(item => item.patient.id === pstIdNumber);
                const filteredSearch = search ? filteredData.filter(item => item.slot_date === search) : filteredData;

                setData(filteredSearch);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        fetchData();

    }, [token, search, deleteContent, pstId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>All Appointment ({data.length})</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href={`/dashboard/patients`}>Patients</Link></li>
                        <li className="breadcrumb-item"><Link href={`/dashboard/patients/${pstId}/appointment`}>Appointment</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">All Appointment</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Patients Details Lists</h4>
                            <div className="add-new text-right form-filter-date">
                                <div className="form-date">
                                    <label htmlFor="date">Filter by Date</label>
                                    <input type="date" name="date" id="date" onChange={handleDateSearch} className='form-control' />
                                </div>
                                <Link href={`/dashboard/appointments/add?pId=${pstId.id}`} className="btn btn-outline-primary btn-lg btn-rounded mt-1 pl-5 pr-5 add-new">Add New</Link>
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

            <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page={"patients/" + pstId.id + "/appointment"} url="app/deleteAppointment" />
        </div>
    )
}

export default Appointment