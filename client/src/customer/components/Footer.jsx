function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <div className="main-container px-3 md:px-0 py-16 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-10">
      <img
        src="/logo.svg"
        alt="Markstone logo"
        className="w-16 grayscale opacity-30 dark:opacity-100"
      />
      <p className="text-neutral-500">
        &copy; {year} Markstone. All rights reserved.
      </p>
    </div>
  );
}
export default Footer;
