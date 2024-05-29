export interface AuthenticationResponse {
    id?: string;
    role?: string;
    accessToken?: string;
    mfaEnabled?: string;
    secretImageUri?: string;
  }