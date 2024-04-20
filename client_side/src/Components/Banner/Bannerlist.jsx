import React,{useState,useEffect} from 'react';
import axios from 'axios';
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';
import refreshicon from '../../assets/img/icons/re-fresh.svg';
import pdficon from '../../assets/img/icons/pdf-icon-01.svg';
import TXticon from '../../assets/img/icons/pdf-icon-02.svg';
import csvicon from '../../assets/img/icons/pdf-icon-03.svg';
import Excelicon from '../../assets/img/icons/pdf-icon-04.svg';
import image from '../../assets/img/user-06.jpg';

function Bannerlist() {

  const [banners,setBanners] = useState([]);
  const [error,setError] = useState(null);

  useEffect(()=>{
    axios.get('http://localhost:3000/api/admin/get_banners')
    .then(response=> {
      const {data} = response
      if(data.success) {
        setBanners(data.data)
      }else{
        setError(data.message)
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error)
      setError('Error fetching users')
    })
  }, []);

  // Delete Banner
  const deleteBanner = async (bannerId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/admin/delete_banner?bannerId=${bannerId}`);
      if (response.data.success) {
        console.log('Banner deleted successfully');
        // Remove the deleted banner from the state
        setBanners(banners.filter(banner => banner._id !== bannerId));
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  return (
    <div>
      <h1>{error}</h1>
         <div className="row">
        <div className="col-sm-12">
            <div className="card  card-table show-entire">
              <div className="card-body">
                <div className="page-table-header mb-2">
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="doctor-table-blk">
                        <h3>User List</h3>
                        <div className="doctor-search-blk">
                          <div className="top-nav-search table-search-blk">
                            <form>
                              <input type="text" className="form-control" placeholder="Search here" />
                              <a className="btn">
                                <img src={searchicon} alt="" />
                              </a>
                            </form>
                          </div>
                          <div className="add-group">
                            <a  className="btn btn-primary add-pluss ms-2">
                              <img src={addicon} alt="" />
                            </a>
                            <a className="btn btn-primary doctor-refresh ms-2">
                              <img src={refreshicon} alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      <a  className="me-2">
                        <img src={pdficon} alt="" />
                      </a>
                      <a  className="me-2">
                        <img src={TXticon} alt="" />
                      </a>
                      <a  className="me-2">
                        <img src={csvicon} alt="" />
                      </a>
                      <a >
                        <img src={Excelicon} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table border-0 custom-table comman-table datatable mb-0">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Heading</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banners.map((banner,index) =>(      
                   <tr key={index}>
                    <td>{index+1}</td>
                    <td>{banner.heading} </td>
                    <td><img src={image} alt="" height={85} width={85} /></td>
                    <td className="text-end">
                          <div className="dropdown dropdown-action">
                            <a
                              href="#"
                              className="action-icon dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a className="dropdown-item" data-bs-toggle="modal"
                                data-bs-target="#delete_patients"
                                >
                                <i className="fa-solid fa-pen-to-square m-r-5"></i> Edit
                              </a>
                              <a className="dropdown-item" onClick={() => deleteBanner(banner._id)}>
                            <i className="fa fa-trash-alt m-r-5"></i> Delete
                          </a>
                            </div>
                          </div>
                        </td>
                   </tr>
                   ))}
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Bannerlist