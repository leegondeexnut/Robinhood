import Form from "@/app/components/Form";

export default function Login() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center mt-20 h-screen">
      <Form
        title="Email"
        blank={[
          { name: "email", id: "email1" },
          { name: "username", id: "username1" },
          { name: "password", id: "password2" },
        ]}
      />
    </div>
  );
}
