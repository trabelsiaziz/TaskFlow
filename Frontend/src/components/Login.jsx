import React, { useState } from "react";
import { Button, Card, Field, Input, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-6">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <Container
        centerContent
        py={0}
        minH="100vh"
        bg="transparent"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        maxW="lg"
      >
        <Card.Root
          maxW="md"
          width="100%"
          bg="rgba(255, 255, 255, 0.95)"
          backdropFilter="blur(20px)"
          borderRadius="3xl"
          boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          border="1px solid rgba(255, 255, 255, 0.2)"
          transform="auto"
          _hover={{
            boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.2)",
            transform: "scale(1.01)",
          }}
          transition="all 0.3s ease"
        >
          {/* Logo/Icon */}
          <div className="flex justify-center pt-8 pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <Card.Header textAlign="center" pb={6} pt={0}>
            <Card.Title
              fontSize="3xl"
              fontWeight="bold"
              bgGradient="linear(to-r, indigo.600, purple.600)"
              bgClip="text"
              mb={3}
            >
              Welcome Back
            </Card.Title>
            <Card.Description color="gray.500" fontSize="sm">
              Enter your credentials to access your account
            </Card.Description>
          </Card.Header>

          <Card.Body px={8}>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <Field.Root>
                  <Field.Label fontWeight="semibold" color="gray.700" mb={2}>
                    Email Address
                  </Field.Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="  you@example.com"
                    size="lg"
                    bg="gray.50"
                    border="2px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 4px rgba(147, 51, 234, 0.1)",
                      bg: "white",
                    }}
                    _hover={{
                      borderColor: "gray.300",
                    }}
                    transition="all 0.2s"
                    required
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontWeight="semibold" color="gray.700" mb={2}>
                    Password
                  </Field.Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="  ••••••••"
                    size="lg"
                    bg="gray.50"
                    border="2px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 4px rgba(147, 51, 234, 0.1)",
                      bg: "white",
                    }}
                    _hover={{
                      borderColor: "gray.300",
                    }}
                    transition="all 0.2s"
                    required
                  />
                </Field.Root>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm pt-2">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-600 group-hover:text-gray-800">
                    Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            </form>
          </Card.Body>

          <Card.Footer flexDirection="column" gap={4} px={8} pb={8}>
            <Button
              onClick={handleSubmit}
              size="lg"
              width="100%"
              bgGradient="linear(to-r, indigo.600, purple.600, pink.600)"
              color="white"
              fontWeight="bold"
              borderRadius="xl"
              _hover={{
                bgGradient: "linear(to-r, indigo.700, purple.700, pink.700)",
                transform: "scale(1.01)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
              transition="all 0.2s"
            >
              Sign In
            </Button>

            {/* Divider */}
            <div className="flex items-center my-4 w-full">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="px-4 text-xs font-semibold text-gray-400 uppercase">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Social Login */}
            <Button
              variant="outline"
              size="lg"
              width="100%"
              leftIcon={
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              }
              borderRadius="xl"
              border="2px solid"
              borderColor="gray.200"
              _hover={{
                bg: "gray.50",
                borderColor: "gray.300",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
              transition="all 0.2s"
            >
              Continue with Google
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-purple-600 hover:text-purple-700 font-bold hover:underline transition-colors"
              >
                Create Account
              </button>
            </p>
          </Card.Footer>
        </Card.Root>
      </Container>
    </div>
  );
};

export default Login;
