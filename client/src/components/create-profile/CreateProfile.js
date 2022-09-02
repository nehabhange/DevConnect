import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFeildGroup from "../common/TextFeildGroup";
import TextAreaFeildGroup from "../common/TextAreaFeildGroup";
import SelectGroup from "../common/SelectGroup";
import InputGroup from "../common/InputGroup";
import { createProfile } from "../../actions/profileActions";

const CreateProfile = (props) => {
  const [inputs, setInputs] = useState({
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  
  });
  const [errors,setErrors]=useState('')

   useEffect(()=>{
    if(props.errors){
     setErrors(props.errors)
      
    }
   
   },[props.errors])

  const  handleChange= (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData=inputs
    console.log(profileData)
    props.createProfile(profileData)

  };
  
  const handleDisplay = (e) => {
    e.preventDefault();
    inputs.displaySocialInputs
      ? setInputs({ ...inputs, displaySocialInputs: false })
      : setInputs({ ...inputs, displaySocialInputs: true });
  };
  let socialInputs;
  if (inputs.displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={inputs.twitter}
          onChange={(e) => handleChange(e)}
          error={errors.twitter}
        />
        <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={inputs.linkedin}
          onChange={(e) =>  handleChange(e)}
          error={errors.linkedin}
        />
        <InputGroup
          placeholder="Youtube Profile URL"
          name="youtube"
          icon="fab fa-youtube"
          value={inputs.youtube}
          onChange={(e) =>  handleChange(e)}
          error={errors.youtube}
        />
        <InputGroup
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={inputs.facebook}
          onChange={(e) =>  handleChange(e)}
          error={errors.facebook}
        />
        <InputGroup
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={inputs.instagram}
          onChange={(e) =>  handleChange(e)}
          error={errors.instagram}
        />
      </div>
    );
  }

  //select options for status
  const options = [
    { label: "* Select Professional status", value: 0 },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: " Junior Developer" },
    { label: "Senior Developer", value: " Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ];
  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">
              Let's go some information to make your profile standout
            </p>
            <small className="d-block pb-3">*=required feilds</small>
            <form onSubmit={handleSubmit}>
              <TextFeildGroup
                placeholder={"* Profile handle"}
                name="handle"
                value={inputs.handle}
                onChange={(e) =>  handleChange(e)}
                errors={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name, nickname"
              />
              <SelectGroup
                placeholder="Stauts"
                name="status"
                value={inputs.status}
                onChange={(e) =>  handleChange(e)}
                options={options}
                errors={errors.status}
                info="Give us an idea of where you are at in your career"
              />
              <TextFeildGroup
                placeholder="Company"
                name="company"
                value={inputs.company}
                onChange={(e) =>  handleChange(e)}
                errors={errors.company}
                info="A unique handle for your profile URL. Your full name, company name, nickname"
              />
              <TextFeildGroup
                placeholder=" Website"
                name="website"
                value={inputs.website}
                onChange={(e) =>  handleChange(e)}
                errors={errors.website}
                info=" Could be your own website or a company one"
              />
              <TextFeildGroup
                placeholder=" Location"
                name="location"
                value={inputs.location}
                onChange={(e) =>  handleChange(e)}
                errors={errors.location}
                info="City or city & state suggested (eg. Mumbai,Maharashtra)"
              />
              <TextFeildGroup
                placeholder="* Skills"
                name="skills"
                value={inputs.skills}
                onChange={(e) =>  handleChange(e)}
                errors={errors.skills}
                info="City or city & state suggested (eg. Mumbai,Maharashtra)"
              />
              <TextFeildGroup
                placeholder="Github Username"
                name="githubusername"
                value={inputs.githubusername}
                onChange={(e) =>  handleChange(e)}
                error={errors.githubusername}
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFeildGroup
                placeholder="Short Bio"
                name="bio"
                value={inputs.bio}
                onChange={(e) =>  handleChange(e)}
                error={errors.bio}
                info="Tell us a little about yourself"
              />
              <div className="mb-3">
                <button onClick={handleDisplay} className="btn btn-light">
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}

              <input
                type="submit"
                value="submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps,{createProfile})(CreateProfile);
