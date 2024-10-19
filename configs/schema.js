import { pgTable, varchar, serial, json, integer } from "drizzle-orm/pg-core";

// Define the Carlisting table schema
export const Carlisting = pgTable("carListing", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle").notNull(), // Required field
  tagline: varchar("tagline"),
  originalPrice: varchar("originalPrice"),
  sellingPrice: varchar("sellingPrice").notNull(), // Required field
  category: varchar("category").notNull(), // Required field
  condition: varchar("condition").notNull(), // Required field
  make: varchar("make").notNull(), // Required field
  model: varchar("model").notNull(), // Required field
  year: varchar("year").notNull(), // Required field
  fuelType: varchar("fuelType").notNull(), // Required field
  mileage: varchar("mileage").notNull(), // Required field
  engineSize: varchar("engineSize"),
  cylinder: varchar("cylinder"),
  color: varchar("color").notNull(), // Required field
  door: varchar("door").notNull(), // Required field
  vin: varchar("vin"),
  offerType: varchar("offerType"),
  listingDescription: varchar("listingDescription"), // Required field
  features: json("features"),
  createdBy: varchar('createdBy').notNull().default('srishtisingh140704@gmail.com'),
  postedOn: varchar('postedOn')
});



// export const CarImages=pgTable('carImages', {
//   id:serial('id').primaryKey(),
//   imageUrl:varchar('imageUrl').notNull(),
//   carlistingId:integer('carListingId').notNull().references(()=>Carlisting.id)


// })

export const CarImages = pgTable('carImages', {
  id: serial('id').primaryKey(),
  imageUrl: varchar('imageUrl').notNull(),
  carListingId: integer('carListingId').notNull().references(() => Carlisting.id),
});