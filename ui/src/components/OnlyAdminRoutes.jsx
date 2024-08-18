import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const OnlyAdminRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);

  const isAdminOrEditor = currentUser.isAdmin || currentUser.isEditor;

  return isAdminOrEditor ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default OnlyAdminRoutes;
