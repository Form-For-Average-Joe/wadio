import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useUser } from 'reactfire';

const SettingsWrapper = ({ children }) => {
  const { status, data: user } = useUser();
  const [hasUserProfileData, setHasUserProfileData] = useState(false);
  const [isCheckDone, setIsCheckDone] = useState(false);

  useEffect(() => {
    if (!isCheckDone) {
      if (user) {
        if (!isCheckDone) {
          const firestore = getFirestore();
          const ref = doc(firestore, user.uid, 'userData');

          const inner = async () => {
            return await getDoc(ref);
          };
          inner().then(res => {
            const data = res.data();
            setIsCheckDone(true);
            if (data) {
              setHasUserProfileData(true);
            }
          });
        }
      } else {
        setIsCheckDone(true);
      }
    }
  }, [])

  if (status === 'loading') {
    return <p>Loading</p>;
  }

  // isCheckDone basically hides the component until we are sure that there is or there is not a user profile
  if (!isCheckDone) {
    return null;
  }

  if (!children) {
    throw new Error('Children must be provided');
  }
  if (isCheckDone) {
    return hasUserProfileData ? children : <Navigate to={"/settings"} replace={true} state={{ openSnackbar: true }}/>
  }
};

export default SettingsWrapper;