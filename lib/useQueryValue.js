import Router, { useRouter } from "next/router";

export default function useQueryValue(key, defaultValue) {
  const router = useRouter();

  function setRouteValue(key, value) {
    let query = { ...router.query, [key]: value };
    if (!value) delete query[key];
    Router.push({ query });
  }

  return [router.query[key] ?? defaultValue, setRouteValue.bind(null, key)];
}
