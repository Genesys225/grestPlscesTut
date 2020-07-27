import React, { ReactNode } from 'react';
import {
	StyleSheet,
	Text,
	TextProps,
	TextStyle,
	ViewStyle,
	View,
} from 'react-native';

interface BeTextProps extends TextProps {
	children: ReactNode | string | number | Text | any[];
	style?: TextStyle;
	containerStyle?: ViewStyle;
}

const BeText = (props: BeTextProps) => {
	const textElement = () => (
		<Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
	);

	return props.containerStyle ? (
		<View style={props.containerStyle}>{textElement()}</View>
	) : (
		textElement()
	);
};

export default BeText;

const styles = StyleSheet.create({
	body: {
		fontFamily: 'open-sans',
		fontSize: 16,
	},
});
