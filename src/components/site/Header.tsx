import type { PlainUser } from "@/lib/current-user";

export default function Header({ user }: { user: PlainUser | null }) {
  return (
    <header className="header">
      <div className="container row">
        <ul className="topheader">
          <li className="logo">
            <div className="bodycontainer">
              <button className="btn round default right menu">
                <i className="fa fa-align-right"></i>
              </button>
              <a href="/">
                <span style={{ fontSize: "20px", textTransform: "uppercase" }}>
                  bina
                </span>
                <span style={{ fontSize: "10px" }}>trust</span>
              </a>
            </div>
          </li>
          <li className="data">
            <div className="bodycontainer">
              <ul>
                <li>
                  <div>3,649,450 USD</div>
                  Payouts
                </li>
                <li>
                  <div>+5.26%</div>
                  24 hour price
                </li>
                <li>
                  <div>12.820 BTC</div>
                  24 hour volume
                </li>
                <li>
                  <div>69,775</div>
                  active traders
                </li>
                <li>
                  <div className="btcwdgt-price" bw-cur="usd"></div>
                  Live Bitcoin price
                </li>
              </ul>
            </div>
          </li>
          <li className="account row">
            <div className="bodycontainer">
              {user && user.fname ? (
                <div className="button_container">
                  <a href="/user/dashboard" className="btn">
                    <i className="fa fa-user"></i> {user.fname}
                  </a>
                </div>
              ) : (
                <>
                  <div className="button_container">
                    <a href="/user/login" className="btn">
                      <i className="fa fa-user"></i> SIGN IN
                    </a>
                  </div>
                  <div className="button_container">
                    <a href="/user/register" className="btn v2">
                      <i className="fa fa-user-plus"></i> REGISTER
                    </a>
                  </div>
                </>
              )}
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}
