"use client"
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import { useCookies } from 'react-cookie';
import FetchData from '@/app/components/FetchData';
import { toast } from 'react-toastify';
import Loading from '@/app/loading';
import DeleteModal from '../../components/DeleteModal';

const Faq = () => {
    const [data, setData] = useState([]);
    const [deleteContent, setDeleteContent] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [updateAvailability, setUpdateAvailability] = useState('');
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

    const handleAvailabilityChange = async (row) => {
        const formData = new FormData();
        formData.set('question', row.original.question);
        formData.set('answer', row.original.answer);


        if (row.original.show_visibility === false) {
            formData.set('show_visibility', true);
        } else {
            formData.set('show_visibility', false);
        }

        try {
            const res = await FetchData({
                url: `FAQ/admin/${row.original.id}`,
                method: 'PATCH',
                formdata: formData,
                authorization: `Bearer ${token}`,
            });

            if (!res.ok) {
                throw new Error('Failed to update');
            }

            setUpdateAvailability(res);
            toast.success(`Availability ${row.original.availability ? 'Hide' : 'Show'}`);
        } catch (error) {
            console.error('Error updating:', error);
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Faq Id',
                size: 50,
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
                accessorKey: 'question',
                header: 'Question',
                size: 200,
            },
            {
                accessorKey: 'answer',
                header: 'Answer',
                size: 200,
                Cell: ({ row }) => (
                    <span dangerouslySetInnerHTML={{ __html: row.original.answer }}></span>
                ),
            },
            {
                accessorKey: 'show_visibility',
                header: 'Availablity',
                size: 50,
                Cell: ({ row }) => (
                    <div className="custom_checkbox">
                        <input id={`c${row.index}`} type="checkbox" className="switch" checked={row.original.show_visibility}
                            onChange={() => handleAvailabilityChange(row)} />
                    </div>
                ),
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                size: 150,
                Cell: ({ row }) => (
                    <div>
                        <Link href={`faq/${row.original.id}`} className='btn rounded btn-primary'><i className="icon-eye"></i></Link>
                        <Link href={`faq/edit/${row.original.id}`} className='btn rounded btn-info mx-1'><i className="icon-pencil"></i></Link>
                        <button className='btn rounded btn-danger' onClick={() => handleDeletePopup(row)}><i className="icon-trash"></i></button>
                    </div>
                ),
            },
        ],
        [],
    );

    const table = useMaterialReactTable({ columns, data: data || [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: "FAQ/admin", method: "GET", authorization: `Bearer ${token}` });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();

                // Update the state with result.data
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        fetchData();

    }, [token, deleteContent, updateAvailability]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>All FAQ's</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/faq">FAQ's</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">All FAQ's</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">FAQ's Details Lists</h4>
                            <div className="add-new text-right">
                                <Link href="/dashboard/faq/add" className="btn btn-outline-primary btn-lg btn-rounded mt-1 pl-5 pr-5 add-new">Add New</Link>
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

            <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page="faq" url="FAQ/admin" />
        </div>
    )
}

export default Faq