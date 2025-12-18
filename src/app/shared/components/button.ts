import { Component, computed, input } from "@angular/core";

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'link' | 'ghost' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500',
    link: 'bg-transparent text-slate-900 underline-offset-4 hover:underline focus:ring-slate-500',
    ghost: 'bg-transparent text-slate-900 hover:bg-slate-100 focus:ring-slate-500',
    icon: 'bg-transparent text-slate-900 hover:bg-slate-100 focus:ring-slate-500'  
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 h-8 text-sm',
    md: 'px-4 h-10 text-sm',
    lg: 'px-6 h-12 text-base'
};

const iconSizeClasses: Record<ButtonSize, string> = {
    sm: 'size-8',
    md: 'size-10',
    lg: 'size-12'
};

@Component({
    selector: 'button[appButton], a[appButton]',
    standalone: true,
    template: `<ng-content></ng-content>`,
    host: {
    '[class]': 'hostClasses()',
    '[attr.disabled]': 'disabled() || null',
    '[attr.aria-disabled]': 'disabled() || null'
  }
})
export class ButtonComponent {
    readonly variant = input<ButtonVariant>('primary');
    readonly size = input<ButtonSize>('md');
    readonly disabled = input<boolean>(false);

    protected readonly hostClasses = computed(() => {
        const base = 'inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white dark:ring-offset-slate-900';
        const variantClass = variantClasses[this.variant()];
        const sizeClass = this.variant() === 'icon'
            ? iconSizeClasses[this.size()]
            : sizeClasses[this.size()];
        return `${base} ${variantClass} ${sizeClass}`;
    })
}