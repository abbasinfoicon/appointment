"use client"
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import { useCookies } from 'react-cookie';
import FetchData from '@/app/components/FetchData';
import { toast } from 'react-toastify';
import Loading from '@/app/loading';
import DeleteModal from '../../components/DeleteModal';

const Slider = () => {
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
        setDeleteId(row.original.banner_id);
    }

    const handleAvailabilityChange = async (row) => {
        const formData = new FormData();
        formData.set('heading', row.original.heading);
        formData.set('description', row.original.description);


        if (row.original.availability === false) {
            formData.set('availability', true);
        } else {
            formData.set('availability', false);
        }

        if (row.original.image instanceof File) {
            formData.append('image', row.original.image);
        }

        try {
            const res = await FetchData({
                url: `app/updateBanner/${row.original.banner_id}`,
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
                accessorKey: 'banner_id',
                header: 'Slider Id',
                size: 50,
            },
            {
                accessorKey: 'image',
                header: 'Image',
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
                accessorKey: 'heading',
                header: 'Heading',
                size: 200,
            },
            {
                accessorKey: 'availability',
                header: 'Availablity',
                size: 50,
                Cell: ({ row }) => (
                    <div className="custom_checkbox">
                        <input id={`c${row.index}`} type="checkbox" className="switch" checked={row.original.availability}
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
                        <Link href={`slider/${row.original.banner_id}`} className='btn rounded btn-primary'><i className="icon-eye"></i></Link>
                        <Link href={`slider/edit/${row.original.banner_id}`} className='btn rounded btn-info mx-1'><i className="icon-pencil"></i></Link>
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
                const res = await FetchData({ url: "app/allBanners", method: "GET" });

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

    }, [token, deleteContent, updateAvailability]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>All Slider</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/slider">Slider</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">All Slider</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Slider Details Lists</h4>
                            <div className="add-new text-right">
                                <Link href="/dashboard/slider/add" className="btn btn-outline-primary btn-lg btn-rounded mt-1 pl-5 pr-5 add-new">Add New</Link>
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

            <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page="slider" url="app/deleteBanner" />
        </div>
    )
}

export default Slider