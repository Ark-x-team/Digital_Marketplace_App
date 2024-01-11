// Importing icons from Material-UI library
import SpeakerNotesRoundedIcon from "@mui/icons-material/SpeakerNotesRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

// Array containing data for quick links, each with a title and an associated icon
const QuickLinksData = [
  {
    title: "reviews",
    icon: <SpeakerNotesRoundedIcon />,
  },
  {
    title: "features",
    icon: <AutoFixHighRoundedIcon />,
  },
  {
    title: "overview",
    icon: <InfoRoundedIcon />,
  },
];

// Exporting the QuickLinksData array as the default export
export default QuickLinksData;
