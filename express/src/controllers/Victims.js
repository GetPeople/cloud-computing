import Victim from "../models/victimModel.js";

export const getVictim = async(req, res) => {
  try {
    const victims = await Victim.findAll();
    res.json(victims);
  } catch (error) {
    console.log(error);
  }
}

export const addVictim = async(req, res, next) => {
  const file = req.file;
  console.log(file);
  try {
    
    const data = {
      photoUrl: req.file.path,
      posko: req.body.posko,
      contact: req.body.contact,
      name: req.body.name,
      gender: req.body.gender,
      birthPlace: req.body.birthPlace,
      birthDate: req.body.birthDate,
      momName: req.body.momName,
      nik: req.body.nik,
    }

    await Victim.create(data);
    res.json({
      status: "success",
      message: "Data korban berhasil ditambahkan"
    })
  } catch (error) {
    console.log(error);
  }
}