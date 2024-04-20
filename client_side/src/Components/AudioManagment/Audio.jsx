import { React, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import PageHeader from '../Header/PageHeader';
import Audiolist from './Audiolist';
import { Audios } from '../../API/Audio';

function Audio() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [path,setPath] = useState("");
  const [heading,setHeading] = useState("");
  const [description,setDescription] = useState("");

  const onSubmit = async() => {
    try{
      const formData ={
        audio_path : path,
        heading : heading,
        description :description
      };

      const response = await Audios(formData);

      if(response.success){
        console.log(response);
      }else{
        console.log(response);
      }
    } catch(error){
      console.error('Error submitting form:', error);
    }
  };

  const headerdata = useMemo(() => {
    return {
      data:"Audio Management",
      page:"Add Audios"
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
                      <h4>Add Audio Details</h4>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Path<span className="login-danger">*</span></label>
                      <input
                        {...register("path", { required: true })}
                        className={`form-control ${errors.path ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setPath(e.target.value)}
                      />
                      {errors.path && <div className="invalid-feedback">Path is required</div>}
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
                      <button type="submit" className="btn btn-primary submit-form me-2">
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
      <Audiolist/>
    </div>
  );
}

export default Audio;