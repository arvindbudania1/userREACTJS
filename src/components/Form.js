import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(dob);
    const ageDiff = currentDate - selectedDate;
    const ageInYears = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365));

    if (ageInYears < 18) {
      alert('You must be at least 18 years old');
      return;
    }

    const userdata = {
      name,
      dob,
      email,
      phone_number,
    };

    try {
      const resp = await axios.post('https://avbudania123.pythonanywhere.com/api/user-form/', userdata);
      console.log(resp.data);

      window.alert('Success. We sent you an email to become a part of our precious family.');
      navigate('/submitted-form');
    } catch (error) {
      console.error(error);
      // Handle the error response, display error message, etc.
    }

    resetForm();
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!dob.trim()) {
      errors.dob = 'Date of Birth is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }

    if (!phone_number.trim()) {
      errors.phone_number = 'Phone number is required';
    } else if (!isValidPhoneNumber(phone_number)) {
      errors.phone_number = 'Invalid phone number format';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Implement your email validation logic here
    // You can use regular expressions or any other validation library
    // Example: return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return true;
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Implement your phone number validation logic here
    // You can use regular expressions or any other validation library
    return true;
  };

  const resetForm = () => {
    setName('');
    setDob('');
    setEmail('');
    setPhoneNumber('');
    setErrors({});
  };

  return (
    <div className="container">
      <span className="form__title">User Forms</span>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <input
            type="text"
            placeholder="Name"
            required
            className="form__input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name && <span className="form__error">{errors.name}</span>}
          <span className="form__bar"></span>
               </div>
        <div className="form__group">
          <input
            type="date"
            placeholder="Date of Birth"
            required
            className="form__input"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
          />
          {errors.dob && <span className="form__error">{errors.dob}</span>}
          <span className="form__bar"></span>
        </div>
        <div className="form__group">
          <input
            type="text"
            placeholder="Email"
            required
            className="form__input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email && <span className="form__error">{errors.email}</span>}
          <span className="form__bar"></span>
        </div>
        <div className="form__group">
          <input
            type="tel"
            placeholder="Phone"
            required
            className="form__input"
            value={phone_number}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          {errors.phone_number && <span className="form__error">{errors.phone_number}</span>}
          <span className="form__bar"></span>
        </div>
        <button type="submit" className="form__button">Sign up</button>
      </form>
    </div>
  );
};

export default UserForm;

