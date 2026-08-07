export default function MainHeader() {
  return (
    <div className="main-header">
      {/* Logo Header */}
      <div className="logo-header" data-background-color="dark">
        <a href="/" className="logo" style={{ fontSize: "27px", color: "#fff" }}>
          binatrust
        </a>
        <button
          className="navbar-toggler sidenav-toggler ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="icon-menu"></i>
          </span>
        </button>
        <button className="topbar-toggler more">
          <i className="icon-options-vertical"></i>
        </button>
        <div className="nav-toggle">
          <button className="btn btn-toggle toggle-sidebar">
            <i className="icon-menu"></i>
          </button>
        </div>
      </div>
      {/* Navbar Header */}
      <nav
        className="navbar navbar-header navbar-expand-lg"
        data-background-color="dark"
      >
        <div className="container-fluid">
          <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
            <li className="nav-item dropdown hidden-caret">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="notifDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-bell"></i>
              </a>
              <ul
                className="dropdown-menu notif-box animated fadeIn"
                aria-labelledby="notifDropdown"
              >
                <li>
                  <a className="see-all" href="/user/dashboard/notification">
                    See all notifications<i className="fa fa-angle-right"></i>{" "}
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown hidden-caret">
              <a
                className="nav-link"
                data-toggle="dropdown"
                href="#"
                aria-expanded="false"
              >
                <i className="fas fa-user"></i>
              </a>
              <ul className="dropdown-menu dropdown-user animated fadeIn">
                <div className="dropdown-user-scroll scrollbar-outer">
                  <li>
                    <a
                      className="dropdown-item"
                      href="/user/dashboard/changepassword"
                    >
                      Change Password
                    </a>
                    <a className="dropdown-item" href="/user/dashboard/profile">
                      Update Account
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/user/logout">
                      Logout
                    </a>
                  </li>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
