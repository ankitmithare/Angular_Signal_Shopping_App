import { Component } from "@angular/core";
import { Github, LucideAngularModule, Twitter } from "lucide-angular";

@Component({
    selector: "app-footer",
    imports: [LucideAngularModule],
    template: `
<div
  class="w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8
         bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
         text-slate-400 border-t border-slate-700 mt-auto"
>
  <div
    class="max-w-7xl mx-auto
           flex flex-col gap-6
           sm:gap-8
           lg:flex-row lg:items-center lg:justify-between"
  >

    <!-- Social Icons -->
    <div class="flex justify-center lg:justify-start gap-4 order-1">
      <a
        href="#"
        aria-label="GitHub"
        class="group p-3 rounded-lg
               hover:bg-slate-700/50
               transition-all duration-300"
      >
        <lucide-icon
          [img]="icons.Github"
          class="size-5 sm:size-6 group-hover:scale-110"
        ></lucide-icon>
      </a>

      <a
        href="#"
        aria-label="Twitter"
        class="group p-3 rounded-lg
               hover:bg-slate-700/50
               transition-all duration-300"
      >
        <lucide-icon
          [img]="icons.Twitter"
          class="size-5 sm:size-6 group-hover:scale-110"
        ></lucide-icon>
      </a>
    </div>

    <!-- Navigation -->
    <nav
      aria-label="Footer navigation"
      class="order-3 lg:order-2"
    >
      <ul
        class="flex flex-wrap justify-center gap-x-6 gap-y-3
               text-sm font-medium"
      >
        <li>
          <a
            href="#"
            class="hover:text-white transition hover:underline underline-offset-4"
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <a
            href="#"
            class="hover:text-white transition hover:underline underline-offset-4"
          >
            Terms of Service
          </a>
        </li>
        <li>
          <a
            href="#"
            class="hover:text-white transition hover:underline underline-offset-4"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>

    <!-- Copyright -->
    <p class="text-center lg:text-left
             text-xs sm:text-sm font-medium
             order-2 lg:order-1">
      &copy; 2026 FakeStore. All rights reserved.
    </p>

  </div>
</div>
  `,
})
export class Footer{
  protected readonly icons = { Github, Twitter };
}