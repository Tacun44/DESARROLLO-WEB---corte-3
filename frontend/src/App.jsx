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
const refresh = () => setReload(v => !v);
return (
<div style={{ padding: 20, display: 'grid', gap: 20 }}>
<h2>CRUD Usuarios – React + Vite + Node.js</h2>
<UserForm selected={selected} onSuccess={() => { setSelected(null);
refresh(); }} />
<UserTable onEdit={handleEdit} reload={reload} />
</div>
);
}

