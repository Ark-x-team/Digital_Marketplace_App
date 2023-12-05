import { Spinner } from "@nextui-org/react";

function Progress() {
  return (
    <div className="h-screen py-24 flex justify-center items-center bg-white dark:bg-dark">
      <Spinner size="md" />
    </div>
  );
}

export default Progress;
