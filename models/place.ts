export default class Place {
	title: string;
	id: string;
	imageUri: any;
	address: string;
	lat: number;
	lng: number;
	constructor(
		id: string,
		title: string,
		imageUri: string,
		address: string,
		lat: number,
		lng: number
	) {
		this.title = title;
		this.imageUri = imageUri;
		this.address = address;
		this.lat = lat;
		this.lng = lng;
		this.id = id;
	}
}

export class Places {
	constructor() {}
}
