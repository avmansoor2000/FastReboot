import React,{useState,useEffect} from 'react'
import axios from 'axios';
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';
import refreshicon from '../../assets/img/icons/re-fresh.svg';
import pdficon from '../../assets/img/icons/pdf-icon-01.svg';
import TXticon from '../../assets/img/icons/pdf-icon-02.svg';
import csvicon from '../../assets/img/icons/pdf-icon-03.svg';
import Excelicon from '../../assets/img/icons/pdf-icon-04.svg';

function Userlist() {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/admin/get_users')
      .then(response => {
        const {data} = response
        if (data.success) {
          setUsers(data.data); 
        } else {
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching users');
      });
  }, []);
   // Delete User
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/admin/delete_user?userId=${userId}`);
      if (response.data.success) {
        console.log('User deleted successfully');
        // Remove the deleted user from the state
        setUsers(users.filter(user => user._id !== userId));
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };




  return (
    <div className="row">
      <h1>{error}</h1>
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Phone</th>
                      <th>Mentor</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {users.map((user, index) => (
                   <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.phone_no}</td>
                    <td>{user.mentor}</td>
                    <td>{user.status}</td>
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
                              <a className="dropdown-item" onClick={() => deleteUser(user._id)}>
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
  )
}

export default Userlist