import React from 'react'

function PageHeader({headerdata}) {
  return (
    <>

				<div className="page-header">
					<div className="row">
						<div className="col-sm-12">
							<ul className="breadcrumb">
								<li className="breadcrumb-item"><a>{headerdata.data}</a></li>
								<li className="breadcrumb-item"><i className="feather-chevron-right"></i></li>
								<li className="breadcrumb-item active">{headerdata.page}</li>
							</ul>
						</div>
					</div>
				</div>
    </>
  )
}

export default PageHeader