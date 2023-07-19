import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from './setGetFeatures';

// Interface for the options of the toggleFeatures function
interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags; // Name of the feature flag
  on: () => T; // Function to be called when the feature flag is enabled
  off: () => T; // Function to be called when the feature flag is disabled
}

// Function that toggles features based on the provided options
export function toggleFeatures<T>({
  name,
  on,
  off,
}: ToggleFeaturesOptions<T>): T {
  if (getFeatureFlag(name)) {
    return on(); // Call the on() function when the feature flag is enabled
  }
  return off(); // Call the off() function when the feature flag is disabled
}
