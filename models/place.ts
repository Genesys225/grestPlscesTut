export default class Place {
	title: string;
	id: string;
	imageUri: any;
	address: string;
	lat: string;
	lng: string;
	constructor(
		id: string,
		title: string,
		imageUri: string,
		address: string,
		lat: string,
		lng: string
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
