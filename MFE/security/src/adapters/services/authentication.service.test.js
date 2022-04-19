import * as api from "./http.api";
import * as authenticationService from "./authentication.service";

const mockLogin = jest.fn().mockImplementation((user) => user);
const mockClearUserData = jest.fn(() => null);
const mockIsAuthenticated = jest.fn().mockReturnValueOnce(true);

jest.mock("../localStorage/login.localStorage", () => ({
  setUserData: (jwt) => mockLogin(jwt),
  isAuthenticated: () => mockIsAuthenticated,
  clearUserData: () => mockClearUserData(),
}));

jest.mock("./http.api", () => ({
  unprotectedAPI: jest.fn(() => ({
      login: {
        jwt: "jwt-token",
      },
    })),
}));

describe("authentication.service", () => {
  it("should be able to authenticate a user", async () => {
    await authenticationService.login({ user: "user", password: "password" });
    expect(mockLogin).toHaveBeenCalledWith("jwt-token");
  });

  it("should not be able to authenticate a user", async () => {
    jest.spyOn(api, "unprotectedAPI").mockImplementationOnce(() => ({
      login: null,
    }));

    try {
      await authenticationService.login({ user: "user", password: "password" });
      expect("success").toBe("exception");
    } catch (error) {
      expect(error.message).toBe("Erro ao efetuar login");
    }
  });

  it("should be able to logout user", async () => {
    authenticationService.logout();
    expect(mockClearUserData).toHaveBeenCalledTimes(1);
  });
});
