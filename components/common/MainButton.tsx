import React, { ReactNode } from 'react';
import {
	StyleSheet,
	Text,
	ViewStyle,
	TouchableOpacity,
	TouchableHighlight,
	TouchableOpacityProps,
	TextStyle,
	TouchableWithoutFeedbackProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../config/colors';
import Ripple from 'react-native-material-ripple';

export interface MainButtonProps extends TouchableWithoutFeedbackProps {
	children?: ReactNode;
	style?: ViewStyle;
	title?: string;
	iconName?: string;
	iconColor?: string;
	iconSize?: number;
	textStyle?: TextStyle;
	color?: string;
	disabled?: boolean;
	feedbackType?: 'opacity' | 'highlight' | 'ripple';
	activeOpacity?: number;
	highlightColor?: string;
	rippleSequential?: boolean;
	rippleCentered?: boolean;
	rippleSize?: number;
	rippleOpacity?: number;
}

const MainButton = (props: MainButtonProps) => {
	type filteredProps = TouchableOpacityProps;
	const {
		iconColor,
		iconSize,
		iconName,
		title,
		children,
		color,
		feedbackType: _feedbackType,
		...filteredProps
	} = props;

	const dynamicChildren = children ? (
		children
	) : iconName ? (
		<Ionicons name={iconName} size={iconSize} color={iconColor} />
	) : (
		<Text style={{ ...styles.btnText, ...props.textStyle }}>{title}</Text>
	);

	let style = props.style;
	if (color) {
		style = { ...style, backgroundColor: color };
	}
	if (props.disabled) {
		style = { ...style, backgroundColor: '#888' };
		delete filteredProps.onPress;
	}

	const feedbackType =
		props.feedbackType === undefined ? 'opacity' : props.feedbackType;
	switch (feedbackType) {
		case 'ripple':
			return (
				<Ripple
					rippleCentered={true}
					{...filteredProps}
					style={{ ...styles.button, ...style }}
				>
					{dynamicChildren}
				</Ripple>
			);
		case 'highlight':
			return (
				<TouchableHighlight
					style={{ ...styles.button, ...style }}
					highlightColor="white"
					{...filteredProps}
				>
					{dynamicChildren}
				</TouchableHighlight>
			);

		default:
			return (
				<TouchableOpacity
					style={{ ...styles.button, ...style }}
					activeOpacity={0.6}
					{...filteredProps}
				>
					{dynamicChildren}
				</TouchableOpacity>
			);
	}
};

export default MainButton;

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 3,
	},
	btnText: {
		color: 'white',
		fontFamily: 'open-sans',
		fontSize: 18,
		textAlign: 'center',
	},
});
