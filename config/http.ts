import { Http } from '../store/Http';

export const api = new Http('https://rn-academind-training.firebaseio.com/');
export const auth = new Http(
	'https://identitytoolkit.googleapis.com/v1/',
	{},
	{ key: 'AIzaSyC02szWokwYWTZzi-_T7tDmm1rv0et9hv4' }
);
export const gMaps = new Http(
	'https://maps.googleapis.com/maps/api/staticmap',
	{},
	{
		key: 'AIzaSyA379Koq42vtNAgy73hyNhgbKKIlCTamYM',
	}
);
