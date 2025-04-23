
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthForm } from "@/components/auth/AuthForm";

const SignIn = () => {
  return (
    <MainLayout>
      <div className="py-16 px-4">
        <AuthForm isSignUp={false} />
      </div>
    </MainLayout>
  );
};

export default SignIn;
