using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using SaikoStudio.API.Data;
using SaikoStudio.API.Helper;
using SaikoStudio.API.Models;

namespace SaikoStudio.API.Data
{
    public static class DbInitializer
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            context.Database.Migrate();

            if (context.Roles.Any()) return;

            var customerRole = new Role { Name = "Customer", Description = "Regular customer" };
            var adminRole = new Role { Name = "Admin", Description = "Administrator" };
            context.Roles.AddRange(customerRole, adminRole);
            await context.SaveChangesAsync();

            if (!context.Users.Any())
            {
                var adminUser = new User
                {
                    Name = "Admin",
                    Email = "admin@thesaikostudio.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                    RoleId = adminRole.Id,
                    CreatedAt = DateTime.UtcNow
                };
                context.Users.Add(adminUser);
                await context.SaveChangesAsync();
            }

            if (context.Categories.Any()) return;

            var categories = new List<Category>
            {
                new() { Name = "Corsets", Slug = "corsets", Description = "Structured corsets and corset tops" },
                new() { Name = "Coord Sets", Slug = "coord-sets", Description = "Coordinated outfit sets" },
                new() { Name = "Dresses", Slug = "dresses", Description = "Dresses for every occasion" },
                new() { Name = "Tops", Slug = "tops", Description = "Stylish tops and blouses" },
                new() { Name = "Bottoms", Slug = "bottoms", Description = "Pants, skirts and more" },
                new() { Name = "Accessories", Slug = "accessories", Description = "Complete your look" },
            };
            context.Categories.AddRange(categories);
            await context.SaveChangesAsync();

            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new() { Title = "Emerald Corset Belt", Slug = "emerald-corset-belt", Description = "A stunning emerald green corset belt that adds a pop of color to any outfit.", Price = 1500, CompareAtPrice = 2750, Stock = 20, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "GABBY Pink Corset", Slug = "gabby-pink-corset", Description = "A beautiful pink corset that exudes elegance and confidence.", Price = 5550, Stock = 15, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "Psych Underwire bralette top", Slug = "psych-underwire-bralette-top", Description = "Psych underwire bralette top with structured support.", Price = 5000, Stock = 10, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "Baby J corset", Slug = "baby-j-corset", Description = "Baby J signature corset with premium finish.", Price = 5750, Stock = 8, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "Violet mesh corset top", Slug = "violet-mesh-corset-top", Description = "Violet mesh corset top with intricate detailing.", Price = 6000, Stock = 12, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "PINK CORSET TOP BACK TIE", Slug = "pink-corset-top-back-tie", Description = "Pink corset top with back tie detail.", Price = 4500, Stock = 18, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "CORSET BELT", Slug = "corset-belt", Description = "Classic corset belt for structured styling.", Price = 1500, CompareAtPrice = 2750, Stock = 25, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "NEWSPAPER SCRIBBLE CORSET", Slug = "newspaper-scribble-corset", Description = "Unique newspaper print corset design.", Price = 5250, Stock = 10, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "KISS AND TELL HANDKERCHIEF CORSET TOP", Slug = "kiss-and-tell-handkerchief-corset-top", Description = "Handkerchief hem corset top with bold styling.", Price = 5000, Stock = 14, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "ALL EYES ON YOU VELVET CORSET", Slug = "all-eyes-on-you-velvet-corset", Description = "Luxurious velvet corset that demands attention.", Price = 5250, Stock = 10, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "SUNSET BLOCK CORSET", Slug = "sunset-block-corset", Description = "Sunset inspired colour blocked corset.", Price = 4750, Stock = 12, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "MOTION THROUGH COLOUR BLOCKED CORSET", Slug = "motion-through-colour-blocked-corset", Description = "Bold colour blocked corset from the Motion collection.", Price = 5250, Stock = 8, CategoryId = categories[0].Id, Status = ProductStatusType.Active },

