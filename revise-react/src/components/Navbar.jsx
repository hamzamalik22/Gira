import { UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav>
      {user && <span>Welcome, {user.firstName}</span>}
      <UserButton />
    </nav>
  );
};


export default Navbar