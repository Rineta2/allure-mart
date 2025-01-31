import React from "react";

import * as opencage from "opencage-api-client";

import { LocationOption, GeocodingResult } from "./schema";

export function useLocationSearch() {
  const [locationOptions, setLocationOptions] = React.useState<
    LocationOption[]
  >([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const searchLocation = async (inputValue: string) => {
    if (!inputValue || inputValue.length < 3) {
      setLocationOptions([]);
      return;
    }

    setIsSearching(true);
    try {
      const result = await opencage.geocode({
        q: `${inputValue}, Indonesia`,
        key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY as string,
        countrycode: "id",
        language: "id",
        limit: 5,
      });

      if (!result.results || result.results.length === 0) {
        setLocationOptions([]);
        return;
      }

      const options = result.results.map((item: GeocodingResult) => ({
        value: item.formatted,
        label: item.formatted,
        details: {
          city: item.components.city || item.components.town,
          state: item.components.state,
          postcode: item.components.postcode,
          country: item.components.country,
        },
      }));

      setLocationOptions(options);
    } catch {
      setLocationOptions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedSearch = React.useCallback((value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      searchLocation(value);
    }, 500);
  }, []);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    locationOptions,
    isSearching,
    debouncedSearch,
  };
}
