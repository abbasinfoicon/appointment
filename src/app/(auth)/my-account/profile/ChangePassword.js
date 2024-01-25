"use client"
import FetchData from '@/app/components/FetchData';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const ChangePassword = ({ userId }) => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    const handlePassword = async (e) => {
        e.preventDefault();

        if (!password || !cpassword) {
            toast.error("All (*) fields Required!!!");
            return;
        }

        if (password !== cpassword) {
            toast.error("confirm password not match!!!");
            return;
        }

        try {
            const res = await FetchData({ url: `user/update_user/${userId}`, body: { password }, method: "PATCH", authorization: `Bearer ${token}`, contentType: "application/json" });
            const result = await res.json();

            if (result.status === 201 || res.ok) {
                setPassword("");
                setCpassword("");
                toast.success(result.Message);
                router.push('/my-account');
            }

        } catch (error) {
            console.error("Password not Change !!!", error)
        }
    }

    const toggleEye = () => {
        setShowPassword(!showPassword);
    }

    return (
        <form onSubmit={handlePassword}>
            <div className="row">
                <div className='col-md-6'>
                    <div className="col-md-12">
                        <div className="dashboard_profile_form">
                            <label>New Password</label>
                            <div className="with-eye">
                                <input type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder="New Password" />
                                <i onClick={toggleEye} className={`fa fa-${showPassword ? 'eye' : 'eye-slash'}`}></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <div className="dashboard_profile_form">
                            <label>Confirm New Password</label>
                            <input type={showPassword ? 'text' : 'password'} name="cpassword" value={cpassword} onChange={(e) => setCpassword(e.target.value)} className='form-control' placeholder="ChangePassword" />
                        </div>
                    </div>
                </div>

                <div className="col-xl-12">
                    <button type='submit' className="common_btn">Save Change</button>
                </div>
            </div>
        </form>
    )
}

export default ChangePassword