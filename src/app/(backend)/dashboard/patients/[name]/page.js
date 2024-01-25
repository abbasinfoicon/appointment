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
  const id = params.name
  const [data, setData] = useState([]);
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;
  const [loading, setLoading] = useState(true);
  const [deleteContent, setDeleteContent] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData({ url: `user/details/${id}`, method: "GET", authorization: `Bearer ${token}` });

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
            <h4>Patient Details</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/patients">Patient</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Patient Details</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="card">
            <div className="text-center py-4 px-5 overlay-box" style={{ backgroundImage: 'url(/assets/images/big/img1.jpg)' }}>
              <div className="profile-photo">
                <img src={`/assets/images/patients/patient1.png`} width="100" className="img-fluid rounded-circle" alt="" />
              </div>

              <h3 className="mt-3 mb-1 text-white">{data.first_name} {data.last_name}</h3>
              <p className="text-white mb-0">{data.email}</p>
            </div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Patient Id</span><strong className="text-muted">{data.id}</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Patient Gender</span> <strong className="text-muted">{data.gender}	</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Phone No.</span> <strong className="text-muted">{data.phone_no}</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Address</span> <strong className="text-muted">{data.address}</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">City</span> <strong className="text-muted">{data.city}</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">State</span> <strong className="text-muted">{data.state}</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Years Old</span> 		<strong className="text-muted">24	</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Blood Group</span> <strong className="text-muted">B+	</strong></li>
            </ul>

            <div className="card-footer border-0 mt-0 text-center">
              <Link className="btn btn-primary btn-rounded pl-3 pr-3" href={`/dashboard/patients`} ><i className="icon-list pr-1"></i>All View Patient</Link>
              <Link className="btn btn-info btn-rounded pl-3 pr-3 mx-2" href={`/dashboard/patients/edit/${data.id}`}><i className="icon-pencil pr-1"></i> Edit </Link>
              <button className='btn btn-rounded btn-danger' onClick={() => handleDeletePopup(data.id)}><i className="icon-trash pr-1"></i> Delete</button>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page="patients" url="user/discard_user" />
    </div>
  )
}

export default PatientDetail