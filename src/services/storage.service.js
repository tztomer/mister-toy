export const storageService = {
  save,
  load,
  query,
  remove,
  get,
};

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function load(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}
function query(entityType) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  return Promise.resolve(entities);
}
function get(entityType, entityId) {
  return query(entityType).then(entities => entities.find(entity => entity._id === entityId));
}
function remove(entityType, entityId) {
  return query(entityType).then(entities => {
    const idx = entities.findIndex(entity => entity._id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}
