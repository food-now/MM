import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

export const createUser = (email, password, role) => {
  console.log(`  Creating user ${email}.`);
  console.log(role);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true }); // Add role to Roles if doesn't exist
    Roles.addUsersToRoles(userID, 'admin');
  }
  if (role === 'customer') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'customer');
  }
  if (role === 'vendor') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'vendor');
  }
  return userID;
};
