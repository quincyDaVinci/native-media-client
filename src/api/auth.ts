import type { Session } from "../types/session";

type LoginParams = {
  baseUrl: string;
  username: string;
  password: string;
};

export async function login(params: LoginParams): Promise<Session> {
  const { baseUrl, username, password } = params;

  const embyAuth = `MediaBrowser Client="NativeMediaClient", Device="AndroidEmulator", DeviceId="quincy-dev-1", Version="0.1.0"`;

  const response = await fetch(`${baseUrl}/Users/AuthenticateByName`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Emby-Authorization": embyAuth,
    },
    body: JSON.stringify({ Username: username, Pw: password }),
  });

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(`Login failed (${response.status}): ${bodyText}`);
  }

  const data = await response.json();

  return {
    baseUrl,
    sessionToken: data.AccessToken,
    userId: data.User.Id,
  };
}
