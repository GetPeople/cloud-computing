import Victim from "../models/victimModel.js";
import { format } from "util";
import { Storage } from "@google-cloud/storage";
import processFileMiddleware from "../middleware/upload.js";

export const getVictim = async(req, res) => {
  try {
    const victims = await Victim.findAll();
    res.json(victims);
  } catch (error) {
    console.log(error);
  }
}

export const addVictim = async(req, res, next) => {
  
  const storage = new Storage({ keyFilename: process.env.KEYFILE_PATH });
  const bucket = storage.bucket(process.env.CLOUD_BUCKET);

  try {
    await processFileMiddleware(req, res);
    if (!req.file) {
      return res.status(400).send({ message: "Gambar belum ditambahkan!" });
    }
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file('database_wajah/' + req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data) => {
      // Create URL for directly file access via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      try {
        // Make the file public
        await Victim.create({
          image: publicUrl,
          posko: req.body.posko,
          contact: req.body.contact,
          name: req.body.name,
          gender: req.body.gender,
          birthPlace: req.body.birthPlace,
          birthDate: req.body.birthDate,
          momName: req.body.momName,
          nik: req.body.nik,
        });

        try {
          await bucket.file(req.file.originalname).makePublic();
          
        } catch {
          return res.status(500).send({
            message:
            `Upload gambar berhasil: ${req.file.originalname}`,
            url: publicUrl,
            
          })
        }
      } catch (err) {
        return res.status(500).send({
          message: err.message,
        });
      }
      res.status(200).send({
        message: "Upload gambar berhasil: " + req.file.originalname,
        url: publicUrl,
      });
    });


    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).send({
      message: `Gambar gagal diupload: ${req.file.originalname}. ${err}`,
    });
  }
 
}