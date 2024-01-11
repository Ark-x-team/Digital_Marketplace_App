// Importing the Spinner component from the NextUI library
import { Spinner } from "@nextui-org/react";

// React functional component for displaying a loading spinner
function Progress() {
  // Rendering the loading spinner in the center of the screen
  return (
    <div className="h-screen py-24 flex justify-center items-center bg-white dark:bg-dark">
      <Spinner size="md" />
    </div>
  );
}

// Exporting the Progress component as the default export
export default Progress;