                new() { Title = "COLOUR ME WITH EVERYTHING COORD", Slug = "colour-me-with-everything-coord", Description = "Versatile coord set that pairs with everything.", Price = 4000, CompareAtPrice = 5500, Stock = 15, CategoryId = categories[1].Id, Status = ProductStatusType.Active },
                new() { Title = "Freddy coord set", Slug = "freddy-coord-set", Description = "Freddy coord set with premium denim construction.", Price = 8250, Stock = 10, CategoryId = categories[1].Id, Status = ProductStatusType.Active },
                new() { Title = "knit Baby J coord set", Slug = "knit-baby-j-coord-set", Description = "Knit Baby J coord set with comfortable stretch.", Price = 3000, CompareAtPrice = 3150, Stock = 20, CategoryId = categories[1].Id, Status = ProductStatusType.Active },
                new() { Title = "Baby J denim coord set", Slug = "baby-j-denim-coord-set", Description = "Premium denim coord set from Baby J collection.", Price = 9750, Stock = 8, CategoryId = categories[1].Id, Status = ProductStatusType.Active },
                new() { Title = "MIRCHI COORD SET", Slug = "mirchi-coord-set", Description = "Bold Mirchi coord set with vibrant styling.", Price = 4250, Stock = 15, CategoryId = categories[1].Id, Status = ProductStatusType.Active },
                new() { Title = "CERULEAN PLAID COORD SET", Slug = "plaid-coord-set", Description = "Cerulean plaid coord set for classic styling.", Price = 6750, Stock = 10, CategoryId = categories[1].Id, Status = ProductStatusType.Active },
                new() { Title = "ZUMMER BREEZE COORD SET", Slug = "zummer-breeze-coord-set", Description = "Summer breeze coord set with lightweight fabric.", Price = 4000, Stock = 18, CategoryId = categories[1].Id, Status = ProductStatusType.Active },
                new() { Title = "MOTION THROUGH ORANGE AND RED COORD SET", Slug = "motion-through-orange-and-red-coord-set", Description = "Orange and red coord set from the Motion collection.", Price = 7000, Stock = 10, CategoryId = categories[1].Id, Status = ProductStatusType.Active },
                new() { Title = "MOTION THROUGH COLOUR BLOCKED COORD SET", Slug = "motion-through-colour-blocked-coord-set", Description = "Colour blocked coord set with bold contrast.", Price = 9000, Stock = 8, CategoryId = categories[1].Id, Status = ProductStatusType.Active },
                new() { Title = "SUNSET BLOCK COORD SET", Slug = "sunset-block-coord-set", Description = "Sunset inspired coord set with warm tones.", Price = 7250, Stock = 12, CategoryId = categories[1].Id, Status = ProductStatusType.Active },
                new() { Title = "TRIP OVER ME COORD SET BLUE", Slug = "trip-over-me-coord-set-blue", Description = "Blue coord set with trip over me styling.", Price = 7750, Stock = 10, CategoryId = categories[1].Id, Status = ProductStatusType.Active },
                new() { Title = "COROLLA THREE PIECE COORD", Slug = "corolla-three-piece-coord", Description = "Three piece coord set from the Corolla collection.", Price = 8750, Stock = 6, CategoryId = categories[1].Id, Status = ProductStatusType.Active },

