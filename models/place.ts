export default class Place {
	title: string;
	id: string;
	imageUri: any;
	constructor(id: string, title: string, imageUri: string) {
		this.title = title;
		this.imageUri = imageUri;
		this.id = id;
	}
}
