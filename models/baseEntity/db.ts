import * as SQLite from 'expo-sqlite';

export type Field = [string, string, 'NULL '] | [string, string];

export class DB {
	tableName: string;
	inst: SQLite.WebSQLDatabase;
	fields: {};
	currentTx: SQLite.SQLTransaction | undefined;
	query: string;
	args: (string | number)[];
	private _select: string;
	private _where: string;
	constructor(dbName: string, tableName: string, fields: (Field | 'id')[]) {
		this.inst = SQLite.openDatabase(dbName);
		this.tableName = tableName;
		this.init(fields);
		this.fields = fields.reduce(
			(fieldsObj, field) => ({
				...fieldsObj,
				[field[0]]: field[1],
			}),
			{}
		);
		this.query = '';
		this._select = '';
		this._where = '';
		this.args = [];
	}

	static get types() {
		return {
			string: 'TEXT ',
			varchar: 'VARCHAR(255)',
			real: 'REAL',
			int: 'INTEGER ',
			id: 'INTEGER PRIMARY KEY NOT NULL',
		};
	}

	private init(fields: (Field | 'id')[]) {
		const fieldsQuey = fields.reduce((fieldSettings, field, index) => {
			let result = `${fieldSettings}${index !== 0 ? ', ' : ''}`;
			if (field === 'id') result += `id ${DB.types.id}`;
			else if (field[1] && !field[2])
				result += `${field[0]} ${field[1]} NOT NULL`;
			else if (field[1] && field[2])
				result += `${field[0]} ${field[1]} ${field[2]}`;
			else throw new Error('Invalid schema');
			return result;
		}, '');
		this.query = `CREATE TABLE IF NOT EXISTS ${this.tableName} (${fieldsQuey});`;
		return this.exec();
	}

	private exec(): Promise<SQLite.SQLResultSet> {
		if (this._select) this.query = this._select;
		if (this._where && this._select) this.query += this._where;
		return new Promise((res, rej) => {
			this.inst.transaction((tx) => {
				this.currentTx = tx;
				tx.executeSql(
					this.query,
					this.args,
					(_, result) => {
						res(result);
					},
					(_, error) => {
						rej(error);
						return false;
					}
				);
			});
		});
	}

	public async insert(object: { [key: string]: any }) {
		const objectKeys = Object.keys(object);
		const insertFields = `(${objectKeys.join(',')}) VALUES (${'?,'.repeat(
			objectKeys.length - 1
		)}?)`;
		this.query = `INSERT INTO ${this.tableName} ${insertFields}`;
		this.args = Object.values(object);
		return await this.exec();
	}

	private buildGet(args: string[]) {
		if (args[0] === '*' || args.length === 0) {
			if (args.length > 1)
				throw new Error(
					"Sql allows either to _select '*' or specify fields"
				);
			this._select = 'SELECT * FROM ' + this.tableName;
			args = [];
		}
		this._select = `SELECT ${'?,'.repeat(args.length - 1)}? FROM ${
			this.tableName
		}`;
		this.args = args;
	}

	async get(...args: string[]) {
		this.buildGet(args);
		return this.exec();
	}

	async where(...args: [string] | WhereArgs) {
		if (args.length === 1 && typeof args[0] === 'string') {
			this._where = args[0];
		} else if (args.length > 0) {
			const validArgs = args as WhereArgs;
			this._where = validArgs.reduce((where, arg, index) => {
				const AND = index === 1 ? 'WHERE' : 'AND';
				if (typeof arg === 'string') {
					where += ` ${AND} ${arg}`;
				} else if (arg.length === 2) {
					where += ` ${AND} ${arg[0]} = ${arg[1]}`;
				} else if (arg.length === 3) {
					where += ` ${AND} ${arg[0]} ${arg[1]} ${arg[2]}`;
				}
				return where;
			}, '') as string;
		}
		return {
			get: (...args: string[]) => this.get(...args),
			first: () => {
				this.buildGet([]);
				this.query += 'LIMIT';
			},
		};
	}
}

type WhereEqual = [string, string | number];
type WhereCompare = [string, '>' | '>=' | '<' | '<=' | '!=', string | number];
type WhereArgs = (WhereEqual | WhereCompare | string)[];
