// ref: https://github.com/BuilderIO/qwik/issues/3345
import type { RequestEventLoader } from '@builder.io/qwik-city';

let getDevDb: () => Promise<D1Database>;

if (import.meta.env.DEV) {
  const { D1Database, D1DatabaseAPI } = await import('@miniflare/d1');
  const { createSQLiteDB } = await import('@miniflare/shared');

  let devDb: any;

  getDevDb = async () => {
    if (!devDb) {
      const sqlLite = await createSQLiteDB('.wrangler/state/d1/DB.sqlite3');
      devDb = new D1Database(new D1DatabaseAPI(sqlLite));
    }
    return devDb;
  };
}

export const getDb = async (context: RequestEventLoader<QwikCityPlatform>) => {
  if (context.env.get('QWIK_STARTER_DB')) {
    return context.env.get('QWIK_STARTER_DB') as unknown as D1Database;
  }

  return getDevDb();
};
