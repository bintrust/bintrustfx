import LegacyContent from "@/components/LegacyContent";
import { getCurrentUser } from "@/lib/current-user";

function fmtDate(d?: string | Date): string {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return "";
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export default async function AccountHistoryPage() {
  const user = await getCurrentUser();
  const transactions = user?.transactions ?? [];

  const rowsFor = (type: string) =>
    transactions
      .filter((t) => t.type === type)
      .map(
        (t, i) => `<tr>
          <td>${i + 1}</td>
          <td>${t.amount ?? ""}</td>
          <td>${t.payment_mode ?? ""}</td>
          <td>${t.status ?? ""}</td>
          <td>${fmtDate(t.date)}</td>
        </tr>`
      )
      .join("");

  const html = `
    <div class="mt-2 mb-4"><h1 class="title1 text-light">Transactions on your account</h1></div>
    <div class="row mb-5">
      <div class="col text-center card p-4 bg-dark">
        <nav>
          <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
            <h4 class="nav-item nav-link active pt-3" id="nav-home-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Deposits</h4>
            <h4 class="nav-item nav-link pt-3 withd" id="nav-profile-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Withdrawals</h4>
            <h4 class="nav-item nav-link pt-3" id="nav-contact-tab" data-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Others</h4>
          </div>
        </nav>
        <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
          <div class="tab-pane fade show active bg-dark card p-3" id="tab1" role="tabpanel" aria-labelledby="nav-home-tab">
            <div class="table-responsive">
              <table class="UserTable table table-hover text-light">
                <thead><tr><th>ID</th><th>Amount</th><th>Payment mode</th><th>Status</th><th>Date created</th></tr></thead>
                <tbody>${rowsFor("deposit")}</tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane fade p-3 bg-dark" id="tab2" role="tabpanel" aria-labelledby="nav-profile-tab">
            <div class="table-responsive">
              <table class="UserTable table table-hover text-light">
                <thead><tr><th>ID</th><th>Amount requested</th><th>Recieving Mode</th><th>Status</th><th>Date created</th></tr></thead>
                <tbody>${rowsFor("withdrawal")}</tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane fade p-3 bg-dark" id="tab3" role="tabpanel" aria-labelledby="nav-contact-tab">
            <div class="table-responsive">
              <table class="UserTable table table-hover text-light">
                <thead><tr><th>ID</th><th>Amount</th><th>Type</th><th>Plan/Narration</th><th>Date created</th></tr></thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function() {
      if (!$.fn || !$.fn.DataTable) return;
      $('.UserTable').each(function() {
        if (!$.fn.dataTable.isDataTable(this)) {
          $(this).DataTable({ order: [[0, 'desc']] });
        }
      });
      $(".dataTables_length select").addClass("bg-dark text-light");
      $(".dataTables_filter input").addClass("bg-dark text-light");
    })();
    </script>
`;
  return <LegacyContent html={html} />;
}
