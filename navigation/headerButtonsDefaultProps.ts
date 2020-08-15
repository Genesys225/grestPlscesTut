import { Platform } from 'react-native';
import { MainButtonProps } from './../components/common/MainButton';
import Colors from '../config/colors';
export const headerButtonDefaultProps: MainButtonProps = {
	color: Platform.OS === 'android' ? Colors.primary : 'white',
	iconSize: 23,
	iconColor: Platform.OS === 'android' ? 'white' : Colors.primary,
	feedbackType: 'ripple',
	rippleSize: 55,
	rippleOpacity: 0.5,
};
