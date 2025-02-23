import { ComponentType } from "react";
import { ProtectedRoute, Layout } from "./index.js";

export const withLayout = (Component: ComponentType) => {
  return (
    <ProtectedRoute>
      <Layout>
        <Component />
      </Layout>
    </ProtectedRoute>
  );
};
