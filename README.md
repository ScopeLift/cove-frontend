# Cove Frontend

This repo contains the frontend for Cove, a robust smart **co**ntract **ve**rification tool for EVM chains.
The backend can be found in the [ScopeLift/cove-backend](https://github.com/ScopeLift/cove-backend) repo.

### Development

To run the server locally:

```shell
pnpm install
pnpm dev
```

To use your own API endpoint, run `cp .env.template .env.local` and update the `NEXT_PUBLIC_COVE_API_URL`.
