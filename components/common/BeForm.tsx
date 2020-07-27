import React, { useCallback, ReactNode } from 'react';
import {
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	View,
	ViewStyle,
} from 'react-native';
import BeInput, { BeInputProps } from './BeInput';
import MainButton from './MainButton';
import { useFormReducer } from '../hooks/useFormReducer';

type OnSubmit = (formValues: { [name: string]: string | number }) => any;
type OnError = (formValues: { [name: string]: boolean }) => any;

type BeFormProps = {
	children?: ReactNode;
	inputFields: (BeInputProps | string)[];
	confirmText?: string;
	clearText?: string;
	initialValidity?: boolean;
	style?: ViewStyle;
	actionContainer?: {
		containerStyle?: ViewStyle;
		confirmStyle?: ViewStyle;
		clearStyle?: ViewStyle;
	};
	onSubmit: OnSubmit;
	onError?: OnError;
};

const BeForm = (props: BeFormProps) => {
	const inputFields = props.inputFields.map((field) => {
		if (typeof field === 'string') {
			return {
				name: field,
				initialValue: '',
				initialValidity: true,
				label: field[0].toUpperCase() + field.slice(1),
				fieldProps: { required: true },
			};
		} else {
			field.label =
				field.label === undefined
					? field.name[0].toUpperCase() + field.name.slice(1)
					: field.label;
			field.required =
				field.required === undefined ? true : field.required;
			return field;
		}
	});

	const [formState, formDispatch, initialState] = useFormReducer(
		inputFields,
		props.initialValidity === undefined ? true : props.initialValidity
	);

	const submitHandler = useCallback(() => {
		if (formState.formIsValid) {
			return props.onSubmit(formState.inputValues);
		} else {
			return props.onError && props.onError(formState.inputValidities);
		}
	}, [formState]);

	const inputChangeHandler = useCallback(
		(name: string, text: string, isValid: boolean) => {
			formDispatch({
				type: 'UPDATE_INPUT',
				payload: { text, name, isValid },
			});
		},
		[formDispatch]
	);

	const clearFormHandler = useCallback(() => {
		formDispatch({
			type: 'CLEAR_FORM',
			payload: initialState,
		});
	}, [formDispatch]);

	const confirmText =
		props.confirmText === undefined ? 'Submit' : props.confirmText;

	return (
		<KeyboardAvoidingView
			style={styles.kbAvoid}
			behavior="height"
			keyboardVerticalOffset={100}
		>
			<ScrollView style={{ ...styles.form, ...props.style }}>
				{inputFields.map((field) => {
					return (
						<BeInput
							{...field}
							name={field.name}
							initialValue={field.initialValue}
							initialValidity={field.initialValidity}
							key={field.name}
							label={field.label}
							onInput={inputChangeHandler}
						/>
					);
				})}
				<View>
					{props.children && props.children}
					<MainButton title={confirmText} onPress={submitHandler} />
					{props.clearText && (
						<MainButton
							title={confirmText}
							onPress={clearFormHandler}
						/>
					)}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
export default BeForm;

const styles = StyleSheet.create({
	form: {
		margin: 30,
	},
	kbAvoid: {
		flex: 1,
	},
});
