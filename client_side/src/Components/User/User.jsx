import { React, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import PageHeader from '../Header/PageHeader';
import Userlist from './Userlist';
import { users } from '../../API/User';


function User() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [duration,setDuration] = useState("");
  const [payment, setPayment] = useState("");
  const [mentor, SetMentor] = useState("");
  const [phone,setPhone] = useState("");

  const onSubmit = async () => {
    try {
      const formData = {
        name: name,
        email: email,
        phone : phone,
        password: password,
        Duration: duration,
        payment: payment,
        mentor: mentor,
      };
      const response = await users(formData);

      if(response.succes){
        console.log(response);
      }else{
        console.log(response);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const headerdata = useMemo(() => {
    return {
      data: "User Management",
      page: "Add User"
    };
  }, []);

  return (
    <div>
      <PageHeader headerdata={headerdata} />
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-heading">
                      <h4>Add User Details</h4>
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
                          required: true,
                          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        })}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setEmail(e.target.value)}
                      />
                      {errors.email && errors.email.type === "required" && (
                        <div className="invalid-feedback">Email is required</div>
                      )}
                      {errors.email && errors.email.type === "pattern" && (
                        <div className="invalid-feedback">Please enter a valid email address</div>
                      )}
                    </div>
                  </div>


                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Password<span className="login-danger">*</span></label>
                      <input
                        {...register("password", { required: true })}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        type="password"
                        placeholder=""
                        onChange={(e)=>setPassword(e.target.value)}
                      />
                      {errors.password && <div className="invalid-feedback">Password is required</div>}
                    </div>
                  </div>
                  {/* <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Phone<span className="login-danger">*</span></label>
                      <input
                        {...register("phone", { required: true })}
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setPhone(e.target.value)}
                      />
                      {errors.phone && <div className="invalid-feedback">Phone is required</div>}
                    </div>
                  </div> */}
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Duration<span className="login-danger">*</span></label>
                      <input
                        {...register("duration", {
                           required: "Duration is required",
                           pattern: {
                            value: /^\d+$/,
                            message: 'Payment must be a number'
                        } 
                          })}
                        className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setDuration(e.target.value)}
                      />
                      {errors.duration && <div className="invalid-feedback">{errors.duration.message}</div>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Payment<span className="login-danger">*</span></label>
                      <input
                        {...register("payment", {
                          required: 'Payment is required',
                          pattern: {
                              value: /^\d+$/,
                              message: 'Payment must be a number'
                          }
                          })}
                        className={`form-control ${errors.payment ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder=""
                        onChange={(e)=>setPayment(e.target.value)}
                      />
                      {errors.payment && <div className="invalid-feedback">{errors.payment.message}</div>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>Mentor<span className="login-danger">*</span></label>
                      <select
                        {...register("mentor", { required: true })}
                        className={`form-control ${errors.mentor ? 'is-invalid' : ''}`}
                        onChange={(e)=>SetMentor(e.target.value)}
                      >
                        <option value="">Select Mentor</option>
                        <option value="abin">Abin</option>
                        <option value="aakash">Aakash</option>
                      </select>
                      {errors.mentor && <div className="invalid-feedback">Mentor is required</div>}
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
      <Userlist />
    </div>
  );
}

export default User;