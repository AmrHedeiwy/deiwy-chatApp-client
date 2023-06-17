/**
 * @module registrationSchema
 * This module defines the valitdations that execute when a
 * user enters their register credentials using Yup.
 *
 * @typedef {Object} registration schema
 * @property {string} Firstname - The first name of the user. Must be
 * between 2 and 30 letters only.
 * @property {string} Lastname - The last name of the user. Must be
 * between 2 and 30 letters only.
 * @property {string} Username - The username of the user. Must be
 * between 3 and 20 letters, digits, underscores, or hyphens.
 * @property {string} Email - The email address of the user. Must be
 * unique and in valid email format.
 * @property {string} Password - The password of the user. Must be
 * at least 8 characters long and contain at least one uppercase letter,
 * one lowercase letter, one digit, and one special character from
 * the set @$!%?&.
 */

import { object, string } from 'yup';

export const registrationSchema = object({
  Firstname: string()
    .matches(
      /^[A-Za-z]{2,30}$/,
      'First name can only contain letters, and must be between 2 and 30 characters long.'
    )
    .required(),
  Lastname: string()
    .matches(
      /^[A-Za-z]{2,30}$/,
      'Last name can only contain letters, and must be between 2 and 30 characters long.'
    )
    .required(),
  Username: string()
    .matches(
      /^[A-Za-z\d_-]{3,20}$/,
      'Username can only contain letters, digits, underscores, and hyphens,' +
        ' and must be between 3 and 20 characters long.'
    )
    .required(),
  Email: string()
    .email(
      'Please enter a valid email address in the format example@example.com.'
    )
    .required(),
  Password: string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and contain at least one uppercase letter,' +
        ' one lowercase letter, one digit, and one special character from the set @$!%?&.'
    )
    .required(),
  RepeatPassword: string()
    .required()
    .test(
      'match',
      'The passwords you entered do not match. ' +
        ' Please make sure to enter the same password in both fields',
      function (value) {
        return value === this.parent.Password;
      }
    )
});
