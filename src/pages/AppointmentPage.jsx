import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Clock, CheckCircle2, Headphones, Activity } from 'lucide-react';
import PhoneInput from '../components/PhoneInput';
import styles from './AppointmentPage.module.css';

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    phoneDialCode: '+971',
    country: '',
    serviceType: '',
    date: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 6) {
      newErrors.phone = 'Enter a valid phone number (min 6 digits).';
    }
    if (!formData.country.trim()) newErrors.country = 'Country is required.';
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service.';
    if (!formData.date) newErrors.date = 'Please choose a preferred date.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Combine: countryCode + phoneNumber on submit
      const fullPhoneNumber = `${formData.phoneDialCode} ${formData.phone}`;
      console.log('Submitting Appointment:', { ...formData, phone: fullPhoneNumber });

      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', phoneDialCode: formData.phoneDialCode, country: formData.country, serviceType: '', date: '', message: '' });
      }, 700);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>Get an Appointment</h1>
          <h2 className={styles.subtitle}>Schedule Your Consultation with BioHelix Experts</h2>
          <p className={styles.description}>
            Book a consultation with our pharmaceutical and healthcare specialists to discuss our advanced medical and aesthetic solutions.
          </p>
        </motion.div>
      </section>

      {/* FORM & SUPPORT SECTION */}
      <section className={styles.formContainerWrapper}>
        <div className={styles.contentLayout}>
          
          {/* APPOINTMENT FORM */}
          <motion.div 
            className={styles.formPanel}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            {isSubmitted ? (
              <div className={styles.successMessage}>
                <CheckCircle2 className={styles.successIcon} />
                <h3>Appointment Requested Successfully</h3>
                <p>A member of our clinical team will contact you shortly to confirm your consultation schedule.</p>
                <button className={styles.resetBtn} onClick={() => setIsSubmitted(false)}>
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form className={styles.appointmentForm} onSubmit={handleSubmit} noValidate>
                
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={errors.name ? styles.inputError : ''} placeholder="John Doe" />
                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={errors.email ? styles.inputError : ''} placeholder="john@example.com" />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div style={{ flex: 1 }}>
                    <PhoneInput
                      id="phone"
                      label="Phone Number"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                      }}
                      onCountryChange={(country) => {
                        setFormData(prev => ({ ...prev, country: country.name, phoneDialCode: country.dial }));
                        if (errors.country) setErrors(prev => ({ ...prev, country: null }));
                      }}
                      error={errors.phone}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="country">Country / Location *</label>
                    <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} className={errors.country ? styles.inputError : ''} placeholder="United Arab Emirates" />
                    {errors.country && <span className={styles.errorText}>{errors.country}</span>}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="serviceType">Service Type *</label>
                  <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleInputChange} className={errors.serviceType ? styles.inputError : ''}>
                    <option value="" disabled>Select a specialized service</option>
                    <option value="Pharmaceutical Consultation">Pharmaceutical Consultation</option>
                    <option value="Aesthetic Treatment Inquiry">Aesthetic Treatment Inquiry</option>
                    <option value="Partnership Request">Partnership Request</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                  {errors.serviceType && <span className={styles.errorText}>{errors.serviceType}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="date">Preferred Date *</label>
                  <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} className={errors.date ? styles.inputError : ''} />
                  {errors.date && <span className={styles.errorText}>{errors.date}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} className={errors.message ? styles.inputError : ''} rows="4" placeholder="Please elaborate on your medical inquiry..."></textarea>
                  {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Confirm Appointment <CalendarCheck className={styles.btnIcon} />
                </button>
              </form>
            )}
          </motion.div>

          {/* SUPPORTIVE INFO (SIDE PANEL) */}
          <motion.div 
            className={styles.supportPanel}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.supportCard}>
              <div className={styles.cardHeader}>
                <Activity className={styles.headerIcon} />
                <h3>Expert Availability</h3>
              </div>
              <p className={styles.supportDesc}>Our specialists are typically available to review and confirm appointments within 12 business hours.</p>
              
              <ul className={styles.supportList}>
                <li>
                  <Clock className={styles.listIcon} />
                  <div>
                    <strong>Working Hours</strong>
                    <span>Monday - Friday: 9:00 AM - 6:00 PM (GST)</span>
                  </div>
                </li>
                <li>
                  <CalendarCheck className={styles.listIcon} />
                  <div>
                    <strong>Response Time</strong>
                    <span>Under 12 business hours</span>
                  </div>
                </li>
                <li>
                  <Headphones className={styles.listIcon} />
                  <div>
                    <strong>Support Team</strong>
                    <span>Dedicated 24/5 global support desk</span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default AppointmentPage;
