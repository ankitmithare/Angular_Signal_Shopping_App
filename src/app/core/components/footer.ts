import { Component } from "@angular/core";
import { Github, LucideAngularModule, Twitter } from "lucide-angular";

@Component({
    selector: "app-footer",
    imports: [LucideAngularModule],
    template: `
    <div class="w-full px-6 py-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-400 border-t border-slate-700 mt-auto">
  <div class="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
    <!-- Copyright -->
    <p class="text-sm font-medium order-2 lg:order-1">
      &copy; 2026 FakeStore. All rights reserved.
    </p>

    <!-- Navigation -->
    <nav aria-label="Footer navigation" class="order-3 lg:order-2">
      <ul class="flex items-center gap-8 text-sm font-medium">
        <li>
          <a href="#" class="hover:text-white transition-all duration-300 hover:underline underline-offset-4">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" class="hover:text-white transition-all duration-300 hover:underline underline-offset-4">
            Terms of Service
          </a>
        </li>
        <li>
          <a href="#" class="hover:text-white transition-all duration-300 hover:underline underline-offset-4">
            Contact
          </a>
        </li>
      </ul>
    </nav>

    <!-- Social Icons -->
    <div class="flex items-center gap-4 order-1 lg:order-3">
      <a href="#" aria-label="GitHub" class="group hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-slate-700/50">
        <lucide-icon [img]="icons.Github" class="size-6 group-hover:scale-110"></lucide-icon>
      </a>
      <a href="#" aria-label="Twitter" class="group hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-slate-700/50">
        <lucide-icon [img]="icons.Twitter" class="size-6 group-hover:scale-110"></lucide-icon>
      </a>
    </div>
  </div>
</div>
  `,
})
export class Footer{
  protected readonly icons = { Github, Twitter };
}