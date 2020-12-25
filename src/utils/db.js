import Datastore from 'lowdb'
import LodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'

const isDevelopment = process.env.NODE_ENV !== 'production'

let db

const DB = {
  initDB (storePath) {
    if (!fs.pathExistsSync(storePath)) {
      fs.mkdirpSync(storePath)
    }

    const dbFile = isDevelopment ? '/data-dev.json' : '/data.json'

    const adapter = new FileSync(path.join(storePath, dbFile))

    db = Datastore(adapter)

    db._.mixin(LodashId)

    db.defaults({
      todoList: [],
      doneList: [],
      settings: {}
    }).write()

    if (!this.has('settings.firstRun')) {
      this.set('settings.firstRun', true)
    }
  },
  has (key) {
    return db
      .read()
      .has(key)
      .value()
  },
  get (key) {
    return db
      .read()
      .get(key)
      .value()
  },
  set (key, value) {
    return db
      .read()
      .set(key, value)
      .write()
  },
  insert (key, value) {
    return db
      .read()
      .get(key)
      .insert(value)
      .write()
  },
  removeById (key, id) {
    return db
      .read()
      .get(key)
      .removeById(id)
      .write()
  },
  groupby (key, prop) {
    const d = db
      .read()
      .get(key)
      .sortBy(prop)
      .reverse()
      .groupBy(prop)
      .value()
    return d
  }
}

export default DB
