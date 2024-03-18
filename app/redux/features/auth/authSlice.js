"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleLoginFormSubmit } from "@/app/server-actions/loginAction";
import { logoutService } from "@/app/services/logoutService";

// Get user from localStorage
let user = null;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
  console.log("we are running on the client");
} else {
  console.log("we are running on the server");
}

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// // Register user
// export const register = createAsyncThunk(
//   "auth/register",
//   async (user, thunkAPI) => {
//     try {
//       return await authService.register(user);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      return await handleLoginFormSubmit(formData);
    } catch (error) {
      //   const message =
      //     (error.response &&
      //       error.response.data &&
      //       error.response.data.message) ||
      //     error.message ||
      //     error.toString();
      const message = "Something went wrong!";

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await logoutService();
  } catch (error) {
    const message = "Something went wrong!";

    // toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //   .addCase(register.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(register.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.isSuccess = true;
      //     state.user = action.payload;
      //   })
      //   .addCase(register.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.isError = true;
      //     state.message = action.payload;
      //     state.user = null;
      //   })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
