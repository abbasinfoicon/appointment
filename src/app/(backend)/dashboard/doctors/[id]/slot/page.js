"use client"
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import { useCookies } from 'react-cookie';
import DeleteModal from './DeleteModal';
import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';
import { useParams } from 'next/navigation';

const Slot = () => {
    const params = useParams();
    const id = params.id
    const [data, setData] = useState([]);
    const [deleteContent, setDeleteContent] = useState(false);
    const [minDate, setMinDate] = useState('');
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
                header: 'Slot Id',
                size: 50,
            },
            {
                accessorKey: 'slot_date',
                header: 'Day and Date',
                size: 100,
                Cell: ({ row }) => {
                    const currentDate = new Date(row.original.slot_date);
                    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
                    return (
                        <span>{row.original.slot_date} - <strong>{dayName}</strong></span>
                    );
                },
            },
            {
                accessorKey: 'slot_start_time',
                header: 'Start Time',
                size: 100,
            },
            {
                accessorKey: 'slot_end_time',
                header: 'End Time',
                size: 100,
            },
            {
                accessorKey: 'updated_at',
                header: 'Updated Date',
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
                        <Link href={`/dashboard/doctors/${id}/slot/${row.original.id}`} className='btn rounded btn-primary'><i className="icon-eye"></i></Link>
                        <Link href={`/dashboard/doctors/${id}/slot/edit/${row.original.id}`} className={`btn rounded btn-info mx-1 ${isDatePassed(row.original.slot_date) ? 'disabled' : ''}`}><i className="icon-pencil"></i></Link>
                        <button className='btn rounded btn-danger' onClick={() => handleDeletePopup(row)}><i className="icon-trash"></i></button>
                    </div>
                ),
            },
        ],
        [],
    );

    const table = useMaterialReactTable({ columns, data: data || [] });

    const handleDateSearch = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: `app/all_slot/${id}/${search}`, method: "GET", authorization: `Bearer ${token}` });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();

                setData(result.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        if (search) {
            fetchData();
        }
    }, [search]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: `app/all_slot_v/${id}`, method: "POST" });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();

                const todayDate = new Date().toISOString().split('T')[0];
                const filteredData = result.data.filter(item => item.slot_date >= todayDate);

                setData(filteredData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        fetchData();

    }, [token, deleteContent]);

    useEffect(() => {
        setMinDate(new Date().toISOString().split('T')[0]);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>All Slots ({data.length})</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/doctors">doctors</Link></li>
                        <li className="breadcrumb-item"><Link href={`/dashboard/doctors/${id}/slot`}>Slots</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">All Slot</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Slots Details Lists</h4>
                            <div className="add-new text-right form-filter-date">
                                <div className={data.length == 0 ? 'd-none' : 'form-date'}>
                                    <label htmlFor="date">Filter by Date</label>
                                    <input type="date" name="date" id="date" onChange={handleDateSearch} className='form-control' min={minDate} />
                                </div>
                                <Link href={`/dashboard/doctors/${id}/slot/add`} className="btn btn-outline-primary btn-lg btn-rounded mt-1 pl-5 pr-5 add-new">Add New</Link>
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

            <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} />
        </div>
    )
}

export default Slot