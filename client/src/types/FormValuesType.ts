export type TLoginForm = {
  email: string;
  password: string;
};

export type TRegisterForm = TLoginForm & {
  name: string;
}

export type TResetFormProps = {
  id: string | undefined | null;
  token: string | undefined | null;
};

export type TPWRequestForm = {
  email: string;
  resetPwRequest: boolean
}

export type TPWForm = {
  password: string;
  userId: string;
  token: string;
};