import { LoginSection, SignupSection } from "@/components";
import { Tabs, TabsList, TabsTrigger } from "@/shadcn/components/ui/tabs";

export const Authentication = () => {
  return (
    <div className="h-dvh flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <LoginSection />
        <SignupSection />
      </Tabs>
    </div>
  );
};
