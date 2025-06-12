import jwt from "jsonwebtoken";
import sharp from "sharp";
import fs from "node:fs";
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

export const sharpImageResize = async (filename) => {
  const sharpFile = sharp("uploads/" + filename);
  await sharpFile
    .resize({
      height: 900,
      width: 900,
      fit: "cover",
      position: sharp.strategy.attention,
      kernel: "linear",
      withoutEnlargement: true,
    })
    .toFormat("jpg")
    .toFile("uploads/" + filename + ".jpg");
  fs.unlink(import.meta.dirname + "/../../uploads/" + filename, (error) => {
    if (error) console.error(error);
  });
};

export const milesBetweenUsers = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const deltaP = p2 - p1;
  const deltaLon = lon2 - lon1;
  const deltaLambda = (deltaLon * Math.PI) / 180;
  const a =
    Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
    Math.cos(p1) *
      Math.cos(p2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R;
  return d / 1609;
};
