import Header from "../components/Header";
import Layout from "../layout";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Layout>{children}</Layout>
    </>
  );
};

export default AuthLayout;
