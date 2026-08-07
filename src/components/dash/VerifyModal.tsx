export default function VerifyModal() {
  return (
    <div
      className="modal fade"
      id="verifyModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-dark">
            <h5 className="modal-title text-light" style={{ textAlign: "center" }}>
              KYC verification - Upload documents below to get verified.
            </h5>
            <button
              type="button"
              className="close text-light"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body bg-dark">
            <form
              style={{ padding: "3px" }}
              role="form"
              method="post"
              action="#"
              encType="multipart/form-data"
            >
              <label className="text-light">
                Valid identity card. (e.g. Drivers licence, international
                passport or any government approved document).
              </label>
              <input
                type="file"
                className="form-control bg-dark text-light"
                name="id"
                required
              />
              <br />
              <label className="text-light">Passport photogragh</label>
              <input
                type="file"
                className="form-control bg-dark text-light"
                name="passport"
                required
              />
              <br />
              <input
                type="submit"
                className="btn btn-light"
                value="Submit documents"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
