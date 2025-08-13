import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import EditPortfolio from "./pages/EditPortfolio";
import { PortfolioProvider } from "./hooks/portfolio";
import { UserProvider } from "./hooks/user";
import { Toaster } from "./components/ui/sonner";
import PortfolioView from "./pages/PortfolioView";

function App() {
  return (
    <UserProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/auth/signin" element={<LoginPage></LoginPage>} />
        <Route
          path="/edit"
          element={
            <PortfolioProvider>
              <EditPortfolio />
            </PortfolioProvider>
          }
        />
        <Route
          path="/"
          element={
            <PortfolioProvider>
              <PortfolioView />
            </PortfolioProvider>
          }
        />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </UserProvider>
  );
}

export default App;
