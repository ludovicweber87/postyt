import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import createRoom from "@postyt/lib/queries/room/create-room";
import joinRoom from "@postyt/lib/queries/room/join-room";
import { InstanceError } from "@postyt/lib/types";
import createRoomFormSchema from "@postyt/lib/validator-form/create-room-form-schema";
import { Field, Formik } from "formik";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

type MainFormPageProps = {
  type: "create-room" | "join-room";
};

function MainFormPage({ type }: MainFormPageProps) {
  const toast = useToast();
  const navigate = useNavigate();

  const { mutate: createRoomMutation, isLoading: isCreateMutationLoading } =
    useMutation(createRoom, {
      onError: ({ response }: InstanceError) => {
        const { message } = response.data;
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
      onSuccess: ({ data }) => {
        navigate(`/room/${data.roomName}`);
        window.localStorage.setItem("__ATRP", data.roomName);
      },
    });

  const { mutate: joinRoomMutation, isLoading: isJoinMutationLoading } =
    useMutation(joinRoom, {
      onError: ({ response }: InstanceError) => {
        const message = response.data.message;
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
      onSuccess: ({ data }) => {
        window.localStorage.setItem("__ATRP", data.roomName);
        navigate(`/room/${data.roomName}`);
      },
    });

  return (
    <>
      <Flex bg="gray.900" align="center" justify="center" h="100vh">
        <VStack spacing="10">
          <Image src="logo.png" h="100px" />
          <Box bg="white" p={6} rounded="md" w={300}>
            <Formik
              initialValues={{
                firstName: "",
                roomName: "",
                password: "",
              }}
              validationSchema={createRoomFormSchema}
              onSubmit={({ roomName, password, firstName }) => {
                type === "create-room"
                  ? createRoomMutation({
                      roomName,
                      createdBy: firstName,
                      password,
                    })
                  : joinRoomMutation({
                      roomName,
                      password,
                    });
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl
                      isInvalid={!!errors.firstName && touched.firstName}
                    >
                      <FormLabel htmlFor="firstName">
                        Nom d'utilisateur
                      </FormLabel>
                      <Field
                        autoComplete="off"
                        as={Input}
                        id="firstName"
                        name="firstName"
                        type="firstName"
                        variant="filled"
                      />
                      <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.roomName && touched.roomName}
                    >
                      <FormLabel htmlFor="roomName">Nom de la room</FormLabel>
                      <Field
                        autoComplete="off"
                        as={Input}
                        id="roomName"
                        name="roomName"
                        type="roomName"
                        variant="filled"
                      />
                      <FormErrorMessage>{errors.roomName}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor="password">Mot de passe</FormLabel>
                      <Field
                        autoComplete="off"
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <Button
                      type="submit"
                      colorScheme="orange"
                      width="full"
                      isLoading={
                        type === "create-room"
                          ? isCreateMutationLoading
                          : isJoinMutationLoading
                      }
                    >
                      {type === "create-room"
                        ? "Créer une room"
                        : "Rejoindre la room"}
                    </Button>

                    <Button
                      colorScheme="orange"
                      w="100%"
                      display="flex"
                      justifyContent="center"
                      fontWeight="bold"
                      variant="ghost"
                      size="sm"
                    >
                      <Link to={type === "create-room" ? "/join-room" : "/"}>
                        {type === "join-room"
                          ? "Créer une room"
                          : "Rejoindre une room"}
                      </Link>
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </Box>
        </VStack>
      </Flex>
    </>
  );
}

export default MainFormPage;
