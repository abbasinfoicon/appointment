import React from 'react'

const Invoice = () => {
    return (
        <div className="container-fluid">

            <div className="row page-titles mx-0">
                <div className="col-sm-6 p-md-0">
                    <div className="welcome-text">
                        <h4>Patient Invoice</h4>
                    </div>
                </div>
                <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="javascript:void(0)">Billing</a></li>
                        <li className="breadcrumb-item active"><a href="javascript:void(0)">Patient Invoice</a></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Patient Invoice</h5>
                        </div>
                        <div className="card-body">
                            <div className="row m-0 bg-light mb-5">
                                <div className="col-xs-12 col-md-2 p-4 bg-primary">
                                    <h2 className="text-center my-2 text-white">Invoice</h2>
                                </div>
                                <div className="col-xs-12 col-md-3 p-4">
                                    <span className="text-muted">
                                        120 example, info 30<br />
                                        India, Road 303030<br />
                                        Phone: (+91) 123 456 7890<br />
                                    </span>
                                </div>
                                <div className="col-xs-12 col-md-3 p-4">
                                    <span className="text-muted">Order # 534687<br />30 July 2020</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 pull-left">
                                    <h5>Billed To:</h5>
                                    <address>
                                        <h4>John Smith</h4>
                                        120 example, info 30<br />
                                        India, Road 303030<br />
                                        Phone: (+91) 123 456 7890<br />
                                    </address>
                                </div>
                                <div className="col-lg-6 col-md-6 text-right">
                                    <h5>Payment Method:</h5>
                                    <address>
                                        <h4>Credit Card</h4>
                                        <span className="text-muted">Visa ending **** 9564<br />
                                            info@example.com</span>
                                    </address>
                                    <div className="mt-2">
                                        <h5 className="text-muted d-inline">Total Due:</h5> &nbsp;
                                        <h4 className="text-primary d-inline">$ 2140.00</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 mt-5">
                                <h4 className="mb-3">Order summary</h4>
                                <div className="table-responsive-sm">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="center">#</th>
                                                <th>Item</th>
                                                <th>Description</th>
                                                <th className="right">Unit Cost</th>
                                                <th className="center">Qty</th>
                                                <th className="right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="center">1</td>
                                                <td className="left strong">Origin License</td>
                                                <td className="left">Extended License</td>
                                                <td className="right">$999,00</td>
                                                <td className="center">1</td>
                                                <td className="right">$999,00</td>
                                            </tr>
                                            <tr>
                                                <td className="center">2</td>
                                                <td className="left">Custom Services</td>
                                                <td className="left">Instalation and Customization (cost per hour)</td>
                                                <td className="right">$150,00</td>
                                                <td className="center">20</td>
                                                <td className="right">$3.000,00</td>
                                            </tr>
                                            <tr>
                                                <td className="center">3</td>
                                                <td className="left">Hosting</td>
                                                <td className="left">1 year subcription</td>
                                                <td className="right">$499,00</td>
                                                <td className="center">1</td>
                                                <td className="right">$499,00</td>
                                            </tr>
                                            <tr>
                                                <td className="center">4</td>
                                                <td className="left">Platinum Support</td>
                                                <td className="left">1 year subcription 24/7</td>
                                                <td className="right">$3.999,00</td>
                                                <td className="center">1</td>
                                                <td className="right">$3.999,00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 col-sm-5"> </div>
                                    <div className="col-lg-4 col-sm-5 ml-auto">
                                        <table className="table table-clear">
                                            <tbody>
                                                <tr>
                                                    <td className="left"><strong>Subtotal</strong></td>
                                                    <td className="right">$8.497,00</td>
                                                </tr>
                                                <tr>
                                                    <td className="left"><strong>Discount (20%)</strong></td>
                                                    <td className="right">$1,699,40</td>
                                                </tr>
                                                <tr>
                                                    <td className="left"><strong>VAT (10%)</strong></td>
                                                    <td className="right">$679,76</td>
                                                </tr>
                                                <tr>
                                                    <td className="left"><strong>Total</strong></td>
                                                    <td className="right"><strong>$7.477,36</strong><br />
                                                        <strong>0.15050000 BTC</strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 text-right">
                                <a href="javasript:void(0);" target="_blank" className="btn rounded btn-md btn-primary mr-1"><i className="fa fa-print"></i> &nbsp; Print </a>
                                <a href="javasript:void(0);" target="_blank" className="btn rounded btn-md btn-primary"><i className="fa fa-send"></i> &nbsp; Proceed to payment </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Invoice