export default async function Footer() {
  return (
    <footer className="w-full flex justify-start items-center p-4 bg-transparent mt-auto ">
      <div>
        &copy; {new Date().getFullYear()} Pierre Fraisse. All rights reserved.
      </div>
    </footer>
  );
};
