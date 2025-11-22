import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import UsersList from "./pages/Admin/UsersList";
import StoresList from "./pages/Admin/StoresList";
import AddUser from "./pages/Admin/AddUser";
import AddStore from "./pages/Admin/AddStore";

import UserDashboard from "./pages/User/UserDashboard";
import StoreList from "./pages/User/StoreList";
import StoreDetails from "./pages/User/StoreDetails";

import OwnerDashboard from "./pages/StoreOwner/OwnerDashboard";
import RatingsReceived from "./pages/StoreOwner/RatingsReceived";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ---- ADMIN ---- */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute roles={["admin"]}>
              <StoresList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-user"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AddUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-store"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AddStore />
            </ProtectedRoute>
          }
        />

        {/* ---- USER ---- */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute roles={["normal"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/stores"
          element={
            <ProtectedRoute roles={["normal"]}>
              <StoreList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/store/:id"
          element={
            <ProtectedRoute roles={["normal"]}>
              <StoreDetails />
            </ProtectedRoute>
          }
        />

        {/* ---- STORE OWNER ---- */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute roles={["store_owner"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/ratings"
          element={
            <ProtectedRoute roles={["store_owner"]}>
              <RatingsReceived />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<h1>Page Not Found</h1>} />

      </Routes>
    </Router>
  );
}
