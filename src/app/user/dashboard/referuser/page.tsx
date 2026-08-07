export default function ReferUserPage() {
  const html = `
    <div class="mt-2 mb-4"><h1 class="title1 text-light">Refer users to binatrust community</h1></div>
    <div class="row">
        <div class="col-12 text-center card bg-dark shadow-lg p-3 text-light">
            <strong>You can refer users by sharing your referral link:</strong><br>
            <h4 style="color:green;"> https://binatrust.online/ref/1606</h4> <br>
            <h3 class="title1"><small>Your sponsor</small><br><i class="fa fa-user fa-2x"></i><br><small>null</small></h3>
        </div>
    </div>
    <div class="row">
        <div class="col card p-3 shadow-lg bg-dark">
            <h2 class="title1 text-light">Your Referrals.</h2>
            <div class="bs-example widget-shadow table-responsive" data-example-id="hoverable-table">
                <table class="table UserTable table-hover text-light">
                    <thead><tr><th>Client name</th><th>Ref. level</th><th>Parent</th><th>Client status</th><th>Date registered</th></tr></thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
