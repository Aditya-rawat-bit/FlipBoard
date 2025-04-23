
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthForm } from "@/components/auth/AuthForm";

const SignUp = () => {
  return (
    <MainLayout>
      <div className="py-16 px-4">
        <AuthForm isSignUp={true} />
      </div>
    </MainLayout>
  );
};

export default SignUp;
