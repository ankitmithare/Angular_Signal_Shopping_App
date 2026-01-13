import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Registerrequest } from "../services/auth-api";

export const authActions = createActionGroup({
    source: 'Auth',
    events: {
        login: props<{ username: string; password: string }>(),   
        loginSuccess: props<{ token: string, userId: number | null}>(),
        loginFailure: props<{ error: string }>(),
        
        register: props<Registerrequest>(),
        registerSuccess: emptyProps(),
        registerFailure: props<{ error: string }>(),

        logout: emptyProps(),
        logoutsuccess: emptyProps(),
    }
})