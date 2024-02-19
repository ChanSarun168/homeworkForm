import * as yup from "yup"

yup.addMethod(yup.mixed, "fileSize", function (maxSize, message) {
  return this.test("fileSize", message, function (value) {
    const { path, createError } = this;

    if (value && value.size && value.size > maxSize) {
      return createError({
        path,
        message,
      });
    }
    return true;
  });
});

const userSchema = yup.object().shape({
    id : yup.number().required(),
    name: yup.string().required().min(3).max(25),
    profile: yup
      .mixed()
      .required("A File is Required")
      .fileSize(1024 * 1024, "File size must be less than 1MB"),
  });

export {userSchema}

