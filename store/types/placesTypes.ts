import Place from '../../models/place';

export const ADD_PLACE = 'ADD_PLACE';

export type AddPlaceAction = {
	type: 'ADD_PLACE';
	payload: {
		title: string;
		imageUri: string;
	};
};

export type PlacesState = {
	places: Place[];
};

export type PlacesActions = AddPlaceAction;
