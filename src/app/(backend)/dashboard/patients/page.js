'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import FetchData from '@/app/components/FetchData';
import { useCookies } from 'react-cookie';
import Loading from '@/app/loading';
import DeleteModal from '../../components/DeleteModal';

const Patients = () => {
  const [data, setData] = useState({});
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;
  const [deleteContent, setDeleteContent] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', category: '' });
  const [visiblePosts, setVisiblePosts] = useState(8);
  const [postsIncrement, setPostsIncrement] = useState(4);

  const handleDeletePopup = (id) => {
    setDeleteContent(!deleteContent);
    setDeleteId(id);
  }

  const fetchData = async () => {
    try {
      const res = await FetchData({ url: "user/all_patient", method: "POST", authorization: `Bearer ${token}` });

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

  useEffect(() => {
    fetchData();
  }, [token, deleteContent]);

  const filteredData = filters.search || filters.category
    ? data.filter(item => {
      // Check if the properties exist before calling toLowerCase()
      const fnameMatch = item.first_name && item.first_name.toLowerCase().includes(filters.search.toLowerCase());
      const lnameMatch = item.last_name && item.last_name.toLowerCase().includes(filters.search.toLowerCase());

      // Return true only if at least one condition is met
      return fnameMatch || lnameMatch;
      // Add more conditions for additional filters as needed
    })
    : data;

  const showMore = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + postsIncrement);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>All Patient</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/patients">Patient</Link></li>
            <li className="breadcrumb-item active"><Link href="#">All Patient</Link></li>
          </ol>
        </div>
      </div>

      <div className="row page-titles mx-0 justify-content-between">
        <div className="col-sm-3">
          <div className="form-search">
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <input id="" className="form-control" placeholder="Search Patient..." type="search" name=""
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
              <button className="search-btn"><i className="mdi mdi-magnify"></i></button></form>
          </div>
        </div>

        <div className="col-sm-2">
          <div className="add-new text-right">
            <Link href="/dashboard/patients/add-patient" className="btn btn-outline-primary btn-lg btn-rounded mt-1 pl-5 pr-5 add-new">Add New</Link>
          </div>
        </div>
      </div>

      <div className="row">
        {
          data.length > 0 ?
            filteredData.slice(0, visiblePosts).map((item, index) => {
              return (
                <div className="col-xl-3 col-lg-3 col-md-6" key={index}>
                  <div className="card">
                    <div className="text-center py-4 px-5 overlay-box" style={{ backgroundImage: 'url(/assets/images/big/img1.jpg)' }}>
                      <div className="profile-photo">
                        <img src={`/assets/images/patients/patient${item.gender === "Male" ? "2" : "1"}.png`} width="100" className="img-fluid rounded-circle" alt="" />
                      </div>

                      <h3 className="mt-3 mb-1 text-white">{item.first_name} {item.last_name}</h3>
                      <p className="text-white mb-0">{item.email}</p>
                    </div>

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between">
                        <span className="mb-0">Patient Id</span>
                        <strong className="text-muted">{item.id}</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span className="mb-0">Phone No.</span>
                        <strong className="text-muted">{item.phone_no}</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span className="mb-0">Gender</span>
                        <strong className="text-muted">{item.gender}</strong>
                      </li>
                    </ul>

                    <div className="card-footer border-0 mt-0 text-center">
                      <Link className="btn btn-primary btn-rounded pl-3 pr-3" href={`/dashboard/patients/${item.id}`} ><i className="icon-eye pr-1"></i>View</Link>
                      <Link className="btn btn-info btn-rounded pl-3 pr-3 mx-2" href={`/dashboard/patients/edit/${item.id}`}><i className="icon-pencil pr-1"></i> Edit </Link>
                      <button className='btn btn-rounded btn-danger' onClick={() => handleDeletePopup(item.id)}><i className="icon-trash pr-1"></i> Delete</button>
                    </div>
                  </div>
                </div>
              );
            })
            : <p>No data found</p>
        }


        {visiblePosts < filteredData.length && (
          <div className="col-md-12 my-3">
            <div className="load-more text-center">
              <button className='btn btn-more btn-primary mx-auto' onClick={showMore}>Load More</button>
            </div>
          </div>
        )}
      </div>

      <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page="patients" url="user/discard_user" />
    </div>
  )
}

export default Patients