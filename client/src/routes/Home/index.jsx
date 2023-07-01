import RequireAuth from "./../../auth/RequireAuth";
import Navbar from "./../../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <p>
        This is the home page{" "}
        <RequireAuth allowedRoles={["teacher"]}>teacher user</RequireAuth>
        <RequireAuth allowedRoles={["admin"]}>admin user</RequireAuth>
        <RequireAuth allowedRoles={["student"]}>student user</RequireAuth>
      </p>
    </div>
  );
};

export default Home;
