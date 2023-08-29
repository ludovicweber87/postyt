import {
  faArrowPointer,
  faEraser,
  faHand,
  faNoteSticky,
  faPencil,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

export const BUTTONS = [
  {
    icon: faUndo,
    tool: "undo",
    toolTip: "Revenir en arrière",
  },
  {
    icon: faArrowPointer,
    tool: "select",
    toolTip: "Selectionner",
  },
  {
    icon: faPencil,
    tool: "draw",
    toolTip: "Dessiner",
  },
  {
    icon: faNoteSticky,
    tool: "note",
    toolTip: "Ajouter une note",
  },
  {
    icon: faHand,
    tool: "hand",
    toolTip: "Déplacer",
  },
  {
    icon: faEraser,
    tool: "eraser",
    toolTip: "Supprimer",
  },
];

export const COLORS = [
  "black",
  "blue",
  "green",
  "grey",
  "orange",
  "red",
  "violet",
  "yellow",
];
