import React from 'react'

const ProfileActions = () => {
  return (
    <div> <div className="btn-group mb-4" role="group">
    <a href="/edit-profile" className="btn btn-light">
      <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</a>
    <a href="/add-experience" className="btn btn-light">
      <i className="fab fa-black-tie text-info mr-1"></i>
      Add Experience</a>
    <a href="/add-education" className="btn btn-light">
      <i className="fas fa-graduation-cap text-info mr-1"></i>
      Add Education</a>
  </div></div>
  )
}

export default ProfileActions