import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GestureResponderEvent } from 'react-native';
import { LatLng } from 'react-native-maps';
export type RootStackParamList = {
	Places: undefined;
	PlaceDetails: { placeTitle: string; placeId: string };
	Map: { saveLocation?: (event: GestureResponderEvent) => void };
	AddPlace: { pickedLocation?: LatLng };
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
export type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;
export type MapScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Map'
>;
