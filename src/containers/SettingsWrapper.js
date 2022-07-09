import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useUser } from 'reactfire';
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchUserData } from "../util";

const SettingsWrapper = ({ children }) => {
  const { status, data: user } = useUser();
  const [hasUserProfileData, setHasUserProfileData] = useState(false);
  const [redirectToAuthPage, setRedirectToAuthPage] = useState(false);
  const [canRedirect, setCanRedirect] = useState(false);

  useEffect(() => {
    if (user) {
      const inner = async () => {
        await fetchUserData(user.uid, (data) => {
          if (data) {
            setHasUserProfileData(true);
          }
        });
      };
      inner().then(() => {
        setCanRedirect(true);
      });
    }
    else {
      setRedirectToAuthPage(true);
    }
  }, [user])

  if (status === 'loading') {
    return <LoadingSpinner/>
  }

  if (!children) {
    throw new Error('Children must be provided');
  }

  if (redirectToAuthPage) {
    return <Navigate to={'/settings'} replace={true} />;
  }

  if (canRedirect) {
    return hasUserProfileData ? children : <Navigate to={"/settings"} replace={true} state={{ openSnackbar: true }}/>;
  }
};

export default SettingsWrapper;