function Table(){
    return(
        
        <div className="main-content-inner" id="main-content">
                <div className="row">
                    {/* table primary start*/} 
                    <div className="col-lg-6 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="header-title">Thead Primary</h4>
                                <div className="single-table">
                                    <div className="table-responsive">
                                        <table className="table text-center">
                                            <thead className="text-uppercase bg-primary">
                                                <tr className="text-white">
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">date</th>
                                                    <th scope="col">price</th>
                                                    <th scope="col">action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>09 / 07 / 2018</td>
                                                    <td>$120</td>
                                                    <td><i className="ti-trash"></i></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>jone</td>
                                                    <td>09 / 07 / 2018</td>
                                                    <td>$150</td>
                                                    <td><i className="ti-trash"></i></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>09 / 07 / 2018</td>
                                                    <td>$120</td>
                                                    <td><i className="ti-trash"></i></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>jone</td>
                                                    <td>09 / 07 / 2018</td>
                                                    <td>$150</td>
                                                    <td><i className="ti-trash"></i></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* table primary end*/} 
                </div>
            </div>
    );
}

export default Table;