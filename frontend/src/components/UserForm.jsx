import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CatalogosAPI, UsuariosAPI } from '../api';

const schema = yup.object({
  username: yup.string().required('Requerido'),
  password: yup
    .string()
    .transform((value) => (value === '' || !value ? undefined : value))
    .when('$isEditing', {
      is: false,
      then: (schema) => schema.min(6, 'Mínimo 6 caracteres').required('Requerido'),
      otherwise: (schema) => schema.min(6, 'Mínimo 6 caracteres').optional()
    }),
  nombre: yup.string().required('Requerido'),
  edad: yup
    .number()
    .typeError('Debe ser número')
    .integer('Debe ser entero')
    .min(1, 'Mínimo 1')
    .required('Requerido'),
  id_estado: yup.number().required('Requerido'),
  id_tipo_usuario: yup.number().required('Requerido')
});

export default function UserForm({ selected, onSuccess }) {
  const isEditing = !!selected;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    context: { isEditing },
    defaultValues: {
      username: '',
      password: '',
      nombre: '',
      edad: '',
      id_estado: 1,
      id_tipo_usuario: 2
    }
  });

  const [estados, setEstados] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    (async () => {
      setEstados(await CatalogosAPI.estados());
      setTipos(await CatalogosAPI.tipos());
    })();
  }, []);

  useEffect(() => {
    if (selected) {
      reset({ ...selected, password: '' });
    } else {
      reset({
        username: '',
        password: '',
        nombre: '',
        edad: '',
        id_estado: 1,
        id_tipo_usuario: 2
      });
    }
  }, [selected, reset]);

  const onSubmit = async (values) => {
    try {
      if (selected) {
        const { username, password, nombre, edad, id_estado, id_tipo_usuario } = values;
        const payload = {
          nombre,
          edad: Number(edad),
          id_estado: Number(id_estado),
          id_tipo_usuario: Number(id_tipo_usuario)
        };
        // Solo incluir password si tiene valor (no vacío)
        if (password && password.trim() !== '') {
          payload.password = password;
        }
        await UsuariosAPI.update(username, payload);
      } else {
        await UsuariosAPI.create({
          ...values,
          edad: Number(values.edad),
          id_estado: Number(values.id_estado),
          id_tipo_usuario: Number(values.id_tipo_usuario)
        });
      }
      onSuccess?.();
      reset();
    } catch (e) {
      alert(e?.response?.data?.error || e.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-head">
        <div>
          <p className="eyebrow">{selected ? 'Edición' : 'Nuevo usuario'}</p>
          <h3>{selected ? 'Editar usuario' : 'Crear usuario'}</h3>
        </div>
        {selected && (
          <button className="ghost" type="button" onClick={() => reset()}>
            Limpiar
          </button>
        )}
      </div>

      <div className="fields">
        <label className="field">
          <span>Username</span>
          <input disabled={!!selected} {...register('username')} />
          {errors.username?.message && <small className="error">{errors.username?.message}</small>}
        </label>

        <label className="field">
          <div className="field-title">
            <span>Password</span>
            {selected && <small>(déjalo vacío para no cambiar)</small>}
          </div>
          <input type="password" {...register('password')} />
          {errors.password?.message && <small className="error">{errors.password?.message}</small>}
        </label>

        <label className="field">
          <span>Nombre</span>
          <input {...register('nombre')} />
          {errors.nombre?.message && <small className="error">{errors.nombre?.message}</small>}
        </label>

        <label className="field">
          <span>Edad</span>
          <input type="number" {...register('edad')} />
          {errors.edad?.message && <small className="error">{errors.edad?.message}</small>}
        </label>

        <label className="field">
          <span>Estado</span>
          <select {...register('id_estado')}>
            {estados.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>
          {errors.id_estado?.message && <small className="error">{errors.id_estado?.message}</small>}
        </label>

        <label className="field">
          <span>Tipo de usuario</span>
          <select {...register('id_tipo_usuario')}>
            {tipos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>
          {errors.id_tipo_usuario?.message && (
            <small className="error">{errors.id_tipo_usuario?.message}</small>
          )}
        </label>
      </div>

      <div className="form-actions">
        <button className="primary" type="submit">
          {selected ? 'Actualizar' : 'Crear usuario'}
        </button>
        <button className="ghost" type="button" onClick={() => reset()}>
          Limpiar
        </button>
      </div>
    </form>
  );
}