                new() { Title = "PINK FOLIO ONE SHOULDER RUFFLE DRESS", Slug = "pink-folio-one-shoulder-ruffle-dress", Description = "Pink folio one shoulder ruffle dress for elegant occasions.", Price = 5250, Stock = 12, CategoryId = categories[2].Id, Status = ProductStatusType.Active },
                new() { Title = "Celestial Long Dress", Slug = "celestial-long-dress", Description = "Celestial-inspired long dress perfect for making a statement.", Price = 8400, Stock = 8, CategoryId = categories[2].Id, Status = ProductStatusType.Active },
                new() { Title = "Tiger cut out bodycon dress", Slug = "tiger-cut-out-bodycon-dress", Description = "Tiger print cut out bodycon dress.", Price = 4500, Stock = 15, CategoryId = categories[2].Id, Status = ProductStatusType.Active },
                new() { Title = "KISS AND TELL DRESS", Slug = "kiss-and-tell-dress", Description = "Kiss and tell dress with playful styling.", Price = 2500, Stock = 20, CategoryId = categories[2].Id, Status = ProductStatusType.Active },
                new() { Title = "PINK SWIRL BARBIE DRESS", Slug = "pink-swirl-barbie-dress", Description = "Pink swirl Barbie dress with playful charm.", Price = 4000, Stock = 14, CategoryId = categories[2].Id, Status = ProductStatusType.Active },
                new() { Title = "MOTION THROUGH MAGENTA PINK", Slug = "motion-through-magenta-pink", Description = "Magenta pink dress from the Motion collection.", Price = 5750, Stock = 10, CategoryId = categories[2].Id, Status = ProductStatusType.Active },
                new() { Title = "MOTION THROUGH DIRTY PINK DRESS", Slug = "motion-through-dirty-pink-dress", Description = "Dirty pink dress from the Motion collection.", Price = 5550, Stock = 12, CategoryId = categories[2].Id, Status = ProductStatusType.Active },
                new() { Title = "MOTION THROUGH BROWN DRESS", Slug = "motion-through-brown-dress", Description = "Brown dress from the Motion collection.", Price = 6050, Stock = 10, CategoryId = categories[2].Id, Status = ProductStatusType.Active },
                new() { Title = "TRIP OVER MY DRESS", Slug = "trip-over-my-dress", Description = "Trip over my dress with flowing silhouette.", Price = 5250, Stock = 8, CategoryId = categories[2].Id, Status = ProductStatusType.Active },
                new() { Title = "EXTRA RED HOT MINI DRESS", Slug = "extra-red-hot-mini-dress", Description = "Extra red hot mini dress for bold looks.", Price = 4250, Stock = 15, CategoryId = categories[2].Id, Status = ProductStatusType.Active },
                new() { Title = "ALL OVER GREEN SWIRL RUFFLE DRESS", Slug = "all-over-green-swirl-ruffle-dress", Description = "Green swirl ruffle dress with all-over print.", Price = 5250, Stock = 10, CategoryId = categories[2].Id, Status = ProductStatusType.Active },

                new() { Title = "Lost bodysuit", Slug = "lost-bodysuit", Description = "Lost bodysuit with fitted silhouette.", Price = 2000, CompareAtPrice = 3000, Stock = 18, CategoryId = categories[3].Id, Status = ProductStatusType.Active },
                new() { Title = "Monologo Neon cropped Top", Slug = "monologo-neon-cropped-top", Description = "High round closed neck top with side/back zipper.", Price = 2000, CompareAtPrice = 2750, Stock = 20, CategoryId = categories[3].Id, Status = ProductStatusType.Active },
                new() { Title = "Magenta cut out corset top", Slug = "magenta-cut-out-corset-top", Description = "Magenta cut out corset top with bold detailing.", Price = 4500, Stock = 12, CategoryId = categories[3].Id, Status = ProductStatusType.Active },
                new() { Title = "MONOLOGO ARABELLA TOP", Slug = "monologo-arabella-top", Description = "Monologo Arabella top with signature styling.", Price = 3500, Stock = 15, CategoryId = categories[3].Id, Status = ProductStatusType.Active },
                new() { Title = "LAVA RED HALTER TOP", Slug = "lava-red-halter-top", Description = "Lava red halter top for bold evening looks.", Price = 6000, Stock = 8, CategoryId = categories[3].Id, Status = ProductStatusType.Active },
                new() { Title = "COLOUR ME WITH EVERYTHING SHIRT", Slug = "colour-me-with-everything-shirt", Description = "Versatile shirt that pairs with everything.", Price = 2250, Stock = 20, CategoryId = categories[3].Id, Status = ProductStatusType.Active },
                new() { Title = "MOTION THROUGH EMRALD TOP", Slug = "motion-through-emrald-top", Description = "Emerald top from the Motion collection.", Price = 2500, Stock = 15, CategoryId = categories[3].Id, Status = ProductStatusType.Active },
                new() { Title = "PINK AND PURPLE UNIVERSE TOP", Slug = "pink-and-purple-universe-top", Description = "Pink and purple universe top with playful print.", Price = 2500, Stock = 18, CategoryId = categories[3].Id, Status = ProductStatusType.Active },
                new() { Title = "FALLEN FLORET TOP", Slug = "fallen-floret-top", Description = "Fallen floret top with floral detailing.", Price = 4250, Stock = 10, CategoryId = categories[3].Id, Status = ProductStatusType.Active },
                new() { Title = "ITS RAINING NEUTRONS TOP", Slug = "its-raining-neutrons-top", Description = "Its raining neutrons top with unique print.", Price = 3250, Stock = 14, CategoryId = categories[3].Id, Status = ProductStatusType.Active },
                new() { Title = "HOT PINK SWIRL HALTER CROPPED TOP", Slug = "hot-pink-swirl-halter-cropped-top", Description = "Hot pink swirl halter cropped top.", Price = 5250, Stock = 12, CategoryId = categories[3].Id, Status = ProductStatusType.Active },

