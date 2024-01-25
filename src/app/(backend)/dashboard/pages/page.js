"use client"
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify'
import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';
import DeleteModal from '../../components/DeleteModal';

const Pages = () => {
    const [data, setData] = useState([]);
    const [deleteContent, setDeleteContent] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [page, setPage] = useState('');
    const [isPageExists, setIsPageExists] = useState(false);
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
        setDeleteId(row.original.service_id);
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'service_id',
                header: 'Page Id',
                size: 50,
            },
            {
                accessorKey: 'service_name',
                header: 'Page Name',
                size: 50,
            },
            {
                accessorKey: 'image',
                header: 'Banner Image',
                size: 100,
                Cell: ({ row }) => {
                    if (row.original.image) {
                        return <img src={process.env.BASE_URL + row.original.image} alt="Slider Image" style={{ width: '100px', height: 'auto' }} />
                    } else {
                        return null;
                    }
                },
            },
            {
                accessorKey: 'title',
                header: 'Title',
                size: 200,
            },
            {
                accessorKey: 'subtitle',
                header: 'Subtitle',
                size: 200,
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
                        <Link href={`pages/${row.original.service_name}`} className='btn rounded btn-primary'><i className="icon-eye"></i></Link>
                        <Link href={`pages/edit/${row.original.service_name}`} className='btn rounded btn-info mx-1'><i className="icon-pencil"></i></Link>
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
                const res = await FetchData({ url: "app/allInfo", method: "GET", authorization: `Bearer ${token}` });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();

                // Update the state with result.data
                setData(result.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        fetchData();

    }, [token, deleteContent]);

    const handlePage = (e) => {
        const enteredPage = e.target.value.toLowerCase();
        const pageExists = data.some(item => item.service_name.toLowerCase() === enteredPage);

        setIsPageExists(pageExists);

        if (pageExists) {
            toast.error("Page already Created!!!");
            return;
        }

        setPage(e.target.value);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>All Pages</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/pages">Pages</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">All Pages</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Pages Details Lists</h4>
                            <div className="add-new text-right">
                                <div className="create-page">
                                    <input type="text" name="page" id="page" value={page} onChange={handlePage} className='form-control' placeholder='Enter Page Name' />
                                    <Link href={`/dashboard/pages/add?page=${encodeURIComponent(page)}`} className="btn btn-primary btn-lg btn-rounded pl-5 pr-5 add-new" disabled={!page || isPageExists}>Add New</Link>
                                </div>
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

            <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page="pages" url="app/delete" />
        </div>
    )
}

export default Pages