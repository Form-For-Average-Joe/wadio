import {useAuth} from 'reactfire';
import { Link } from 'react-router-dom';
import GenericProfileButton from "./GenericProfileButton";

const signOut = auth => auth.signOut().then(() => console.log('signed out'));

export default function LogoutButton() {
  const auth = useAuth();

  return (
    <GenericProfileButton
            label="Sign Out"
            onClick={() => signOut(auth)}
            component={Link} to="/">
      Sign Out
    </GenericProfileButton>
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
