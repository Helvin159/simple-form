const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';

	const small = formControl.querySelector('small');
	small.innerText = message;
};

const showSuccess = (input, message) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';

	const small = formControl.querySelector('small');
	small.innerText = message;
};

const checkEmail = (input) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value)) {
		showSuccess(input);
	} else {
		showError(input, 'Email is invalid');
	}
};

const checkRequired = (inputArr) => {
	inputArr.forEach((i) => {
		if (i.value.trim() === '') {
			showError(i, `${getFieldName(i)} is required`);
		} else {
			showSuccess(i);
		}
	});
};

const checkInputLength = (input, min, max) => {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		);
	} else if (input.value.legnth > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		);
	} else {
		showSuccess(input);
	}
};

const checkPasswordMatch = (input1, input2) => {
	input1.value !== input2.value && showError(input2, 'Passwords do not match');
};

const getFieldName = (input) => {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	checkRequired([userName, email, password, password2]);
	checkInputLength(username, 3, 15);
	checkInputLength(password, 8, 20);
	checkEmail(email);
	checkPasswordMatch(password, password2);
});
