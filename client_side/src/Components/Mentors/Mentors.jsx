import { React, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import PageHeader from '../Header/PageHeader';
import Mentorslist from './Mentorslist';
import { Mentors } from '../../API/Mentor';

function Mentor() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [phone, setPhone] = useState("");
  const [mail,setMail]= useState ("");
  const [experiance,setExperiance] = useState("");

  const onSubmit = async () => {
    try {
      const formData={
        name : name,
        specialization : specialization,
        phone_no : phone,
        email : mail,
        experiance : experiance
      };

      const response = await Mentors (formData);

       if(response.success){
        console.log(response);
       }else{
        console.log(response);
       }
    } catch (error) {
      console.error('Error adding mentor',error);
    }
  };

  const headerdata = useMemo(() => {
    return {
      data: "Mentors",
      page: "Add Mentors"
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
                      <h4>Add Mentors Details</h4>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Name<span className="login-danger">*</span></label>
                      <input
                        {...register("name", { required: true })}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setName(e.target.value)}
                      />
                      {errors.name && <div className="invalid-feedback">Name is required</div>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Email<span className="login-danger">*</span></label>
                      <input
                        {...register("email", {
                           required: 'Email is required',
                           message: 'Please enter a valid email address',
                           pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Please enter a valid email address'
                          }
                          })}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setMail(e.target.value)}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Phone<span className="login-danger">*</span></label>
                      <input
                        {...register("phone", {
                           required: "Phone number is required",
                           pattern: {
                            value: /^[0-9]*$/,
                            message: 'Please enter a valid phone number'
                          }
                          })}
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setPhone(e.target.value)}
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Specialization<span className="login-danger">*</span></label>
                      <input
                        {...register("specialization", { required: true })}
                        className={`form-control ${errors.specialization ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setSpecialization(e.target.value)}
                      />
                      {errors.specialization && <div className="invalid-feedback">Specialization is required</div>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Experience<span className="login-danger">*</span></label>
                      <input
                        {...register("experience", { 
                          required: 'Experience is required',
                          pattern: {
                            value: /^\d+$/,
                            message: 'Experience must be a number'
                        }
                         })}
                        className={`form-control ${errors.experience ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setExperiance(e.target.value)}
                      />
                      {errors.experience && <div className="invalid-feedback">{errors.experience.message}</div>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="doctor-submit text-end">
                      <button type="submit" className="btn btn-primary submit-form me-2">
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary cancel-form"
                      >
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
      <Mentorslist/>
    </div>
  );
}

export default Mentor;