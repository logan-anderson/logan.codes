import { useEffect } from "react";
import Layout from "../components/layout/Layout";
const RESUME_URL =
  "https://docs.google.com/document/d/16QJ6ue2xNkPFQO6nVeTuccWsxeG-6km8CD6VHDQCb0w/edit?usp=sharing";

const ResumePage = () => {
  useEffect(() => {
    // @ts-ignore
    window.location = RESUME_URL;
  }, []);
  return (
    <Layout preview={false} title="resume">
      Redirecting...
    </Layout>
  );
};

export default ResumePage;
