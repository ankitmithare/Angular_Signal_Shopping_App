import { Component, computed, input } from "@angular/core";
import { FieldState } from "@angular/forms/signals";

@Component({
    selector: "app-form-error",
    template: `
    @if(shouldShowErrors()) {
        @for(error of control().errors(); track error.kind) {
            <small class="text-sm text-red-500 mt-1">{{ error.message }}</small>
        }
    }
    `,
    standalone: true
})
export class FormError {
    readonly control = input.required<FieldState<unknown>>();
    protected readonly shouldShowErrors = computed(() =>{
        const field = this.control();
        return !field.valid() && field.touched()
    });
}