export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="footer_bg center">
        <div className="area">
          <div className="bodycontainer">
            <div style={{ zIndex: 2, position: "relative" }}>
              <h2 className="margintb">
                GET STARTED TODAY WITH BITCOIN INVESTMENT
              </h2>
              <p className="margintb">
                Open account for free and start trading Bitcoins!
              </p>
              <a href="/get-started" className="btn">
                GET STARTED
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="bodycontainer">
          <div className="row">
            <div className="col-2 col-m-4 col-sm-12">
              <div className="padding">
                <h3>QUICK LINKS</h3>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/info/about">About Us</a>
                  </li>
                  <li>
                    <a href="/info/faqs">FAQS</a>
                  </li>
                  <li>
                    <a href="/info/terms">TERMS AND CONDITIONS</a>
                  </li>
                  <li>
                    <a href="/contact">CONTACT US</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-2 col-m-4 col-sm-12">
              <div className="padding">
                <h3>HELP &amp; SUPPORT</h3>
                <ul>
                  <li>
                    <a
                      href="https://cointelegraph.com/bitcoin-for-beginners/what-are-cryptocurrencies"
                      target="_blank"
                    >
                      WHAT IS BITCOIN?
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.investopedia.com/tech/how-to-buy-bitcoin/"
                      target="_blank"
                    >
                      HOW TO BUY BITCOIN
                    </a>
                  </li>
                  <li>
                    <a href="/user/register">REGISTER</a>
                  </li>
                  <li>
                    <a href="/user/login">LOGIN</a>
                  </li>
                  <li>
                    <a href="/user/password/reset">FORGOT PASSWORD</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-3 col-m-4 col-sm-12">
              <div className="padding">
                <h3>CONTACT US</h3>
                <ul>
                  <li>Sparkup Coining</li>
                </ul>
                <a href="mailto:binatrustfx@gmail.com">
                  <h3>Email Us here</h3>
                </a>
                <ul>
                  <li>MON-SAT 08AM ⇾ 05PM</li>
                  <ul className="social">
                    <li>
                      <a href="#" className="circle">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="circle">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                  </ul>
                </ul>
              </div>
            </div>
            <div className="col-5 col-m-12 col-sm-12">
              <div
                className="col-6 col-m-6 col-sm-6"
                style={{ paddingBottom: 0 }}
              >
                <div className="value">$198.76B</div>
                MARKET CAP
                <div className="value">69K+</div>
                ACTIVE ACCOUNTS
              </div>
              <div
                className="col-6 col-m-6 col-sm-6"
                style={{ paddingBottom: 0 }}
              >
                <div className="value">243K</div>
                WEEKLY TRANSACTIONS
                <div className="value">127</div>
                SUPPORTED COUNTRIES
              </div>
              <div className="col-12" style={{ paddingTop: 0 }}>
                <hr />
                SUPPORTED PAYMENT METHODS
                <br />
                <img
                  src="/assets/images/5b55bb652af1a.png"
                  style={{ width: "40px" }}
                />
                <img
                  src="/assets/images/1532345051h7.png"
                  style={{ width: "40px" }}
                />
                <img
                  src="/assets/images/1532345115h7.png"
                  style={{ width: "40px" }}
                />
              </div>
            </div>
          </div>
          <hr />
          <p className="center">
            Copyright © <span id="cpr">{year}</span> binatrust, All Rights
            Reserved
          </p>
        </div>
      </footer>
    </>
  );
}
