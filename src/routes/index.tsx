import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { drizzle } from 'drizzle-orm/d1';
import { getDb } from '~/db/database';
import { users } from '~/db/schema/schema';

export const useUserListLoader = routeLoader$(async (context) => {
  const d1 = await getDb(context);

  if (d1) {
    const db = drizzle(d1);
    const result = await db.select().from(users).all();
    return {
      users: result,
    };
  }

  return {
    users: [],
  };
});

export default component$(() => {
  const userData = useUserListLoader();

  return (
    <>
      <h1>Users</h1>
      <ul>
        {userData.value.users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
