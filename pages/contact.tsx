import MyForm from "../components/contactForm/Form";
import Layout from "../components/layout/Layout";

const ContactPage: React.FC = () => {
  return (
    <Layout preview={false} title="Contact Logan">
      <MyForm />
    </Layout>
  );
};

export default ContactPage;
