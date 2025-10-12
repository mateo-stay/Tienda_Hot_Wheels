import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Producto from "../pages/Producto";

describe("Producto Component", () => {
  let mockAgregar;

  beforeEach(() => {
    mockAgregar = vi.fn();
    cleanup();
  });

  it("debe renderizar correctamente el nombre, imagen y precio", () => {
    render(
      <Producto
        nombre="Nissan Skyline R32"
        imagen="/img/skyline.jpg"
        precio={6000}
        agregar={mockAgregar}
      />
    );

    expect(screen.getByText("Nissan Skyline R32")).toBeTruthy();
    expect(screen.getByAltText("Nissan Skyline R32")).toBeTruthy();
    expect(screen.getByText("$6.000")).toBeTruthy();
  });

  it("debe ejecutar la función agregar cuando se hace clic en el botón", () => {
    render(
      <Producto
        nombre="Toyota Supra Mk4"
        imagen="/img/toyota.jpg"
        precio={7000}
        agregar={mockAgregar}
      />
    );

    const boton = screen.getByText("Añadir al carrito");
    fireEvent.click(boton);

    expect(mockAgregar).toHaveBeenCalledTimes(1);
    expect(mockAgregar).toHaveBeenCalledWith("Toyota Supra Mk4", 7000);
  });
});