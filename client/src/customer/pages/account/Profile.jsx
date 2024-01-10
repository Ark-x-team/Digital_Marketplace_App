// Importing necessary dependencies and components
import { block } from "million/react";
import { Avatar, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import customerAuthStore from "../../../store/authentication/CustomerAuthStore";

// Defining the Profile component as a block
const Profile = block(() => {
  // State for loading during profile data fetching
  const [loading, setLoading] = useState(false);

  // Extracting functions and state from customerAuthStore
  const { checkAuth, customer } = customerAuthStore();

  // Fetching customer data when the component mounts
  useEffect(() => {
    setLoading(true);
    try {
      checkAuth();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  // Rendering the Profile component
  return (
    <>
      {loading ? (
        // Displaying a spinner while loading profile data
        <Spinner size="md" />
      ) : (
        // Displaying the profile information
        <div className="w-fit mx-auto flex flex-col items-center">
          <Avatar className="w-28 md:w-36 lg:w-40 h-28 md:h-36 lg:h-40  text-large" />
          <div className="mt-4 flex flex-col items-center gap-2">
            <h1 className="text-xl font-semibold text-dark dark:text-white">
              {customer.username}
            </h1>
            <h2 className="text-lg text-dark dark:text-light">
              {customer.email}
            </h2>
          </div>
        </div>
      )}
    </>
  );
});

// Exporting the Profile component as the default export
export default Profile;
