import { LoginForm } from "@/forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { TabsContent } from "@/shadcn/components/ui/tabs";

export const LoginSection = () => {
  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login to Your Account</CardTitle>
          <CardDescription>Enter your login credentials below.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </TabsContent>
  );
};