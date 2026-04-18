export const validateEmail = function (email: string) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const USER_ROLE = {
  MEMBER: "MEMBER",
  ADMIN: "ADMIN",
} as const;