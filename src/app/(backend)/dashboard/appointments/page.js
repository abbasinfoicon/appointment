"use client"
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';
import DeleteModal from '../../components/DeleteModal';

const Appointment = () => {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [deleteContent, setDeleteContent] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
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
    expireDate.setDate(expireDate.getDate());
    expireDate.setHours(23, 59, 59, 999);
    return currentDate > expireDate;
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        size: 10,
        className: 'your-custom-class',
      },
      {
        accessorKey: 'slot_date',
        header: 'Appointment Date',
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
      },
      {
        accessorKey: 'slot_end_time',
        header: 'End Time',
      },
      {
        accessorKey: 'doctor.user.first_name',
        header: 'Doctor',
        Cell: ({ row }) => {
          return (
            <span>{row.original.doctor.user.first_name} {row.original.doctor.user.last_name}</span>
          )
        }
      },
      {
        accessorKey: 'patient.first_name',
        header: 'Patient',
        Cell: ({ row }) => {
          return (
            <span>{row.original.patient.first_name} {row.original.patient.last_name}</span>
          )
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 50,
        Cell: ({ row }) => {
          return (
            <span className={`badge badge-rounded badge-${row.original.status == 'Pending' ? 'warning' : row.original.status == 'Canceled' ? 'danger' : 'success'} badge-${isDatePassed(row.original.slot_date) ? 'secondary disabled' : ''}`}>{row.original.status}</span>
          )
        }
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
          <div className="d-flex">
            <Link href={`appointments/${row.original.id}`} className='btn rounded btn-primary'><i className="icon-eye"></i></Link>
            <Link href={`appointments/edit/${row.original.id}`} className={`btn rounded btn-info mx-1 ${isDatePassed(row.original.slot_date) ? 'disabled' : ''}`}><i className="icon-pencil"></i></Link>
            <button className="btn rounded btn-danger" onClick={() => handleDeletePopup(row)}><i className="icon-trash"></i></button>
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
      sortBy: [
        {
          id: 'updated_at',
          desc: true,
        },
      ],
    },
    positionGlobalFilter: "left",
    muiSearchTextFieldProps: {
      placeholder: 'Doctor, Patient and Date-Time',
      sx: { minWidth: '350px' },
      variant: 'outlined',
    },
  });

  const handleDateSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleChangeStatus = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData({ url: `app/appointmentByDate/${search}`, method: "GET", authorization: `Bearer ${token}` });

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
        const res = await FetchData({ url: "app/appointments", method: "GET", authorization: `Bearer ${token}`, contentType: "application/json" });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await res.json();
        const sortedData = result.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        setOriginalData(sortedData);
        setData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      }
    };

    fetchData();

  }, [token, deleteContent]);

  useEffect(() => {
    if (selectedStatus) {
      const filteredData = originalData.filter(item => item.status === selectedStatus);
      setData(filteredData);
    } else {
      setData(originalData);
    }
  }, [selectedStatus, originalData]);

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
            <li className="breadcrumb-item"><Link href="/dashboard/appointments">Appointment</Link></li>
            <li className="breadcrumb-item active"><Link href="#">All Appointment</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Appointment Details Lists</h4>
              <div className="add-new text-right form-filter-date">
                <div className="form-date">
                  <label htmlFor="date">Filter by Date</label>
                  <input type="date" name="date" id="date" onChange={handleDateSearch} className='form-control' />
                  <select name="status" id="status" onChange={handleChangeStatus} className="form-control">
                    <option value="">All Appointment</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
                <Link href="/dashboard/appointments/add" className="btn btn-outline-primary btn-lg btn-rounded mt-1 pl-5 pr-5 add-new">Add New</Link>
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

      <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page="appointments" url="app/deleteAppointment" />
    </div>
  )
}

export default Appointment