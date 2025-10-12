import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Login from "../pages/Login";
import { toast } from "react-toastify";

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe("Login Component", () => {
  let setUsuarioMock;

  beforeEach(() => {
    cleanup();
    localStorage.clear();
    vi.clearAllMocks();
    setUsuarioMock = vi.fn();
  });

  it("debe renderizar los campos y el botón correctamente", () => {
    render(<Login setUsuario={setUsuarioMock} />);
    expect(screen.getByPlaceholderText("Correo")).toBeTruthy();
    expect(screen.getByPlaceholderText("Contraseña")).toBeTruthy();
    expect(screen.getByText("Iniciar sesión")).toBeTruthy();
  });

  it("debe mostrar error si el login es incorrecto", () => {
    localStorage.setItem(
      "usuarios",
      JSON.stringify([{ nombre: "Juan", email: "juan@mail.com", password: "1234" }])
    );

    render(<Login setUsuario={setUsuarioMock} />);

    const emailInput = /** @type {HTMLInputElement} */ (screen.getByPlaceholderText("Correo"));
    const passwordInput = /** @type {HTMLInputElement} */ (screen.getByPlaceholderText("Contraseña"));

    fireEvent.change(emailInput, { target: { value: "juan@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpass" } });

    fireEvent.click(screen.getByText("Iniciar sesión"));

    expect(toast.error).toHaveBeenCalledWith("Email o contraseña incorrectos");
    expect(setUsuarioMock).not.toHaveBeenCalled();
  });

  it("debe iniciar sesión correctamente si los datos son válidos", () => {
    localStorage.setItem(
      "usuarios",
      JSON.stringify([{ nombre: "Juan", email: "juan@mail.com", password: "1234" }])
    );

    render(<Login setUsuario={setUsuarioMock} />);

    const emailInput = /** @type {HTMLInputElement} */ (screen.getByPlaceholderText("Correo"));
    const passwordInput = /** @type {HTMLInputElement} */ (screen.getByPlaceholderText("Contraseña"));

    fireEvent.change(emailInput, { target: { value: "juan@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });

    fireEvent.click(screen.getByText("Iniciar sesión"));

    expect(toast.success).toHaveBeenCalledWith("Bienvenido Juan");
    expect(setUsuarioMock).toHaveBeenCalledWith({ nombre: "Juan", email: "juan@mail.com", password: "1234" });
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });
});
