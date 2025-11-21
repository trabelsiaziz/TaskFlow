import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 relative overflow-hidden" >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex justify-between items-center p-6 lg:px-12">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">TaskFlow</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            color="white"
            onClick={() => navigate("/login")}
            _hover={{ bg: "whiteAlpha.200" }}
          >
            Log In
          </Button>
          <Button
            bgGradient="linear(to-r, blue.400, purple.500)"
            color="white"
            onClick={() => navigate("/signup")}
            _hover={{
              bgGradient: "linear(to-r, blue.500, purple.600)",
              transform: "translateY(-1px)",
              boxShadow: "lg",
            }}
            transition="all 0.2s"
          >
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        {/* Main Heading */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Bring your
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              teams{" "}
            </span>
            together
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            TaskFlow helps teams move work forward. Collaborate, manage
            projects, and reach new productivity peaks. From high rises to the
            home office, the way your team works is unique—accomplish it all
            with TaskFlow.
          </p>
        </div>

        {/* Feature Cards Preview */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Boards</h3>
            <p className="text-blue-100 text-sm">
              Organize projects with boards, lists, and cards
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Teams</h3>
            <p className="text-blue-100 text-sm">
              Collaborate seamlessly with your team members
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Productivity
            </h3>
            <p className="text-blue-100 text-sm">
              Boost your team's productivity with powerful tools
            </p>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            size="lg"
            bgGradient="linear(to-r, blue.400, purple.500)"
            color="white"
            onClick={() => navigate("/signup")}
            px={8}
            py={6}
            fontSize="lg"
            _hover={{
              bgGradient: "linear(to-r, blue.500, purple.600)",
              transform: "translateY(-2px)",
              boxShadow: "2xl",
            }}
            transition="all 0.3s"
            boxShadow="xl"
          >
            Get Started - It's Free!
          </Button>

          <Button
            size="lg"
            variant="outline"
            borderColor="white"
            color="white"
            onClick={() => navigate("/login")}
            px={8}
            py={6}
            fontSize="lg"
            _hover={{
              bg: "whiteAlpha.200",
              transform: "translateY(-2px)",
              boxShadow: "2xl",
            }}
            transition="all 0.3s"
          >
            Already have an account?
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-blue-200 text-sm mb-4">
            Trusted by teams worldwide
          </p>
          <div className="flex items-center justify-center space-x-8 opacity-60">
            <div className="bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
              <span className="text-white font-semibold">10M+</span>
              <p className="text-blue-200 text-xs">Users</p>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
              <span className="text-white font-semibold">500K+</span>
              <p className="text-blue-200 text-xs">Teams</p>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
              <span className="text-white font-semibold">99.9%</span>
              <p className="text-blue-200 text-xs">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
