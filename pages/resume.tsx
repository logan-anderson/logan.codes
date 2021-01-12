import { useEffect } from "react";
import Layout from "../components/layout/Layout";
const RESUME_URL =
  "https://docs.google.com/document/d/1vEcbGnN0f1MGhA5WH0Gmt_h5Cvxf7l_xmtT8Ao1Mda4/edit";

const ResumePage = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.location = RESUME_URL;
    }
  }, []);
  return (
    <Layout preview={false} title="resume">
      Redirecting...
    </Layout>
  );
};

export default ResumePage;
