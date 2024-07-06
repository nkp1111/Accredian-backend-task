const {
  ReasonPhrases,
  StatusCodes,
} = require("http-status-codes");

const prisma = require("../utils/prisma")

const { validationErrorMessage } = require("../utils/validation-message");
const { RefZodSchema } = require("../utils/validation");



/**
 * @desc create new refer
 * @method POST /api/ref
 * @returns 
 */
exports.createNewRefer = async (req, res, next) => {
  try {
    // validate user inputs
    const { error, data: parsedData } = RefZodSchema.safeParse(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: validationErrorMessage(error) });
    }

    // check if the user has already been referred
    const alreadyReferred = await prisma.refer.findMany({
      where: parsedData
    });

    if (alreadyReferred.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "You have already referred this user." });
    }

    const refer = await prisma.refer.create({
      data: parsedData
    });

    return res.status(StatusCodes.OK).json({ success: "Refer successfully done." });
  } catch (error) {
    console.error("Error in createNewRefer:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * @desc get refs
 * @method GET /api/ref
 * @returns 
 */
exports.getRefers = async (req, res, next) => {
  try {
    const refers = await prisma.refer.findMany();
    return res.status(StatusCodes.OK).json({ refers });
  } catch (error) {
    console.error("Error in getRefs:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  } finally {
    await prisma.$disconnect();
  }
}
