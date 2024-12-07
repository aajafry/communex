import { ProtectedRoute, Layout } from "./index.js";

export const withLayout = (Component) => {
  return (
    <ProtectedRoute>
      <Layout>
        <Component />
      </Layout>
    </ProtectedRoute>
  );
};
