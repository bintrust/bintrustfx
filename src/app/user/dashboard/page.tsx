import LegacyContent from "@/components/LegacyContent";
import { getCurrentUser } from "@/lib/current-user";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const b = user?.balance;
  const deposited = b?.active ?? 0;
  const profit = b?.profit ?? 0;
  const bonus = b?.bonus ?? 0;
  const refBonus = b?.ref_bonus ?? 0;
  const totalBalance = b?.total ?? 0;
  const fname = user?.fname ?? "";

  const html = `
    <div class="mt-2 mb-4">
        <h2 class="text-light pb-2">Welcome, ${fname}</h2>
        <h5 id="ann" class="text-lightop-7 mb-4">All payment should be made to your generated wallet ID</h5>
        <script type="text/javascript">
        var announment = $("#ann").html();
        if (typeof swal === "function") {
          swal({
              title: "Annoucement!",
              text: announment,
              icon: "info",
              buttons: { confirm: { text: "Okay", value: true, visible: true, className: "btn btn-info", closeModal: true } }
          });
        }
        </script>
    </div>
    <div class="row row-card-no-pd bg-dark shadow-lg">
        <div class="col-sm-6 col-md-3">
           <div class="card card-stats card-round bg-dark"><div class="card-body"><div class="row">
              <div class="col-5"><div class="icon-big text-center"><i class="fa fa-download text-warning"></i></div></div>
              <div class="col-7 col-stats"><div class="numbers"><p class="card-category">Deposited</p>&#36;${deposited}</div></div>
           </div></div></div>
        </div>
        <div class="col-sm-6 col-md-3">
           <div class="card card-stats card-round bg-dark"><div class="card-body"><div class="row">
              <div class="col-5"><div class="icon-big text-center"><i class="flaticon-coins text-success"></i></div></div>
              <div class="col-7 col-stats"><div class="numbers"><p class="card-category">Profit</p><h4 class="card-title text-light">&#36;${profit}</h4></div></div>
           </div></div></div>
        </div>
        <div class="col-sm-6 col-md-3">
           <div class="card card-stats card-round bg-dark"><div class="card-body"><div class="row">
              <div class="col-5"><div class="icon-big text-center"><i class="fa fa-gift text-danger"></i></div></div>
              <div class="col-7 col-stats"><div class="numbers"><p class="card-category">Bonus</p><h4 class="card-title text-light">&#36;${bonus} </h4></div></div>
           </div></div></div>
        </div>
        <div class="col-sm-6 col-md-3">
           <div class="card card-stats card-round bg-dark"><div class="card-body"><div class="row">
              <div class="col-5"><div class="icon-big text-center"><i class="fa fa-retweet text-primary"></i></div></div>
              <div class="col-7 col-stats"><div class="numbers"><p class="card-category">Ref. Bonus</p><h4 class="card-title text-light">&#36;${refBonus}</h4></div></div>
           </div></div></div>
        </div>
        <div class="col-sm-6 col-md-3">
           <div class="card card-stats card-round bg-dark"><div class="card-body"><div class="row">
              <div class="col-5"><div class="icon-big text-center"><i class="flaticon-coins text-success"></i></div></div>
              <div class="col-7 col-stats"><div class="numbers"><p class="card-category">Balance</p><h4 class="card-title text-light">&#36;${totalBalance}</h4><br></div></div>
           </div></div></div>
        </div>
        <div class="col-sm-6 col-md-3">
           <div class="card card-stats card-round bg-dark"><div class="card-body"><div class="row">
              <div class="col-5"><div class="icon-big text-center"><i class="fa fa-envelope text-danger"></i></div></div>
              <div class="col-7 col-stats"><div class="numbers"><p class="card-category">Total Packages</p><h4 class="card-title text-light">0</h4></div></div>
           </div></div></div>
        </div>
        <div class="col-sm-6 col-md-3">
           <div class="card card-stats card-round bg-dark"><div class="card-body"><div class="row">
              <div class="col-5"><div class="icon-big text-center"><i class="fa fa-envelope-open text-primary"></i></div></div>
              <div class="col-7 col-stats"><div class="numbers"><p class="card-category">Active Packages</p><h4 class="card-title text-light">0</h4></div></div>
           </div></div></div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
           <div id="chart-page">
              <div class="tradingview-widget-container" style="margin:30px 0px 10px 0px;">
                 <div id="tradingview_f933e"></div>
                 <div class="tradingview-widget-copyright"><a href="#" rel="noopener" target="_blank"><span class="blue-text"></span> <span class="blue-text">Personal trading chart</span></a></div>
                 <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
                 <script type="text/javascript">
                    if (typeof TradingView !== "undefined") {
                      new TradingView.widget({
                        "width": "100%", "height": "550", "symbol": "COINBASE:BTCUSD", "interval": "1",
                        "timezone": "Etc/UTC", "theme": "light", "style": "9", "locale": "en",
                        "toolbar_bg": "#f1f3f6", "enable_publishing": false, "hide_side_toolbar": false,
                        "allow_symbol_change": true, "calendar": false,
                        "studies": ["BB@tv-basicstudies"], "container_id": "tradingview_f933e"
                      });
                    }
                 </script>
              </div>
           </div>
           <div class="white-box" style="height: 450px;">
              <h4 style="margin-bottom:5px;"> Forex Market Fundamental Data</h4>
              <span id="tradingview-copyright"></span>
              <script src="https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js">{"currencies":["EUR","USD","JPY","BTC","ETH","LTC","GBP","CHF","AUD","CAD","NZD","CNY"],"isTransparent":false,"colorTheme":"light","width":"100%","height":"100%","locale":"en"}</script>
           </div>
        </div>
    </div>
`;

  return <LegacyContent html={html} />;
}
