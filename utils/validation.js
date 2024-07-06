const { z } = require("zod");

exports.RefZodSchema = z.object({
  referrer: z.string().email("Referrer email is invalid"),
  referee: z.string().email("Referee email is invalid"),
  program: z.string().min(1, "Program name is not proper"),
});
