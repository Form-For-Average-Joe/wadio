import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const StyledFirebaseAuth = ({ uiConfig }) => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const elementRef = useRef(null);
  const firebaseAuth = getAuth();

  useEffect(() => {
    // Get or Create a firebaseUI instance.
    const firebaseUiWidget = firebaseui?.auth?.AuthUI?.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);
    if (uiConfig.signInFlow === 'popup')
      firebaseUiWidget.reset();

    // We track the auth state to reset firebaseUi if the user signs out.
    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user && userSignedIn)
        firebaseUiWidget.reset();
      setUserSignedIn(!!user);
    });

    // Trigger the callback if any was set.
    // if (uiCallback)
    //   uiCallback(firebaseUiWidget);

    // Render the firebaseUi Widget.
    // @ts-ignore
    firebaseUiWidget.start(elementRef.current, uiConfig);

    return () => {
      unregisterAuthObserver();
      firebaseUiWidget.reset();
    };
  }, [firebaseui, uiConfig]);

  return <div className={"testLogin"} ref={elementRef} />;
};

export default StyledFirebaseAuth;