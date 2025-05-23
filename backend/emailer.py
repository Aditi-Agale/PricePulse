import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# Email configuration loaded from environment variables for security
EMAIL_CONFIG = {
    'SENDER_EMAIL': os.getenv('SENDER_EMAIL'),
    'SENDER_PASSWORD': os.getenv('SENDER_PASSWORD'),
    'SMTP_SERVER': os.getenv('SMTP_SERVER', 'smtp.gmail.com'),
    'SMTP_PORT': int(os.getenv('SMTP_PORT', 587))
}

def send_email(to_email, subject, body, html=False):
    """
    Send an email with optional HTML content.
    
    Args:
        to_email (str): Recipient email address.
        subject (str): Email subject line.
        body (str): Email message content.
        html (bool): If True, send body as HTML, else plain text.
    """
    msg = MIMEMultipart()
    msg['From'] = EMAIL_CONFIG['SENDER_EMAIL']
    msg['To'] = to_email
    msg['Subject'] = subject

    mime_type = 'html' if html else 'plain'
    msg.attach(MIMEText(body, mime_type))

    try:
        with smtplib.SMTP(EMAIL_CONFIG['SMTP_SERVER'], EMAIL_CONFIG['SMTP_PORT']) as server:
            server.starttls()  # Secure connection
            server.login(EMAIL_CONFIG['SENDER_EMAIL'], EMAIL_CONFIG['SENDER_PASSWORD'])
            server.send_message(msg)
        print(f"[EMAIL SENT] to {to_email}")
        return True
    except Exception as e:
        print(f"[EMAIL ERROR] {e}")
        return False
