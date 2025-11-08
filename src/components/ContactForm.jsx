import React, { useState, useRef } from 'react';
import '../styles/ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [generalError, setGeneralError] = useState('');
  const formRef = useRef(null);

  // Email validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Phone validation (at least 10 digits)
  const validatePhone = (phone) => /^\d{10,}$/.test(phone.replace(/\D/g, ''));

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (at least 10 digits)';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (generalError) setGeneralError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      setGeneralError('');
      setSuccessMessage('');

      const response = await fetch('https://vernanbackend.ezlab.in/api/contact-us/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Form submitted:', data);

        setSuccessMessage('Form Submitted Successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } else {
        setGeneralError('Something went wrong. Try again later.');
      }
    } catch (err) {
      console.error('🚨 Network error:', err);
      setGeneralError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-content">
            <p className="info-text">
              Whether you have an idea, a question, or simply want to explore how V can work for you, just a message away. Let's catch up over coffee. Great stories always begin with a good conversation.
            </p>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <div className="form-box">
            <div className="form-header">
              <h2 className="form-title">Join the Story</h2>
              <p className="form-subtitle">Ready to bring your vision to life? Let's talk.</p>
            </div>

            {successMessage && <div className="success-message">✓ {successMessage}</div>}
            {generalError && <div className="error-message">✕ {generalError}</div>}

            <form ref={formRef} onSubmit={handleSubmit} className="form" noValidate>
              <div className="form-group">
                <label htmlFor="name">Your name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                  disabled={loading}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Your email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'error' : ''}
                  disabled={loading}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={errors.phone ? 'error' : ''}
                  disabled={loading}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Your message*</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="5"
                  className={errors.message ? 'error' : ''}
                  disabled={loading}
                ></textarea>
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <center>
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </center>
            </form>
          </div>

          <div className="form-footer">
            <span className="footer-email">veritas@varnanfilms.co.in</span>
            <span className="footer-phone">+91 98726 84567</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
