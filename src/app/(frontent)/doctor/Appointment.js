'use client'
import FetchData from '@/app/components/FetchData';
import { useGetAllUserQuery } from '@/redux/slices/serviceApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const Appointment = ({ slot, drId }) => {    
    const router = useRouter();
    const [login, setLogin] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [detail, setDetail] = useState({});
    const [data, setData] = useState({ name: '', email: '', phone_no: '', slot_date: '', slot_start_time: '', slot_end_time: '', description: '' });
    const [drdate, setDrdate] = useState("");

    const [cookies, setCookie] = useCookies(['access_token']);
    const token = cookies.access_token;
    const patientExit = useGetAllUserQuery(token || undefined);

    useEffect(() => {
        setDetail(patientExit?.data?.data);
        {
            token ? setData({
                name: patientExit.data?.data?.first_name || '',
                email: patientExit.data?.data?.email || '',
                phone_no: patientExit.data?.data?.phone_no || '',
            }) : null
        }

    }, [token, patientExit])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleChangeLogin = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const handleChangeDate = (e) => {
        setDrdate(e.target.value);
    }

    const formSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = login;

        if (!email || !password) {
            toast.error("All fields Required!!!");
        } else {
            try {
                const res = await FetchData({ url: "user/login", body: login, method: "POST", contentType: "application/json" });

                if (!res.ok) {
                    const errorText = await res.text();
                    console.error('Error:', errorText);
                    toast.error('Login failed. Please try again later.');
                } else {
                    const result = await res.json();

                    const access_token = result.data.access_token;
                    const refresh_token = result.data.refresh_token;
                    const role = result.data.user_role;
                    const user_id = result.data.user_id;

                    if (result.status === 201 || res.ok) {

                        toast.success("Login successfully!!!");

                        const expirationTime = new Date();
                        expirationTime.setHours(expirationTime.getHours() + 5); // expire in 5 hours

                        setCookie('access_token', access_token, { expires: expirationTime });
                        setCookie('refresh_token', refresh_token, { expires: expirationTime });
                        setCookie('role', role, { expires: expirationTime });
                        setCookie('user_id', user_id, { expires: expirationTime });

                    } else {
                        toast.error(result.Error);
                    }
                }

            } catch (error) {
                console.error("error", error);
                toast.error('Login failed. Please try again later.');
            }
        }
    }

    const toggleEye = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { slot_start_time, slot_end_time, description } = data;

        try {
            if (!drdate || !slot_start_time || !slot_end_time || !description) {
                toast.error("All (*) fields Required!!!");
                return;
            }

            data.patient = patientExit.data?.data?.id;
            data.doctor = drId;
            data.slot_date = drdate;
            const res = await FetchData({ url: "app/c_appointment", body: data, method: "POST", authorization: `Bearer ${token}`, contentType: "application/json" });
            const result = await res.json();

            if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
                toast.error(result.Error);
            }

            if (result.status === 201 || res.ok) {
                setData({ name: '', email: '', phone_no: '', slot_date: '', slot_start_time: '', slot_end_time: '', description: '' });
                setDrdate("")
                toast.success("Appointment Submit Successfull");
                router.push('/my-account/appointment');
            }

        } catch (error) {
            console.error("Appointment not added !!!", error)
        }
    }

    const onlyUnique = (value, index, array) => {
        const firstIndex = array.findIndex(item => item.slot_date === value.slot_date);
        return index === firstIndex;
    };

    const today = new Date().toISOString().split('T')[0];
    const filteredSlots = slot.filter(item => item.slot_date >= today);
    const unique = filteredSlots.filter(onlyUnique);

    return (
        <div className="make_appointment">
            {
                token ?
                    <form className="team_details_form" onSubmit={handleSubmit}>
                        <h5>Make an Appointment</h5>

                        <div className="row">
                            <div className="col-xx-6 col-md-6 col-lg-12">
                                <input name="name" value={data.name} onChange={handleChange} type="text" className="form-control" placeholder="Your Name" required />
                            </div>

                            <div className="col-xx-6 col-md-6 col-lg-12">
                                <input name="email" value={data.email} onChange={handleChange} type="email" className="form-control" placeholder="Your Email Id" required />
                            </div>

                            <div className="col-xx-6 col-md-6 col-lg-12">
                                <input name="phone_no" value={data.phone_no} onChange={handleChange} type="tel" className="form-control" placeholder="Your Phone numer" required />
                            </div>

                            <div className="col-xx-6 col-md-6 col-lg-12">
                                <select className="select_2 form-control" name="slot_date" value={drdate} onChange={(e) => handleChangeDate(e)}>
                                    <option value="">Select Date</option>
                                    {
                                        unique ? unique?.map((item, i) => <option key={i} value={item.slot_date}>{item.slot_date}</option>) : <option value="">Date Not Avalable</option>
                                    }
                                </select>
                            </div>

                            <div className="col-xx-6 col-md-6 col-lg-12">
                                <select className="reservation_input select_2 form-control" name="slot_start_time" value={data.slot_start_time} onChange={handleChange}>
                                    <option value="">Select Time</option>
                                    {
                                        slot ? slot?.map((item, i) => <option key={i} value={item.slot_start_time}>{item.slot_start_time}</option>) : <option value="">Slot Not Avalable</option>
                                    }
                                </select>
                            </div>

                            <div className="col-xl-12">
                                <select className="reservation_input select_2 form-control" name="slot_end_time" value={data.slot_end_time} onChange={handleChange}>
                                    <option value="">Select Time</option>
                                    {
                                        slot ? slot?.map((item, i) => <option key={i} value={item.slot_end_time}>{item.slot_end_time}</option>) : <option value="">Slot Not Avalable</option>
                                    }
                                </select>
                            </div>

                            <div className="col-xl-12">
                                <textarea name="description" value={data.description} onChange={handleChange} rows="4" className="form-control mb-3" placeholder="Your Message..." required></textarea>
                            </div>

                            <div className="col-xl-12 text-center">
                                <button type="submit" value="Submit" className="site-button white outline" name="submit"> <span>Make An Appointment</span> </button>
                            </div>
                        </div>
                    </form>

                    : <form className="team_details_form" onSubmit={formSubmit}>
                        <h5>Login for Appointment</h5>

                        <div className="col-xx-6 col-md-6 col-lg-12">
                            <input name="email" value={login.email} onChange={handleChangeLogin} className="form-control" placeholder="Enter Email id" type="text" />
                        </div>

                        <div className="col-xx-6 col-md-6 col-lg-12">
                            <div className='with-eye'>
                                <input type={showPassword ? 'text' : 'password'} name="password" value={login.password} onChange={handleChangeLogin} className="form-control " placeholder="Enter Password" />
                                <i onClick={toggleEye} className={`fa fa-${showPassword ? 'eye' : 'eye-slash'}`}></i>
                            </div>
                        </div>

                        <div className="col-xl-12 text-center">
                            <button type="submit" value="Submit" className="site-button white outline" name="submit"> <span>Login An Appointment</span> </button>
                        </div>

                        <div className="bg-primary p-a15 text-center">
                            New User - <Link href="/register" className="text-white justify-content-center"><small><u>Create an account</u></small></Link>
                        </div>
                    </form>
            }

        </div>
    )
}

export default Appointment