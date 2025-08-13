import api from ".";

interface SignUpPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface SignInPayload {
  email: string;
  password: string;
}

export async function signUpUser(data: SignUpPayload) {
  try {
    const res = await api.post("/auth/signup", data);
    console.log(res);
    return res;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Something went wrong during signup.";
    throw new Error(message);
  }
}

export async function signInUser(data: SignInPayload) {
  try {
    const res = await api.post("/auth/signin", data);
    console.log(res);

    return res;
  } catch (error: any) {
    const message = error.response?.data?.message || "Invalid credentials.";
    throw new Error(message);
  }
}

export async function getUser() {
  try {
    const res = await api.get("/auth/getuser", {
      withCredentials: true,
    });

    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to fetch user data.";
    throw new Error(message);
  }
}
