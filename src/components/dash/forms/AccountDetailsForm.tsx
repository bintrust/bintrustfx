"use client";

import { useState, type FormEvent } from "react";

interface Props {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  btcAddress: string;
  cashAppTag: string;
}

export default function AccountDetailsForm(props: Props) {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement).value;
    setSubmitting(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          what: "WITHDRAWAL_INFO",
          bank_name: get("bank_name"),
          actname: get("actname"),
          actnum: get("actnum"),
          routnum: get("routnum"),
          btc_address: get("btc_address"),
          cash_app_tag: get("cash_app_tag"),
        }),
      });
      if (res.ok) window.location.reload();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="row mb-4">
      <div className="col card p-3 shadow-lg bg-dark">
        <div className="accordion accordion-light">
          <form method="post" id="walletform" onSubmit={onSubmit}>
            <div className="card">
              <div
                className="card-header bg-dark"
                id="headingOne"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <div className="span-icon">
                  <div className="fa fa-clone"></div>
                </div>
                <div className="span-title text-light">Bank transfer</div>
                <div className="span-mode"></div>
              </div>
              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div className="card-body bg-dark shadow">
                  <div className="form-group">
                    <h5 className="text-light">Bank Name</h5>
                    <input
                      type="text"
                      name="bank_name"
                      defaultValue={props.bankName}
                      className="form-control text-light bg-dark"
                      placeholder="Enter bank name"
                    />
                  </div>
                  <div className="form-group">
                    <h5 className="text-light">Account Name</h5>
                    <input
                      type="text"
                      name="actname"
                      defaultValue={props.accountName}
                      className="form-control text-light bg-dark"
                      placeholder="Enter Account name"
                    />
                  </div>
                  <div className="form-group">
                    <h5 className="text-light">Account Number</h5>
                    <input
                      type="text"
                      name="actnum"
                      defaultValue={props.accountNumber}
                      className="form-control text-light bg-dark"
                      placeholder="Enter Account Number"
                    />
                  </div>
                  <div className="form-group">
                    <h5 className="text-light">Routing Number</h5>
                    <input
                      type="text"
                      name="routnum"
                      defaultValue={props.routingNumber}
                      className="form-control text-light bg-dark"
                      placeholder="Enter Routing Number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div
                className="card-header bg-dark"
                id="headingTwo"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <div className="span-icon">
                  <div className="fa fa-clone"></div>
                </div>
                <div className="span-title text-light">BItcoin</div>
                <div className="span-mode"></div>
              </div>
              <div
                id="collapseTwo"
                className="collapse show"
                aria-labelledby="headingTwo"
                data-parent="#accordion"
              >
                <div className="card-body bg-dark shadow">
                  <div className="form-group">
                    <h5 className="text-light">BTC ADDRESS</h5>
                    <input
                      type="text"
                      name="btc_address"
                      defaultValue={props.btcAddress}
                      className="form-control text-light bg-dark"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div
                className="card-header bg-dark"
                id="headingFour"
                data-toggle="collapse"
                data-target="#collapseFour"
                aria-expanded="true"
                aria-controls="collapseFour"
              >
                <div className="span-icon">
                  <div className="fa fa-clone"></div>
                </div>
                <div className="span-title text-light">Cash App</div>
                <div className="span-mode"></div>
              </div>
              <div
                id="collapseFour"
                className="collapse show"
                aria-labelledby="headingFour"
                data-parent="#accordion"
              >
                <div className="card-body bg-dark shadow">
                  <div className="form-group">
                    <h5 className="text-light bg-dark">Cash App Tag </h5>
                    <input
                      type="text"
                      name="cash_app_tag"
                      defaultValue={props.cashAppTag}
                      className="form-control text-light bg-dark"
                    />
                  </div>
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="btn btn-primary"
              value={submitting ? "Submitting..." : "Submit"}
              disabled={submitting}
            />
            &nbsp; &nbsp;
            <div className="resp"></div>
          </form>
        </div>
      </div>
    </div>
  );
}
