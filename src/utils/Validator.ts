type validationCallback = {
	callback: (value: string) => boolean,
	error: string
}

type conditionsObject = {
	[name: string]: validationCallback
}

export const VALIDATION_RULES: conditionsObject = {

	first_name:{
		callback: (value: string) => /^[A-ZА-ЯЁ-]+$/i.test(value),
		error: 'Укажите верно своё имя'
	},

	second_name: {
		callback: (value: string) => /^[A-ZА-ЯЁ-]+$/i.test(value),
		error: 'Укажите верно свою фамилию'
	},


	login: {
		callback: (value: string) => /^[a-z0-9_-]{3,20}$/i.test(value),
		error: 'Недопустимый логин'
	},

	email: {
		callback: (value: string) => /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value),
		error: 'Недопустимый email'
	},

	phone: {
		callback: (value: string) => /^\+?[0-9\(\)-]{10,15}$/.test(value),
		error: 'Номер телефона может содержать цифры, скобки, пробелы и знак -'
	},

	password: {
		callback: (value: string) => /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value),
		error: 'Пароль должен содержать только буквы латинского алфавита, хотя бы одну цифру, одну строчную и одну прописную букву'
	}
}

export default class Validator {
	initFieldListener(inputElement: HTMLInputElement) {
		inputElement.addEventListener('focus', () => this.resetFieldError(inputElement));
		inputElement.addEventListener('blur', () => this.validateField(inputElement));
	}

	validateForm(form: HTMLFormElement){
		const formFields = form.querySelectorAll("input");
		let result = true;
		if (formFields.length > 0) {
			formFields.forEach( field => {
				if (!this.validateField(field)){
					result = false;
				};
			});
		}

		return result;
	}

	validateField(inputElement: HTMLInputElement) {
		const validateRules = inputElement.dataset.validateRules?.split(",");
		const inputValue = inputElement.value;
		let result = true;

		if (validateRules && validateRules.length > 0) {
			validateRules.forEach( rule => {
				if (VALIDATION_RULES[rule]) {
					const isValidate = VALIDATION_RULES[rule].callback(inputValue);
					if (!isValidate) {
						result = false;
						this.addErrorMsg(inputElement, VALIDATION_RULES[rule].error);
					}
				}
			});
		}

		return result;
	}

	addErrorMsg(inputElement: HTMLInputElement, message: string = "") {
		inputElement.classList.add("error");
		if (message) {
			inputElement.parentElement?.insertAdjacentHTML("beforeend", `<span class="error-message">${message}</span>`);
		}
	}

	resetFieldError(inputElement: HTMLInputElement) {
		inputElement.classList.remove("error");

		const errorMsgSpan = inputElement.parentElement?.querySelector(".error-message");
		if (errorMsgSpan) {
			errorMsgSpan.remove();
		}
	}
}
