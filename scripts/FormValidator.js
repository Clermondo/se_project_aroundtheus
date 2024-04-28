class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._modalBtnSubmit = settings.modalBtnSubmit;
    this._form = formEl;
    this._input = inputEl;
  }

  _setEventListeners() {
    const inputEls = this_form.querySelectorAll(this._inputSelector);
    const submitButton = this._form.querySelector(this._modalBtnSubmit);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._form, inputEl, options);
        checkFormValidity(inputEls, submitButton, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  _checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
      this._showInputError(formEl, inputEl, options);
    } else {
      this._hideInputError(formEl, inputEl, options);
    }
  }

  _checkFormValidity(inputEls) {
    return Array.from(inputEls).every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    // const inputEls = this._inputEls;
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    const isFormValid = checkFormValidity(inputEls);
    if (isFormValid) {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = false;
    } else {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
    }
  }

  _showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }

  _hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    //setEventListeners();
  }
}
