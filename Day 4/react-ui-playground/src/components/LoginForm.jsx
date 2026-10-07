import { useState } from 'react';
import Input from './Input';
import Button from './Button';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!formData.email.includes('@')) newErrors.email = 'Invalid email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="you@example.com"
      />
      <Input
        id="password"
        name="password"
        label="Password"   
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Min 6 characters"
      />
      <Button type="submit">Login</Button>
      {submitted && <p style={{ color: 'green', marginTop: '1rem' }}>✅ Login successful!</p>}
    </form>
  );
}