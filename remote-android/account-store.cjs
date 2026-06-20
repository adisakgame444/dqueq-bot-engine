const fs = require("fs");
const path = require("path");

const DEFAULT_STORE_FILE = path.join(__dirname, "accounts.json");
const STORE_DIR = process.env.DQUEUE_DATA_DIR
  ? path.join(process.env.DQUEUE_DATA_DIR, "remote-android")
  : __dirname;
const STORE_FILE = path.join(STORE_DIR, "accounts.json");

function ensureStore() {
  if (fs.existsSync(STORE_FILE)) return;
  fs.mkdirSync(STORE_DIR, { recursive: true });
  if (fs.existsSync(DEFAULT_STORE_FILE)) {
    fs.copyFileSync(DEFAULT_STORE_FILE, STORE_FILE);
    return;
  }
  fs.writeFileSync(
    STORE_FILE,
    `${JSON.stringify(
      {
        accounts: [
          {
            id: 1,
            name: "Account 1",
            packageName: "me.deltaqueue.dqueue",
            enabled: true,
            protected: true,
          },
        ],
      },
      null,
      2
    )}\n`,
    "utf8"
  );
}

function normalizeAccount(account) {
  const id = Number(account.id);
  return {
    id,
    name: String(account.name || `Account ${id}`),
    packageName: String(account.packageName),
    enabled: account.enabled !== false,
    protected: account.protected === true,
  };
}

function readStore() {
  ensureStore();
  const parsed = JSON.parse(fs.readFileSync(STORE_FILE, "utf8"));
  return {
    accounts: (parsed.accounts || [])
      .map(normalizeAccount)
      .sort((left, right) => left.id - right.id),
  };
}

function writeStore(store) {
  ensureStore();
  fs.writeFileSync(STORE_FILE, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

function listAccounts() {
  return readStore().accounts;
}

function getAccount(id) {
  return listAccounts().find((account) => account.id === Number(id));
}

function nextAccount() {
  const accounts = listAccounts();
  const id = Math.max(0, ...accounts.map((account) => account.id)) + 1;
  return {
    id,
    name: `Account ${id}`,
    packageName:
      id === 1 ? "me.deltaqueue.dqueue" : `me.deltaqueue.dqueue.account${id}`,
    enabled: true,
    protected: id === 1,
  };
}

function addAccount(account) {
  const store = readStore();
  if (store.accounts.some((item) => item.id === Number(account.id))) {
    throw new Error(`Account ${account.id} already exists`);
  }
  store.accounts.push(normalizeAccount(account));
  store.accounts.sort((left, right) => left.id - right.id);
  writeStore(store);
  return getAccount(account.id);
}

function updateAccount(id, changes) {
  const store = readStore();
  const index = store.accounts.findIndex(
    (account) => account.id === Number(id)
  );
  if (index === -1) throw new Error(`Account ${id} was not found`);
  store.accounts[index] = normalizeAccount({
    ...store.accounts[index],
    ...changes,
    id: store.accounts[index].id,
    packageName: store.accounts[index].packageName,
    protected: store.accounts[index].protected,
  });
  writeStore(store);
  return getAccount(id);
}

function removeAccount(id) {
  const store = readStore();
  const account = store.accounts.find((item) => item.id === Number(id));
  if (!account) throw new Error(`Account ${id} was not found`);
  if (account.protected) throw new Error("Account 1 cannot be deleted");
  store.accounts = store.accounts.filter((item) => item.id !== Number(id));
  writeStore(store);
  return account;
}

module.exports = {
  addAccount,
  getAccount,
  listAccounts,
  nextAccount,
  removeAccount,
  updateAccount,
};
