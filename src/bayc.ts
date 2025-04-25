import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent
} from "../generated/BAYC/BAYC"
import {
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  Transfer,
  Account,
  Token
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  // Create Transfer entity
  let transfer = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.tokenId = event.params.tokenId
  transfer.blockNumber = event.block.number
  transfer.blockTimestamp = event.block.timestamp
  transfer.transactionHash = event.transaction.hash
  transfer.save()

  // Handle Token entity
  let tokenId = event.params.tokenId.toString()
  let token = Token.load(tokenId)
  
  // Create the token if it doesn't exist yet
  if (!token) {
    token = new Token(tokenId)
  }

  // Get or create Account entity for new owner
  let toAccountId = event.params.to.toHexString()
  let toAccount = Account.load(toAccountId)
  
  if (!toAccount) {
    toAccount = new Account(toAccountId)
    toAccount.tokenCount = 0
    toAccount.save()
  }

  // Update Account entity for previous owner if this isn't a mint
  if (event.params.from.toHexString() != "0x0000000000000000000000000000000000000000") {
    let fromAccountId = event.params.from.toHexString()
    let fromAccount = Account.load(fromAccountId)
    
    if (fromAccount) {
      fromAccount.tokenCount = fromAccount.tokenCount - 1
      fromAccount.save()
    }
  }

  // Update token with new owner
  token.owner = toAccountId
  token.lastTransferBlock = event.block.number.toI32()
  token.lastTransferTimestamp = event.block.timestamp.toI32()
  token.save()
  
  // Increment new owner's token count
  toAccount.tokenCount = toAccount.tokenCount + 1
  toAccount.save()
}
