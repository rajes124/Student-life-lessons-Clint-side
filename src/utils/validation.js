// Simple validation schema (for now)

export const registerSchema = {
  name: {
    required: true,
    minLength: 3,
  },
  email: {
    required: true,
  },
  password: {
    required: true,
    minLength: 6,
  },
};
