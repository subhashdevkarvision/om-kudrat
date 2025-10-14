export const validateFields = (fileds) => {
  return (req, res, next) => {
    const missings = fileds.filter((f) => !req.body[f]);

    if (missings.length > 0) {
      return res.status(400).json({
        success: false,
        message: `missing required fields:${missings.join(", ")}`,
      });
    }
    next();
  };
};

export const validateParams = (params) => {
  return (req, res, next) => {
    const missings = params.filter((p) => !req.params[p]);
    if (missingParams.length > 0) {
      return res.status(400).json({
        success: false,
        message: `missing required params:${missingParams.join(", ")}`,
      });
    }
    next();
  };
};
