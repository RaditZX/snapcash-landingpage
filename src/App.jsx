import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import { SignIn } from "./pages";
import { CustomerManagement } from "./pages";
import { DashboardOverview } from "./pages";


function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!(pathname == '/sign-in' || pathname == '/sign-up' || pathname == "/dashboard/users" || pathname == "/dashboard/overview") && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )
      }
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/dashboard/users" element={<CustomerManagement/>} />
        <Route path="/dashboard/overview" element={<DashboardOverview/>} />
      </Routes>
    </>
  );
}

export default App;
