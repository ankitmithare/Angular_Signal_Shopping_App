import { createFeature, createReducer, on } from '@ngrx/store';
import { UserProfile } from '../types/profile-type';
import { ProfileActions } from './profile-action';


export type ProfileState = {
  loading: boolean | null;
  profile: UserProfile | null;
  error: string | null;
};

const initialState: ProfileState = {
  loading: null,
  profile: null,
  error: null,
};

export const profileFeature = createFeature({
  name: 'ProfileReducer',
  reducer: createReducer(
    initialState,
    on(ProfileActions.load, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(ProfileActions.loadSuccess, (state, { profile }) => ({
      ...state,
      loading: false,
      profile,
    })),
    on(ProfileActions.loadFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
});