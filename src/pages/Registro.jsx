import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = (e) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      toast.error('⚠️ Todos los campos son obligatorios');
      return;
    }

    // Obtener usuarios existentes de localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar si el email ya existe
    const existe = usuarios.find((u) => u.email === email);
    if (existe) {
      toast.error('❌ Este correo ya está registrado');
      return;
    }

    // Agregar nuevo usuario
    usuarios.push({ nombre, email, password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mensaje de éxito
    toast.success('✅ Registro exitoso');

    // Limpiar formulario
    setNombre('');
    setEmail('');
    setPassword('');
  };

  return (
    <main className="registro-page">
      <h2>Registro</h2>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
    </main>
  );
}

export default Registro;