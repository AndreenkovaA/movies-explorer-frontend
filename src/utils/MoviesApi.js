import { YNDX_API_URL } from "./constants";
import { getResponseData } from "./utils";

export async function getMovies() {
  const res = await fetch(YNDX_API_URL,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    },
  );
  return getResponseData(res);
}
