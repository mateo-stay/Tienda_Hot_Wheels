import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Registro from "../pages/Registro";
import { toast } from "react-toastify";

// Mock de toast
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe("Registro Component", () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("debe renderizar los campos y el botón correctamente", () => {
    render(<Registro />);
    expect(screen.getByPlaceholderText("Nombre")).toBeTruthy();
    expect(screen.getByPlaceholderText("Correo")).toBeTruthy();
    expect(screen.getByPlaceholderText("Contraseña")).toBeTruthy();
    expect(screen.getByText("Registrarse")).toBeTruthy();
  });

  it("debe mostrar error si algún campo está vacío", () => {
    render(<Registro />);
    const boton = screen.getByText("Registrarse");
    fireEvent.click(boton);
    expect(toast.error).toHaveBeenCalledWith("Todos los campos son obligatorios");
  });

  it("debe mostrar error si el correo ya está registrado", () => {
    localStorage.setItem(
      "usuarios",
      JSON.stringify([{ nombre: "Juan", email: "juan@mail.com", password: "1234" }])
    );

    render(<Registro />);

    const nombreInput = /** @type {HTMLInputElement} */ (screen.getByPlaceholderText("Nombre"));
    const correoInput = /** @type {HTMLInputElement} */ (screen.getByPlaceholderText("Correo"));
    const passwordInput = /** @type {HTMLInputElement} */ (screen.getByPlaceholderText("Contraseña"));

    fireEvent.change(nombreInput, { target: { value: "Pedro" } });
    fireEvent.change(correoInput, { target: { value: "juan@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "abcd" } });

    fireEvent.click(screen.getByText("Registrarse"));

    expect(toast.error).toHaveBeenCalledWith("Este correo ya está registrado");
  });

  it("debe registrar un nuevo usuario correctamente", () => {
    render(<Registro />);

    const nombreInput = /** @type {HTMLInputElement} */ (screen.getByPlaceholderText("Nombre"));
    const correoInput = /** @type {HTMLInputElement} */ (screen.getByPlaceholderText("Correo"));
    const passwordInput = /** @type {HTMLInputElement} */ (screen.getByPlaceholderText("Contraseña"));

    fireEvent.change(nombreInput, { target: { value: "Ana" } });
    fireEvent.change(correoInput, { target: { value: "ana@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });

    fireEvent.click(screen.getByText("Registrarse"));

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    expect(usuarios).toHaveLength(1);
    expect(usuarios[0]).toEqual({ nombre: "Ana", email: "ana@mail.com", password: "12345" });
    expect(toast.success).toHaveBeenCalledWith("Registro exitoso");

    expect(nombreInput.value).toBe("");
    expect(correoInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });
});
