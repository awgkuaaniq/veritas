import {
  Bars3Icon,
  CpuChipIcon,
  MagnifyingGlassIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col items-center py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-6xl font-bold mb-4">About Us</h1>
        <p className="text-2xl max-w-2xl text-center">
          Welcome to Veritas, your trusted source for news verification. Our
          mission is to help you discern the truth in the vast sea of
          information.
        </p>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col items-center py-16 bg-white">
        <div className="max-w-4xl text-center mb-12">
          <h2 className="text-5xl font-semibold text-gray-800 mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            At Veritas, we believe in the power of truth. Our AI-driven platform
            is designed to help you verify the authenticity of news articles,
            ensuring that you stay informed with accurate information.
          </p>
          <p className="text-xl text-gray-600">
            We are committed to providing a reliable service that empowers you
            to make informed decisions based on verified facts.
          </p>
        </div>
      </div>

      {/* Process Section */}
      <div className="flex flex-col items-center py-16 bg-gray-100">
        <div className="max-w-7xl text-center mb-12">
          <h2 className="text-5xl font-semibold text-gray-800 mb-6">
            Our Process
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-10 bg-white rounded-lg shadow-lg p-10">
            <div className="flex flex-col text-xl font-medium space-y-6">
              <div className="flex items-center space-x-4">
                <p className="rounded-full bg-blue-500 text-white text-center w-10 h-10 flex items-center justify-center">
                  1
                </p>
                <p>Summarising using an LLM</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="rounded-full bg-blue-500 text-white text-center w-10 h-10 flex items-center justify-center">
                  2
                </p>
                <p>Search relevant articles using a search API</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="rounded-full bg-blue-500 text-white text-center w-10 h-10 flex items-center justify-center">
                  3
                </p>
                <p>
                  Find the semantic similarity between both input and article
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <CpuChipIcon className="w-10 h-10 text-blue-500" />
              <MagnifyingGlassIcon className="w-10 h-10 text-blue-500" />
              <ScaleIcon className="w-10 h-10 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="flex flex-col items-center py-16 bg-white">
        <div className="max-w-4xl text-center mb-12">
          <h2 className="text-5xl font-semibold text-gray-800 mb-6">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center">
              <img
                className="w-32 h-32 rounded-full mb-4"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjQVJaCABEJfrhPPlEISnANKKlRtiF1NdxZw&s"
                alt="Supervisor"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                DR. MOHAMAD HAZIM
              </h3>
              <p className="text-gray-600">Supervisor</p>
            </div>
            {/* Team Member 2 */}
            <div className="flex flex-col items-center">
              <img
                className="w-32 h-32 rounded-full mb-4"
                src=""
                alt="Developer 1"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Garren Luther Panggau
              </h3>
              <p className="text-gray-600">Developer</p>
            </div>
            {/* Team Member 3 */}
            <div className="flex flex-col items-center">
              <img
                className="w-32 h-32 rounded-full mb-4"
                src="https://media.licdn.com/dms/image/v2/D4D03AQHRE-Z3s4htTA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1716217709703?e=2147483647&v=beta&t=nFPn_4B8MjZczzvN4XSch6ffY2tZVXsNIkEMcJHSW1M"
                alt="Developer 2"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Awangku Aniq Hamiz
              </h3>
              <p className="text-gray-600">Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col items-center py-16 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-10 max-w-4xl text-center">
          <h2 className="text-5xl font-semibold text-gray-800 mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Have any questions or feedback? We&apos;d love to hear from you!
            Reach out to us through our feedback form.
          </p>
          <p className="text-xl text-gray-600">
            To access the feedback form. kindly go to the menu{" "}
            <Bars3Icon className="inline h-6 w-6" /> at the top right, located
            in the Navigation Bar.
          </p>
        </div>
      </div>
    </main>
  );
}
