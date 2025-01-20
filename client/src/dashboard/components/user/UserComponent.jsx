import React, { useEffect } from "react";
import UserStore from "../../../store/UserStore";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader.jsx";

const UserComponent = () => {

  const {user,getUserProfile, userProfileForm, userProfileFormOnChange, userProfileUpdate } = UserStore();


  useEffect( () => {
    (async()=>{
        await getUserProfile();
    })();
  }, []);


  const saveProfileData = async()=>{
    const response = await userProfileUpdate(userProfileForm);
    if(response.status === "success"){
      toast.success("Profile updated successfully.");
      await getUserProfile();
    }else{
      toast.error(response.message);
    }
  }


  if(user === null){
    return <div><Loader/></div>
  }else{
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 className="fs-5">User Profile Details </h3>
          <hr />
        </div>
      </div>
    
      <form>
          <div className="form-group">
              <span>User status: {user.role}</span>
          </div>
        <div className="form-group row my-4">
          <label className="col-sm-2 col-form-label">User Name :</label>
          <div className="col-sm-10">
            <input
            value={userProfileForm.userName} onChange={(e)=>{userProfileFormOnChange("userName", e.target.value)}}
              type="text"
              className="form-control" placeholder="User name"
            />
          </div>
        </div>
            
        <div className="form-group row my-4">
          <label className="col-sm-2 col-form-label">First Name :</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control" placeholder="First name"
              value={userProfileForm.firstName}
              onChange={(e)=>{userProfileFormOnChange("firstName", e.target.value)}}
            />
          </div>
          <label className="col-sm-2 col-form-label">Last Name :</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control" placeholder="Last name"
              value={userProfileForm.lastName}
              onChange={(e)=>{userProfileFormOnChange("lastName", e.target.value)}}
            />
          </div>
        </div>

          <div className="form-group row my-4">
              <label className="col-sm-2 col-form-label">Age :</label>
              <div className="col-sm-4">
                  <input
                      type="text"
                      className="form-control" placeholder="Age"
                      value={userProfileForm.age}
                      onChange={(e) => {
                          userProfileFormOnChange("age", e.target.value)
                      }}
                  />
              </div>
              <label className="col-sm-2 col-form-label">Gender :</label>
              <div className="col-sm-4">
                  <select className="form-control" value={userProfileForm.gender} onChange={(e) => {
                      userProfileFormOnChange("gender", e.target.value)
                  }}>

                      <option value="">Choose gender</option>
                      <option value="Male">Male</option>
                      <option value="female">Female</option>
                      <option value="transgender">Transgender</option>
                  </select>
              </div>
          </div>

          <div className="form-group row my-4">
              <label className="col-sm-2 col-form-label">Mobile :</label>
              <div className="col-sm-10">
                  <input
                      type="text"
                      className="form-control" placeholder="Mobile"
                      value={userProfileForm.userMobile}
                      onChange={(e) => {
                          userProfileFormOnChange("userMobile", e.target.value)
                      }}
                  />
              </div>
          </div>

          <div className="form-group row my-4">
          <label className="col-sm-2 col-form-label">Address :</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control" placeholder="Address"
              value={userProfileForm.userAddress}
              onChange={(e)=>{userProfileFormOnChange("userAddress", e.target.value)}}
            />
          </div>
        </div>

        <div className="row g-3 my-4">
            <div className="col-md-4">
                <input value={userProfileForm.userPostalCode} onChange={(e)=>{userProfileFormOnChange("userPostalCode", e.target.value)}} type="text" className="form-control" placeholder="Post code"/>
            </div>
            <div className="col-md-4">
                <input value={userProfileForm.userDistrict} onChange={(e)=>{userProfileFormOnChange("userDistrict", e.target.value)}} type="text" className="form-control" placeholder="District"/>
            </div>
            <div className="col-md-4">
                <input value={userProfileForm.userCity} onChange={(e)=>{userProfileFormOnChange("userCity", e.target.value)}} type="text" className="form-control" placeholder="City"/>
            </div>
            <div className="col-md-4">
                <input value={userProfileForm.userState} onChange={(e)=>{userProfileFormOnChange("userState", e.target.value)}} type="text" className="form-control" placeholder="State"/>
            </div>
            <div className="col-md-4">
                <input value={userProfileForm.userCountry} onChange={(e)=>{userProfileFormOnChange("userCountry", e.target.value)}} type="text" className="form-control" placeholder="Country"/>
            </div>
        </div>

        <button onClick={saveProfileData} className="btn btn-success">Save</button>



      </form>

 
 
    </div>
  );
}

};

export default UserComponent;
