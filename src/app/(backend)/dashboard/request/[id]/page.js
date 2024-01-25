"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import FetchData from '@/app/components/FetchData';
import { useCookies } from 'react-cookie';
import Loading from '@/app/loading';
import DeleteModal from '@/app/(backend)/components/DeleteModal';

const PatientDetail = () => {
  const params = useParams();
  const id = params.id
  const [data, setData] = useState([]);
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;
  const [loading, setLoading] = useState(true);
  const [deleteContent, setDeleteContent] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData({ url: `app/request/${id}`, method: "POST", authorization: `Bearer ${token}` });

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>Request Details</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/request">Request</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Request Details</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="card">

            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Request Id</span><strong className="text-muted">{data.request_id}</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Patient Name</span> <strong className="text-muted">{data.name}	</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Patient Phone No.</span> <strong className="text-muted">{data.phone_no}</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Email</span> <strong className="text-muted">{data.email}</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Subject</span> <strong className="text-muted">{data.subject}</strong></li>
            </ul>

            <br />

            <ul>
              <li className="list-group-item"><p><strong>Description: </strong></p><p dangerouslySetInnerHTML={{ __html: data?.description }}></p></li>
            </ul>

            <div className="card-footer border-0 mt-0 text-center">
              <Link className="btn btn-primary btn-rounded pl-3 pr-3" href={`/dashboard/request`} ><i className="icon-list pr-1"></i>All View Request</Link>
              <Link className="btn btn-info btn-rounded pl-3 pr-3 mx-2" href={`/dashboard/request/edit/${data.request_id}`}><i className="icon-pencil pr-1"></i> Edit </Link>
              <button className='btn btn-rounded btn-danger' onClick={() => handleDeletePopup(data.request_id)}><i className="icon-trash pr-1"></i> Delete</button>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page="request" url="app/deleteRequest" />
    </div>
  )
}

export default PatientDetail