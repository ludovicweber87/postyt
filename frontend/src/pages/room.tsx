import { Box } from "@chakra-ui/react";
import CustomUi from "@postyt/components/custom-ui";
import withExistingRoom from "@postyt/lib/hoc/with-existing-room";
import { Canvas, TldrawEditor } from "@tldraw/tldraw";

const Room = () => {
  return (
    <Box className="tldraw__editor">
      <TldrawEditor autoFocus>
        <Canvas />
        <CustomUi />
      </TldrawEditor>
    </Box>
  );
};

export default withExistingRoom(Room);
