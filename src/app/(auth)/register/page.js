'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import FetchData from '@/app/components/FetchData';
import { useCookies } from 'react-cookie';

const page = () => {
    const router = useRouter();
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ first_name: "", last_name: "", gender: "", phone_no: "", address: "", city: "", state: "", email: "", password: "" });
    const [cookies, setCookie, removeCookie] = useCookies([]);

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rememberMe) {
            setCookie('email', data.email, { maxAge: 60 * 60 * 5 });
            setCookie('password', data.password, { maxAge: 60 * 60 * 5 });
        } else {
            removeCookie('email');
            removeCookie('password');
        }

        const { gender, email, password } = data;

        try {
            const res = await FetchData({ url: "user/register", body: data, method: "POST", contentType: "application/json" });

            const result = await res.json();

            if (!gender || !email || !password) {
                toast.error("All (*) fields Required!!!");
            }

            if (password.length < 8) {
                toast.error(result.Error);
            }

            if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
                toast.error(result.Error);
            }

            if (result.status === 201 || res.ok) {
                setData({ first_name: "", last_name: "", gender: "", phone_no: "", address: "", city: "", state: "", email: "", password: "" });
                toast.success(result.Message);
                router.push("/login");
                // router.push("/email-verification");
            }

        } catch (error) {
            console.error("Register not added !!!", error)
        }
    }

    const toggleEye = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="page-content dez-login p-t50 overlay-black-dark bg-img-fix" style={{ backgroundImage: 'url(/assets/images/background/bg3.jpg)' }}>
            <div className="login-form relative z-index999 ">
                <div id="register" className="text-center">
                    <form className="p-a30 dez-form text-center" onSubmit={handleSubmit}>
                        <h3 className="form-title m-t0">Sign Up</h3>
                        <div className="dez-separator-outer m-b5">
                            <div className="dez-separator bg-primary style-liner"></div>
                        </div>
                        <p>Enter your personal details below: </p>

                        <div className="form-group">
                            <input name="first_name" value={data.first_name} onChange={handleChange} required="" className="form-control" placeholder="First Name" type="text" />
                        </div>
                        <div className="form-group">
                            <input name="last_name" value={data.last_name} onChange={handleChange} required="" className="form-control" placeholder="Last Name" type="text" />
                        </div>
                        <div className="form-group">
                            <select className='form-control' name="gender" value={data.gender} onChange={handleChange}>
                                <option>Select Gender *</option>
                                <option defaultValue="male">Male</option>
                                <option defaultValue="female">Female</option>
                                <option defaultValue="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input name="phone_no" value={data.phone_no} onChange={handleChange} required="" className="form-control" placeholder="Phone Number" type="number" />
                        </div>
                        <div className="form-group">
                            <input name="address" value={data.address} onChange={handleChange} required="" className="form-control" placeholder="Address" type="text" />
                        </div>
                        <div className="form-group">
                            <input name="city" value={data.city} onChange={handleChange} required="" className="form-control" placeholder="City/Town" type="text" />
                        </div>
                        <div className="form-group">
                            <input name="state" value={data.state} onChange={handleChange} required="" className="form-control" placeholder="State" type="text" />
                        </div>

                        <label className="text-left m-b20">Enter your account details below: </label>

                        <div className="form-group">
                            <input name="email" value={data.email} onChange={handleChange} required="" className="form-control" placeholder="Email Id *" type="text" />
                        </div>
                        <div className="form-group">
                            <div className='with-eye'>
                                <input type={showPassword ? 'text' : 'password'} name="password" value={data.password} onChange={handleChange} required="" className="form-control" placeholder="Password *" />
                                <i onClick={toggleEye} className={`fa fa-${showPassword ? 'eye' : 'eye-slash'}`}></i>
                            </div>

                        </div>

                        <label className="m-b30 pass-check">
                            <input id="checkAgree" type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                            <label className="terms-text" htmlFor='checkAgree'>I agree to the <Link href="/terms-of-service">Terms of Service</Link> & <Link href="/privacy-policy">Privacy Policy </Link></label>
                        </label>
                        <div className="form-group text-left ">
                            <Link className="site-button outline gray" href="/login">Back</Link>
                            <button className="site-button pull-right" type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page