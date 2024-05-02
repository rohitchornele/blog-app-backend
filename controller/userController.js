import { User } from "../models/userModels.js";

export const createUser = async (req, res) => {
  try {
    const { fullName, email, password, avatar } = req.body;

    if ([fullName, email, password].some((field) => field?.trim() === "")) {
      throw new Error(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email: email });

    if (existedUser) {
      throw new Error(409, "User with email or username already exist");
    }

    // let avatarLocalPath;

    // if (
    //   req.files &&
    //   Array.isArray(req.files.avatar) &&
    //   req.files.avatar.length > 0
    // ) {
    //   avatarLocalPath = req.files.avatar[0].path;
    // }

    // const avatar = await uploadOnCloudinary(avatarLocalPath);

    const user = await User.create({
      fullName,
      email,
      password,
      avatar,
      // avatar: avatar?.url || "",
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      throw new Error(500, "Something went wrong while registering user");
    }

    return res
      .status(200)
      .json({ msg: "Successfully registered", createdUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
