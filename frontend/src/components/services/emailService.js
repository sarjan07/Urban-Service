// Email service for sending welcome emails and notifications
// This is a mock service that simulates sending emails by storing them in localStorage

/**
 * Email service that provides methods to send various types of emails
 * For demonstration purposes, this service doesn't actually send emails
 * but saves them to localStorage to simulate the functionality
 */
class EmailService {
  constructor() {
    this.storedEmails = JSON.parse(localStorage.getItem('sentEmails')) || [];
  }

  /**
   * Save an email to localStorage
   * @param {Object} email - The email object to save
   */
  _saveEmail(email) {
    this.storedEmails.push({
      ...email,
      sentAt: new Date().toISOString()
    });
    localStorage.setItem('sentEmails', JSON.stringify(this.storedEmails));
    console.log('Email sent:', email);
    return true;
  }

  /**
   * Send a welcome email to a new user
   * @param {Object} user - The user object containing email and name
   * @returns {boolean} - True if email was sent successfully
   */
  sendWelcomeEmail(user) {
    if (!user || !user.email) {
      console.error('Cannot send welcome email: Invalid user data');
      return false;
    }

    const emailContent = this._getWelcomeEmailTemplate(user);
    return this._saveEmail({
      to: user.email,
      subject: 'Welcome to Urban Services',
      content: emailContent,
      type: 'welcome'
    });
  }

  /**
   * Send a service booking confirmation email
   * @param {Object} user - The user who booked the service
   * @param {Object} service - The service that was booked
   * @returns {boolean} - True if email was sent successfully
   */
  sendServiceBookingEmail(user, service) {
    if (!user || !user.email || !service) {
      console.error('Cannot send booking email: Invalid data');
      return false;
    }

    const emailContent = this._getServiceBookingTemplate(user, service);
    return this._saveEmail({
      to: user.email,
      subject: `Your ${service.name} booking confirmation`,
      content: emailContent,
      type: 'service_booking'
    });
  }

  /**
   * Get all sent emails (for demonstration purposes)
   * @returns {Array} - Array of all sent emails
   */
  getAllSentEmails() {
    return this.storedEmails;
  }

  /**
   * Generate a welcome email template
   * @param {Object} user - The user object
   * @returns {string} - HTML content for the welcome email
   */
  _getWelcomeEmailTemplate(user) {
    const firstName = user.firstName || user.name?.split(' ')[0] || 'User';
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4A90E2;">Welcome to Urban Services!</h2>
        <p>Hello ${firstName},</p>
        <p>Thank you for joining Urban Services. We're excited to have you on board!</p>
        <p>With your new account, you can:</p>
        <ul>
          <li>Book a wide range of urban services</li>
          <li>Manage your appointments</li>
          <li>Make secure payments</li>
          <li>Rate and review service providers</li>
        </ul>
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br>The Urban Services Team</p>
      </div>
    `;
  }

  /**
   * Generate a service booking confirmation email template
   * @param {Object} user - The user object
   * @param {Object} service - The service object
   * @returns {string} - HTML content for the service booking email
   */
  _getServiceBookingTemplate(user, service) {
    const firstName = user.firstName || user.name?.split(' ')[0] || 'User';
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4A90E2;">Your Service Booking Confirmation</h2>
        <p>Hello ${firstName},</p>
        <p>Your booking for <strong>${service.name}</strong> has been confirmed.</p>
        <p>Details:</p>
        <ul>
          <li><strong>Service:</strong> ${service.name}</li>
          <li><strong>Price:</strong> $${service.price.toFixed(2)}</li>
        </ul>
        <p>Thank you for choosing Urban Services!</p>
        <p>Best regards,<br>The Urban Services Team</p>
      </div>
    `;
  }
}

export default new EmailService(); 