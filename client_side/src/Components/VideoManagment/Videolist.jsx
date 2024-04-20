import React,{useEffect,useState} from 'react'
import axios from 'axios';
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';
import refreshicon from '../../assets/img/icons/re-fresh.svg';
import pdficon from '../../assets/img/icons/pdf-icon-01.svg';
import TXticon from '../../assets/img/icons/pdf-icon-02.svg';
import csvicon from '../../assets/img/icons/pdf-icon-03.svg';
import Excelicon from '../../assets/img/icons/pdf-icon-04.svg';
import {AddVideo} from '../../API/Video'

function Videolist() {

  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/admin/get_videos')
      .then(response => {
        console.log('Response:', response);
        const {data} = response
        if (data.success) {
          setVideos(data.data); // Assuming your videos are returned in the 'data' field
        } else {
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching videos');
      });
  }, []);

  const deleteVideo = async (videoId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/admin/delete_video?videoId=${videoId}`);
      if (response.data.success) {
        console.log('Video deleted successfully');
        // Remove the deleted video from the state
        setVideos(videos.filter(video => video._id !== videoId));
      } else {
        setError(response.data.message || 'Error deleting video');
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      setError('Error deleting video');
    }
  };
  return (
    <div>
      {/* <p>Message from server: {videos}</p> */}
      <p>Message from server: {error}</p>

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
                      <th>Video Path</th>
                      <th>Heading</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {videos.map((video, index) => (
                   <tr key={index}>
                    <td>{index + 1}</td>
                    <td><iframe width="150" height="150" src={video.video_path} title="Flutter MediaQuery | Flutter Responsive Design" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></td>
                    <td>{video.heading}</td>
                    <td>{video.description}</td>
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
                            <a className="dropdown-item" onClick={() => deleteVideo(video._id)}>
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

export default Videolist