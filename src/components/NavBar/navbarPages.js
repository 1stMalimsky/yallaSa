import ROUTES from "../../routes/ROUTES";

// access to all
const pages = [
  {
    label: "בית",
    url: ROUTES.HOME,
  },
  {
    label: "אודות",
    url: ROUTES.ABOUT,
  },
  /*   {
    label: "test",
    url: "/test",
  },*/
];
//not logged in users
const notAuthPages = [
  {
    label: "הרשמה",
    url: ROUTES.REGISTER,
  },
  {
    label: "כניסה",
    url: ROUTES.LOGIN,
  },
];
//logged in users
const loggedInPages = [
  {
    label: "התנתקות",
    url: ROUTES.LOGOUT,
  },
];

//admin pages
const adminPages = [
  {
    label: "ADMIN CONTROLS",
    url: ROUTES.ADMIN,
  },
];

export { pages, adminPages, loggedInPages, notAuthPages };
