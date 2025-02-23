import { SignupFrom } from "@/forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { TabsContent } from "@/shadcn/components/ui/tabs";
import { FC } from "react";

export const SignupSection: FC = () => {
  return (
    <TabsContent value="signup">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Account</CardTitle>
          <CardDescription>Fill in the details to signup.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupFrom />
        </CardContent>
      </Card>
    </TabsContent>
  );
};
