import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <div style={styles.footerContainer}>
      <div style={styles.contactSection}>
        <h3 style={styles.heading}>Liên hệ</h3>
        <p>Hotline</p>
        <p style={styles.boldText}>66 77 028</p>
        <p>Email for customer</p>
        <p>customercare@huce.vn</p>
        <p>Email for business</p>
        <p>business@huce.vn</p>
        <p>Email for recruitment</p>
        <p>hr-admin@huce.vn</p>
      </div>

      <div style={styles.storeSection}>
        <h3 style={styles.heading}>Cửa hàng</h3>
        <p>55 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội</p>
        <p>55 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội </p>
        
      </div>

      <div style={styles.socialSection}>
        <FaFacebook size={24} style={styles.icon} />
        <FaInstagram size={24} style={styles.icon} />
        <FaYoutube size={24} style={styles.icon} />
        <FaTiktok size={24} style={styles.icon} />
      </div>
    </div>
  );
};

const styles = {
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '40px 80px',
    backgroundColor: '#f9f9f9',
    borderTop: '1px solid #ddd',

  },
  contactSection: {
    flex: 1,
    fontSize: '14px',
  },
  storeSection: {
    flex: 1,
    fontSize: '14px',
  },
  socialSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
  },
  heading: {
    marginBottom: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '14px',
  },
  icon: {
    cursor: 'pointer',
    color: '#000',
  },
};

export default Footer;