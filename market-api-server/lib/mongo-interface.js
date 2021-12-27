//const mongoose = require("mongoose");
import mongoose from 'mongoose'



const Schema = mongoose.Schema;
 
 
const TraitSchema = new Schema({
  collectionName: {
    type: String, index: true
  },
  traitType: {
    type: String, index: true
  },
  value: {
    type: String, index: true
  },
  tokenIdArray: {   
    type: [Number]
  }  
 
})


const CachedNFTTileSchema = new Schema({
  collectionName: {
    type: String, index: true
  },
  /*traitIds: {  //points at traits 
    type: [Number], index: true
  }, */
  tokenId: {
    type: Number, index:true
  },
  ownerPublicAddress: {
    type: String, index: true
  },
  lowestBuyoutPriceWei: {
    type: Number
  },
  buyoutPriceFromOrderId: {
    type: String
  }
 
})

CachedNFTTileSchema.index({ collectionName: 1, tokenId: -1 }, {unique:true} );


const MarketOrdersSchema = new Schema({ 
  chainId: {
    type: Number
  },
  storeContractAddress: {
    type: String
  },
  orderCreator: {
    type: String
  },
  isSellOrder: {
    type: Boolean
  },
  nftContractAddress: {
    type: String
  },
  nftTokenId: {
    type: Number
  },
  currencyTokenAddress: {
    type: String
  },
  currencyTokenAmount: {
    type: String
  },
  nonce: {
    type: String
  },
  expires: {
    type: Number
  },
  signature: {
    type: String
  },

  lastPolledAt:{
    type: Number
  },
  status:{
    type: String
  }
 
})

const ERC721BalancesSchema = new Schema({
  contractAddress: {
    type: String, index: true
  },
  accountAddress: {
    type: String, index: true
  } ,
  tokenIds: {
    type: [Number]
  },
  lastPolledAt:{
    type: Number
  } 
   
 
})


const BurnedNoncesSchema = new Schema({
  orderCreator: String,
  nonce:String,
  hasBeenApplied:Boolean,
  createdAt:Number
})


const APIApplicationSchema = new Schema({
  publicAddress: {
    type: String, index: true
  },
  applicationID: {
    type: Number 
  } 
   
 
})

const AppEpochCounterSchema = new Schema({
  publicAddress: {
    type: String, index: true
  },
  epochHour: {
    type: Number 
  } 
   
 
})


/*
export var traitsModel

export var marketOrdersModel 

export var erc721BalancesModel 

export var apiApplicationModel

export var appEpochCounterModel*/
  

//var connection 

export default class MongoInterface  {

    


    constructor( ){
      
    }

    async init( dbName , config )
    {

      
      let host = 'localhost'
      let port = 27017

      if(config && config.url)
      {
        host = config.url
      }
      if(config && config.port)
      {
        port = config.port
      }

     
      if(dbName == null)
      {
        console.log('WARNING: No dbName Specified')
        process.exit() 
      }

      const url = 'mongodb://' + host + ':' + port + '/' + dbName
      //await mongoose.connect(url, {})

      this.connection = mongoose.createConnection(url, {} )
      console.log('connected to ', url, dbName)


      await this.initModels()
    }

    async initModels(){


        // PART OF Toadz 
        this.traitsModel = this.connection.model('nft_traits', TraitSchema)
      
        this.marketOrdersModel = this.connection.model('market_orders', MarketOrdersSchema)

        
        this.apiApplicationModel = this.connection.model('api_application', APIApplicationSchema)

        this.appEpochCounterModel = this.connection.model('app_epoch_counter', AppEpochCounterSchema)
      
        this.cachedNFTTileModel = this.connection.model('cached_nft_tiles', CachedNFTTileSchema)
        //---

        //PART OF VIBEGRAPH 
        this.erc721BalancesModel = this.connection.model('erc721_balances', ERC721BalancesSchema)
        
        
        this.burnedNoncesModel = this.connection.model('burned_nonces', BurnedNoncesSchema)
        //---


      console.log('init models')
    } 


 

}