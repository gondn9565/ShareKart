import { createFlagsmithInstance } from "flagsmith";

// Create and initialize the Flagsmith client
const flagsmith = createFlagsmithInstance();

// Initialize Flagsmith with your environment key
export const initFlagsmith = async () => {
  try {
    await flagsmith.init({
      environmentID: import.meta.env.VITE_FLAGSMITH_ENV_ID || "YOUR_FLAGSMITH_ENVIRONMENT_ID",
      cacheFlags: true,
      enableAnalytics: true,
      onChange: () => {
        console.log("Flags have changed");
      },
    });

    console.log("Flagsmith initialized successfully!");
    return flagsmith;
  } catch (error) {
    console.error("Flagsmith initialization failed:", error);
  }
};

// Set user identity and traits
export const identifyUser = async (userId, traits = {}) => {
  try {
    await flagsmith.identify(userId, traits);
    console.log("User identified in Flagsmith:", userId);
    return true;
  } catch (error) {
    console.error("Error identifying user in Flagsmith:", error);
    return false;
  }
};

// Get flag value
export const getFlag = (flagName, defaultValue) => {
  try {
    return flagsmith.getValue(flagName, defaultValue);
  } catch (error) {
    console.error(`Error getting flag ${flagName}:`, error);
    return defaultValue;
  }
};

// Check if flag is enabled
export const hasFeature = (featureName) => {
  try {
    return flagsmith.hasFeature(featureName);
  } catch (error) {
    console.error(`Error checking feature ${featureName}:`, error);
    return false;
  }
};

// Get user traits
export const getUserTraits = () => {
  try {
    return flagsmith.getTraits();
  } catch (error) {
    console.error("Error getting user traits:", error);
    return {};
  }
};

// Set a user trait
export const setTrait = async (traitKey, traitValue) => {
  try {
    await flagsmith.setTrait(traitKey, traitValue);
    return true;
  } catch (error) {
    console.error(`Error setting trait ${traitKey}:`, error);
    return false;
  }
};

export default flagsmith;
