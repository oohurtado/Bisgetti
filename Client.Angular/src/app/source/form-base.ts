import { FormGroup } from "@angular/forms";

export abstract class FormBase {

    _myForm!: FormGroup;
    _error!: string;
    _isProcessing!: boolean;
    _isLoading!: boolean;

    isFormValid() {
        if (this._myForm?.invalid || this._myForm?.status === "INVALID" || this._myForm?.status === "PENDING") {
            Object.values(this._myForm.controls)
                .forEach(control => {
                    control.markAsTouched();
                });

            return false;
        }

        return true;
    }

    hasError(nameField: string, errorCode: string) {
        return this._myForm?.get(nameField)?.hasError(errorCode) && this._myForm?.get(nameField)?.touched;
    }

    abstract setupFormAsync(): void;
}