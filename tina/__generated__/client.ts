import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'fc15cdb2cd13e4db6e834e402faca3664731dfcb', queries,  });
export default client;
  