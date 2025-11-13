// Setup Elasticsearch Index for Products
// Run this script once to create the products index

import { Client } from "@elastic/elasticsearch";

const client = new Client({
  cloud: {
    id: process.env.ELASTICSEARCH_CLOUD_ID || "",
  },
  auth: {
    apiKey: process.env.ELASTICSEARCH_API_KEY || "",
  },
});

async function setupIndex() {
  try {
    // Check if index exists
    const indexExists = await client.indices.exists({ index: 'products' });

    if (indexExists) {
      console.log('✅ Products index already exists');
      return;
    }

    // Create index with mapping
    await client.indices.create({
      index: 'products',
      body: {
        mappings: {
          properties: {
            id: { type: 'keyword' },
            name: { 
              type: 'text',
              fields: {
                keyword: { type: 'keyword' }
              }
            },
            description: { type: 'text' },
            brand: { 
              type: 'text',
              fields: {
                keyword: { type: 'keyword' }
              }
            },
            slug: { type: 'keyword' },
            rating: { type: 'float' },
            sales: { type: 'integer' },
            numReviews: { type: 'integer' },
            categoryId: { type: 'keyword' },
            subCategoryId: { type: 'keyword' },
            storeId: { type: 'keyword' },
            variants: {
              type: 'nested',
              properties: {
                variantName: { type: 'text' },
                variantImage: { type: 'keyword' },
                colors: { type: 'keyword' },
                sizes: {
                  type: 'nested',
                  properties: {
                    price: { type: 'float' },
                    discount: { type: 'float' }
                  }
                }
              }
            }
          }
        }
      }
    });

    console.log('✅ Products index created successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Index your products using the index-products API');
    console.log('2. Test the AI assistant');
    
  } catch (error) {
    console.error('❌ Error setting up index:', error);
  }
}

setupIndex();
