import { useState } from 'react';
import { UsuariosAPI } from './api';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

export default function App() {
  const [selected, setSelected] = useState(null);
  const [reload, setReload] = useState(false);

  const handleEdit = async (username) => {
    const data = await UsuariosAPI.get(username);
    setSelected(data);
  };

  const refresh = () => setReload((v) => !v);

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Panel de control</p>
          <h1>Gestión de usuarios</h1>
          <p className="lead">
            Administra altas, cambios y bajas con validación. Asegúrate de que el backend
            esté corriendo en <code>http://localhost:4000/api</code>.
          </p>
        </div>
        <div className="hero-actions">
          <button className="ghost" type="button" onClick={() => setSelected(null)}>
            Nuevo registro
          </button>
          <button className="primary" type="button" onClick={refresh}>
            Refrescar lista
          </button>
        </div>
      </header>

      <section className="content-grid">
        <div className="card form-card">
          <UserForm
            selected={selected}
            onSuccess={() => {
              setSelected(null);
              refresh();
            }}
          />
        </div>

        <div className="card table-card">
          <UserTable onEdit={handleEdit} reload={reload} />
        </div>
      </section>
    </div>
  );
}
