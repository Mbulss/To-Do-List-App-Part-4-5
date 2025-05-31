import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isLoggedOut: user ? false : true,
    message: ""
}

// signin user
export const signin = createAsyncThunk('auth/signin', async (user, thunkAPI) => {
    try {
        return await authService.signin(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// logout user
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        return await authService.logout()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// signup user
export const signup = createAsyncThunk('auth/signup', async (user, thunkAPI) => {
    try {
        return await authService.signup(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// activate email
export const activateEmail = createAsyncThunk('auth/activateEmail', async (token, thunkAPI) => {
    try {
        return await authService.activateEmail(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get user info
export const getUserInfo = createAsyncThunk('auth/getUserInfo', async (_, thunkAPI) => {
    try {
        const token = JSON.parse(localStorage.getItem('user'))?.refresh_token;
        if (!token) {
            // If no token, user is not logged in, no need to fetch info
            return thunkAPI.rejectWithValue("No token found, user not logged in");
        }
        return await authService.getUserInfo()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.user = null
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            // signin builder
            .addCase(signin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isLoggedOut = false
                state.user = action.payload
            })
            .addCase(signin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // logout builder
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.isLoggedOut = true
            })
            // signup builder
            .addCase(signup.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message; // Assuming backend sends a message
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // activate email builder
            .addCase(activateEmail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(activateEmail.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message; // Assuming backend sends a message
            })
            .addCase(activateEmail.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // get user info builder
            .addCase(getUserInfo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // Update the user state with fetched info, but keep existing user object if it has more info
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true;
                // Do not clear user on getUserInfo rejection, as it might be a token issue, not necessarily logged out
                // state.user = null;
                state.message = action.payload
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer