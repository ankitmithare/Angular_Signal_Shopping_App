import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProfileApi } from "../services/profile-api";
import { map, of, switchMap, catchError } from "rxjs";
import { ProfileActions } from "./profile-action";



export const ProfileEffects = createEffect(
    (actions$ = inject(Actions), profileApi = inject(ProfileApi)) => {
        return actions$.pipe(
            ofType(ProfileActions.load),
            switchMap(({ userId }) => {
                return profileApi.getUserProfile(userId).pipe(
                    map((profile) => ProfileActions.loadSuccess({ profile })),
                    catchError((error) => of(ProfileActions.loadFailure({ error: error.message })))
                );
            })
        );
    },
    {
        functional: true,
    }
)

