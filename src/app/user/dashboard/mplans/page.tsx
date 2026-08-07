interface PlanCard {
  id: number;
  title: string;
  range: string;
  min: string;
  max: string;
  daily: string;
}

const PLANS: PlanCard[] = [
  { id: 23, title: "STARTER PLAN", range: "300 to $7500", min: "300", max: "7500", daily: "1.5% daily return" },
  { id: 24, title: "BUSINESS PACKAGE", range: "7500 to $20000", min: "7500", max: "20,000", daily: "3.5% daily return" },
  { id: 25, title: "PARTNERSHIP PLAN", range: "20000 to $100000", min: "20000", max: "100000", daily: "5% daily return" },
];

export default function MPlansPage() {
  const cards = PLANS.map(
    (p) => `
    <div class="col-lg-4 p-4 card bg-dark shadow-lg">
      <div class="pricing-table purple border bg-dark shadow-lg">
        <div class="pricing-label d-inline">Fixed Price</div>
        <h2 class="text-light">${p.title}</h2>
        <div class="price-tag">
          <span class="symbol text-light">&#36;</span>
          <span class="amount text-light">${p.range}</span>
        </div>
        <div class="pricing-features">
          <div class="feature text-light">Minimum Possible Deposit:<span class="text-light">&#36;${p.min}</span></div>
          <div class="feature text-light">Maximum Possible Deposit:<span class="text-light">&#36;${p.max}</span></div>
          <div class="feature text-light">Daily return:<span class="text-light">${p.daily}</span></div>
          <div class="feature text-light"><span class="text-light">Withdraw 30% capital after 30 working days</span></div>
          <div class="feature text-light">investment Duration:<span class="text-light">One month</span></div>
        </div> <br>
        <div>
          <form style="padding:3px;" role="form" method="post" action="#">
            <h5 class="text-light">Amount to invest: (&#36;${p.range} default)</h5>
            <input type="number" min="${p.min}" name="iamount" placeholder="&#36;${p.range}" class="form-control text-light bg-dark"> <br>
            <input type="hidden" name="duration" value="One month">
            <input type="hidden" name="id" value="${p.id}">
            <input type="submit" class="btn btn-block pricing-action btn-primary nav-pills" value="Join plan" style="border-radius: 60px;" data-toggle="modal" data-target="#depositModal${p.id}">
          </form>
        </div>
      </div>
      <div id="depositModal${p.id}" class="modal fade" role="dialog">
        <div class="modal-dialog"><div class="modal-content">
          <div class="modal-header bg-dark">
            <h4 class="modal-title" style="text-align:center;">Make a deposit of <strong>&#36;${p.range} to join this plan</strong></h4>
            <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body bg-dark">
            <form style="padding:3px;" role="form" method="post" action="#">
              <input style="padding:5px;" class="form-control" value="${p.range}" type="text" name="amount" required><br/>
              <input type="hidden" name="pay_type" value="plandeposit">
              <input type="hidden" name="plan_id" value="${p.id}">
              <input type="submit" class="btn btn-default" value="Continue">
            </form>
          </div>
        </div></div>
      </div>
    </div>`
  ).join("");

  const html = `
    <div class="mt-2 mb-4"><h1 class="title1 text-light">Available packages</h1></div>
    <div class="row mb-5">${cards}</div>
`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
