// server/methods.js (or any server-side file)
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  createUserOnServer: function (email, password, role) {
    // Check that the 'email', 'password', and 'role' arguments are of the correct types
    check(email, String);
    check(password, String);
    check(role, String);

    console.log(`  Creating user ${email}.`);
    const userID = Accounts.createUser({
      username: email,
      email: email,
      password: password,
    });

    if (role === 'admin') {
      Roles.createRole(role, { unlessExists: true });
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
  },
});
