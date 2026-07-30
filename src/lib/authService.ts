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

  /** Send OTP SMS via your own gateway (used after Supabase registration) */
  static async sendOtp(mobile: string): Promise<AuthApiResponse> {
    const response = await axiosClient.post<AuthApiResponse>(
      "/Account/CwEduSendOTP",
      { mobile },
    );

    return response.data;
  }

  /** Verify OTP */
  static async verifyOtp(
    mobile: string,
    otp: string,
  ): Promise<AuthApiResponse<AuthUser>> {
    const response = await axiosClient.post<AuthApiResponse<AuthUser>>(
      "/Account/CwEduVerifyOTP",
      { mobile, otp },
    );

    return response.data;
  }

  /** Resend OTP to the same mobile number */
  static async resendOtp(mobile: string): Promise<AuthApiResponse> {
    const response = await axiosClient.post<AuthApiResponse>(
      "/Account/CwEduResendOTP",
      { mobile },
    );

    return response.data;
  }

  static async register(
    name: string,
    mobile: string,
    email: string,
    password: string,
  ): Promise<AuthApiResponse<AuthUser>> {
    const response = await axiosClient.post<AuthApiResponse<AuthUser>>(
      "/Account/Register",
      { name, mobile, email, password },
    );

    return response.data;
  }
}
