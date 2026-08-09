import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import StudentDashboard from "./Pages/StudentDashboard";
import TeacherDashboard from "./Pages/TeacherDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import LoginPage from "./Pages/LoginPage";
import MakeAttendancePage from "./Pages/MakeAttendancePage";
import RoleSelectionPage from "./Pages/RoleSelectionPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelectionPage />} />
      <Route path="/login/:roleKey" element={<LoginPage />} />
      <Route path="/dashboard/student" element={<StudentDashboard roleKey="student" />} />
      <Route path="/dashboard/teacher" element={<TeacherDashboard roleKey="teacher" />} />
      <Route path="/dashboard/admin" element={<AdminDashboard roleKey="admin" />} />
      <Route path="/dashboard/:roleKey/attendance" element={<MakeAttendancePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;