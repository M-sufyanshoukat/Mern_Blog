import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters"],
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isEditor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: function () {
        const isAdminEmail =
          this.email === "sufyanshoukat2122@gmail.com" ||
          this.email === "sufyanshoukat4548@gmail.com";
        return isAdminEmail;
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
