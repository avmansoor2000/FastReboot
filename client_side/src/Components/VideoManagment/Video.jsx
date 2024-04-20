import { useMemo, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import PageHeader from '../Header/PageHeader';
import Videolist from './Videolist';
import { AddVideo } from '../../API/Video';

function Video() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [path,setPath] = useState("");
  const [heading,setHeading] = useState("");
  const [description,setDescription] = useState("");
  // const [data, SetData] =useState("");
  // const [formData, SetFormData] = useState("");

  const onSubmit = async () => {
    try {
      const formData = {
        video_path : path,
        heading: heading,
        description: description
      };
      
      
      // const response = await AddVideo(formData);
      const response =await axios.post('http://localhost:3000/api/admin/add_video', formData);
      
      if (response.success) {
        console.log(response.data);
        // If you want to clear the form after submission
        setPath("");
        setHeading("");
        setDescription("");
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };



  const headerdata = useMemo(() => {
    return {
      data:"Video Management",
      page:"Add Videos"
    };
  }, []);



 

  
  return (
    
    <div>
      <PageHeader headerdata={headerdata}/>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-heading">
                      <h4>Add Video Details</h4>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Video Path<span className="login-danger">*</span></label>
                      <input
                        {...register("videoPath", { required: true })}
                        className={`form-control ${errors.videoPath ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setPath(e.target.value)}
                      />
                      {errors.videoPath && <div className="invalid-feedback">Video Path is required</div>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Heading<span className="login-danger">*</span></label>
                      <input
                        {...register("heading", { required: true })}
                        className={`form-control ${errors.heading ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setHeading(e.target.value)}
                      />
                      {errors.heading && <div className="invalid-feedback">Heading is required</div>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Description<span className="login-danger">*</span></label>
                      <input
                        {...register("description", { required: true })}
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setDescription(e.target.value)}
                      />
                      {errors.description && <div className="invalid-feedback">Description is required</div>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="doctor-submit text-end">
                      <button type="submit" className="btn btn-primary submit-form me-2" >
                        Submit
                      </button>
                      <button type="button" className="btn btn-primary cancel-form">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Videolist/>
    </div>
  );
}

export default Video;