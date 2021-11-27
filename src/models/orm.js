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
  }

  /**
   * Very primitive validation
   * @param {object} document
   * @returns {*}
   */
  validate(document) {
    const schemaEntries = Object.entries(this._schema);
    const documentEntries = Object.entries(document);
    if (schemaEntries.length !== documentEntries.length) {
      throw Error('document does not match schema');
    }
    for (const [key, value] of documentEntries) {
      if (!this._schema[key]) {
        throw Error(`document has extra property '${key}'`);
      }
      if (typeof this._schema[key]() !== typeof value) {
        throw Error(`Expected '${key}' to be type ${typeof this._schema[key]}, but was ${typeof value}`);
      }
    }
    return document;
  }

  async create(document) {
    this.validate(document);
    const db = this._getdb();
    console.log('adding colleccion',)
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
    console.log('pushing ', key, value)
    clauses.push(where(key, '==', value));
  }
  return clauses;
}
