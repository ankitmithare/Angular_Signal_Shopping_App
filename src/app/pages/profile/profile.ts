import { Component, ChangeDetectionStrategy, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { LucideAngularModule, Mail, Phone, User, MapPin } from "lucide-angular";
import { profileFeature } from "./store/profile-feature";
import { toSignal } from "@angular/core/rxjs-interop";
import { ProfileActions } from "./store/profile-action";
import { authFeatures } from "../../shared/store/auth-feature";
import { MyStorage } from "../../shared/services/storage";

@Component({
    selector: "app-profile",
    imports: [LucideAngularModule],
    template: `
<div class="py-10 max-w-5xl mx-auto">
  <h1 class="text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">My Profile</h1>

  @if (loading()) {
    <p class="text-lg text-slate-600 animate-pulse">Loading profile...</p>
  } @else if (profile()) {
    @let userProfile = profile();

    <div class="grid gap-8 md:grid-cols-3">

      <!-- Profile Card -->
      <div class="md:col-span-1">
        <div class="bg-white rounded-2xl shadow-lg p-8 text-center border border-slate-100">
          <div class="size-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <span class="text-3xl font-bold text-white uppercase">
              {{ userProfile?.name!.firstname[0] }}{{ userProfile?.name!.lastname[0] }}
            </span>
          </div>

          <h2 class="text-xl font-semibold text-slate-900 capitalize">
            {{ userProfile?.name!.firstname }} {{ userProfile?.name!.lastname }}
          </h2>
          <p class="text-slate-500 mt-1 text-sm">@{{ userProfile?.username }}</p>
        </div>
      </div>

      <!-- Details Section -->
      <div class="md:col-span-2 space-y-8">

        <!-- Contact Information -->
        <div class="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <h3 class="text-xl font-semibold text-slate-900 mb-6">Contact Information</h3>

          <div class="space-y-5">

            <!-- Email -->
            <div class="flex items-center gap-4">
              <div class="size-14 rounded-xl bg-indigo-100 flex items-center justify-center shadow-sm">
                <lucide-icon [img]="icons.Mail" class="size-6 text-indigo-600"></lucide-icon>
              </div>
              <div class="flex flex-col leading-[0.25]">
                <p class="text-sm text-slate-500">Email</p>
                <p class="font-medium text-slate-900">{{ userProfile?.email }}</p>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex items-center gap-4">
              <div class="size-14 rounded-xl bg-green-100 flex items-center justify-center shadow-sm">
                <lucide-icon [img]="icons.Phone" class="size-6 text-green-600"></lucide-icon>
              </div>
              <div class="flex flex-col leading-[0.25]">
                <p class="text-sm text-slate-500">Phone</p>
                <p class="font-medium text-slate-900">{{ userProfile?.phone }}</p>
              </div>
            </div>

            <!-- Username -->
            <div class="flex items-center gap-4">
              <div class="size-14 rounded-xl bg-amber-100 flex items-center justify-center shadow-sm">
                <lucide-icon [img]="icons.User" class="size-6 text-amber-600"></lucide-icon>
              </div>
              <div class="flex flex-col leading-[0.25]">
                <p class="text-sm text-slate-500">Username</p>
                <p class="font-medium text-slate-900">{{ userProfile?.username }}</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Address Section -->
        <div class="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <h3 class="text-xl font-semibold text-slate-900 mb-6">Address</h3>
           <div class="space-y-2">
              <div class="flex items-center gap-4">
                <div class="size-14 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 shadow-sm">
                  <lucide-icon [img]="icons.MapPin" class="size-6 text-rose-600"></lucide-icon>
                </div>
                <div class="flex flex-col leading-[0.25]">
                  <p class="font-medium text-slate-900 capitalize">{{ userProfile?.address?.street }}</p>
                  <p class="font-medium text-slate-500 capitalize">{{ userProfile?.address?.city }}, {{ userProfile?.address?.zipcode }}</p>
                </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  }
</div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Profile implements OnInit {
    protected readonly icons = { Mail, Phone, User, MapPin };
    private readonly store = inject(Store);
    private readonly storage = inject(MyStorage);
    protected readonly profile = toSignal(this.store.select(profileFeature.selectProfile));
    protected readonly loading = toSignal(this.store.select(profileFeature.selectLoading));
    protected readonly UserId = toSignal(this.store.select(authFeatures.selectUserId));

    ngOnInit(): void {  
        const userId = this.UserId() || this.storage.getUserId();
        if(userId) {
          this.store.dispatch(ProfileActions.load({ userId }));
        }
    }
}