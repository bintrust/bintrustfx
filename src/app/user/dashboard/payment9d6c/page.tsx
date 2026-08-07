export default function PaymentPage() {
  const html = `
    <div class="mt-2 mb-4"><h1 class="title1 text-light">Make Payment</h1></div>
    <div class="row">
        <div class="col card bg-dark shadow-lg p-4">
            <div class="mb-3 text-light">
                <h4>You are to make payment of <strong>&#36;100</strong> using your preferred mode of payment below.</h4>
            </div>
            <form method="POST" action="#" enctype="multipart/form-data">
                <h5 class="text-light">Enter Transaction Hash</h5>
                <input type="text" name="hash" class="form-control col-lg-4 bg-dark text-light" required>
                <br><br><br>
                <div><input type="submit" class="btn btn-light" value="Submit payment"></div>
                <input type="hidden" name="id" value="218">
                <input type="hidden" name="pay_type" value="">
                <input type="hidden" name="plan_id" value="">
            </form>
        </div>
    </div>
`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
