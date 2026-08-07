"use client";

import { useState, type FormEvent } from "react";

interface Props {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  address: string;
}

export default function ProfileForm({
  fname,
  lname,
  email,
  phone,
  address,
}: Props) {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement)
        .value;
    setSubmitting(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          what: "PROFILE",
          firstname: get("firstname"),
          surname: get("surname"),
          phone: get("phone"),
          address: get("address"),
        }),
      });
      if (res.ok) window.location.reload();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="row profile">
      <div className="col-lg-3 col-sm-12 bg-dark p-3">
        <div className="profile-sidebar card bg-dark shadow rounded pb-5 pt-5">
          <div className="profile-usertitle">
            <div className="profile-usertitle-name">
              {fname} {lname}
            </div>
            <div className="profile-usertitle-job">binatrust User</div>
          </div>
        </div>
      </div>
      <div className="col-lg-9 p-2">
        <div className="card p-5 shadow-lg bg-dark">
          <h2>
            <span className="fa fa-user"></span> &nbsp; {fname} {lname}
          </h2>
          <h5>
            <span className="fa fa-envelope"></span> &nbsp; {email}
          </h5>
          <h5>
            <span className="fa fa-mobile"></span> &nbsp; {phone}
          </h5>
          <div>
            <input
              type="submit"
              data-toggle="modal"
              data-target="#edit"
              value="Update Info"
              className="btn btn-primary"
            />
          </div>
          <div id="edit" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header .modal-dialog-centered bg-dark">
                  Edit my Profile
                  <button
                    type="button"
                    className="close text-light"
                    data-dismiss="modal"
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body bg-dark">
                  <form role="form" onSubmit={onSubmit}>
                    <h5 className="text-light">Firstname</h5>
                    <input
                      type="text"
                      name="firstname"
                      defaultValue={fname}
                      className="form-control bg-dark text-light"
                    />
                    <br />
                    <h5 className="text-light">Surname</h5>
                    <input
                      type="text"
                      name="surname"
                      defaultValue={lname}
                      className="form-control bg-dark text-light"
                    />
                    <br />
                    <h5 className="text-light">Phone Number</h5>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={phone}
                      className="form-control bg-dark text-light"
                    />
                    <br />
                    <h5 className="text-light">Address</h5>
                    <textarea
                      className="form-control bg-dark text-light"
                      placeholder="Full Address"
                      name="address"
                      rows={3}
                      defaultValue={address}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value={submitting ? "Updating..." : "Update"}
                      disabled={submitting}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
