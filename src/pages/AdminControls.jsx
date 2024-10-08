import { useEffect, useState, Fragment } from "react";
import { Typography, Grid } from "@mui/material";
import CarCardListView from "../components/CarCard/CarCardListView";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import UserListView from "../components/userListView";

const AdminControls = () => {
  const [allCars, setAllCars] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [deleteSwitch, setDeleteSwitch] = useState(false);

  useEffect(() => {
    getCars();
    getUsers();
  }, [deleteSwitch]);

  const isDarkTheme = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );

  const getCars = async () => {
    try {
      const { data } = await axios.get("/cars/");
      setAllCars(data.allCars);
    } catch (err) {
      console.log("getCars error", err);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/user/users");
      setAllUsers(data);
    } catch (err) {
      console.log("getUsers error", err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const userCarList = allCars.filter((car) => car.user_id === id);
      for (const car of userCarList) {
        await axios.delete(`/cars/${car._id}`);
      }
      await axios.delete(`/user/${id}`);
      setDeleteSwitch(!deleteSwitch);
      toast.success("User and cars deleted!");
    } catch (err) {
      console.log("Delete Error", err);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/cars/${id}`);
      setDeleteSwitch(!deleteSwitch);
      toast.success("Car Deleted!");
    } catch (err) {
      console.log("Delete Error", err);
    }
  };

  return (
    <Fragment>
      <Typography variant="h2" className="pageTitle">
        Admin Controls
      </Typography>
      <Typography variant="h6">
        As an admin user, you are allowed to view and delete other users or
        cars. Please note: if you delete a user, their cars will be deleted as
        well. Use you power wisely
      </Typography>
      <Grid container gap={1} className="adminGridContainer">
        <Grid item xs={12} lg={5}>
          <Typography variant="h4"> Car List</Typography>
          {allCars.map((car) => (
            <CarCardListView
              key={car.title + Date.now()}
              id={car._id}
              user_id={car.user_id}
              title={car.title}
              description={car.description}
              url={car.image.url}
              alt={car.image.alt}
              carType={car.carType}
              carModel={car.carModel}
              city={car.address.city}
              street={car.address.street}
              houseNumber={car.address.houseNumber}
              phone={car.phone}
              price={car.price}
              isAdmin={true}
              adminControls={true}
              handleDelete={handleDeleteClick}
              isDarkMode={isDarkTheme}
              isLiked={false}
            />
          ))}
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h4">User List</Typography>
          {allUsers.map((user) => (
            <UserListView
              key={user._id}
              id={user._id}
              name={user.name}
              url={user.image.url}
              alt={user.image.alt}
              email={user.email}
              address={user.address}
              handleDelete={handleDeleteUser}
              isDarkMode={isDarkTheme}
            />
          ))}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AdminControls;
