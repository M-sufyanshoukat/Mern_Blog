import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RequestRest() {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/auth/reset-password-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
      setAlertMessage("Failed to send email. Please try again.");
      setAlertType("failure");
    }
  };

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
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
          <div>
  <Label value="Your email" style={{ marginBottom: '20px' }} />
  <TextInput
    type="email"
    placeholder="name@company.com"
    id="email"
    className="mb-3 mt-4"
    value={email}
    onChange={(e) => handleChange(e)}
    
  />
</div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Send Email
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

