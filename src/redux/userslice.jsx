import { createSlice, current } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "User", // Default username
    roll_no: "", // Default roll number
    role: "Guest-User", // Default role
    roles: "",
    choosenRole: "NULL",
    accessibleModules: {}, // Ensure it is always an object
    currentAccessibleModules: {}, // Ensure it is always an object
    programme: "",
  },
  reducers: {
    // Set the username
    setUserName: (state, action) => {
      state.username = action.payload;
      console.log("setUserName", action.payload);
    },

    // Set the roll number
    setRollNo: (state, action) => {
      console.log("in the roll part ", action.payload);
      state.roll_no = action.payload;
    },

    // Set the user's current role
    setRole: (state, action) => {
      state.role = action.payload;
      console.log("in the role part ", action.payload);
      console.log(
        "Accessible Modules before update:",
        current(state.accessibleModules),
      );
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
      console.log("in the role part ", action.payload);
    },
    setchoosenRole: (state, action) => {
      state.choosenRole = action.payload;
      console.log("in the choosenRole part ", action.payload);
    },

    // Set accessible modules based on roles
    setAccessibleModules: (state, action) => {
      console.log("in the accessible part ", action.payload);
      // Assuming the payload is an array of modules for the current role
      state.accessibleModules = {
        [state.role]: action.payload,
      };
    },

    // Set the current accessible modules based on the current role
    setCurrentAccessibleModules: (state) => {
      state.currentAccessibleModules = state.accessibleModules;
    },
    // set the programme for login member
    setProgramme: (state, action) => {
      state.programme = action.payload;
      console.log(
        "testing the value of programme in userslice",
        action.payload,
      );
    },
    // Clear the username (e.g., on logout)
    clearUserName: (state) => {
      state.username = "User";
    },

    // Clear roles (e.g., on logout)
    clearRoles: (state) => {
      state.role = "Guest-User"; // Reset role to Guest-User
      state.currentAccessibleModules = {}; // Clear current accessible modules
    },
  },
});

// Export actions
export const {
  setUserName,
  setRollNo,
  setRole,
  setRoles,
  setchoosenRole,
  setAccessibleModules,
  setCurrentAccessibleModules,
  setProgramme,
  clearUserName,
  clearRoles,
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
