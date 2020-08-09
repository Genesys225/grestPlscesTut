import Place from '../../models/place';

export const ADD_PLACE = 'ADD_PLACE';
export const HYDRATE_PLACE = 'HYDRATE_PLACE';

export type AddPlaceAction = {
	type: 'ADD_PLACE';
	payload: Place;
};

export type HydratePlacesAction = {
	type: 'HYDRATE_PLACE';
	places: Place[];
};

export type PlacesState = {
	places: Place[];
};

export type PlacesActions = AddPlaceAction | HydratePlacesAction;
