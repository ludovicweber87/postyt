import {
  Box,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/react";
import { faPalette, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@tldraw/tldraw";
import { useState } from "react";
import { BUTTONS, COLORS } from "./consts";

const Toolbar = ({ editor }: { editor: Editor }) => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  return (
    <ButtonGroup
      isAttached
      justifyContent="center"
      position="absolute"
      bottom="20px"
      left="0"
      right="0"
      width="fit-content"
      margin="0 auto"
      borderRadius="lg"
      overflow="visible"
    >
      <Box
        zIndex={9999}
        position="absolute"
        bottom="0"
        right="0"
        width="100%"
        height="3px"
        borderRadius="full"
        bgColor={selectedColor}
      />
      {BUTTONS.map(({ tool, toolTip, icon }) => {
        return (
          <Tooltip label={toolTip}>
            <IconButton
              key={tool}
              pointerEvents="all"
              size="lg"
              aria-label={tool}
              onClick={() => {
                if (icon === faUndo) {
                  editor.undo();
                  return;
                }
                editor.setSelectedTool(tool);
              }}
            >
              <FontAwesomeIcon icon={icon} />
            </IconButton>
          </Tooltip>
        );
      })}
      <Tooltip label="Changer de couleur">
        <Menu placement="top" closeOnSelect>
          <IconButton
            as={MenuButton}
            size="lg"
            aria-label="Changer de couleur"
            pointerEvents="all"
            px={4}
            py={2}
            transition="all 0.2s"
          >
            <FontAwesomeIcon icon={faPalette} />
          </IconButton>
          <MenuList border="none">
            <SimpleGrid
              position="relative"
              pointerEvents="all"
              columns={[1, 2, 2]}
              spacing="3"
              placeItems="center"
            >
              {COLORS.map((color) => (
                <IconButton
                  _hover={{ bgColor: color }}
                  minW="20px"
                  maxW="20px"
                  maxH="20px"
                  minH="20px"
                  borderRadius="50%"
                  boxShadow={selectedColor === color ? "dark-lg" : "base"}
                  bgColor={color}
                  key={color}
                  pointerEvents="all"
                  aria-label={`Changer de couleur en ${color}`}
                  onClick={() => {
                    editor.setProp("color", color);
                    setSelectedColor(color);
                  }}
                />
              ))}
            </SimpleGrid>
          </MenuList>
        </Menu>
      </Tooltip>
    </ButtonGroup>
  );
};

export default Toolbar;
