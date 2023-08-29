import * as Yup from "yup";

const createRoomFormSchema = Yup.object().shape({
  firstName: Yup.string().required("Le nom est obligatoire"),
  roomName: Yup.string().required("Le nom de la room est obligatoire"),
  password: Yup.string()
    .required("Le mot de passe est obligatore")
    .min(6, "Le mot de passe doit être supérieur à 6")
    .max(20, "Le mot de passe doit être inférieur à 20"),
});

export default createRoomFormSchema;
