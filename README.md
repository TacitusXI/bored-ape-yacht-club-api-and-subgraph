# BAYC Holders Subgraph

This subgraph indexes Bored Ape Yacht Club (BAYC) NFT data from Ethereum, tracking ownership transfers and other key events. It provides an efficient API for querying BAYC token ownership and transfer history.

## Features

- Indexes all BAYC token transfers
- Tracks current and historical ownership
- Records approval events
- Supports querying by wallet address, token ID, or timestamp
- Maintains Account entities for each owner
- Stores Token entities with current ownership information

## Deployment

The subgraph is deployed on The Graph's hosted service and can be accessed at:

- **Queries (HTTP)**: [https://api.studio.thegraph.com/query/110068/bayc/v0.0.3](https://api.studio.thegraph.com/query/110068/bayc/v0.0.3)

## Example Queries

### Query all BAYC tokens owned by an address

```graphql
{
  accounts(where: {id: "0xYourAddressHere"}) {
    id
    tokens {
      id
    }
    tokenCount
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

### Query tokens at a specific block height

```graphql
{
  tokens(first: 5, block: {number: 14688630}) {
    id
    owner {
      id
    }
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

- `Account`: Represents an Ethereum address that owns BAYC NFTs
- `Token`: Represents a BAYC NFT with its current owner
- `Transfer`: Records token transfers between accounts
- `Approval`: Tracks approval events for tokens
- `ApprovalForAll`: Records operator approval events

## Latest Changes

- Added `Account` and `Token` entities to track NFT ownership
- Updated mapping code to maintain ownership records
- Added support for historical queries at specific block heights
- Enhanced example queries in documentation

## License

This project is licensed under the [UNLICENSED](LICENSE) license. 
