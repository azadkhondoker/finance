import Layout from "./Layout.jsx";

function Dashboard() {
  return (
    <Layout>
        <div className="main-content-inner" id="main-content">
            <div className="sales-report-area mt-5 mb-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="single-report mb-xs-30">
                            <div className="s-report-inner pe--20 pt--30 mb-3">
                                <div className="icon icon-blue"><i className="fa-brands fa-bitcoin"></i></div>
                                <div className="s-report-title d-flex justify-content-between">
                                    <h4 className="header-title mb-0">Bitcoin</h4>
                                    <p>24 H</p>
                                </div>
                                <div className="d-flex justify-content-between pb-2">
                                    <h2>$ 4567809,987</h2>
                                    <span>- 45.87</span>
                                </div>
                            </div>
                            <canvas id="coin_sales1" height="100"></canvas>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="single-report mb-xs-30">
                            <div className="s-report-inner pe--20 pt--30 mb-3">
                                <div className="icon icon-amber"><i className="fa-solid fa-bolt"></i></div>
                                <div className="s-report-title d-flex justify-content-between">
                                    <h4 className="header-title mb-0">Bitcoin Dash</h4>
                                    <p>24 H</p>
                                </div>
                                <div className="d-flex justify-content-between pb-2">
                                    <h2>$ 4567809,987</h2>
                                    <span>- 45.87</span>
                                </div>
                            </div>
                            <canvas id="coin_sales2" height="100"></canvas>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="single-report">
                            <div className="s-report-inner pe--20 pt--30 mb-3">
                                <div className="icon icon-emerald"><i className="fa-brands fa-ethereum"></i></div>
                                <div className="s-report-title d-flex justify-content-between">
                                    <h4 className="header-title mb-0">Ethereum</h4>
                                    <p>24 H</p>
                                </div>
                                <div className="d-flex justify-content-between pb-2">
                                    <h2>$ 4567809,987</h2>
                                    <span>- 45.87</span>
                                </div>
                            </div>
                            <canvas id="coin_sales3" height="100"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>    
  );
}

export default Dashboard;