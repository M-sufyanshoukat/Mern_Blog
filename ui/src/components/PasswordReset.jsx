import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PasswordRest() {
  const { token } = useParams(); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlertMessage("Your passwords do not match.");
      setAlertType("failure");
      return;
    }
    try {
      const response = await fetch("http://localhost:9000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ password, confirmPassword }), 
      });      
      const data = await response.json();
      if (response.ok) {
        setAlertMessage(data.message);
        setAlertType("success");
      } else {
        setAlertMessage(data.error);
        setAlertType("failure");
      }
    } catch (error) {
      console.error(error);
      setAlertMessage("Failed to update password. Please try again." + error.message);
      setAlertType("failure");
    }
  };



  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [alertMessage]);

  return (
   



    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-950 via-purple-500 to-pink-500 rounded-lg text-white">
              Daily
            </span>
            Dose
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga optio
            ab deleniti eveniet!
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Enter New Password" className="mb-5" />
              <TextInput
                type="password"
                placeholder="Enter new Password"
                name="password"
                className="mb-3"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Confirm Password" className="mb-5" />
              <TextInput
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                className="mb-3"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Update Password  
            </Button>
          </form>
          {alertMessage && (
            <Alert className="mt-5" color={alertType}>
              {alertMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
