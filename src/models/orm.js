import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import getDatabase from '../database/getDatabase';

export class ORM {

  static _models = {}
  static _dbconnection = getDatabase;

  /**
   * @param {Function} connection - the firestore connection function
   */
  static setDb(connection) {
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
    const schemaEntries = Object.entries(this._schema);
    const documentEntries = Object.entries(document);
    for (const [key, value] of documentEntries) {
      if (!this._schema[key]) {
        throw Error(`document has extra property '${key}'
        Schema keys are ${Object.keys(this._schema).join(', ')}`);
      }
      if (typeof this._schema[key]() !== typeof value) {
        throw Error(`Expected '${key}' to be type ${typeof this._schema[key]()}, but was ${typeof value}
        Schema keys are ${Object.keys(this._schema).join(', ')}`);
      }
    }
    return document;
  }

  async create(document) {
    this._hooks.preCreate(document);
    this.validate(document);
    const db = this._getdb();
    return addDoc(collection(db, this._collection), document);
  }

  /**
   * @param {object} queryObj - simplified AND'ed obect or sql like string
   * @returns {Promise<void>}
   */
  async findOne(queryObj) {
    const db = this._getdb();
    const ref = collection(db, this._collection);
    const q = query(ref, ...convertObjectToWhereClauses(queryObj));
    const snapshot = await getDocs(q);
    if (!snapshot.docs?.length) {
      return undefined;
    }
    return snapshot.docs[0].data();
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
