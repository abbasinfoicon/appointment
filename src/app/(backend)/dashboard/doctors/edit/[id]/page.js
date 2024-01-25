'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import FetchData from '@/app/components/FetchData';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/app/loading';
import JEditor from '@/app/(backend)/components/JEditor';

const EditDoctor = () => {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const id = params.id;
    const [dataImg, setDataImg] = useState("");
    const [data, setData] = useState({
        user: "",
        email: "",
        first_name: "",
        last_name: "",
        gender: "",
        phone_no: "",
        address: "",
        city: "",
        state: "",
        brief_description: "",
        specialization: "",
        qualifications: "",
        experience: "",
        license_no: "",
        consultation_fees_online: "",
    });
    const [content, setContent] = useState('');

    const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: `user/doctor/${id}`, method: "GET" });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();
                const newData = {
                    user: result.user.id,
                    email: result.user.email,
                    first_name: result.user.first_name,
                    last_name: result.user.last_name,
                    gender: result.user.gender,
                    phone_no: result.user.phone_no,
                    address: result.user.address,
                    city: result.user.city,
                    state: result.user.state,

                    brief_description: result.brief_description,
                    specialization: result.specialization,
                    experience: result.experience,
                    license_no: result.license_no,
                    consultation_fees_online: result.consultation_fees_online
                };
                setData(newData);
                setDataImg(result.image);
                setContent(result.brief_description)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(true);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            data.brief_description = content;
            const res = await FetchData({ url: `user/update_doctor/${id}`, body: data, method: "PATCH", authorization: `Bearer ${token}`, contentType: "application/json" });
            const result = await res.json();

            if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
                toast.error(result.Error);
            }

            if (result.status === 201 || res.ok) {
                setData({ first_name: "", last_name: "", gender: "", phone_no: "", address: "", city: "", state: "", email: "", roles: "" });
                toast.success("Data Update successfull!!");
                router.push('/dashboard/doctors');
            }

        } catch (error) {
            console.error("Doctors not Updated !!!", error)
        }
    }

    const handleChangeImg = (e) => {
        setDataImg({ ...dataImg, [e.target.name]: e.target.files?.[0] });
    }

    const handleImage = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', dataImg.image);

        try {
            const resImg = await FetchData({ url: `user/update_doctor/${id}`, formdata: formData, method: "PATCH", authorization: `Bearer ${token}` });
            const upimg = await resImg.json();

            if (upimg.status === 400 || upimg.status === 409 || upimg.status === 500 || upimg.status === 415) {
                toast.error(upimg.Error);
            }

            if (upimg.status === 201 || resImg.ok) {
                toast.success("Profile Update successfull!!");
                router.push('/dashboard/doctors');
            }

        } catch (error) {
            console.error("Profile not Updated !!!", error)
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>Edit Doctor</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/doctors">Doctors</Link></li>

                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <form className="edit_Form" onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="card-header">
                                <h5 className="card-title">Basic Info</h5>
                            </div>

                            <div className="card-body">
                                <div className="col-xs-12">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">User ID</label>
                                                <div className="controls">
                                                    <input type="number" className="form-control" name='user' defaultValue={data.user} placeholder='User ID' disabled />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">Email</label>
                                                <div className="controls">
                                                    <input type="email" className="form-control" name='email' defaultValue={data.email} placeholder='Email ID' disabled />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4 form-group">
                                            <label className="form-label">First Name *</label>
                                            <input type="text" name='first_name' value={data.first_name} onChange={handleChange} className="form-control" placeholder="Enter First Name" />
                                        </div>

                                        <div className="col-md-4 form-group">
                                            <label className="form-label">Last Name *</label>
                                            <input type="text" name='last_name' value={data.last_name} onChange={handleChange} className="form-control" placeholder="Enter Last Name" />
                                        </div>

                                        <div className="col-md-4 form-group">
                                            <label className="form-label">Gender</label>
                                            <select className="form-control" name='gender' value={data.gender} onChange={handleChange}>
                                                <option>--select--</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>

                                        <div className="col-md-4 form-group">
                                            <label className="form-label">Phone *</label>
                                            <input type="number" name='phone_no' value={data.phone_no} onChange={handleChange} className="form-control" placeholder="(+91) 123 456 7890" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-3 form-group">
                                            <label className="form-label">Address</label>
                                            <input type="text" name='address' value={data.address} onChange={handleChange} className="form-control" placeholder="Enter Address" />
                                        </div>

                                        <div className="col-md-3 form-group">
                                            <label className="form-label">City</label>
                                            <input type="text" name='city' value={data.city} onChange={handleChange} className="form-control" placeholder="Enter City" />
                                        </div>

                                        <div className="col-md-3 form-group">
                                            <label className="form-label">State</label>
                                            <input type="text" name='state' value={data.state} onChange={handleChange} className="form-control" placeholder="Enter State" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="col-xs-12">
                                    <div className="form-group">
                                        <label className="form-label">Brief Description</label>
                                        <JEditor content={content} setContent={setContent} />
                                        {/* <textarea className="form-control" cols="5" name="brief_description" value={data.brief_description} onChange={handleChange} ></textarea> */}
                                        <small className="text-muted">Enter any size of text description here</small>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label className="form-label">Specialization</label>
                                            <div className="controls">
                                                <input type="text" className="form-control" name='specialization' value={data.specialization} onChange={handleChange} placeholder='Enter Specialization' />
                                            </div>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label className="form-label">Qualifications</label>
                                            <div className="controls">
                                                <input type="text" className="form-control" name='qualifications' value={data.qualifications} onChange={handleChange} placeholder='Enter Qualifications' />
                                            </div>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label className="form-label">Experience</label>
                                            <div className="controls">
                                                <input type="number" className="form-control" name='experience' value={data.experience} onChange={handleChange} placeholder='Enter Experience' />
                                            </div>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label className="form-label">Licence Number</label>
                                            <div className="controls">
                                                <input type="text" className="form-control" name='license_no' value={data.license_no} onChange={handleChange} placeholder='Enter Licence Number' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-header">
                                <h5 className="card-title">Doctor Fees Info</h5>
                            </div>

                            <div className="card-body">
                                <div className="col-xs-12">
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label className="form-label">Consultation Fees Online</label>
                                            <input type="number" className="form-control" name='consultation_fees_online' value={data.consultation_fees_online} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-12">
                                    <button type='submit' className="btn btn-primary">Update</button>
                                    <Link className="btn" href='/dashboard/doctors/'>Cancel</Link>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="card">
                        <form className="edit_Form" onSubmit={handleImage} encType="multipart/form-data">
                            <div className="card-header">
                                <h5 className="card-title">Update Profile Image</h5>
                            </div>
                            <div className="card-body">
                                <div className="col-xs-12">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <label className="form-label" >Profile Image</label>
                                                <input type="file" id="image" className="form-control" name='image' onChange={handleChangeImg} accept="image/gif, image/jpeg, image/png" />
                                            </div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <img src={dataImg} alt="" className="img-fluid" width="100" />
                                            </div>
                                        </div>


                                        <div className="col-md-12">
                                            <button type='submit' className="btn btn-primary">Update</button>
                                            <Link className="btn" href='/dashboard/doctors/'>Cancel</Link>
                                        </div>
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

export default EditDoctor