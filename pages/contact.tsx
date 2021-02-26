import MyForm from "../components/MyForm";
import Layout from "../components/layout/Layout";

const ContactPage: React.FC = (props) => {
  return (
    <Layout preview={false} title="Contact Logan">
      <h1>Contact Logan</h1>
      <p>I will do my best to get back to you within one business day</p>
      <MyForm />
    </Layout>
  );
};

export default ContactPage;
