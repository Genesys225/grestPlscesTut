import { DB } from './db';
import Place from '../place';

let instance: Places | null = null;

export class Places extends DB {
	constructor() {
		super('places.db', 'places', [
			'id',
			['title', DB.types.string],
			['imageUri', DB.types.string],
			['address', DB.types.string],
			['lat', DB.types.real],
			['lng', DB.types.real],
		]);
		if (!instance) {
			instance = this;
		}
		return instance;
	}

	async insertPlace(place: Omit<Place, 'id'>) {
		return await super.insert(place);
	}
}

export const places = new Places();
