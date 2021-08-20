const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const User = new Schema({
  username: { type: String, required: [true, "Username is required"], minLength: 3, unique: true },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: true, minLength: 6 },
  firstname: { type: String, required: true },
  secondname: { type: String, required: true },
  profilePic: { type: String, default: "" },
  desc: { type: String, default: "" },
  age: { type: Number, required: true },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true })

User.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

User.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
}

User.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(15).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

module.exports = model("User", User)