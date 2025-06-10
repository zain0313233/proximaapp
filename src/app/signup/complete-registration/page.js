"use client";
import { useState, useEffect } from "react";
import axiox from "axios";
import { useUser } from "@/context/UserContext";
import NavBar from "@/componenet/navbar";
import { useRouter } from "next/navigation";

const CompleteRegistration = () => {
  const { user, token } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    owner_id: user?.id || "",
    type: "",
    description: "",
    status: "active",
    industry: "",
    phone: "",
    address: "",
    website_url: "",
    max_members: 10
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createOrg, setCreateOrg] = useState(false);

  const handleInputChange = (field,value) => {
   setFormData(prev =>({
      ...prev,
      [field]: value
    }));
    
  };
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      owner_id: user?.id || "",
    }

    try {
      const response = await axiox.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/`,payload,
        {
          headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status === 201) {
        console.log("Organization created successfully:", response.data);
         setIsSubmitted(true);
 await delay(5000);
      router.push("/");
      }
       const data = response.data;
        console.log("Success:", data);
       
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2)); // Changed from 3 to 2
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <NavBar />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Complete Your Registration
              </h1>
              <p className="text-gray-600 text-lg">
                Just a few more steps to get you started
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                {[1, 2].map((num) => (
                  <div key={num} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                        step >= num
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {num}
                    </div>
                    {num < 2 && (
                      <div
                        className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                          step > num ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4 space-x-8">
                <span
                  className={`text-sm font-medium ${
                    step >= 1 ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  Organization Info
                </span>
                <span
                  className={`text-sm font-medium ${
                    step >= 2 ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  Review
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8">
               

                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                      Organization Details
                    </h2>

                    

                    
                      <div className="space-y-6 border-t pt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Organization Name *
                            </label>
                            <input
                              type="text"
                              name="org_name"
                              value={formData.name}
                              onChange={e=> handleInputChange("name", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="Enter organization name"
                              required={createOrg}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Organization Type *
                            </label>
                            <input
                              type="text"
                              name="org_type"
                              value={formData.type}
                              onChange={e=> handleInputChange("type", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="e.g., Tech Startup, Consulting Firm"
                              required={createOrg}
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Your Phone No *
                            </label>
                            <input
                              type="text"
                              name="org_name"
                              value={formData.phone}
                              onChange={e=> handleInputChange("phone", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="Enter organization name"
                              required={createOrg}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Current Status
                            </label>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={e=> handleInputChange("status", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                              required={createOrg}
                            >
                              <option value="">Select status...</option>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="suspended">Suspended</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Industry
                            </label>
                            <input
                              type="text"
                              name="org_industry"
                              value={formData.industry}
                              onChange={e=> handleInputChange("industry", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="e.g., Technology, Healthcare"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Website
                            </label>
                            <input
                              type="url"
                              name="org_website"
                              value={formData.website_url}
                              onChange={e=> handleInputChange("website_url", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            name="org_description"
                            value={formData.description}
                            onChange={e=> handleInputChange("description", e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                            placeholder="Brief description of your organization"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Address
                          </label>
                          <textarea
                            name="org_address"
                            value={formData.address}
                            onChange={e=> handleInputChange("address", e.target.value)}
                            rows={2}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                            placeholder="Organization address"
                          />
                        </div>
                      </div>
                   
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                      Review Your Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                           Company Information
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-500">Name:</span>
                            <p className="font-medium">{formData.name}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">
                              Email:
                            </span>
                            <p className="font-medium">{user?.email}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">
                              Phone:
                            </span>
                            <p className="font-medium">
                              {formData.phone || "Not provided"}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Status:</span>
                            <p className="font-medium capitalize">
                              {formData.status}
                            </p>
                          </div>
                           <div>
                            <span className="text-sm text-gray-500">Industry:</span>
                            <p className="font-medium capitalize">
                              {formData.industry}
                            </p>
                          </div>
                           <div>
                            <span className="text-sm text-gray-500">Website:</span>
                            <p className="font-medium capitalize">
                              {formData.website_url}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4 ">
                        <div className="space-y-3">
                           <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                          Company Description
                        </h3>
                          <div>
                            <span className="text-sm text-gray-500">Description:</span>
                            <p className="font-medium capitalize">
                              {formData.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-8 border-t mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Previous
                  </button>

                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Completing...</span>
                        </>
                      ) : (
                        <span>{isSubmitted ? "Registration Completed" : "Complete Registration"}</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in-out;
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
    </>
  );
};

export default CompleteRegistration;