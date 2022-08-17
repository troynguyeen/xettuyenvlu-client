import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Admission from "./pages/Admission";
import Menu from "./components/Menu";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MyProfile from "./pages/MyProfile";
import AdmissionPreview from "./pages/Admission/preview";
import { useEffect, useState } from "react";
import Print from "./pages/MyProfile/print";
import NotFound from "./pages/NotFound";
import Edit from "./pages/MyProfile/edit";
import PreviewEdit from "./pages/MyProfile/previewEdit";
import Upload from "./pages/MyProfile/upload";
import { ScaleLoader } from "react-spinners";
import { createUseStyles } from "react-jss";
import AccountLogin from "./pages/Admin/Account/login";
import MenuAdmin from "./components/MenuAdmin";
import ViewDataAdmin from "./pages/Admin/Admission";
import EditDataAdmin from "./pages/Admin/Admission/editData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Account from "./pages/Admin/Account";
import HeaderAdmin from "./components/HeaderAdmin";
import AccountEdit from "./pages/Admin/Account/edit";
import AccountCreate from "./pages/Admin/Account/create";
import AccountProfile from "./pages/Admin/Account/profile";
import Phase from "./pages/Admin/Phase";
import jwtDecode from "jwt-decode";
import Notification from "./pages/Admin/Notification";
import Schedule from "./pages/Admin/Schedule";

const useStyles = createUseStyles({
  loader: {
    position: "fixed",
    zIndex: 9999,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: "100%",
    height: "100%",
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
  },
});

function App() {
  let location = useLocation();
  let navigate = useNavigate();
  const classes = useStyles();
  const [user, setUser] = useState(localStorage.getItem("fullName"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [dataAdmission, setDataAdmission] = useState({
    ...JSON.parse(sessionStorage.getItem("data")),
  });
  const [dataEdit, setDataEdit] = useState({
    ...JSON.parse(sessionStorage.getItem("dataEdit")),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const drawerWidth = 270;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      handleDrawerClose();
      setUser(null);
      setRole(null);
      setIsLoading(false);
      localStorage.removeItem("fullName");
      localStorage.removeItem("role");
      localStorage.removeItem("jwtToken");
      toast.success("Bạn đã đăng xuất thành công!", { theme: "colored" });
    }, 1000);
  };

  const handleDrawerOpen = () => {
    if (user) {
      setOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleExpiryToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (token !== null) {
      var decodedToken = jwtDecode(token);
      var currentTime = Date.now();
      if (decodedToken.exp < Math.floor(currentTime / 1000)) {
        handleLogout();
        setTimeout(
          () =>
            toast.warning("Bạn đã đã hết phiên đăng nhập!", {
              theme: "colored",
            }),
          1000
        );
      }
    }
  };

  useEffect(() => {
    if (Object.keys(dataAdmission).length === 0) {
      if (location.pathname === "/preview") {
        navigate("/hocba");
      }
    }
    handleExpiryToken();
  }, [location]);

  useEffect(() => {
    if (location.pathname.includes("/xettuyen-vlu-admin")) {
      if (user) {
        if (location.pathname === "/xettuyen-vlu-admin/login") {
          navigate("/xettuyen-vlu-admin");
        }
      } else {
        navigate("/xettuyen-vlu-admin/login");
      }
    }
  }, [user]);

  return (
    <div style={{ backgroundColor: "#eff3f8" }}>
      <ScaleLoader
        className={classes.loader}
        color="#1736C0"
        loading={isLoading}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
      />
      <AppBar position="static" open={open}>
        {location.pathname.includes("/xettuyen-vlu-admin") ? (
          user !== null ? (
            <React.Fragment>
              <HeaderAdmin location={location} user={user} />
              <MenuAdmin
                user={user}
                role={role}
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleLogout={handleLogout}
              />
            </React.Fragment>
          ) : (
            <HeaderAdmin location={location} user={user} />
          )
        ) : (
          <React.Fragment>
            <Header />
            <Menu />
          </React.Fragment>
        )}
      </AppBar>
      <Sidebar
        open={open}
        role={role}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Admission
              setDataAdmission={setDataAdmission}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          exact
          path="/hocba"
          element={
            <Admission
              setDataAdmission={setDataAdmission}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          exact
          path="/preview"
          element={
            Object.keys(dataAdmission).length === 0 ? (
              <Admission
                setDataAdmission={setDataAdmission}
                setIsLoading={setIsLoading}
              />
            ) : (
              <AdmissionPreview
                dataAdmission={dataAdmission}
                setIsLoading={setIsLoading}
              />
            )
          }
        />
        <Route
          exact
          path="/hosocuatoi"
          element={<MyProfile setIsLoading={setIsLoading} />}
        />
        <Route
          exact
          path="/inhoso"
          element={<Print setIsLoading={setIsLoading} />}
        />
        <Route
          exact
          path="/suahoso"
          element={<Edit
            setDataEdit={setDataEdit}
            setIsLoading={setIsLoading} />}
        />
        <Route
          exact
          path="/previewEdit"
          element={
            Object.keys(dataEdit).length === 0 ? (
              <Edit
                setDataEdit={setDataEdit}
                setIsLoading={setIsLoading}
              />
            ) : (
              <PreviewEdit
                dataEdit={dataEdit}
                setIsLoading={setIsLoading}
              />
            )}
        />
        <Route
          exact
          path="/uploadhocba"
          element={<Upload setIsLoading={setIsLoading} />}
        />
        <Route
          exact
          path="/xettuyen-vlu-admin/login"
          element={
            <AccountLogin
              setUser={setUser}
              setRole={setRole}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          exact
          path="/xettuyen-vlu-admin/profile"
          element={
            <AccountProfile setUser={setUser} setIsLoading={setIsLoading} />
          }
        />
        <Route
          exact
          path="/xettuyen-vlu-admin"
          element={
            <React.Fragment>
              <div className="container">
                <ViewDataAdmin role={role} setIsLoading={setIsLoading} />
              </div>
            </React.Fragment>
          }
        />
        <Route
          exact
          path="/xettuyen-vlu-admin/admission"
          element={
            <React.Fragment>
              <div className="container">
                <ViewDataAdmin role={role} setIsLoading={setIsLoading} />
              </div>
            </React.Fragment>
          }
        />
        <Route
          exact
          path="/xettuyen-vlu-admin/admission/edit/:id"
          element={
            <React.Fragment>
              <div className="container">
                <EditDataAdmin setIsLoading={setIsLoading} />
              </div>
            </React.Fragment>
          }
        />
        <Route
          exact
          path="/xettuyen-vlu-admin/account"
          element={<Account setIsLoading={setIsLoading} />}
        />
        <Route
          exact
          path="/xettuyen-vlu-admin/account/create"
          element={<AccountCreate setIsLoading={setIsLoading} />}
        />
        <Route
          exact
          path="/xettuyen-vlu-admin/account/:id"
          element={<AccountEdit setIsLoading={setIsLoading} />}
        />
        <Route
          exact
          path="/xettuyen-vlu-admin/phase"
          element={<Phase setIsLoading={setIsLoading} />}
        />
        <Route
          exact
          path="/xettuyen-vlu-admin/notification"
          element={<Notification setIsLoading={setIsLoading} />}
        />
        <Route
          exact
          path="/xettuyen-vlu-admin/schedule"
          element={<Schedule setIsLoading={setIsLoading} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
