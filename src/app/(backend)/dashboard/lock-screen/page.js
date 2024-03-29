import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="authincation h-100">
            <div className="container h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-md-6">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">
                                        <h4 className="text-center mb-4">Account Locked</h4>
                                        <form action="index.html">
                                            <div className="form-group">
                                                <label><strong>Password</strong></label>
                                                <input type="password" className="form-control" value="Password" />
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary btn-block">Unlock</button>
                                                <Link className="btn" href='/dashboard/'>Cancel</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page