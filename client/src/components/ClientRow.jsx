import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },

    // refetchQueries: [{ query: GET_CLIENTS }],/* после удаления обратно зову клиентов,чтобы обновить,но эт так себе вариант */

    /* второй вариант из закешированных данных просто убираю тот,который удалил */
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({
    //     query: GET_CLIENTS,
    //   });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: clients.filter((client) => client.id !== deleteClient.id) },
    //   });
    // },

    /* тк после удаления клиента,мне нужно удалить и его проекты тоже,не буду заморачиваться,а просто заберу все с сервера */
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm">
          <FaTrash onClick={deleteClient} />
        </button>
      </td>
    </tr>
  );
}
