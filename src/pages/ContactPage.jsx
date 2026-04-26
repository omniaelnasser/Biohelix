import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import DNA3D from '../components/DNA3D';
import PhoneInput from '../components/PhoneInput';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',       // digits only (without dial code)
    phoneDialCode: '+971', // country dial code kept separately
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }
    
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 6) {
      newErrors.phone = 'Enter a valid phone number (min 6 digits).';
    }

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field upon typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: `${formData.phoneDialCode} ${formData.phone}`,
            subject: formData.subject,
            message: formData.message
          }),
        });

        const result = await response.json();

        if (result.success) {
          setIsSubmitted(true);
          setFormData({ name: '', email: '', phone: '', phoneDialCode: '+971', subject: '', message: '' });
          setTimeout(() => setIsSubmitted(false), 5000); // Reset success after 5s
        } else {
          alert('Failed to send message. Please try again later.');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send message. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* HERO SECTION WITH 3D BACKGROUND */}
      <section className={styles.heroSection}>
        <div className={styles.hero3DContainer}>
          <DNA3D />
        </div>
        <div className={styles.heroOverlay}></div>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>Contact BioHelix</h1>
          <h2 className={styles.subtitle}>We’re Here to Support Your Healthcare Needs</h2>
          <p className={styles.description}>
            Reach out to BioHelix for inquiries about our pharmaceutical and aesthetic solutions, partnerships, collaborations, or general support.
          </p>
        </motion.div>
      </section>

      {/* CONTACT INFO & FORM ALIGNMENT SECTION */}
      <section className={styles.contactWrapper}>
        <div className={styles.contactBgOverlay}></div>
        <div className={styles.contactContainer}>
          
          {/* LEFT: Contact Form */}
          <motion.div 
            className={styles.contactFormWrapper}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.formCard}>
              <h3>Send a Message</h3>
              {isSubmitted ? (
                <motion.div 
                  className={styles.successMessage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                   <div className={styles.successIconWrapper}><Send className={styles.successIcon} /></div>
                   <h4>Message Sent Successfully!</h4>
                   <p>Our team will get back to you within 24-48 business hours.</p>
                </motion.div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name <span className={styles.requiredAstrisk}>*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange}
                      className={errors.name ? styles.inputError : ''} 
                      placeholder="Dr. John Doe"
                    />
                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address <span className={styles.requiredAstrisk}>*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange}
                      className={errors.email ? styles.inputError : ''} 
                      placeholder="john.doe@clinic.com"
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                  </div>

                  <PhoneInput
                    id="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, phone: e.target.value }));
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                    }}
                    onCountryChange={(country) => {
                      setFormData(prev => ({ ...prev, phoneDialCode: country.dial }));
                    }}
                    error={errors.phone}
                  />

                  <div className={styles.inputGroup}>
                    <label htmlFor="subject">Subject <span className={styles.requiredAstrisk}>*</span></label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleInputChange}
                      className={errors.subject ? styles.inputError : ''} 
                      placeholder="Partnership Inquiry"
                    />
                    {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="message">Message <span className={styles.requiredAstrisk}>*</span></label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange}
                      className={errors.message ? styles.inputError : ''} 
                      placeholder="How can we help you?"
                      rows="4"
                    ></textarea>
                    {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send className={styles.btnIcon} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* RIGHT: Contact Information */}
          <motion.div 
            className={styles.contactInfoWrapper}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.infoCard}>
              <h3>Get In Touch</h3>
              <p className={styles.infoDescription}>Our team of pharmaceutical experts is ready to assist you. Contact our global headquarters in the UAE.</p>
              
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.iconBox}><MapPin className={styles.infoIcon} /></div>
                  <div className={styles.infoTextWrapper}>
                    <span className={styles.infoLabel}>Headquarters</span>
                    <span className={styles.infoText}>Abu Dhabi, UAE</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconBox}><Phone className={styles.infoIcon} /></div>
                  <div className={styles.infoTextWrapper}>
                    <span className={styles.infoLabel}>Phone</span>
                    <span className={styles.infoText}>+971 2 555 0199</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconBox}><Mail className={styles.infoIcon} /></div>
                  <div className={styles.infoTextWrapper}>
                    <span className={styles.infoLabel}>Email</span>
                    <span className={styles.infoText}>contact@biohelix-pharma.com</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconBox}><Clock className={styles.infoIcon} /></div>
                  <div className={styles.infoTextWrapper}>
                    <span className={styles.infoLabel}>Working Hours</span>
                    <span className={styles.infoText}>Mon - Fri: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* MAP SECTION */}
      <section className={styles.mapSection}>
        <motion.div 
          className={styles.mapContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Standard google maps iframe placeholder of Abu Dhabi */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116127.34563816225!2d54.54226176156948!3d24.467499645229605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e440f723ef2b9%3A0xc7cc2e934a97120a!2sAbu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1714570000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="BioHelix UAE Headquarters"
          ></iframe>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;
