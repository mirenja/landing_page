import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactFormWizard() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyEmail: "",
    phone: "",
    companyName: "",
    companySize: "",
    infrastructure: "",
    modernizationReason: "",
    modernizationGoals: []
  });

  const [touched, setTouched] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleCheckbox = (field, value) => {
    const existing = formData[field];
    setFormData({
      ...formData,
      [field]: existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value]
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const personalDomains = [
      "gmail.com", "yahoo.com", "outlook.com", "hotmail.com",
      "icloud.com", "aol.com", "protonmail.com", "mail.com", "me.com"
    ];
    const domain = email.split("@")[1]?.toLowerCase();
    return emailRegex.test(email) && domain && !personalDomains.includes(domain);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    return phoneRegex.test(phone);
  };

  const isStep1Valid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      isValidEmail(formData.companyEmail) &&
      isValidPhone(formData.phone) &&
      formData.companyName.trim() &&
      formData.companySize
    );
  };

  const handleContinue = () => {
    setTouched({
      firstName: true,
      lastName: true,
      companyEmail: true,
      phone: true,
      companyName: true,
      companySize: true
    });

    if (isStep1Valid()) {
      setStep(2);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="relative max-w-2xl w-full bg-white p-8 shadow-md rounded-lg">

        {/* Back button to homepage */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <div className="mb-6 pt-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 justify-center">
            <span className={step === 1 ? "font-bold text-accent" : ""}>1 Contact Info</span>
            <span>—</span>
            <span className={step === 2 ? "font-bold text-accent" : ""}>2 How we can help</span>
          </div>
        </div>

        {step === 1 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  onBlur={() => setTouched({ ...touched, firstName: true })}
                  className="border border-border p-2 rounded bg-input w-full"
                />
                {touched.firstName && !formData.firstName.trim() && (
                  <p className="text-sm text-red-600 mt-1">First name is required.</p>
                )}
              </div>

              <div>
                <input
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  onBlur={() => setTouched({ ...touched, lastName: true })}
                  className="border border-border p-2 rounded bg-input w-full"
                />
                {touched.lastName && !formData.lastName.trim() && (
                  <p className="text-sm text-red-600 mt-1">Last name is required.</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <input
                placeholder="Company email"
                value={formData.companyEmail}
                onChange={(e) => handleInputChange("companyEmail", e.target.value)}
                onBlur={() => setTouched({ ...touched, companyEmail: true })}
                className="w-full border border-border p-2 rounded bg-input"
              />
              {touched.companyEmail && !isValidEmail(formData.companyEmail) && (
                <p className="text-sm text-red-600 mt-1">
                  Please enter a valid business email (not Gmail, Yahoo, etc.).
                </p>
              )}
            </div>

            <div className="mt-4">
              <input
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                onBlur={() => setTouched({ ...touched, phone: true })}
                className="w-full border border-border p-2 rounded bg-input"
              />
              {touched.phone && !isValidPhone(formData.phone) && (
                <p className="text-sm text-red-600 mt-1">
                  Please enter a valid phone number.
                </p>
              )}
            </div>

            <div className="mt-4">
              <input
                placeholder="Company name"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                onBlur={() => setTouched({ ...touched, companyName: true })}
                className="w-full border border-border p-2 rounded bg-input"
              />
              {touched.companyName && !formData.companyName.trim() && (
                <p className="text-sm text-red-600 mt-1">Company name is required.</p>
              )}
            </div>

            <div className="mt-4">
              <select
                value={formData.companySize}
                onChange={(e) => handleInputChange("companySize", e.target.value)}
                onBlur={() => setTouched({ ...touched, companySize: true })}
                className="w-full border border-border p-2 rounded bg-input"
              >
                <option value="">How many employees does your company have?</option>
                <option value="1-10">1–10</option>
                <option value="11-50">11–50</option>
                <option value="51-200">51–200</option>
                <option value="201-1000">201–1000</option>
                <option value="1000+">1000+</option>
              </select>
              {touched.companySize && !formData.companySize && (
                <p className="text-sm text-red-600 mt-1">Company size is required.</p>
              )}
            </div>

            <button
              onClick={handleContinue}
              className="mt-6 bg-accent text-accent-foreground hover:bg-accent-light px-4 py-2 rounded"
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-600">Which best describes your current infrastructure setup?</p>
            {[
              "Primarily on-premise infrastructure",
              "Hybrid (mix of cloud and on-premise)",
              "Cloud-first or fully cloud-native"
            ].map((item) => (
              <label key={item} className="block">
                <input
                  type="radio"
                  name="infrastructure"
                  checked={formData.infrastructure === item}
                  onChange={() => handleInputChange("infrastructure", item)}
                  className="mr-2 accent-accent"
                />
                {item}
              </label>
            ))}

            <p className="text-gray-600 mt-6">What’s your main reason for modernizing your infrastructure?</p>
            {[
              "Improving performance and scalability",
              "Reducing operational costs",
              "Increasing security and compliance",
              "Aligning with digital transformation goals"
            ].map((item) => (
              <label key={item} className="block">
                <input
                  type="radio"
                  name="modernizationReason"
                  checked={formData.modernizationReason === item}
                  onChange={() => handleInputChange("modernizationReason", item)}
                  className="mr-2 accent-accent"
                />
                {item}
              </label>
            ))}

            <p className="text-gray-600 mt-6">What are your main modernization goals?</p>
            {[
              "Cloud migration strategy",
              "Network optimization",
              "Enhanced monitoring & observability",
              "Automation of operations",
              "Improved security posture"
            ].map((item) => (
              <label key={item} className="block">
                <input
                  type="checkbox"
                  checked={formData.modernizationGoals.includes(item)}
                  onChange={() => toggleCheckbox("modernizationGoals", item)}
                  className="mr-2 accent-accent"
                />
                {item}
              </label>
            ))}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={() => alert("Submitted!")}
                className="bg-accent text-accent-foreground hover:bg-accent-light px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
