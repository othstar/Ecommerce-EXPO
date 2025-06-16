import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  userData: object;
}

const initialState: userState = {
  userData: {},
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<object>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
