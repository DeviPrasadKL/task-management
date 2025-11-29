import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getTheme, useThemeContext } from "./theme/ThemeProvider";

import NavBar from "./components/NavBar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AddEditTask from "./pages/AddEditTask";
import { ToastContainer } from "react-toastify";
import TaskDetails from "./pages/TaskDetails";

// ---- Protected Route Wrapper ----
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" replace />;
}

// ---- Auth Redirect (Prevent Sign-In when logged in) ----
function RedirectIfAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
}

// ---- Main App ----
export default function App() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />

        {/* Toast now automatically switches between dark/light */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme={theme}
        />

        <Routes>
          {/* Public Routes */}
          <Route
            path="/signin"
            element={
              <RedirectIfAuth>
                <SignIn />
              </RedirectIfAuth>
            }
          />

          <Route
            path="/signup"
            element={
              <RedirectIfAuth>
                <SignUp />
              </RedirectIfAuth>
            }
          />

          {/* Base Path Redirect */}
          <Route
            path="/"
            element={
              localStorage.getItem("token")
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/signin" replace />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/tasks/new"
            element={
              <PrivateRoute>
                <AddEditTask />
              </PrivateRoute>
            }
          />

          <Route
            path="/tasks/:id/edit"
            element={
              <PrivateRoute>
                <AddEditTask />
              </PrivateRoute>
            }
          />

          <Route path="/tasks/:id" element={<TaskDetails />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
