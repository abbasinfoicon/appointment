'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import FetchData from '@/app/components/FetchData';

const EmailVarification = () => {
    const router = useRouter();
    const [data, setData] = useState({ opt: "" });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await FetchData({ url: "user/register", body: data, method: "POST", contentType: "application/json" });

            const result = await res.json();

            if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
                toast.error(result.Error);
            }

            if (result.status === 201 || res.ok) {
                setData({ otp: "" });
                toast.success(result.Message);
                router.push("/dashboard");
            }

        } catch (error) {
            console.error("Register not added !!!", error)
        }
    }

    return (
        <div className="page-content dez-login p-t50 overlay-black-dark bg-img-fix" style={{ backgroundImage: 'url(/assets/images/background/bg3.jpg)' }}>
            <div className="login-form relative z-index999 ">
                <div id="forgot_password" className="text-center">
                    <form className="p-a30 dez-form m-t100 text-center" onSubmit={handleSubmit}>
                        <h3 className="form-title m-t0">Confirmation of OTP</h3>
                        <div className="dez-separator-outer m-b5">
                            <div className="dez-separator bg-primary style-liner"></div>
                        </div>
                        <p>Please Enter OTP from your email.</p>

                        <div className="form-group">
                            <input name="opt" value={data.opt} onChange={handleChange} className="form-control" placeholder="Enter OTP" type="text" required="" />
                        </div>

                        <div className="form-group text-left">
                            <Link className="site-button outline gray" href="/login">Back</Link>
                            <button className="site-button pull-right" type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmailVarification