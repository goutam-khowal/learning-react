import AxiosExample from "@/components/axios/AxiosExample";
import Navbar from "@/components/Navbar";
import ApplicantForm from "@/components/useForm/ApplicantForm";
import UseRefEx from "@/components/useRef/UseRefEx";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="py-4 ">
        <UseRefEx />
        <ApplicantForm />
        <AxiosExample />
      </main>
    </>
  );
}
