import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
	Places: undefined;
	PlaceDetails: { placeTitle: string; placeId: string };
	Map: undefined;
	AddPlace: undefined;
};

export type AddPlaceScreenRouteProp = RouteProp<RootStackParamList, 'AddPlace'>;

export type AddPlaceScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'AddPlace'
>;

export type PlacesScreenRouteProp = RouteProp<RootStackParamList, 'Places'>;

export type PlacesScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Places'
>;

export type PlaceDetailsScreenRouteProp = RouteProp<
	RootStackParamList,
	'PlaceDetails'
>;
export type PlaceDetailsScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'PlaceDetails'
>;
