export const storageService = {
  save,
  load,
  query,
  remove,
  get,
  put,
  post,
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
function post(entityType, newEntity) {
  newEntity._id = _makeId();
  return query(entityType).then(entities => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}
function get(entityType, entityId) {
  return query(entityType).then(entities => entities.find(entity => entity._id === entityId));
}
function put(entityType, updatedEntity) {
  return query(entityType).then(entities => {
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
    console.log(idx);
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
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
function _makeId(length = 5) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
