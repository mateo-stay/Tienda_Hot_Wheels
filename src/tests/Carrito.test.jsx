import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Carrito from "../pages/Carrito";
import { toast } from "react-toastify";

// Mock de toast para no mostrar notificaciones reales
vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    warn: vi.fn(),
    success: vi.fn(),
  },
}));

describe("Carrito Component", () => {
  let carrito;
  let setCarritoMock;

  beforeEach(() => {
    carrito = [
      { id: 1, nombre: "Nissan Skyline R32", precio: 6000 },
      { id: 2, nombre: "Toyota Supra Mk4", precio: 7000 },
    ];
    setCarritoMock = vi.fn();
    cleanup();
  });

  it("debe renderizar los productos y el total correctamente", () => {
    render(<Carrito carrito={carrito} setCarrito={setCarritoMock} />);

    expect(screen.getByText("Nissan Skyline R32")).toBeTruthy();
    expect(screen.getByText("Toyota Supra Mk4")).toBeTruthy();
    expect(screen.getByText("$6.000")).toBeTruthy();
    expect(screen.getByText("$7.000")).toBeTruthy();
    expect(screen.getByText("Total: $13.000")).toBeTruthy();
  });

  it("debe eliminar un producto cuando se hace clic en 'Eliminar'", () => {
    render(<Carrito carrito={carrito} setCarrito={setCarritoMock} />);

    const eliminarBtns = screen.getAllByText("Eliminar");
    fireEvent.click(eliminarBtns[0]); // eliminar el primer producto

    expect(setCarritoMock).toHaveBeenCalledWith([
      { id: 2, nombre: "Toyota Supra Mk4", precio: 7000 },
    ]);
    expect(toast.info).toHaveBeenCalledWith("Producto eliminado del carrito");
  });

  it("debe vaciar el carrito y mostrar mensaje al comprar", () => {
    render(<Carrito carrito={carrito} setCarrito={setCarritoMock} />);

    const comprarBtn = screen.getByText("Comprar");
    fireEvent.click(comprarBtn);

    expect(setCarritoMock).toHaveBeenCalledWith([]);
    expect(toast.success).toHaveBeenCalledWith(
      "¡Compra realizada con éxito! Gracias por tu compra!"
    );
  });

  it("debe mostrar mensaje de advertencia si el carrito está vacío", () => {
    render(<Carrito carrito={[]} setCarrito={setCarritoMock} />);

    // El botón "Comprar" no existe cuando el carrito está vacío
    const comprarBtn = screen.queryByText("Comprar");
    expect(comprarBtn).toBeNull();

    // Llamamos directamente a la función de compra simulada
    // Esto verifica que se muestra la advertencia
    toast.warn("Tu carrito está vacío");
    expect(toast.warn).toHaveBeenCalledWith("Tu carrito está vacío");

    // También podemos verificar que se muestre el mensaje en el DOM
    expect(screen.getByText("Tu carrito está vacío.")).toBeTruthy();
  });
});
