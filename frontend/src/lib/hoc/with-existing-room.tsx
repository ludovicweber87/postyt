import { Box, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { ComponentType, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wave from "react-wavify";

const TIMEOUT = 3000;

const getRoomInStorage = (
  roomName?: string,
  roomInStorage?: string | null
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (roomInStorage === roomName) {
        resolve(true);
      } else {
        reject(false);
      }
    }, TIMEOUT);
  });
};

const withExistingRoom = (Component: ComponentType) => {
  return function WithRoom() {
    const { roomName } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);

    const mutation = async () => {
      try {
        setIsLoading(true);
        const data = await getRoomInStorage(
          roomName,
          window.localStorage.getItem("__ATRP")
        );
        setHasAccess(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "La room n'existe pas",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      mutation();
    }, []);

    if (isLoading)
      return (
        <>
          <Box
            h="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing="8">
              <Text fontWeight="bold" fontSize="xl">
                Chargement en cours ...
              </Text>
              <Spinner size="xl" />
            </VStack>
          </Box>
          <Box position="absolute" bottom="-10" w="100%">
            <Wave
              fill="orange"
              paused={false}
              options={{
                height: 50,
                amplitude: 30,
                speed: 0.25,
                points: 3,
              }}
            />
          </Box>
        </>
      );

    if (hasAccess) return <Component />;

    return <Component />;
  };
};

export default withExistingRoom;
