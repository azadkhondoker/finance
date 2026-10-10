

function Header() {
  return (
    <div className="header-area">
      <div className="row align-items-center">
        <div className="col-md-6 col-sm-8 clearfix">
          <div className="nav-btn float-start">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="search-box float-start">
            <form action="#">
              <input type="text" name="search" placeholder="Search..." required/>
              <i className="ti-search"></i>
            </form>
          </div>
        </div>
        <div className="col-md-6 col-sm-4 clearfix">
          <ul className="notification-area float-end">
            <li id="full-view"><i className="ti-fullscreen"></i></li>
            <li id="full-view-exit"><i className="ti-zoom-out"></i></li>
            <li className="dropdown"><i  className="ti-bell dropdown-toggle" data-bs-toggle="dropdown"><span>2</span></i>
              <div className="dropdown-menu bell-notify-box notify-box">
                <span className="notify-title"> You have 3 new notifications{" "}<a href="#">view all</a> </span>
                <div className="notify-list">
                  <a href="#" className="notify-item">
                    <div className="notify-thumb">
                      <i className="ti-key bg-danger"></i>
                    </div>
                    <div className="notify-text">
                      <p>You have Changed Your Password</p>
                      <span>Just Now</span>
                    </div>
                  </a>
                  <a href="#" className="notify-item">
                    <div className="notify-thumb">
                      <i className="ti-comments-smiley bg-info"></i>
                    </div>
                    <div className="notify-text">
                      <p>New Comments On Post</p>
                      <span>30 Seconds ago</span>
                    </div>
                  </a>
                  <a href="#" className="notify-item">
                    <div className="notify-thumb">
                      <i className="ti-key bg-primary"></i>
                    </div>
                    <div className="notify-text">
                      <p>Some special like you</p>
                      <span>Just Now</span>
                    </div>
                  </a>
                </div>
              </div>
            </li>

            <li className="dropdown">
              <i className="fa-regular fa-envelope dropdown-toggle" data-bs-toggle="dropdown">
                <span>3</span>
              </i>
              <div className="dropdown-menu notify-box nt-enveloper-box">
                <span className="notify-title"> You have 3 new notifications{" "} <a href="#">view all</a></span>

                <div className="notify-list">
                  <a href="#" className="notify-item">
                    <div className="notify-thumb">
                      <picture>
                        <source srcSet="assets/images/author/author-img1.avif" type="image/avif"/>

                        <img src="assets/images/author/author-img1.jpg" alt="image"/>
                      </picture>
                    </div>

                    <div className="notify-text">
                      <p>Aglae Mayer</p>
                      <span className="msg"> Hey I am waiting for you... </span>
                      <span>3:15 PM</span>
                    </div>
                  </a>

                  <a href="#" className="notify-item">
                    <div className="notify-thumb">
                      <picture>
                        <source srcSet="assets/images/author/author-img2.avif" type="image/avif" />
                        <img src="assets/images/author/author-img2.jpg" alt="image" />
                      </picture>
                    </div>

                    <div className="notify-text">
                      <p>Aglae Mayer</p>
                      <span className="msg"> When you can connect with me... </span>
                      <span>3:15 PM</span>
                    </div>

                  </a>
                  <a href="#" className="notify-item">
                    <div className="notify-thumb">
                      <picture>
                        <source srcSet="assets/images/author/author-img3.avif" type="image/avif"/>
                        <img src="assets/images/author/author-img3.jpg" alt="image" />
                      </picture>
                    </div>

                    <div className="notify-text">
                      <p>Aglae Mayer</p>
                      <span className="msg"> I missed you so much... </span>
                      <span>3:15 PM</span>
                    </div>
                  </a>
                </div>
              </div>
            </li>
                <li className="settings-btn"> <i className="ti-settings"></i></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;