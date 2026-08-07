export default function Sidebar() {
  return (
    <div className="sidebar sidebar-style-2" data-background-color="dark">
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <div className="user">
            <div className="info">
              <a
                data-toggle="collapse"
                href="#collapseExample"
                aria-expanded="true"
              >
                <span>
                  <span className="caret"></span>
                </span>
              </a>
              <div className="clearfix"></div>
              <div className="collapse in" id="collapseExample">
                <ul className="nav">
                  <li>
                    <a href="/user/dashboard/profile">
                      <span className="link-collapse">Account Settings</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul className="nav nav-primary">
            <li className="nav-item active">
              <a href="/user/dashboard">
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
              </a>
            </li>
            <li className="nav-item">
              <a data-toggle="collapse" href="#bases">
                <i className="fas fa-user"></i>
                <p>Account</p>
                <span className="caret"></span>
              </a>
              <div className="collapse" id="bases">
                <ul className="nav nav-collapse">
                  <li>
                    <a href="/user/dashboard/accountdetails">
                      <span className="sub-item">Withdrawal Info</span>
                    </a>
                  </li>
                  <li>
                    <a href="/user/dashboard/notification">
                      <span className="sub-item">Notifications</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a href="/user/dashboard/support">
                <i className="fa fa-life-ring" aria-hidden="true"></i>
                <p>Support</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/user/dashboard/accounthistory">
                <i className="fa fa-briefcase" aria-hidden="true"></i>
                <p>Transactions history</p>
              </a>
            </li>
            <li className="nav-item">
              <a data-toggle="collapse" href="#dept">
                <i className="fas fa-credit-card"></i>
                <p>Deposit/Withdrawal</p>
                <span className="caret"></span>
              </a>
              <div className="collapse" id="dept">
                <ul className="nav nav-collapse">
                  <li>
                    <a href="/user/dashboard/deposits">
                      <span className="sub-item">Deposits</span>
                    </a>
                  </li>
                  <li>
                    <a href="/user/dashboard/withdrawals">
                      <span className="sub-item">Withdrawal</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a data-toggle="collapse" href="#mpack">
                <i className="fas fa-cubes"></i>
                <p>Packages</p>
                <span className="caret"></span>
              </a>
              <div className="collapse" id="mpack">
                <ul className="nav nav-collapse">
                  <li>
                    <a href="/user/dashboard/mplans">
                      <span className="sub-item">Investment Plans</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a href="/user/dashboard/referuser">
                <i className="fa fa-recycle" aria-hidden="true"></i>
                <p>Refer Users</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
