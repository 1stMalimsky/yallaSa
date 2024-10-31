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
  {
    label: "הקרוואנים שלנו",
    url: ROUTES.OURCARS,
  },
  {
    label: "test",
    url: "/test",
  },
  {
    label: "test2",
    url: "/test2",
  },
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
    label: "LIKED CARS",
    url: ROUTES.LIKEDCARS,
  },
  {
    label: "MY CARS",
    url: ROUTES.MYCARS,
  },
  {
    label: "LOGOUT",
    url: ROUTES.LOGOUT,
  },
];

//admin pages
const adminPages = [
  {
    label: "MY CONTROLS",
    url: ROUTES.ADMIN,
  },
];

export { pages, adminPages, loggedInPages, notAuthPages };
