const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="govuk-width-container mt-6 w-full justify-center flex flex-col items-center">
      {children}
    </div>
  );
};

export default Layout;
