import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import OpenPositions from "../pages/Positions/OpenPositions";
import Home from "../pages/Home/Home";
import Apply from "../pages/Positions/PositionForm/Apply";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import PrivateRoute from "../components/PrivateRoute";
import Applications from "../pages/Applications/Applications";
import ApplicationUnitDetails from "../pages/Applications/ApplicationsDetail/ApplicationUnitDetails";
import OpenPositionDetails from "../pages/Positions/PositionDetail/OpenPositionDetails";
import ApplicationDetails from "../pages/Applications/ApplicationsDetail/ApplicationDetails";
import Operations from "../pages/Operations/Operations";
import OperationsDetail from "../pages/Operations/OperationsDetail/OperationsDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/open-positions" element={<OpenPositions />} />
      <Route path="/open-positions/:id/:name" element={<OpenPositionDetails />} />
      <Route path="/:id/apply" element={<Apply />} />
      <Route path="/admin-panel" element={<Login />} />
      <Route path="/*" element={<NotFound />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/admin/applications" element={<Applications />} />
        <Route path="/admin/applications/tabs" element={<ApplicationDetails />} />
        <Route path="/admin/applications/tabs/details/:id" element={<ApplicationUnitDetails />} />
        <Route path="/admin/operations" element={<Operations />} />
      <Route path="/admin/operations/:id" element={<OperationsDetail />} />
      </Route>

    </Route>
  )
);

export default router;
