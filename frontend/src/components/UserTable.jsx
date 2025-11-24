import { useEffect, useState } from 'react';
import { UsuariosAPI } from '../api';

export default function UserTable({ onEdit, reload }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const rows = await UsuariosAPI.list();
      setData(rows);
    } catch (e) {
      alert(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [reload]);

  const remove = async (username) => {
    if (!confirm('¿Eliminar usuario?')) return;
    try {
      await UsuariosAPI.remove(username);
      await load();
    } catch (e) {
      alert(e?.response?.data?.error || e.message);
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table-head">
        <div>
          <p className="eyebrow">Listado</p>
          <h3>Usuarios</h3>
        </div>
        {loading && <span className="pill">Cargando...</span>}
      </div>

      <div className="table-scroller">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Estado</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.username}>
                <td>{u.username}</td>
                <td>{u.nombre}</td>
                <td>{u.edad}</td>
                <td>
                  <span className="pill subtle">{u.estado}</span>
                </td>
                <td>{u.tipo}</td>
                <td className="actions">
                  <button className="ghost" onClick={() => onEdit(u.username)}>
                    Editar
                  </button>
                  <button className="danger" onClick={() => remove(u.username)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {!data.length && !loading && (
              <tr>
                <td colSpan="6" className="empty">
                  Sin datos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
