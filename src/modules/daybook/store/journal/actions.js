import journalApi from "@/api/journalApi";

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json");

  if (!data) {
    commit("setEntries", []);
    return;
  }

  const entries = [];
  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }

  commit("setEntries", entries);
};

export const updateEntry = async ({ commit }, data) => {
  const { id, date, text, picture } = data;
  const saveData = { date, text, picture };

  await journalApi.put(`/entries/${id}.json`, saveData);
  commit("update", { ...saveData, id });

  return saveData;
};

export const createEntry = async ({ commit }, entry) => {
  const { text, date, picture } = entry;
  const body = { text, date, picture };

  const { data } = await journalApi.post("/entries.json", body);
  const id = data.name;

  commit("addEntries", { ...body, id });

  return id;
};

export const deleteEntry = async ({ commit }, id) => {
  await journalApi.delete(`/entries/${id}.json`);

  commit("deleteEntry", id);
};
