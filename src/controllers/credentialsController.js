const { v4: uuidv4 } = require("uuid"); // UUID generator
const { Credential } = require("../models");

const CreateCredential = async (req, res, next) => {
  try {
    const { credentialId, keyId, secretKey } = req.body;
    const credential = await Credential.create({
      credentialId,
      keyId,
      secretKey,
    });
    res.status(200).json({
      success: true,
      message: "Credential created successfully",
      data: credential,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const GetCredential = async (req, res, next) => {
  try {
    const { credentialId } = req.params;
    const credential = await Credential.findOne({
      where: { credentialId },
    });
    if (!credential) {
      return res
        .status(404)
        .json({ success: false, message: "Credential not found" });
    }
    res.status(200).json({
      success: true,
      message: "Credential found successfully",
      data: credential,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const UpdateCredential = async (req, res, next) => {
  try {
    const { credentialId } = req.params;
    const { status } = req.body;
    const credential = await Credential.update(
      { status },
      {
        where: { credentialId },
      }
    );
    if (!credential) {
      return res
        .status(404)
        .json({ success: false, message: "Credential not found" });
    }
    res.status(200).json({
      success: true,
      message: "Credential updated successfully",
      data: credential,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const DeleteCredential = async (req, res, next) => {
  try {
    const { credentialId } = req.params;
    const credential = await Credential.destroy({
      where: { credentialId },
    });
    if (!credential) {
      return res
        .status(404)
        .json({ success: false, message: "Credential not found" });
    }
    res.status(200).json({
      success: true,
      message: "Credential deleted successfully",
      data: credential,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  CreateCredential,
  GetCredential,
  UpdateCredential,
  DeleteCredential,
};
