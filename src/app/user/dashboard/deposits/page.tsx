import LegacyContent from "@/components/LegacyContent";
import { getCurrentUser } from "@/lib/current-user";

// Wallet addresses / barcodes, ported from the old app.js deposits route.
const BTC = [
  { address: "14cWp4P3zLeBSY2N3897z4ve9Un7mqGMSB", image: "/assets/images/barcode/btc_1.jpg" },
  { address: "1MXeSnmxF37mWFahoFCVpLvByrdUF6YLnB", image: "/assets/images/barcode/btc_2.jpg" },
];
const ETH = [
  { address: "0x5eb4f8637225a814fb674978ee56e68314c7083", image: "/assets/images/barcode/eth_1.jpg" },
  { address: "Oxb93c2e16d9908f15e123fc29b2841508bde75b60", image: "/assets/images/barcode/eth_2.jpg" },
];
const USDT = [
  { address: "TYvcCpsNTtJnztX4VyEXzPRd4WUTBGjncx", image: "/assets/images/barcode/usdt_2.jpg" },
];

function fmtDate(d?: string | Date): string {
  if (!d) return "";
  const date = new Date(d);
  return isNaN(date.getTime()) ? "" : date.toDateString();
}

export default async function DepositsPage() {
  const user = await getCurrentUser();
  const r = Math.floor(Math.random() * 2);
  const btc = BTC[r] ?? BTC[0];
  const eth = ETH[r] ?? ETH[0];
  const usdt = USDT[Math.min(r, USDT.length - 1)];
  const userId = user?._id ?? "";
  const transactions = user?.transactions ?? [];

  const rows =
    transactions.length === 0
      ? ""
      : transactions
          .map(
            (trx, i) => `<tr>
              <td>${i + 1}</td>
              <td>${trx.amount ?? ""}</td>
              <td>${trx.payment_mode ?? ""}</td>
              <td>${trx.status ?? ""}</td>
              <td>${fmtDate(trx.date)}</td>
              <td><a href="/user/dashboard/payment9d6c" class="btn btn-success">Submit hash</a></td>
            </tr>`
          )
          .join("");

  const table =
    transactions.length === 0
      ? `<span style="text-align:center;"> NO TRANSACTIONS YET! </span>`
      : `<div class="row mb-5"><div class="col text-center card p-4 bg-dark">
          <div class="table-responsive">
            <table class="UserTable table table-hover text-light">
              <thead><tr><th>ID</th><th>Amount</th><th>Payment mode</th><th>Status</th><th>Date created</th><th></th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div></div>`;

  const html = `
    <div class="mt-2 mb-4"><h1 class="title1 text-light">Your deposits</h1></div>
    <div class="row py-3 mb-4">
      <div class="col">
        <a class="btn btn-primary" href="#" data-toggle="modal" data-target="#depositModal"><i class="fa fa-plus"></i> New deposit</a>
      </div>
    </div>
    ${table}

    <div id="depositModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h4 id="makedep" class="modal-title text-light">Make new deposit</h4>
            <button type="button" class="close text-light" data-dismiss="modal">&times;</button>
          </div>
          <div id="errorAmt" style="color: red; text-align: center; display: none;"> Error </div>
          <div class="modal-body paymodal bg-dark">
            <form style="padding:3px;" role="form" method="post" id="depositform">
              <div id="mth_amt">
                <input id="amountInp" style="padding:5px;" class="form-control text-light bg-dark" placeholder="Enter amount here" type="text" name="amount" required><br/>
                <h5 class="text-light">Payment Method:</h5>
                <select id="payoption" name="payment_mode" class="form-control bg-dark text-light" required>
                  <option>Bitcoin</option>
                  <option>Ethereum</option>
                  <option>USDT</option>
                </select><br>
                <input type="hidden" name="user" value="${userId}">
                <button id="continueBtn" class="btn btn-light submit">Continue</button>
              </div>
              <div class="wallets" style="display: none">
                <div id="btcwallet_ctn">
                  <div style="display:flex; align-items: center; flex-direction:column;">
                    <strong>Scan Barcode</strong>
                    <img src="${btc.image}" alt="btc barcode" style="width:100px;margin-bottom:16px;">
                  </div>
                  <div style="display:flex">
                    <input style="padding:5px; width:100%" type="text" name="bitcoin" id="btcwallet" value="${btc.address}" readonly>&nbsp; &nbsp; <i class="fas fa-copy fa-2x" onclick="copybtc()"></i>
                  </div><br/>
                </div>
                <div id="ethwallet_ctn">
                  <div style="display:flex; align-items: center; flex-direction:column;">
                    <strong>Scan Barcode</strong>
                    <img src="${eth.image}" alt="eth barcode" style="width:100px;margin-bottom:16px;">
                  </div>
                  <div style="display:flex">
                    <input style="padding:5px; width:100%" type="text" name="ethereum" id="ethwallet" value="${eth.address}" readonly>&nbsp; &nbsp; <i class="fas fa-copy fa-2x" onclick="copyeth()"></i>
                  </div><br/>
                </div>
                <div id="usdtwallet_ctn">
                  <div style="display:flex; align-items: center; flex-direction:column;">
                    <strong>Scan Barcode</strong>
                    <img src="${usdt.image}" alt="usdt barcode" style="width:100px;margin-bottom:16px;">
                  </div>
                  <div style="display:flex">
                    <input style="padding:5px; width:100%" type="text" name="usdt" id="usdtwallet" value="${usdt.address}" readonly>&nbsp; &nbsp; <i class="fas fa-copy fa-2x" onclick="copyusdt()"></i>
                  </div><br/>
                </div>
                <input type="submit" class="btn btn-light submit" value="Done">
                <button id="backBtn" class="btn btn-dark">Back</button>
              </div>
              <script>
                (function() {
                  var continueBtn = document.getElementById("continueBtn");
                  var backBtn = document.getElementById("backBtn");
                  var payoption = document.getElementById("payoption");
                  var ethwallet = document.getElementById("ethwallet_ctn");
                  var btcwallet = document.getElementById("btcwallet_ctn");
                  var usdtwallet = document.getElementById("usdtwallet_ctn");
                  var mth_amt = document.getElementById("mth_amt");
                  var wallets = document.getElementsByClassName("wallets")[0];
                  var makedep = document.getElementById("makedep");
                  var errorAmt = document.getElementById("errorAmt");
                  backBtn.addEventListener("click", function(event) {
                    event.preventDefault();
                    mth_amt.style.display = 'block';
                    wallets.style.display = 'none';
                  });
                  continueBtn.addEventListener("click", function(event) {
                    event.preventDefault();
                    var amount = document.getElementById("amountInp").value;
                    if (!Number(amount)) { errorAmt.textContent = "Enter Valid Amount"; errorAmt.style.display = 'block'; return; }
                    errorAmt.style.display = 'none';
                    mth_amt.style.display = 'none';
                    makedep.innerText = "Make new deposit to the below wallet address";
                    ethwallet.style.display = payoption.value === 'Ethereum' ? 'block' : 'none';
                    btcwallet.style.display = payoption.value === 'Bitcoin' ? 'block' : 'none';
                    usdtwallet.style.display = payoption.value === 'USDT' ? 'block' : 'none';
                    wallets.style.display = 'block';
                  });
                })();
              </script>
            </form>
          </div>
        </div>
      </div>
    </div>

    <script>
      $('#depositform').submit(function(event) {
        event.preventDefault();
        var data = $('#depositform').serialize();
        $.ajax({
          url: '/api/transaction', type: 'POST', data: data,
          beforeSend: function() {
            $('.submit').append('<div class="spinner-border text-success" role="status"><span class="sr-only">Loading...</span></div>');
          },
          success: function(response) {
            if (response == 'done') { location.replace("/user/dashboard/deposits"); }
            else { console.log("There was an error", response); }
          }
        });
      });
      function copybtc() { var c = document.getElementById("btcwallet"); c.select(); c.setSelectionRange(0, 99999); navigator.clipboard.writeText(c.value); alert("Copied the text: " + c.value); }
      function copyeth() { var c = document.getElementById("ethwallet"); c.select(); c.setSelectionRange(0, 99999); navigator.clipboard.writeText(c.value); alert("Copied the text: " + c.value); }
      function copyusdt() { var c = document.getElementById("usdtwallet"); c.select(); c.setSelectionRange(0, 99999); navigator.clipboard.writeText(c.value); alert("Copied the text: " + c.value); }
    </script>
`;
  return <LegacyContent html={html} />;
}
