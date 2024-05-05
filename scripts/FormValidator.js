class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._modalBtnSubmit = settings.modalBtnSubmit;
    this._form = formEl;
  }

  _setEventListeners() {
    const inputEls = this._form.querySelectorAll(this._inputSelector);
    const submitButton = this._form.querySelector(this._modalBtnSubmit);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(this._form, inputEl);
        this._checkFormValidity(inputEls);
        this._toggleButtonState(inputEls);
      });
    });
  }

  _checkInputValidity(formEl, inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(formEl, inputEl);
    } else {
      this._hideInputError(formEl, inputEl);
    }
  }

  _checkFormValidity(inputEls) {
    return Array.from(inputEls).every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState(inputEls) {
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    const isFormValid = this._checkFormValidity(inputEls);
    if (isFormValid) {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    } else {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    }
  }

  _showInputError(formEl, inputEl) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(formEl, inputEl) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
