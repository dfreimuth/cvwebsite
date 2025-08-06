# EmailJS Contact Form Setup Guide

This guide will help you set up EmailJS to make your contact form functional.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Save the Service ID** - you'll need this

## Step 3: Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})
To: {{to_name}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. **Save the Template ID** - you'll need this

## Step 4: Get Your Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** - you'll need this

## Step 5: Update the Code

Open `js/main.js` and replace these placeholders:

```javascript
// Line ~172: Replace with your actual Public Key
emailjs.init("YOUR_PUBLIC_KEY");

// Lines ~190-191: Replace with your actual IDs
await emailjs.send(
    "YOUR_SERVICE_ID",     // Replace with your Service ID
    "YOUR_TEMPLATE_ID",    // Replace with your Template ID
    {
        // ... rest of the code
    }
);
```

## Example Configuration

Here's what your code should look like after setup:

```javascript
// Initialize EmailJS
emailjs.init("user_abc123def456"); // Your actual public key

// In the form submission handler
await emailjs.send(
    "service_gmail123",    // Your actual service ID
    "template_contact456", // Your actual template ID
    {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Darren Freimuth"
    }
);
```

## Step 6: Test Your Form

1. Save your changes
2. Refresh your website
3. Fill out the contact form
4. Check your email for the message
5. Check the browser console for any errors

## Troubleshooting

**Form not sending?**
- Check browser console for errors
- Verify your Public Key, Service ID, and Template ID are correct
- Make sure your email service is properly configured in EmailJS

**Emails not arriving?**
- Check your spam/junk folder
- Verify the template variables match your code
- Test with a different email address

**Rate limiting?**
- Free accounts are limited to 200 emails/month
- Consider upgrading for higher limits

## Security Notes

- The Public Key is safe to use in client-side code
- EmailJS handles the secure email sending
- Consider adding reCAPTCHA for spam protection (optional)

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: Available through their dashboard

---

Once you complete this setup, your contact form will send real emails directly to your inbox!
