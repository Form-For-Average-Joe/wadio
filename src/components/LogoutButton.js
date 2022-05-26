import * as React from 'react';
import Button from '@mui/material/Button';
import {useAuth} from 'reactfire';
import { Link } from 'react-router-dom';

const signOut = auth => auth.signOut().then(() => console.log('signed out'));

export default function LogoutButton({user}) {
  const auth = useAuth();

  return (
    <Button variant="contained"
            usage="header"
            label="Sign Out"
            onClick={() => signOut(auth)}
            component={Link} to="/">
      Sign Out
    </Button>
  )
};

//todo sample code, Providers can be useful
//   return (
//     <>
//       <CardSection title="Displayname">{user.displayName}</CardSection>
//       <CardSection title="Providers">
//         <ul>
//           {user.providerData?.map(profile => (
//             <li key={profile?.providerId}>{profile?.providerId}</li>
//           ))}
//         </ul>
//       </CardSection>
//     </>
//   );
// };
