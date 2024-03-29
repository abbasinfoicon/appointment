'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FetchData from '@/app/components/FetchData';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useGetAllDoctorQuery, useGetSlotByDrQuery } from '@/redux/slices/serviceApi';
import JEditor from '@/app/(backend)/components/JEditor';

const Edit = () => {
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const docId = searchParams.get('docId');
  const router = useRouter();
  const [data, setData] = useState({ slot_date: '', slot_start_time: '', slot_end_time: '', doctor: '', patient: '', description: '' });
  const [content, setContent] = useState('');
  const [drid, setDrId] = useState("");
  const [drdate, setDrdate] = useState(data?.slot_date);
  const [slot, setSlot] = useState([]);
  const [dataByDate, setDataByDate] = useState([]);
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const allDoctor = useGetAllDoctorQuery();
  const slotbydr = useGetSlotByDrQuery(drid);
  const dr = allDoctor?.data;

  const fetchData = async () => {
    try {
      const res = await FetchData({ url: `app/appointment/${id}`, method: "GET", authorization: `Bearer ${token}` });

      if (!res.ok) {
        throw new Error('Failed to fetch data from app/appointment/id');
      }

      const result = await res.json();
      setData(result.data);
      setDrId(result?.data?.doctor?.user?.id);
      setDrdate(result?.data?.slot_date)
      setContent(result?.data?.description);

      if (drid) {
        const res2 = await FetchData({ url: `app/all_slot_v/${drid}`, method: "POST" });
        if (!res2.ok) {
          throw new Error('Failed to fetch data from app/all_slot_v');
        }

        const result2 = await res2.json();
        setSlot(result2.data);
      }

      if (drid && drdate) {
        const res3 = await FetchData({ url: `app/all_slot/${drid}/${drdate}`, method: "GET" });
        if (!res3.ok) {
          throw new Error('Failed to fetch data from app/all_slot');
        }

        const result3 = await res3.json();
        setDataByDate(result3.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, drid, drdate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const handleChangeDr = (e) => {
    setDrId(e.target.value);
  }
  const handleChangeDate = (e) => {
    setDrdate(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      data.description = content;
      const res = await FetchData({ url: `app/updateAppointment/${id}`, body: data, method: "PATCH", authorization: `Bearer ${token}`, contentType: "application/json" });

      const result = await res.json();

      if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
        toast.error(result.Error);
      }

      if (result.status === 201 || res.ok) {
        setData({ slot_date: '', slot_start_time: '', slot_end_time: '', doctor: '', description: '' });
        toast.success("Data Update successful!!");
        router.push('/dashboard/appointments');
      }
    } catch (error) {
      console.error("Appointment not Updated !!!", error);
    }
  };

  const onlyUnique = (value, index, array) => {
    const firstIndex = array.findIndex(item => item.slot_date === value.slot_date);
    return index === firstIndex;
  };

  const today = new Date().toISOString().split('T')[0];
  const filteredSlots = slot.filter(item => item.slot_date >= today);
  const unique = filteredSlots.filter(onlyUnique);


  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>Update Appointments</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            {docId === null ? null : <li className="breadcrumb-item"><Link href="/dashboard/doctors">Doctors</Link></li>}
            <li className="breadcrumb-item"><Link href={`/dashboard/${docId === null ? 'appointments' : `doctors/${docId}/appointment`}`}>Appointment</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Update Appointments</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card">
            <form className="reg-form" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    <div className="form-group">
                      <label className="form-label">Patient</label>
                      <input type="text" name="patient" value={`${data.patient.first_name} ${data.patient.last_name}`} className="form-control" readOnly />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">Doctor Lists</label>
                      <select name="doctor" value={drid} onChange={(e) => handleChangeDr(e)} id="" className="form-control">
                        <option value="">select doctor</option>
                        {
                          dr ? dr?.map((item, i) => <option value={item?.user?.id} key={i}>{item?.user?.first_name} {item?.user?.last_name}</option>) : <option>Doctor not found</option>
                        }
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">Slot Date</label>
                      <select name="slot_date" className="form-control" value={drdate} onChange={(e) => handleChangeDate(e)}>
                        <option value="">select date</option>
                        {
                          unique.length > 0 ? unique?.map((item, i) => <option key={i} value={item.slot_date}>{item.slot_date}</option>) : <option value="">Slot Not Avalable</option>
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className="col-md-4 form-group">
                    <label className="form-label">Start Time</label>
                    <select name="slot_start_time" className="form-control" value={data.slot_start_time} onChange={handleChange}>
                      <option value="">start time</option>
                      {
                        dataByDate ? dataByDate?.map((item, i) => <option key={i} value={item.slot_start_time}>{item.slot_start_time}</option>) : <option value="">Slot Not Avalable</option>
                      }
                    </select>
                  </div>

                  <div className="col-md-4 form-group">
                    <label className="form-label">End Time</label>
                    <select name="slot_end_time" className="form-control" value={data.slot_end_time} onChange={handleChange}>
                      <option value="">end date</option>
                      {
                        dataByDate ? dataByDate?.map((item, i) => <option key={i} value={item.slot_end_time}>{item.slot_end_time}</option>) : <option value="">Slot Not Avalable</option>
                      }
                    </select>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">Description *</label>
                      <JEditor content={content} setContent={setContent} />
                      {/* <textarea name="description" value={data.description} onChange={handleChange} rows="4" className="form-control" placeholder="Your Message..." required></textarea> */}
                    </div>
                  </div>

                  <div className="col-xs-12">
                    <button type='submit' className="btn btn-primary">Make An Appointment</button>
                    <button type="reset" className="btn">Cancel</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit