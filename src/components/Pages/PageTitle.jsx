
function PageTitle() {
    return (
        <div className="page-title-area">
            <div className="row align-items-center">
                <div className="col-sm-6">
                    <div className="breadcrumbs-area clearfix">
                        <h1 className="page-title float-start">Dashboard</h1>
                        <ul className="breadcrumbs float-start">
                            <li> <a href="index.html">Home</a></li>
                            <li> <span>Dashboard</span></li>
                        </ul>
                    </div>
                </div>

                <div className="col-sm-6 clearfix">
                    <div className="user-profile float-end">
                        <picture>
                            <source srcSet="/assets/images/author/avatar.avif" type="image/avif"/>
                            <img className="avatar user-thumb" src="assets/images/author/avatar.png" alt="avatar"/>
                        </picture>
                        <h4  className="user-name dropdown-toggle"  data-bs-toggle="dropdown">Aigars Silkalns<i className="fa-solid fa-angle-down"></i></h4>

                        <div className="dropdown-menu user-dropdown">

                            <a  className="dropdown-item"  href="profile.html"><i className="fa-solid fa-user"></i>{" "}My Profile</a>

                            <a  className="dropdown-item"  href="notifications.html"><i className="fa-solid fa-envelope"></i>{" "}Inbox<span className="badge rounded-pill bg-primary ms-auto">3</span>
                            </a>

                            <a className="dropdown-item" href="settings.html"><i className="fa-solid fa-gear"></i>{" "}Account Settings</a>

                            <a className="dropdown-item" href="screenlock.html"> <i className="fa-solid fa-lock"></i> {" "}Lock Screen</a>

                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item user-dropdown-logout" href="#"> <i className="fa-solid fa-right-from-bracket"></i> {" "}Log Out </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageTitle;
