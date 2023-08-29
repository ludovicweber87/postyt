import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  faCheck,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import deleteRoom from "@postyt/lib/queries/room/delete-room";
import { useEditor } from "@tldraw/tldraw";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const Topbar = () => {
  const [gridMode, setGridMode] = useState(false);
  const { roomName } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const navigate = useNavigate();
  const editor = useEditor();

  const { mutate, isLoading } = useMutation(deleteRoom, {
    onSuccess: () => {
      navigate("/");
      window.localStorage.removeItem("__ATRP");
    },
  });

  useEffect(() => {
    editor.setGridMode(true);
    setGridMode(true);
  }, [editor]);

  return (
    <>
      <Menu closeOnSelect={false}>
        <MenuButton
          position="absolute"
          top="5px"
          left="5px"
          pointerEvents="all"
          px={4}
          py={2}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: "gray.300" }}
          _expanded={{ bg: "gray.300" }}
          _focus={{ boxShadow: "outline" }}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </MenuButton>
        <MenuList>
          <MenuItem
            pointerEvents="all"
            onClick={() => {
              editor.setGridMode(!gridMode);
              setGridMode(!gridMode);
            }}
          >
            <HStack w="100%" justifyContent="space-between">
              <Text>Afficher la grille</Text>
              {gridMode && <FontAwesomeIcon icon={faCheck} color="gray" />}
            </HStack>
          </MenuItem>
          <MenuItem pointerEvents="all">Toujours aligner</MenuItem>
          <MenuDivider />
          <MenuItem pointerEvents="all">Open...</MenuItem>
          <MenuItem pointerEvents="all" onClick={onOpen}>
            <HStack color="red">
              <FontAwesomeIcon icon={faTrash} />
              <Text>Supprimer la room</Text>
            </HStack>
          </MenuItem>
        </MenuList>
      </Menu>
      <Box
        position="absolute"
        top="20px"
        right="20px"
        zIndex="400"
        pointerEvents="all"
      >
        <AvatarGroup size="sm">
          <Avatar bg="orange" name="Ryan Florence">
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Avatar bg="orange" name="Ryan Florence">
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </AvatarGroup>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Quitter la room
            </AlertDialogHeader>

            <AlertDialogBody>
              Êtes-vous sûr de vouloir quitter la room ? Si vous êtes le dernier
              à quitter la room, celle-ci sera supprimée.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Non
              </Button>
              <Button
                isLoading={isLoading}
                colorScheme="red"
                onClick={() => {
                  mutate({ roomName: roomName as string });
                }}
                ml={3}
              >
                Oui
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Topbar;
