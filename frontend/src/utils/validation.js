// src/utils/validation.js

/**
 * Validation helpers used across signup/login flows.
 * - Name: 20..60 characters
 * - Address: required, max 400 chars
 * - Password: 8..16 chars, at least 1 uppercase, 1 special char
 * - Email: standard format
 * - Role: allowed values "normal" | "owner" | "system_admin" (signup only permits "normal" or "owner")
 */

/* ----- basic validators ----- */
export function validateName(name) {
  if (!name) return false;
  const len = name.trim().length;
  return len >= 20 && len <= 60;
}

export function validateAddress(address) {
  if (!address) return false;
  const len = address.trim().length;
  return len > 0 && len <= 400;
}

export function validateEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(pw) {
  if (!pw) return false;
  if (pw.length < 8 || pw.length > 16) return false;
  // requires at least one uppercase and one special char
  const re = /(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}/;
  return re.test(pw);
}

/* ----- role validator ----- */
/**
 * Accepts a role string and returns true if it's allowed for signup.
 * For security, only allow 'normal' and 'owner' during public signup.
 * 'system_admin' should be created only by existing admins.
 */
export function validateSignupRole(role) {
  const allowed = ["normal", "owner"];
  return allowed.includes(role);
}

/* ----- combined signup validator (returns object of errors) ----- */
/**
 * validateSignup(form) -> { errors, valid }
 * form shape: { name, email, address, password, role }
 */
export function validateSignup(form) {
  const errors = {};

  if (!validateName(form.name)) {
    errors.name = "Name must be between 20 and 60 characters.";
  }

  if (!validateEmail(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!validateAddress(form.address)) {
    errors.address = "Address is required and must be less than 400 characters.";
  }

  if (!validatePassword(form.password)) {
    errors.password = "Password must be 8–16 chars and include 1 uppercase & 1 special character.";
  }

  // If role missing, default to 'normal'
  const role = form.role || "normal";
  if (!validateSignupRole(role)) {
    errors.role = "Invalid role selected.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/* ----- login validator (simple) ----- */
export function validateLogin({ email, password }) {
  const errors = {};
  if (!validateEmail(email)) errors.email = "Invalid email address.";
  if (!password || password.length === 0) errors.password = "Password is required.";
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
