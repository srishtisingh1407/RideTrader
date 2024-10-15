/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url:"postgresql://neondb_owner:YlevW4gG6tDA@ep-winter-sunset-a5aifd25.us-east-2.aws.neon.tech/ride?sslmode=require",
    }
  };