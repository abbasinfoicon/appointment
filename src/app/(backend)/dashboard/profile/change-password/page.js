'use client'
import FetchData from '@/app/components/FetchData'
import Loading from '@/app/loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const Edit = () => {
    const router = useRouter();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    const handleChangePassword = (e) => {
        setCpassword(e.target.value);
    }

    const handlePassword = async (e) => {
        e.preventDefault();

        if (!password || !cpassword) {
            toast.error("All (*) fields Required!!!");
            return;
        }

        if (password === cpassword) {
            try {
                const res = await FetchData({ url: `user/update_user/${data.id}`, body: {password}, method: "PATCH", authorization: `Bearer ${token}`, contentType: "application/json" });
                const result = await res.json();

                if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
                    toast.error(result.Error);
                }

                if (result.status === 201 || res.ok) {
                    setCpassword("");
                    toast.success("Change password Successfull!!!");
                    router.push('/dashboard/profile');
                }

            } catch (error) {
                console.error("Password not Updated !!!", error);
            }
        } else {
            toast.error("Confirm Password Not match!!!");
        }
    }

    const fetchData = async () => {
        try {
            const res = await FetchData({ url: `user/details`, method: "GET", authorization: `Bearer ${token}` });

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
    }, []);

    const toggleEye = () => {
        setShowPassword(!showPassword);
    }
    const toggleEye2 = () => {
        setShowPassword2(!showPassword2);
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>Change Password</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/profile">Profile</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Change Password</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Change password</h5>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handlePassword}>
                                <div className="col-xs-12">
                                    <div className="form-group">
                                        <label className="form-label" for="add-password">New Password</label>
                                        <div className="with-eye">
                                            <input type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" />
                                            <i onClick={toggleEye} className={`fa fa-${showPassword ? 'eye' : 'eye-slash'}`}></i>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" for="add-con-password">Confirm New Password</label>
                                        <div className="with-eye">
                                            <input type={showPassword2 ? 'text' : 'password'} name="cnpassword" value={cpassword} onChange={handleChangePassword} className="form-control" />
                                            <i onClick={toggleEye2} className={`fa fa-${showPassword2 ? 'eye' : 'eye-slash'}`}></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                    <Link className="btn" href='/dashboard/profile/'>Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit