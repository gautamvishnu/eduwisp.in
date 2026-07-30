import axiosClient from "@/lib/axios-client";

export interface AuthUser {
  id?: string | number;
  name?: string;
  mobile: string;
  email?: string;
  token?: string;
  [key: string]: unknown;
}

export interface AuthApiResponse<T = unknown> {
  status: boolean;
  message?: string;
  data?: T;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
}

export interface VerifyRegistrationPayload {
  mobile: string;
  otp: string;
  password: string;
}

export class AuthService {
  /** Authenticate with usercode + password */
  static async login(
    usercode: string,
    password: string,
  ): Promise<AuthApiResponse<AuthUser>> {
    const response = await axiosClient.post<AuthApiResponse<AuthUser>>(
      "/Account/Login",
      { usercode, password },
    );

    return response.data;
  }

  /** Step 1 — register user details and trigger OTP */
  static async register(
    payload: RegisterPayload,
  ): Promise<AuthApiResponse> {
    const response = await axiosClient.post<AuthApiResponse>(
      "/Account/register",
      payload,
    );

    return response.data;
  }

  /** Step 2 — verify OTP and set password */
  static async verifyRegistration(
    payload: VerifyRegistrationPayload,
  ): Promise<AuthApiResponse> {
    const response = await axiosClient.post<AuthApiResponse>(
      "/Account/verifyregistration",
      payload,
    );

    return response.data;
  }

  /** Resend registration OTP */
  static async sendRegisterOtp(mobile: string): Promise<AuthApiResponse> {
    const response = await axiosClient.post<AuthApiResponse>(
      `/Account/sendregisterotp/${mobile}`,
    );

    return response.data;
  }
}
