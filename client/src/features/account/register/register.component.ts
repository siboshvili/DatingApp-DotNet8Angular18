import {Component, inject, input, OnInit, output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {RegisterCreds, User} from '../../../types/user'
import {AccountService} from '../../../core/services/account.service';
import {JsonPipe} from "@angular/common";
import {TextInputComponent} from '../../../shared/text-input/text-input.component';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, JsonPipe, TextInputComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
    private accountService = inject(AccountService);
    membersFromHome = input.required<User[]>();
    cancelRegister = output<boolean>();
    protected creds = {} as RegisterCreds;
    protected registerForm: FormGroup = new FormGroup({});

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.registerForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            displayName: new FormControl('', [Validators.required]),
            password: new FormControl('', [
                Validators.required, 
                Validators.minLength(4), 
                Validators.maxLength(8)]),
            confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
        });
        this.registerForm.controls['password'].valueChanges.subscribe(() => {
            this.registerForm.controls['confirmPassword'].updateValueAndValidity();
        });
    }

    matchValues(matchTo: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const parent = control.parent;
            if (!parent) return null;

            const matchValue = parent.get(matchTo)?.value;
            return control.value === matchValue ? null : { passwordMismatch: true }
        }
    }

    register() {
        console.log(this.registerForm.value);
        // this.accountService.register(this.creds).subscribe({
        //     next: response => {
        //         console.log(response)
        //         this.cancel()
        //     },
        //     error: error => console.log(error)
        // })
    }

    cancel() {
        this.cancelRegister.emit(false);
    }
}
