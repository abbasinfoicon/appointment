"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const router = useRouter();
    const [data, setData] = useState({ password: "", cpassword: "", otp: "" });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/reset-password", {
                method: "POST",
                body: JSON.stringify(data)
            })

            const result = await res.json();

            if (result.status === 400 || result.status === 409 || result.status === 500) {
                toast.error(result.message);
            }
            if (result.status === 200) {
                toast.success(result.message);

                router.push("/login");
            }

        } catch (error) {
            console.error("Password Not Created !!!", error)
        }

        setData({ password: "", cpassword: "", otp: "" });
    }

    return (
        <>
            <div className="page-content dez-login p-t50 overlay-black-dark bg-img-fix" style={{ backgroundImage: 'url(/assets/images/background/bg3.jpg)' }}>
                <div className="login-form relative z-index999 ">
                    <div id="forgot_password" className="text-center">
                        <form className="p-a30 dez-form m-t100 text-center" onSubmit={handleSubmit}>
                            <h3 className="form-title m-t0">Reset Password ?</h3>

                            <div className="dez-separator-outer m-b5">
                                <div className="dez-separator bg-primary style-liner"></div>
                            </div>
                            <p>Please check your e-mail and Enter OTP for change password.</p>

                            <div className="form-group">
                                <input type="text" name="otp" value={data.otp} onChange={handleChange} placeholder="Enter OTP" className="form-control" />
                            </div>

                            <div className="form-group">
                                <input type="text" name="password" value={data.password} onChange={handleChange} placeholder="Enter password" className="form-control" />
                            </div>

                            <div className="form-group">
                                <input type="text" name="cpassword" value={data.cpassword} onChange={handleChange} placeholder="Enter Confirm password" className="form-control" />
                            </div>

                            <div className="form-group text-left">
                                <Link className="site-button outline gray" href="/login">Back</Link>
                                <button type="submit" className="site-button pull-right">Reset Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ResetPassword