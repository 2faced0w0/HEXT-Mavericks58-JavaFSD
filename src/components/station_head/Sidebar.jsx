const Sidebar = ()=>{

    return (
         <aside className="sidebar bg-white border border-light shadow-sm rounded-3 p-3 d-flex flex-column justify-content-between">
                    <div className="w-100">
                        {/* <!-- Profile Block Card --> */}
                        <div className="profile-card border border-light bg-light bg-opacity-50 rounded-3 p-3 text-center d-flex flex-column align-items-center shadow-sm">
                            <div className="avatar bg-primary text-white shadow-sm rounded-circle d-flex align-items-center justify-content-center fw-bold fs-5 mb-2 position-relative">
                                SH
                                <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-2 border-white rounded-circle"></span>
                            </div>
                            <div className="profile-info">
                                <h2 className="fs-6 fw-bold text-dark mb-1">Jack Murphy</h2>
                                <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-10 mb-2 px-2 py-1 fs-8">Station Head</span>
                                <p className="text-muted d-flex align-items-center justify-content-center gap-1 mb-0 small">
                                    <i className="bi bi-geo-alt-fill text-danger fs-7"></i> Kensington Oval
                                </p>
                            </div>
                            <button className="btn btn-outline-dark btn-sm w-100 fw-semibold rounded-2 mt-3 fs-7 transition-all">
                                <i className="bi bi-pencil-square me-1"></i>Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* <!-- Wireframe Tag Indicator --> */}
                    <div className="text-center mt-3">
                        <span className="badge bg-dark bg-opacity-10 text-dark font-monospace px-3 py-2 border border-dark border-opacity-10 d-inline-block">&lt;Sidebar /&gt;</span>
                    </div>
                </aside>
    )
}

export default Sidebar