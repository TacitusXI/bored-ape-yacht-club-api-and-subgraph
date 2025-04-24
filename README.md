# BAYC Holders Subgraph

This subgraph indexes Bored Ape Yacht Club (BAYC) NFT data from Ethereum, tracking ownership transfers and other key events. It provides an efficient API for querying BAYC token ownership and transfer history.

## Features

- Indexes all BAYC token transfers
- Tracks current and historical ownership
- Records approval events
- Supports querying by wallet address, token ID, or timestamp

## Deployment

The subgraph is deployed on The Graph's hosted service and can be accessed at:

- **Queries (HTTP)**: [https://api.studio.thegraph.com/query/110068/bayc/v0.0.1](https://api.studio.thegraph.com/query/110068/bayc/v0.0.1)

## Example Queries

### Query all BAYC tokens owned by an address

```graphql
{
  accounts(where: {id: "0xYourAddressHere"}) {
    id
    tokens {
      id
    }
  }
}
```

### Query transfer history for a specific token

```graphql
{
  transfers(where: {tokenId: "1234"}) {
    id
    from {
      id
    }
    to {
      id
    }
    timestamp
  }
}
```

## Development

### Prerequisites

- Node.js (>= 20.18.1)
- Yarn or NPM

### Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/bored-ape-yacht-club-api-and-subgraph.git
cd bored-ape-yacht-club-api-and-subgraph
```

2. Install dependencies:
```bash
npm install
```

3. Generate AssemblyScript types:
```bash
npm run codegen
```

4. Build the subgraph:
```bash
npm run build
```

### Local Development

For local development with a local Graph Node:

```bash
npm run create-local
npm run deploy-local
```

### Deployment

To deploy to The Graph Studio:

```bash
npm run deploy
```

## Schema

The main entities in the schema are:

- `Account`: Represents an Ethereum address
- `Token`: Represents a BAYC NFT
- `Transfer`: Records token transfers between accounts

## License

This project is licensed under the [UNLICENSED](LICENSE) license. 