                new() { Title = "COROLLA CAPE JACKET", Slug = "corolla-cape-jacket", Description = "Corolla cape jacket with flowing design.", Price = 3250, Stock = 10, CategoryId = categories[4].Id, Status = ProductStatusType.Active },
                new() { Title = "UMBER CORSET", Slug = "umber-corset", Description = "Umber corset with earthy tones.", Price = 5250, Stock = 8, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "SKITTLE BLUE CORSET", Slug = "skittle-blue-corset", Description = "Skittle blue corset with vibrant colour.", Price = 5500, Stock = 10, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "ELECTRIC GREEN CORSET WITH DRAPED DRAWSTRING SKIRT", Slug = "electric-green-corset-with-draped-drawstring-skirt", Description = "Electric green corset with draped drawstring skirt.", Price = 8750, Stock = 6, CategoryId = categories[4].Id, Status = ProductStatusType.Active },
                new() { Title = "BROWN TRIBAL VELVET CORSET", Slug = "brown-tribal-velvet-corset", Description = "Brown tribal velvet corset with rich texture.", Price = 5400, Stock = 10, CategoryId = categories[0].Id, Status = ProductStatusType.Active },
                new() { Title = "KALEIDOSCOPIC GREEN TROUSER SUIT", Slug = "kaleidoscopic-green-trouser-suit", Description = "Kaleidoscopic green trouser suit.", Price = 8750, Stock = 8, CategoryId = categories[4].Id, Status = ProductStatusType.Active },
            };
            context.Products.AddRange(products);
            await context.SaveChangesAsync();

            var images = new List<ProductImage>
            {
                new() { ImageUrl = "/images/EmeraldCORSETBELT.jpg.jpeg", SortOrder = 1, ProductId = products[0].Id },
                new() { ImageUrl = "/images/EmeraldCorsetbeltback.jpg.jpeg", SortOrder = 2, ProductId = products[0].Id },
                new() { ImageUrl = "/images/3aad94ac-bfc6-4ca1-a613-be095caad508.jpg.jpeg", SortOrder = 1, ProductId = products[1].Id },
                new() { ImageUrl = "/images/Untitled-8_2.png", SortOrder = 1, ProductId = products[2].Id },
                new() { ImageUrl = "/images/Untitled-2_53.jpg.jpeg", SortOrder = 1, ProductId = products[3].Id },
                new() { ImageUrl = "/images/Untitled-2_52_copy_2.jpg.jpeg", SortOrder = 1, ProductId = products[4].Id },
                new() { ImageUrl = "/images/pinkoffshoulder1.jpg.jpeg", SortOrder = 1, ProductId = products[5].Id },
                new() { ImageUrl = "/images/corsetbelt1.jpg.jpeg", SortOrder = 1, ProductId = products[6].Id },
                new() { ImageUrl = "/images/C6935C1F-E469-4571-AF28-950E6BEBD3B6.jpg.jpeg", SortOrder = 1, ProductId = products[7].Id },
                new() { ImageUrl = "/images/C5579E87-810A-4C2E-AEF1-6E3DE6BD84CF.jpg.jpeg", SortOrder = 1, ProductId = products[8].Id },
                new() { ImageUrl = "/images/printcorset.jpg.jpeg", SortOrder = 1, ProductId = products[9].Id },
                new() { ImageUrl = "/images/printcorset.jpg_1.jpeg", SortOrder = 2, ProductId = products[9].Id },
                new() { ImageUrl = "/images/IMG_2280_bf8fc5f2-0434-4e2b-8e8d-3f12da1bd9d0.jpg.jpeg", SortOrder = 1, ProductId = products[10].Id },
                new() { ImageUrl = "/images/e23f1f_16e9551cfb9149ccae571d12298af0ba_mv2.jpg.jpeg", SortOrder = 1, ProductId = products[11].Id },
                new() { ImageUrl = "/images/IMG_4346-min.webp.jpeg", SortOrder = 1, ProductId = products[12].Id },
                new() { ImageUrl = "/images/new.jpg.jpeg", SortOrder = 1, ProductId = products[13].Id },
                new() { ImageUrl = "/images/NEW3.jpg.jpeg", SortOrder = 2, ProductId = products[13].Id },
                new() { ImageUrl = "/images/Untitled-2_14_55176c6b-e0f8-4322-998b-c036d230c584.jpg.jpeg", SortOrder = 1, ProductId = products[14].Id },
                new() { ImageUrl = "/images/coordset.jpg.jpeg", SortOrder = 1, ProductId = products[15].Id },
                new() { ImageUrl = "/images/mirchi1.jpg.jpeg", SortOrder = 1, ProductId = products[16].Id },
                new() { ImageUrl = "/images/Plaidcoordset7.jpg.jpeg", SortOrder = 1, ProductId = products[17].Id },
                new() { ImageUrl = "/images/zummerbreeze4.jpg.jpeg", SortOrder = 1, ProductId = products[18].Id },
                new() { ImageUrl = "/images/IMG_0306-min.jpg.jpeg", SortOrder = 1, ProductId = products[19].Id },
                new() { ImageUrl = "/images/e23f1f_16e9551cfb9149ccae571d12298af0ba_mv2.webp.jpeg", SortOrder = 1, ProductId = products[20].Id },
                new() { ImageUrl = "/images/IMG_2280.jpg.jpeg", SortOrder = 1, ProductId = products[21].Id },
                new() { ImageUrl = "/images/IMG_1573-min.jpg.jpeg", SortOrder = 1, ProductId = products[22].Id },
                new() { ImageUrl = "/images/F79B3249-9C4B-427C-A240-D770E302709F-min.jpg.jpeg", SortOrder = 1, ProductId = products[23].Id },
                new() { ImageUrl = "/images/3BE77CE8-F42B-4FAA-B9D8-A16026E7AFB5-min.jpg.jpeg", SortOrder = 1, ProductId = products[24].Id },
                new() { ImageUrl = "/images/celestial.png", SortOrder = 1, ProductId = products[25].Id },
                new() { ImageUrl = "/images/celestial2.png", SortOrder = 2, ProductId = products[25].Id },
                new() { ImageUrl = "/images/Untitled-2_25.jpg.jpeg", SortOrder = 1, ProductId = products[26].Id },
                new() { ImageUrl = "/images/dress1.jpg.jpeg", SortOrder = 1, ProductId = products[27].Id },
                new() { ImageUrl = "/images/52CCDE87-C7A7-414F-BC44-3AA24BB555D8.jpg.jpeg", SortOrder = 1, ProductId = products[28].Id },
                new() { ImageUrl = "/images/60ffb270cfdbaf00011b9c80.webp.jpeg", SortOrder = 1, ProductId = products[29].Id },
                new() { ImageUrl = "/images/62A377B4-D450-4DB2-A4A7-DDD35D95BEF7-min.jpg.jpeg", SortOrder = 1, ProductId = products[30].Id },
                new() { ImageUrl = "/images/D02336E6-6508-4322-8CA2-8DE42669A952.jpg.jpeg", SortOrder = 1, ProductId = products[31].Id },
                new() { ImageUrl = "/images/8BDF8DF7-369C-4669-B59A-A6A2A96DC761-min.jpg.jpeg", SortOrder = 1, ProductId = products[32].Id },
                new() { ImageUrl = "/images/IMG_1589.jpg.jpeg", SortOrder = 1, ProductId = products[33].Id },
                new() { ImageUrl = "/images/IMG_1612.jpg.jpeg", SortOrder = 1, ProductId = products[34].Id },
                new() { ImageUrl = "/images/Untitled-2_52_copy_3_1f5a72a3-9dfe-4d59-bbbf-134d30010951.jpg.jpeg", SortOrder = 1, ProductId = products[35].Id },
                new() { ImageUrl = "/images/IMG_6974.jpg.jpeg", SortOrder = 1, ProductId = products[36].Id },
                new() { ImageUrl = "/images/edit1_8b0789a0-1c6e-46b3-99e1-309537e6018f.jpg.jpeg", SortOrder = 1, ProductId = products[37].Id },
                new() { ImageUrl = "/images/D9165B09-87B4-4047-B438-D0BEB6DDA684.jpg.jpeg", SortOrder = 1, ProductId = products[39].Id },
                new() { ImageUrl = "/images/9D0B9988-0E11-45A9-B4D4-C2EA02C6BE48.jpg.jpeg", SortOrder = 1, ProductId = products[40].Id },
                new() { ImageUrl = "/images/25B3C7AA-D028-4CBF-87C7-7A3A814ED183-min_a94b4e57-81e8-4f8f-bd50-8ee3290a3a16.jpg.jpeg", SortOrder = 1, ProductId = products[41].Id },
                new() { ImageUrl = "/images/IMG_7670_76e9a5c5-9ec8-4c3c-addf-64e80a4e3cb4.jpg.jpeg", SortOrder = 1, ProductId = products[42].Id },
                new() { ImageUrl = "/images/0F6B1CDB-A3FA-4E4E-A31B-95229E2A4C28-min_5f365e22-6454-49a8-bb91-dffd93207cc8.jpg.jpeg", SortOrder = 1, ProductId = products[43].Id },
                new() { ImageUrl = "/images/5834CEA9-D3E6-4C6C-A6C5-D4459A8CC6C6-min_d9d36048-f98d-40c6-93a9-0c24578bb52a.jpg.jpeg", SortOrder = 1, ProductId = products[44].Id },
                new() { ImageUrl = "/images/D73A4B09-FE05-41E9-BE69-61531B99C4B9-min_3d094828-e27e-4e82-b945-6fc0a3ef5f3f.jpg.jpeg", SortOrder = 1, ProductId = products[45].Id },
                new() { ImageUrl = "/images/F79B3249-9C4B-427C-A240-D770E302709F-min_ef0741eb-bd2f-42ff-8e43-1cd28a6ee549.jpg.jpeg", SortOrder = 1, ProductId = products[46].Id },
                new() { ImageUrl = "/images/IMG_2029.jpg.jpeg", SortOrder = 1, ProductId = products[47].Id },
                new() { ImageUrl = "/images/85B07E16-B592-459C-8875-A9431BFEC0C4-min.jpg.jpeg", SortOrder = 1, ProductId = products[48].Id },
                new() { ImageUrl = "/images/8CAA258F-3AC0-4B5D-BBD6-92FEAE81E297-min.jpg.jpeg", SortOrder = 1, ProductId = products[49].Id },
                new() { ImageUrl = "/images/IMG_2468.jpg.jpeg", SortOrder = 1, ProductId = products[50].Id },
                new() { ImageUrl = "/images/F01D9466-4C3D-4C7C-9E3A-99DE88200E55.jpg.jpeg", SortOrder = 1, ProductId = products[51].Id },
                new() { ImageUrl = "/images/IMG_1954.jpg.jpeg", SortOrder = 1, ProductId = products[52].Id },
            };
            context.ProductImages.AddRange(images);
            await context.SaveChangesAsync();
        }
    }
}
