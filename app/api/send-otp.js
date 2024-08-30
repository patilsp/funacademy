import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Generate and send OTP logic
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send OTP via email (using nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      // Save OTP in database or cache with email
      res.status(200).json({ message: 'OTP sent' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
