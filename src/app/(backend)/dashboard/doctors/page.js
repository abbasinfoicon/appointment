'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import FetchData from '@/app/components/FetchData';
import { useCookies } from 'react-cookie';
import Loading from '@/app/loading';
import DeleteModal from '../../components/DeleteModal';

const Doctors = () => {
  const [data, setData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const [deleteContent, setDeleteContent] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', category: '' });
  const [visiblePosts, setVisiblePosts] = useState(8);
  const [postsIncrement, setPostsIncrement] = useState(4);
  const dataReverse = Array.isArray(data) ? data.slice().reverse() : [];

  const handleDeletePopup = (id) => {
    setDeleteContent(!deleteContent);
    setDeleteId(id);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsRes = await FetchData({ url: "user/doctors", method: "GET", authorization: `Bearer ${token}` });
        const appointRes = await FetchData({ url: "app/appointments", method: "GET", authorization: `Bearer ${token}`, contentType: "application/json" });

        if (!doctorsRes.ok || !appointRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const doctorsData = await doctorsRes.json();
        const appointData = await appointRes.json();

        setData(doctorsData);
        setAppointmentData(appointData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(true);
      }
    };

    fetchData();
  }, [token, deleteContent]);

  const getAppointmentsForDoctor = (doctorId) => {
    return appointmentData.filter(appointment => appointment.doctor.user.id === doctorId);
  };

  const filteredData = filters.search || filters.category
    ? dataReverse.filter(item => {
      // Check if the properties exist before calling toLowerCase()
      const fnameMatch = item.user.first_name && item.user.first_name.toLowerCase().includes(filters.search.toLowerCase());
      const lnameMatch = item.user.last_name && item.user.last_name.toLowerCase().includes(filters.search.toLowerCase());

      // Return true only if at least one condition is met
      return fnameMatch || lnameMatch;
      // Add more conditions for additional filters as needed
    })
    : dataReverse;

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
            <h4>All Doctors ({data.length})</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/doctors">Doctors</Link></li>
            <li className="breadcrumb-item active"><Link href="#">All Doctors</Link></li>
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
            <Link href="/dashboard/doctors/add" className="btn btn-outline-primary btn-lg btn-rounded mt-1 pl-5 pr-5 add-new">Add New</Link>
          </div>
        </div>
      </div>

      <div className="row">

        {
          filteredData.length > 0 ? filteredData.slice(0, visiblePosts).map((item, i) => (
            <div className="col-xl-4 col-lg-4 col-md-6" key={i}>
              <div className="card">
                <div className="card-body pos-rel">
                  <div className="text-center">
                    <div className="profile-photo eqlHeight">
                      <img src={`${item?.image == null ? "/assets/images/avatar/1.jpg" : item?.image}`} width="100" className="img-fluid rounded-circle" alt="" />
                    </div>
                    <h3 className="mt-4 mb-1">Dr. {`${item.user.first_name} ${item.user.last_name}`}</h3>
                    <p className="text-muted">{item.specialization}</p>

                    <div className="action profile-action">
                      <Link className="btn btn-primary btn-rounded pl-3 pr-3" href={`/dashboard/doctors/${item.user.id}`} ><i className="icon-eye"></i> View</Link>
                      <Link className="btn btn-info btn-rounded pl-3 pr-3 mx-2" href={`/dashboard/doctors/${item.user.id}/slot`}><i className="icon-clock"></i> Slot </Link>
                      <Link className="btn btn-info btn-rounded pl-3 pr-3 mx-2" href={`/dashboard/doctors/edit/${item.user.id}`}><i className="icon-pencil"></i> Edit </Link>
                      <button className='btn btn-rounded btn-danger' onClick={() => handleDeletePopup(item.user.id)}><i className="icon-trash pr-1"></i> Delete</button>
                    </div>
                  </div>
                  {getAppointmentsForDoctor(item.user.id).length ? <Link href={`/dashboard/doctors/${item?.user?.id}/appointment`} className="appointment"><i className="fa fa-calendar"></i> <span>{getAppointmentsForDoctor(item.user.id).length}</span></Link> : null}

                </div>
                <div className="card-footer pt-0 pb-0 text-center">
                  <div className="row">
                    <div className="col-4 pt-3 pb-3 border-right">
                      <h3 className="mb-1">{item.qualifications}</h3><span>Qualifications</span>
                    </div>
                    <div className="col-4 pt-3 pb-3 border-right">
                      <h3 className="mb-1">{item.experience}</h3><span>Experience</span>
                    </div>
                    <div className="col-4 pt-3 pb-3">
                      <h3 className="mb-1">{item.license_no}</h3><span>License No</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
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

      <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page="doctors" url="user/discard_user" />
    </div>
  )
}

export default Doctors