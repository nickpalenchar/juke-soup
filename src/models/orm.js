import { collection, addDoc, query, where, getDocs, getDoc, getDocFromServer, doc } from "firebase/firestore";
import find from 'lodash.find';
import getDatabase from '../database/getDatabase';

const debug = (...args) => {
  if (localStorage.getItem('ORMDEBUG')) {
    console.log('[ORM:DEBUG]', ...args, {stack: new Error()});
  }
}
debug.group = (label) => console.group(label);
debug.groupEnd = () => console.groupEnd();

export class ORM {

  static _models = {}
  static _dbconnection = getDatabase;

  /**
   * @param {Function} connection - the firestore connection function
   */
  static setDb(connection) {
    debug('Setting db connection to', connection);
    ORM._dbconnection = connection;
  }

  static model(name, schema) {

    if (!schema) {
      return ORM._models[name];
    }
    const model = new Model(name, schema, ORM._dbconnection);
    ORM._models[name] = model;
    return model;
  }
}

class Model {
  constructor(name, schema, getdbFn) {
    this._schema = schema;
    this._collection = name;
    this._getdb = getdbFn;
    this._hooks = {
      preCreate: () => {},
    }
  }

  // hooks
  preCreate(hook) {
    this._hooks.preCreate = hook;
  }

  /**
   * Very primitive validation
   * @param {object} document
   * @returns {*}
   */
  validate(document) {
    const documentEntries = Object.entries(document);
    for (const [key, value] of documentEntries) {
      if (key === '_id') {
        continue;
      }
      console.log(key, this._schema[key]);
      if (!this._schema[key]) {
        throw Error(`document has extra property '${key}'
        Schema keys are ${Object.keys(this._schema).join(', ')}`);
      }
      if (Array.isArray(this._schema[key])) {
        // TODO: validate the type inside the array schema with items in the document array
        if (!Array.isArray(value)) {
          throw Error(`Expected ${key} to be an Array but was ${typeof value}`);
        }
      } else if (typeof this._schema[key]() !== typeof value) {
        throw Error(`Expected '${key}' to be type ${typeof this._schema[key]()}, but was ${typeof value}
        Schema keys are ${Object.keys(this._schema).join(', ')}`);
      }
    }
    return document;
  }

  async create(document = {}, {fetchDoc = true} = {}) {
    debugger;
    debug('creating document ', document);
    this._hooks.preCreate(document);
    this.validate(document);
    const db = this._getdb();
    const snapshot = await addDoc(collection(db, this._collection), document);
    if (fetchDoc) {
      debug('fetching document');
      return this.findById(snapshot.id, {cache: false});
    }
    return snapshot;
  }

  /**
   * @param {object} queryObj - simplified AND'ed obect or sql like string
   * @returns {Promise<void>}
   */
  async find(queryObj) {
    debug.group('find');
    debug('called with query', queryObj);
    let _id;
    if (queryObj._id) {
      _id = queryObj._id;
      delete queryObj._id;
    }
    const db = this._getdb();
    debug('using db', db);
    const ref = collection(db, this._collection);
    debug('using collection', ref);
    const q = query(ref, ...convertObjectToWhereClauses(queryObj));
    const snapshot = await getDocs(q);
    if (!snapshot.docs?.length) {
      debug('find: no query found');
      debug.groupEnd();
      return undefined;
    }
    if (_id) {
      const doc = find(snapshot.docs, (doc) => doc.id === _id);
      debug('found doc (by id): ', doc);
      debug.groupEnd();
      return [documentSnapshotToObject(doc)];
    }
    debug('found docs (as snapshots):', snapshot.docs);
    debug.groupEnd();
    return snapshot.docs.map(documentSnapshotToObject);
  }

  async findOne(queryObj) {
    debug.group('findOne');
    const docs = await this.find(queryObj);
    if (!docs) {
      debug('no docs found');
      debug.groupEnd();
      return;
    }
    debug(`fond ${docs.length} docs, first one is `, docs[0]);
    debug.groupEnd();
    return docs[0];
  }
  async findById(id, { cache = true} = {}) {
    debug.group('findById');
    debug('using id ', id, {cache}, this._collection);
    const db = this._getdb();
    const docRef = doc(db, `/${this._collection}/${id}`);
    const snapshot = await (cache ? getDoc(docRef) : getDocFromServer(docRef));
    debug.groupEnd();
    return documentSnapshotToObject(snapshot);
  }

  async findOrCreate(queryObj) {
    debug.group('findOrCreate');
    debug('called with queryObj=', queryObj);
    const doc = await this.findOne(queryObj);
    if (!doc) {
      if (!queryObj._id) {
        delete queryObj._id;
      }
      debug('doc not found, creating.');
      const doc = await this.create(queryObj);
      debug.groupEnd();
      return doc;
    }
    debug('Found doc:', doc);
    return doc;
  }
}

/**
 * @param obj - queryObject
 * @returns {*[]} clauses
 */
function convertObjectToWhereClauses(obj) {
  const clauses = [];
  for (const [key, value] of Object.entries(obj)) {
    clauses.push(where(key, '==', value));
  }
  return clauses;
}

/** takes a DocumentSnapshot https://firebase.google.com/docs/reference/js/firestore_lite.documentsnapshot.md
 * and adds the id to the document as _id (like with mongoose)
 * @param snapshot
 */
function documentSnapshotToObject(snapshot) {
  const data = snapshot?.data();
  if (!data) {
    return;
  }
  return { ...snapshot.data(), _id: snapshot.id };
}
