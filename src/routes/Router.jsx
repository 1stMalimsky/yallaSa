import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import Homepage from "../pages/Homepage";
import RegisterPage from "../pages/newPages/RegisterPage";
import LoginPage from "../pages/newPages/LoginPage";
import AboutPage from "../pages/AboutPage";
import OurCarsPage from "../pages/OurCarsPage";
import AdminControls from "../pages/AdminControls";
import MyCars from "../pages/MyCars";
import LogoutRoute from "../components/LogoutRoute";
import LogoutLink from "../components/LogoutLink";
import EditCarPage from "../pages/EditCarPage";
import ProfilePage from "../pages/ProfilePage";
import AddNewCarPage from "../pages/AddNewCarPage";
import LikedCarsPage from "../pages/LikedCarsPage";
import FinalizePage from "../pages/FinalizePage";
import ProtectedRoute from "../components/ProtectedRoute";
import NewCheckoutPage from "../pages/newPages/NewCheckoutPage";
import CheckoutUserDetailsComponent from "../components/newComponents/CheckoutUserDetailsComponent";
import CaravanSearchResults from "../pages/newPages/CaravanSearchResult";
import Test from "../pages/newPages/Test";
import BecomeOwnerRedirect from "../pages/newPages/BecomeRedirect";
import AddCaravan from "../pages/newPages/AddCaravan";
import EditCaravanPage from "../pages/newPages/EditCaravanPage";
const Router = () => {
  return (
    <Routes>
      {/* EDIT CARAVAN PAGE*/}
      <Route
        path={"profile/editcaravan/:caravanId"}
        element={<EditCaravanPage />}
      />

      <Route path={"/maptest"} element={<Test />} />
      <Route
        path="/addcaravan/:location/:vehicleType"
        element={<AddCaravan />}
      />
      <Route path="/preaddcaravan" element={<BecomeOwnerRedirect />} />
      <Route path={ROUTES.HOME} element={<Homepage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={"/car-inv/:start/:end/:numOfDays"}
        element={<CaravanSearchResults />}
      />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.OURCARS} element={<OurCarsPage />} />
      <Route
        path={ROUTES.MYCARS}
        element={
          <ProtectedRoute
            needLoggedIn={true}
            needAdmin={false}
            element={<MyCars />}
          />
        }
      />
      <Route
        path={"/edit/:id"}
        element={
          <ProtectedRoute
            needLoggedIn={true}
            needAdmin={false}
            element={<EditCarPage />}
          />
        }
      />
      <Route
        path={"/checkout/:id/:start/:end/:numOfDays"}
        element={<NewCheckoutPage />}
      />
      <Route
        path={"/finalize/:id/:extrasCount/:start/:end/:numOfDays"}
        element={<FinalizePage />}
      />
      <Route
        path={ROUTES.LIKEDCARS}
        element={
          <ProtectedRoute
            needLoggedIn={true}
            needAdmin={false}
            element={<LikedCarsPage />}
          />
        }
      />
      <Route
        path={ROUTES.ADDCAR}
        element={
          <ProtectedRoute
            needLoggedIn={true}
            needAdmin={false}
            element={<AddNewCarPage />}
          />
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute
            needLoggedIn={true}
            needAdmin={false}
            element={<ProfilePage />}
          />
        }
      />
      <Route
        path={ROUTES.ADMIN}
        element={
          <ProtectedRoute
            needLoggedIn={true}
            needAdmin={true}
            element={<AdminControls />}
          />
        }
      />
      <Route
        path={ROUTES.LOGOUT}
        element={<LogoutRoute element={<LogoutLink />} />}
      />
      <Route
        path="*"
        element={<h1>404... Oops! We couldn't find this page</h1>}
      />
    </Routes>
  );
};

export default Router;
