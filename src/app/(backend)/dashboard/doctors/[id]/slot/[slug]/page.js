'use client'

import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';
import Link from 'next/link'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import DeleteModal from '../DeleteModal';

const SlotDetail = () => {
  const params = useParams();
  const id = params.slug

  const [data, setData] = useState({});
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;
  const [loading, setLoading] = useState(true);
  const [deleteContent, setDeleteContent] = useState(false);
  const [deleteId, setDeleteId] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData({ url: `app/slot_v/${id}`, method: "GET" });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await res.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  const handleDeletePopup = (did) => {
    setDeleteContent(!deleteContent);
    setDeleteId(did);
  }

  const formatDateString = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>View Slot by doctor's id: {data?.doctor}</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/doctors">Doctors</Link></li>
            <li className="breadcrumb-item"><Link href={`/dashboard/doctors/${data?.doctor}/slot`}>Slots</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Slots Details</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4 col-xxl-6 col-lg-6 col-md-12">
          <div className="card card-custom">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Slot ID</span> {data?.id}</li>
                <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Doctor ID</span> {data?.doctor}</li>
                <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Slot Date</span> {data?.slot_date}</li>
                <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Start Time</span> {data?.slot_start_time}</li>
                <li className="list-group-item d-flex justify-content-between"><span className="mb-0">End Time</span> {data?.slot_end_time}</li>
                <li></li>
                <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Update Date</span> {formatDateString(data?.updated_at)}</li>
              </ul>
            </div>

            <div className="card-footer border-0 mt-0 text-center">
              <Link className="btn btn-primary btn-rounded pl-3 pr-3" href={`/dashboard/doctors/${data?.doctor}/slot`} ><i className="icon-list pr-1"></i>All View Slot</Link>
              <Link className="btn btn-info btn-rounded pl-3 pr-3 mx-2" href={`/dashboard/doctors/${data?.doctor}/slot/edit/${id}`}><i className="icon-pencil pr-1"></i> Edit </Link>
              <button className='btn btn-rounded btn-danger' onClick={() => handleDeletePopup(id)}><i className="icon-trash pr-1"></i> Delete</button>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} />
    </div>
  )
}

export default SlotDetail