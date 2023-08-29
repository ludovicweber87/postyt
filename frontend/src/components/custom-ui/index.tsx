import { Box } from "@chakra-ui/react";
import { useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/editor.css";
import { useEffect } from "react";
import { track } from "signia-react";
import Toolbar from "./components/toolbar";
import Topbar from "./components/topbar";
import "./custom-ui.css";

const CustomUi = track(() => {
  const editor = useEditor();

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Delete":
        case "Backspace": {
          editor.deleteShapes();
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <>
      <Box
        as="main"
        position="absolute"
        inset="0px"
        zIndex="300"
        pointerEvents="none"
      >
        <Topbar />
        <Toolbar editor={editor} />
      </Box>
    </>
  );
});

export default CustomUi;
