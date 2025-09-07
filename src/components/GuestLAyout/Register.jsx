// import React, { useState } from "react";
// import axios from "axios";

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         contact: "",
//         password: "",
//     });
//     const [profilePic, setProfilePic] = useState(null);
//     const [message, setMessage] = useState("");

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         setProfilePic(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const data = new FormData();
//         for (let key in formData) {
//             data.append(key, formData[key]);
//         }
//         if (profilePic) {
//             data.append("profilePic", profilePic);
//         }

//         try {
//             const res = await axios.post("https://ligand-software-solutions-63g6.onrender.com/api/users/register", data, {
//                 headers: { "Content-Type": "multipart/form-data" }
//             });
//             setMessage(res.data.message);
//             setFormData({
//                 name: "",
//                 email: "",
//                 contact: "",
//                 password: "",
//             });
//             setProfilePic(null);
//         } catch (err) {
//             setMessage(err.response?.data?.error || "Registration failed");
//         }
//     };

//     return (
//         <div style={{ maxWidth: "500px", margin: "auto" }}>
//             <h2>Register</h2>
//             {message && <p>{message}</p>}
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//                 <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//                 <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
//                 <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

//                 <input type="file" name="profilePic" accept="image/*" onChange={handleFileChange} />

//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };

// export default Register;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    usn: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (profilePic) {
      data.append("profilePic", profilePic);
    }

    try {
      const res = await axios.post(
        "https://ligand-software-solutions-63g6.onrender.com/api/users/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage({ text: res.data.message + " 🎉", type: "success" });
      setFormData({
        name: "",
        email: "",
        contact: "",
        password: "",
        usn: "",
      });
      setProfilePic(null);
    } catch (err) {
      setMessage({
        text: err.response?.data?.error || "Registration failed 😢",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container" data-aos="fade-up" style={{marginTop:"100px"}}>
     
        <div className="register-card">
          <div className="register-header">
            <h2>Create Your Account ✨</h2>
            <p>Join our community today! 🚀</p>
          </div>

          {message && (
            <div className={`message ${message.type}`} data-aos="fade-in">
              {message.text}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="register-form"
          >
            <div
              className="form-row"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="form-group">
                <label htmlFor="usn">🎓 USN Number</label>
                <input
                  type="text"
                  id="usn"
                  name="usn"
                  placeholder="Enter your USN number"
                  value={formData.usn}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">👤 Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">📧 Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div
              className="form-row"
              data-aos="fade-right"
              data-aos-delay="150"
            >
              <div className="form-group">
                <label htmlFor="contact">📞 Contact Number</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="Enter your phone number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">🔒 Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div
              className="form-group file-upload"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <label htmlFor="profilePic">🖼️ Profile Picture</label>
              <div className="file-input-container">
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <span className="file-custom">
                  {profilePic ? profilePic.name : "Choose a file..."}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className={`submit-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
              data-aos="zoom-in"
              data-aos-delay="250"
            >
              {isLoading ? <>⏳ Processing...</> : <>🌟 Register Now</>}
            </button>
          </form>

          <div
            className="login-redirect"
            data-aos="fade-in"
            data-aos-delay="300"
          >
            Already have an account? <a href="/login">Login here 👉</a>
          </div>
        </div>
   

      <style jsx>{`
        .Tilt {
          transition: all 0.3s;
        }
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .register-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          padding: 40px;
          width: 100%;
          max-width: 600px;
          transition: transform 0.3s ease;
        }

        .register-card:hover {
          transform: translateY(-5px);
        }

        .register-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .register-header h2 {
          color: #333;
          margin-bottom: 10px;
          font-weight: 700;
          font-size: 28px;
        }

        .register-header p {
          color: #666;
          font-size: 16px;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: flex;
          gap: 15px;
          flex-wrap: wrap; /* Add this */
        }

        .form-group {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .form-group label {
          margin-bottom: 8px;
          font-weight: 600;
          color: #444;
          font-size: 14px;
        }

        .form-group input {
          padding: 14px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
          outline: none;
        }

        .file-upload {
          margin-top: 10px;
        }

        .file-input-container {
          position: relative;
          min-height: 48px; /* Ensure consistent height */
        }

        .file-input-container input[type="file"] {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .file-custom {
          display: flex;
          align-items: center;
          padding: 14px 16px;

          border: 2px dashed #ccc;
          border-radius: 10px;
          text-align: center;
          color: #666;
          background: #f9f9f9;
          transition: all 0.3s ease;
        }

        .file-input-container:hover .file-custom {
          border-color: #667eea;
          background-color: #f0f4ff;
        }

        .submit-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 7px 14px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn.loading {
          background: linear-gradient(135deg, #a7a7a7 0%, #7a7a7a 100%);
        }

        .message {
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-weight: 500;
          text-align: center;
        }

        .message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .login-redirect {
          text-align: center;
          margin-top: 25px;
          color: #666;
          font-size: 14px;
        }

        .login-redirect a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .login-redirect a:hover {
          text-decoration: underline;
        }

        @media (max-width: 576px) {
          .register-card {
            padding: 25px;
          }

          .register-header h2 {
            font-size: 24px;
          }

          .form-row {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
