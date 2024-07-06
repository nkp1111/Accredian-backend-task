const router = require("express").Router({ mergeParams: true });
const {
  createNewRefer,
  getRefers,
} = require("../controller/refer");

router.route("/").get(getRefers).post(createNewRefer);


module.exports = router;