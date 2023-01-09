import { user } from "../../../prisma";
import bcrypt from "bcryptjs";
import cloud from "../../../utils/cloudinary";

export default async function createUser(req, res) {
  if (req.method !== "POST")
    return res.status(400).send({ message: "Not found" });
  req.body.fullName = `${req.body.firstname} ${req.body.lastname}`
  const {
    isAdmin,
    fullName,
    userName,
    password,
    email,
    profilePicture,
    city,
    country,
  } = req.body;

  delete req.body.cpassword
  delete req.body.lastname
  delete req.body.firstname
  delete req.body["password"];

  if (!fullName || !email || !password)
    return res.status(400).send({ message: "Not enough data" });

  const passwordHashed = await bcrypt.hash(password, 8);

  const upToCloud = await cloud.uploader.upload(profilePicture, {
    folder: "userProfilePictures",
  });

  const jsonProfilePicture = {
    public_id: upToCloud.public_id,
    url: upToCloud.secure_url,
  };

  await user.create({
    data: {
      ...req.body,
      profilePicture: jsonProfilePicture,
      access: {
        create: {
          password: passwordHashed,
        },
      },
    },
  });

  return res.status(200).json({
    ...req.body,
    password: passwordHashed,
    profilePicture: jsonProfilePicture,
  });
}
