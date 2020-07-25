import React, { useReducer } from 'react';
import { BeInputProps } from '../common/BeInput';

export interface FormState {
	inputValues: {
		[name: string]: string;
	};
	inputValidities: {
		[name: string]: boolean;
	};
	formIsValid: boolean;
}

interface UpdateAction {
	type: 'UPDATE_INPUT';
	payload: {
		text: string;
		name: string;
		isValid: boolean;
	};
}

interface ClearAction {
	type: 'CLEAR_FORM';
	payload: FormState;
}

type FormActions = UpdateAction | ClearAction;

const formIsValid = (state: FormState) =>
	Object.values(state.inputValidities).indexOf(false) === -1;

const formReducer = (state: FormState, action: FormActions): FormState => {
	switch (action.type) {
		case 'UPDATE_INPUT':
			const updatedState: FormState = { ...state };
			const name = action.payload.name;
			updatedState.inputValues[name] = action.payload.text;
			updatedState.inputValidities[name] = action.payload.isValid;
			updatedState.formIsValid = formIsValid(state);
			return updatedState;
		case 'CLEAR_FORM':
			return action.payload;

		default:
			return state;
	}
};

export function useFormReducer(
	inputFields: Omit<BeInputProps, 'onInput'>[],
	initialValidity: boolean
): [FormState, React.Dispatch<FormActions>, FormState] {
	const initialState = inputFields.reduce(
		(initialState, field) => {
			const { name, initialValue, initialValidity } = field;
			return {
				inputValues: {
					...initialState.inputValues,
					[name]: initialValue || '',
				},
				inputValidities: {
					...initialState.inputValidities,
					[name]:
						initialValidity === undefined ? true : initialValidity,
				},
				formIsValid: initialState.formIsValid,
			};
		},
		{
			inputValues: {},
			inputValidities: {},
			formIsValid: initialValidity,
		}
	);
	const [formState, formDispatch] = useReducer(formReducer, initialState);
	return [formState, formDispatch, initialState];
}
