
function Invoice(){
    return(
            <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <div className="invoice-area">
                                    <div className="invoice-head">
                                        <div className="row">
                                            <div className="iv-left col-6">
                                                <span>INVOICE</span>
                                            </div>
                                            <div className="iv-right col-6 text-md-right">
                                                <span>#34445998</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-md-6">
                                            <div className="invoice-address">
                                                <h3>invoiced to</h3>
                                                <h5>Verdie Hintz</h5>
                                                <p>4494 Weekley Street, San Antonio, 78205 Texas</p>
                                                <p>San Antonio</p>
                                                <p>Somalia</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 text-md-right">
                                            <ul className="invoice-date">
                                                <li>Invoice Date : sat 18 | 07 | 2018</li>
                                                <li>Due Date : sat 18 | 07 | 2018</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="invoice-table table-responsive mt-5">
                                        <table className="table table-bordered table-hover text-end">
                                            <thead>
                                                <tr className="text-capitalize">
                                                    <th className="text-center" style={{width: '5%;'}}>id</th>
                                                    <th className="text-left" style={{width: '45%', minWidth: '130px'}}>description</th>
                                                    <th>qty</th>
                                                    <th style={{minWidth: '100px'}}>Unit Cost</th>
                                                    <th>total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">1</td>
                                                    <td className="text-left">Crazy Toys</td>
                                                    <td>1</td>
                                                    <td>$20</td>
                                                    <td>$40</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">2</td>
                                                    <td className="text-left">Beautiful flowers</td>
                                                    <td>2</td>
                                                    <td>$50</td>
                                                    <td>$100</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="4">total balance :</td>
                                                    <td>$140</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                <div className="invoice-buttons text-end">
                                    <a href="#" className="invoice-btn">print invoice</a>
                                    <a href="#" className="invoice-btn">send invoice</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
}

export default Invoice;