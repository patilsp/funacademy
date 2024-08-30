export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { email, otp, username, password } = req.body;
  
      // Verify OTP logic
      // Register user if OTP is valid
  
      res.status(200).json({ message: 'User registered' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  