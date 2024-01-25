'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import FetchData from '@/app/components/FetchData';

const Login = () => {
    const router = useRouter();
    const [data, setData] = useState({ email: "", password: "" });
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies([]);

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    }

    useEffect(() => {
        const getCookie = (cname) => {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        };

        const emailCookie = getCookie("email") || "";
        const passwordCookie = getCookie("password") || "";

        setData({
            email: emailCookie,
            password: passwordCookie
        });
    }, []);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const formSubmit = async (e) => {
        e.preventDefault();

        if (rememberMe) {
            setCookie('email', data.email, { maxAge: 60 * 60 * 5 });
            setCookie('password', data.password, { maxAge: 60 * 60 * 5 });
        } else {
            removeCookie('email');
            removeCookie('password');
        }

        const { email, password } = data;

        if (!email || !password) {
            toast.error("All fields Required!!!");
        } else {
            try {
                const res = await FetchData({ url: "user/login", body: data, method: "POST", contentType: "application/json" });
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


                    if (result.data.user_role === "Patient") {
                        router.push('/my-account');
                    } else {
                        router.push('/dashboard');
                    }

                } else {
                    toast.error(result.Error);
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

    return (
        <div className="page-content dez-login p-t50 overlay-black-dark bg-img-fix" style={{ backgroundImage: 'url(/assets/images/background/bg3.jpg)' }}>
            <div className="login-form relative z-index999 ">
                <div id="login" className="text-center">
                    <form className="p-a30 dez-form  m-t100" onSubmit={formSubmit}>
                        <h3 className="form-title m-t0">Sign In</h3>
                        <div className="dez-separator-outer m-b5">
                            <div className="dez-separator bg-primary style-liner"></div>
                        </div>
                        <p>Enter your e-mail address and your password. </p>

                        <div className="form-group">
                            <input name="email" value={data.email} onChange={handleChange} className="form-control" placeholder="Enter Email id" type="text" />
                        </div>
                        <div className="form-group">
                            <div className='with-eye'>
                                <input type={showPassword ? 'text' : 'password'} name="password" value={data.password} onChange={handleChange} className="form-control " placeholder="Enter Password" />
                                <i onClick={toggleEye} className={`fa fa-${showPassword ? 'eye' : 'eye-slash'}`}></i>
                            </div>
                        </div>

                        <div className="form-group text-left pass-check d-flex justify-content-between w-100">
                            <label>
                                <input id="check1" type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                                <label htmlFor="check1">Remember me</label>
                            </label>
                            <Link href="/forgot-password" className="m-l15"><i className="fa fa-unlock-alt"></i> Forgot Password</Link>
                        </div>

                        <div className="form-group text-left">
                            <button type="submit" className="site-button dz-xs-flex">login</button>
                        </div>
                    </form>
                    <div className="bg-primary p-a15 ">
                        <Link href="/register" className="text-white">Create an account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login