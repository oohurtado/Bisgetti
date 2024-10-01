import { FormGroup } from "@angular/forms";

export abstract class FormBase {

    _myForm!: FormGroup;
    _isProcessing!: boolean;
    _isLoading!: boolean;
    _error: string|null = null;
    
    constructor() {
        this._error = null!;
        this._isLoading = false;
    }

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