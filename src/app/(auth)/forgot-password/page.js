"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await FetchData({ url: "user/forgotPassword", body: email, method: "POST", contentType: "application/json" });

            const result = await res.json();

            if (result.status === 409 || result.status === 500 || result.status === 400) {
                toast.error(result.message);
            }
            if (result.status === 200) {
                toast.success(result.message);
                setEmail('');
                router.push("/reset-password");
            }
        } catch (error) {
            console.error('Password reset request failed.', error);
        }
    };

    return (
        <div className="page-content dez-login p-t50 overlay-black-dark bg-img-fix" style={{ backgroundImage: 'url(/assets/images/background/bg3.jpg)' }}>
            <div className="login-form relative z-index999 ">
                <div id="forgot_password" className="text-center">
                    <form className="p-a30 dez-form m-t100 text-center" onSubmit={handleSubmit}>
                        <h3 className="form-title m-t0">Forget Password ?</h3>
                        <div className="dez-separator-outer m-b5">
                            <div className="dez-separator bg-primary style-liner"></div>
                        </div>
                        <p>Enter your e-mail address below to reset your password. </p>

                        <div className="form-group">
                            <input name="dzName" required="" className="form-control" placeholder="Email Id" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group text-left">
                            <Link className="site-button outline gray" href="/login">Back</Link>
                            <button className="site-button pull-right">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword