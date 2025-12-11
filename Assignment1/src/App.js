import './App.css';
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

function Form() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhaar: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
  let err = {};

  if (!form.firstName.trim()) err.firstName = "First Name is required";
  if (!form.lastName.trim()) err.lastName = "Last Name is required";
  if (!form.username.trim()) err.username = "Username is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) err.email = "Email is required";
  else if (!emailRegex.test(form.email)) err.email = "Enter a valid email";

  if (!form.password.trim()) err.password = "Password is required";
  else if (form.password.length < 6)
    err.password = "Password must be at least 6 characters";

  const ccRegex = /^\+\d{1,3}$/;
  if (!form.phoneCode.trim()) err.phoneCode = "Code required";
  else if (!ccRegex.test(form.phoneCode))
    err.phoneCode = "Invalid country code";

  const phoneRegex = /^[0-9]{10}$/;
  if (!form.phone.trim()) err.phone = "Phone required";
  else if (!phoneRegex.test(form.phone))
    err.phone = "Phone must be 10 digits";

  if (!form.country.trim()) err.country = "Country required";

  if (!form.city.trim()) err.city = "City required";

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  if (!form.pan.trim()) err.pan = "PAN required";
  else if (!panRegex.test(form.pan.toUpperCase()))
    err.pan = "Invalid PAN format";

  const aadhaarRegex = /^\d{12}$/;
  if (!form.aadhaar.trim()) err.aadhaar = "Aadhaar required";
  else if (!aadhaarRegex.test(form.aadhaar))
    err.aadhaar = "Aadhaar must be 12 digits";

  return err;
};


  const isValid = () => Object.keys(validate()).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      navigate("/details", { state: form });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="form-title">Registration Form</h2>

        {Object.keys(form).map((key) => (
          <div key={key} className="input-group">
            <label>{key.replace(/([A-Z])/g, " $1")}</label>

            <input
              type={key === "password" ? (showPass ? "text" : "password") : "text"}
              name={key}
              value={form[key]}
              onChange={handleChange}
              className={errors[key] ? "input-error" : ""}
            />

            {key === "password" && (
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="toggle-password"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            )}

            {errors[key] && <p className="error-text">{errors[key]}</p>}
          </div>
        ))}

        <button
          type="submit"
          disabled={!isValid()}
          className={`submit-btn ${isValid() ? "submit-enabled" : "submit-disabled"}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function Details() {
  const { state } = useLocation();
  if (!state) return <p>No data submitted.</p>;

  return (
    <div className="details-container">
      <h2 className="details-title">Submitted Details</h2>
      <div>
        {Object.entries(state).map(([key, value]) => (
          <p key={key} className="details-text">
            <strong>{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
}
