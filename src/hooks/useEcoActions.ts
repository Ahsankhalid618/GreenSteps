import { useAuthContext } from "@/components/providers/AuthProvider";
import { saveAction, CreateActionData } from "@/lib/actions";
import { useState } from "react";

export interface UseEcoActionsReturn {
  saveEcoAction: (actionData: CreateActionData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useEcoActions = (): UseEcoActionsReturn => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveEcoAction = async (actionData: CreateActionData) => {
    if (!user) {
      throw new Error("User must be authenticated to save actions");
    }

    try {
      setLoading(true);
      setError(null);

      await saveAction(actionData, user.$id);

      // You can add a success callback or toast here
      console.log("Action saved successfully and user profile updated!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save action";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    saveEcoAction,
    loading,
    error,
  };
};

// Example usage in components:
/*
const ExampleComponent = () => {
  const { saveEcoAction, loading, error } = useEcoActions();

  const handleCompleteAction = async () => {
    try {
      await saveEcoAction({
        category: "recycling",
        description: "Recycled plastic bottles",
        difficulty: "easy",
        points: 10,
        impact: {
          carbonSaved: 0.5,
          waterSaved: 2.0,
          wasteReduced: 0.1,
        },
      });
      // Action saved and user profile updated automatically!
    } catch (error) {
      console.error("Failed to complete action:", error);
    }
  };

  return (
    <button onClick={handleCompleteAction} disabled={loading}>
      {loading ? "Saving..." : "Complete Action"}
    </button>
  );
};
*/
