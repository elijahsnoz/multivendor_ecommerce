// Test Elasticsearch Connection
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "https://my-elasticsearch-project-dd284b.es.us-central1.gcp.elastic.cloud:443",
  auth: {
    apiKey: "UEdMTmZwb0JzVVpXREN1MEsyU2E6XzZFbnZLaTFpUlhJYUJjRXYyaWRYZw==",
  },
});

async function testConnection() {
  try {
    console.log("🔍 Testing Elasticsearch connection...\n");
    
    // Test connection
    const info = await client.info();
    console.log("✅ Connected to Elasticsearch!");
    console.log("   Version:", info.version.number);
    console.log("   Cluster:", info.cluster_name);
    
    // Check if products index exists
    const indexExists = await client.indices.exists({ index: "products" });
    
    if (indexExists) {
      console.log("\n✅ 'products' index exists");
      
      // Get count
      const count = await client.count({ index: "products" });
      console.log("   Products indexed:", count.count);
    } else {
      console.log("\n⚠️  'products' index does not exist yet");
      console.log("   You'll need to create it and index your products");
    }
    
    console.log("\n🎉 Elasticsearch is ready to use!");
    
  } catch (error) {
    console.error("❌ Connection failed:");
    console.error(error.message);
    process.exit(1);
  }
}

testConnection();
