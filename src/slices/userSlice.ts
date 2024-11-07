import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

interface User {
  id: number;
  username: string;
}

interface IInitialState {
  isAuth: boolean;
  error: null | string;
  isLoading: boolean;
  user: null | User;
  orders: any;
  ordersIsLoading: boolean;
  ordersError: boolean;
}

const initialState: IInitialState = {
  isAuth: false,
  error: null,
  isLoading: false,
  user: null,
  orders: [],
  ordersIsLoading: false,
  ordersError: false,
};

export const loginUser = createAsyncThunk<User, any>(
  "user/loginUser",
  async (userData) => {
    const { request } = useHttp();
    return request({
      url: "https://furniture-shop-teal.vercel.app/api/login",
      method: "POST",
      body: userData,
    });
  }
);

export const registerUser = createAsyncThunk<User, any>(
  "user/registerUser",
  async (userData) => {
    const { request } = useHttp();
    return request({
      url: "https://furniture-shop-teal.vercel.app/api/register",
      method: "POST",
      body: userData,
    });
  }
);

export const fetchUserOrders = createAsyncThunk(
  "user/fetchUserOrders",
  async (_, { getState }: any) => {
    const state = getState();
    const userId = state.user?.user?.id;
    const { request } = useHttp();
    return request({
      url: `https://furniture-shop-teal.vercel.app/api/orders?userId=${userId}`,
    });
  }
);

export const loadUserFromLocalStorage = createAsyncThunk(
  "user/loadUserFromLocalStorage",
  async (_, { dispatch }) => {
    const usernameFromLocalStorage = localStorage.getItem("user");
    if (usernameFromLocalStorage) {
      dispatch(setUserFromLocalStorage(JSON.parse(usernameFromLocalStorage)));
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFromLocalStorage: (state, action: PayloadAction<User>) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    logOut: (state) => {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isAuth = true;
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuth = false;
      state.isLoading = false;
      state.user = null;
      state.error = action.error.message || "Login failed";
    });
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isAuth = true;
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isAuth = false;
      state.isLoading = false;
      state.user = null;
      state.error = action.error.message || "Registration failed";
    });
    builder.addCase(fetchUserOrders.pending, (state) => {
      state.ordersIsLoading = true;
      state.orders = [];
      state.ordersError = false;
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.ordersIsLoading = false;
      state.orders = action.payload;
      state.ordersError = false;
    });
    builder.addCase(fetchUserOrders.rejected, (state) => {
      state.orders = null;
      state.ordersIsLoading = false;
      state.ordersError = true;
    });
  },
});

export const { logOut, setUserFromLocalStorage, clearError } =
  userSlice.actions;
export default userSlice.reducer;
