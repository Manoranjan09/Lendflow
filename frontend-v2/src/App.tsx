import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardShell } from "./components/dashboard-shell";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Borrowers from "./pages/Borrowers";
import Loans from "./pages/Loans";
import Analytics from "./pages/Analytics";
import Assistant from "./pages/Assistant";
import Calculator from "./pages/Calculator";
import Settings from "./pages/Settings";
import UserGuide from "./pages/UserGuide";
function App() {
  return (
   <BrowserRouter>
  <Routes>

    <Route path="/" element={<Home />} />

    <Route element={<DashboardShell />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/borrowers" element={<Borrowers />} />
      <Route path="/dashboard/loans" element={<Loans />} />
      <Route path="/dashboard/analytics" element={<Analytics />} />
      <Route path="/dashboard/assistant" element={<Assistant />} />
      <Route path="/dashboard/settings" element={<Settings />} />
      <Route
  path="/user-guide"
  element={<UserGuide />}
/>
    </Route>

    <Route path="/calculator" element={<Calculator />} />

  </Routes>
</BrowserRouter>
  );
}

export default App;