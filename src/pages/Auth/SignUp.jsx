import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/input/input';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/input/ProfilePhotoSelector';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import uploaImage from '../../utils/uploadImage'; // Assuming you have a utility function for image upload

const SignUp = () => {
  const [profilePic, setProfilePic] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = ""; 

    if (!fullName || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setError(null);
    setLoading(true);
    
    // SignUp API Call 
    try {
      // Upload profile picture if provided
      if (profilePic) {
        const imgUploadRes = await uploaImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || ""; // Assuming the response contains the image URL
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName, 
        email, 
        password, 
        profileImageUrl
      }); 
      const { token, user } = response.data; 

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user); 
        navigate("/dashboard"); // Redirect to home after successful signup
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); 
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="max-w-xl mx-auto mt-6 text-[#3b322c] font-serif">
        <h3 className="text-2xl font-semibold mb-2 tracking-wide italic">Create an Account Today</h3>
        <p className="text-sm text-[#7a6e66] mb-6 italic">
          Join the scholarly community and elevate your study habits.
        </p>

        {error && <p className="text-red-600 text-sm mb-4 italic">{error}</p>}

        <form onSubmit={handleSignUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="e.g. Ada Lovelace"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="e.g. ada@tigerstudy.edu"
            type="text"
          />

          <div className="col-span-2">
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Minimum 8 characters"
              type="password"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7b5e57] text-[#f8f5f0] py-2 rounded-md shadow hover:bg-[#6e514a] transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          <p className="col-span-2 text-sm mt-4 text-[#7a6e66] text-center italic">
            Already have an account?{' '}
            <Link className="underline text-[#a27e64] hover:text-[#c4a77d]" to="/login">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
