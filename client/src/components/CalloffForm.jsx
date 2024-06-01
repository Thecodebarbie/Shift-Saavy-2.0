import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SCHEDULE_BY_ID } from '../utils/queries';

function CalloffForm() {
  const { id } = useParams();
  //const sid = "665a171ded67c01dfffee247"
  console.log('User ID:', id);
  //console.log('S ID:', sid);
  const { loading, error, data } = useQuery(QUERY_SCHEDULE_BY_ID, {
    variables: { scheduleId: id },
  });
  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Data:', data);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    date: '',
    startTime: '',
    endTime: ''
  });

  useEffect(() => {
    if (data && data.schedule) {
      const { schedule } = data;
      setFormData({
        firstname: schedule.user.firstname,
        lastname: schedule.user.lastname,
        date: schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading schedule data</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted', formData);
    // Clear the form fields
  setFormData({
    firstname: '',
    lastname: '',
    date: '',
    startTime: '',
    endTime: ''
  });

  // Display success message
  alert('Successfully submitted the calloff');
  };

  return (
    <section className="container">
      <input type="checkbox" id="signup_toggle" hidden />
      <article className="form">
        <form id="form-signup" className="form_front" onSubmit={handleSubmit}>
          <h2 className="form_details">Call Off Request</h2>
          <input
            name="firstname"
            type="text"
            className="input"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleInputChange}
          />
          <input
            name="lastname"
            type="text"
            className="input"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleInputChange}
          />
          <input
            name="date"
            type="text"
            className="input"
            placeholder="Shift Date"
            value={formData.date}
            onChange={handleInputChange}
          />
          <input
            name="startTime"
            type="text"
            className="input"
            placeholder="Shift Start Time"
            value={formData.startTime}
            onChange={handleInputChange}
          />
          <input
            name="endTime"
            type="text"
            className="input"
            placeholder="Shift End Time"
            value={formData.endTime}
            onChange={handleInputChange}
          />
          <button name="calloff-btn" type="submit" className="btn">Submit Call Off</button>
        </form>
      </article>
    </section>
  );
}

export default CalloffForm;
