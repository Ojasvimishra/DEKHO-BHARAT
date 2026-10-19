"""
Dekho Bharat – Python DSA Engine
=================================
Mirrors the JavaScript DSA logic from dekhoindia.js.
Provides:
  - N-ary Tree traversal (DFS)
  - Trie (Prefix Tree) for city search
"""

from __future__ import annotations
from typing import Any, Optional


# ---------------------------------------------------------------------------
# 1. N-ARY TREE DEFINITION  (mirrored from src/dekhoindia.js)
# ---------------------------------------------------------------------------

TREE_DATA: dict = {
    "id": "dekho-india",
    "label": "DEKHO BHARAT",
    "description": "The definitive journey through the soul of world's most ancient civilization.",
    "children": [
        {
            "id": "adventures",
            "label": "The Wild Adventures",
            "description": "Where the mountains touch the heavens. Explore high-altitude deserts, glacial lakes, and adrenaline-soaked valleys.",
            "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
            "children": [
                {
                    "id": "rishikesh", "city": "Rishikesh", "state": "Uttarakhand",
                    "description": "The Gateway to the Garhwal Himalayas. A sacred confluence of white-water adrenaline and silent spiritual depth.",
                    "tags": ["Rafting", "Adventure", "Yoga"],
                    "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1000",
                    "details": {
                        "bestSeason": "March to May & September to November",
                        "mustTry": "River Rafting, Ganga Aarti at Triveni Ghat, Bungee Jumping.",
                        "activities": "Cliff Jumping, Yoga Retreats, Ayurvedic Massage, Evening Aarti.",
                        "localFood": "Aloo Poori, Lassi, Chotiwala Special Thali.",
                        "hiddenGem": "Neer Garh Waterfall, Beatles Ashram.",
                        "climate": "Pleasant subtropical mountain weather.",
                        "coords": "30.0869° N, 78.2676° E",
                        "rating": "4.8/5.0",
                        "complexityIdx": "0.45 (Moderate)",
                        "guide": {"name": "Amit Sharma", "phone": "+91 98765 43210", "email": "amit.rishikesh@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "River Rafting", "price": "₹1,500", "type": "Adventure"},
                            {"activity": "Bungee Jumping", "price": "₹3,500", "type": "Extreme"},
                            {"activity": "Yoga Retreat (3 days)", "price": "₹5,000", "type": "Spiritual"},
                        ],
                    },
                },
                {
                    "id": "leh", "city": "Leh", "state": "Ladakh",
                    "description": "A lunar landscape on Earth. Ancient Buddhist monasteries perched on jagged cliffs.",
                    "tags": ["Biking", "Himalayas", "Lakes"],
                    "image": "/src/assets/leh.jpg",
                    "details": {
                        "bestSeason": "June to September",
                        "mustTry": "Magnetic Hill, Khardung La Pass ride, Stargazing at Hanle.",
                        "activities": "Mountain Biking, Monastery visits, River Rafting, Camping at Pangong.",
                        "localFood": "Thukpa, Skyu, Khambir, Apricot Jam.",
                        "hiddenGem": "Sangam (Indus & Zanskar), Hemis Monastery.",
                        "climate": "Cold desert climate with low oxygen.",
                        "coords": "34.1526° N, 77.5771° E",
                        "rating": "4.9/5.0",
                        "complexityIdx": "0.88 (Extreme)",
                        "guide": {"name": "Tenzin Gyatso", "phone": "+91 87654 32109", "email": "tenzin.leh@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Motorcycle Tour (Pangong)", "price": "₹12,000", "type": "Adventure"},
                            {"activity": "Star Gazing Session", "price": "₹2,500", "type": "Experience"},
                            {"activity": "Monastery Tour", "price": "₹1,800", "type": "Cultural"},
                        ],
                    },
                },
                {
                    "id": "andaman", "city": "Andaman", "state": "Island",
                    "description": "An emerald archipelago in the Bay of Bengal.",
                    "tags": ["Scuba", "Water Sports", "Island"],
                    "image": "/src/assets/Andaman.jpg",
                    "details": {
                        "bestSeason": "October to May",
                        "mustTry": "Scuba Diving at Havelock, Bioluminescence at Havelock beach.",
                        "activities": "Scuba Diving, Sea Walk, Island Hopping, Kayaking.",
                        "localFood": "Seafood Platter, Coconut Prawn Curry, Grilled Fish.",
                        "hiddenGem": "Barren Island (Active Volcano), Limestone Caves.",
                        "climate": "Tropical marine climate.",
                        "coords": "11.7401° N, 92.6586° E",
                        "rating": "4.7/5.0",
                        "complexityIdx": "0.62 (Tactical)",
                        "guide": {"name": "Rajesh Kumar", "phone": "+91 76543 21098", "email": "rajesh.andaman@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Scuba Diving at Havelock", "price": "₹4,500", "type": "Adventure"},
                            {"activity": "Glass Bottom Boat Ride", "price": "₹1,200", "type": "Leisure"},
                            {"activity": "Kayaking in Mangroves", "price": "₹3,000", "type": "Nature"},
                        ],
                    },
                },
                {
                    "id": "gulmarg", "city": "Gulmarg", "state": "J&K",
                    "description": "The Meadow of Flowers — one of the world's highest cable cars and premier skiing slopes.",
                    "tags": ["Skiing", "Snow", "Gondola"],
                    "image": "/src/assets/gulmarg.jpg",
                    "details": {
                        "bestSeason": "December to March (Snow) & April to June (Greenery)",
                        "mustTry": "Gondola Ride, Heli-Skiing, Golfing on the highest course.",
                        "activities": "Skiing, Gondola Ride, Sledging, Hiking.",
                        "localFood": "Kashmiri Wazwan, Rogan Josh, Kahwa Tea.",
                        "hiddenGem": "Alpathar Lake, Strawberry Valley.",
                        "climate": "Alpine, heavy snowfall in winter.",
                        "coords": "34.0484° N, 74.3805° E",
                        "rating": "4.9/5.0",
                        "complexityIdx": "0.74 (Technical)",
                        "guide": {"name": "Sajad Ahmed", "phone": "+91 65432 10987", "email": "sajad.gulmarg@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Guided Skiing Session", "price": "₹5,500", "type": "Extreme"},
                            {"activity": "Gondola Ride (Phase 2)", "price": "₹1,600", "type": "Sightseeing"},
                            {"activity": "Sledging Experience", "price": "₹800", "type": "Adventure"},
                        ],
                    },
                },
                {
                    "id": "bir-billing", "city": "Bir Billing", "state": "Himachal",
                    "description": "The paragliding capital of Asia. Soar above the Dhauladhar range.",
                    "tags": ["Paragliding", "Sky", "Tibetan"],
                    "image": "/src/assets/Bir%20Billing.jpg",
                    "details": {
                        "bestSeason": "September to November & March to May",
                        "mustTry": "Tandem Paragliding, Trekking to Rajgundha, Monastery hopping.",
                        "activities": "Paragliding, Trekking, Mountain Biking, Cafe Hopping.",
                        "localFood": "Thukpa, Momos, Siddu, Local Honey.",
                        "hiddenGem": "Bangoru Waterfall, Deer Park Institute.",
                        "climate": "Mild mountain climate.",
                        "coords": "32.0531° N, 76.7111° E",
                        "rating": "4.8/5.0",
                        "complexityIdx": "0.66 (High Alt)",
                        "guide": {"name": "Vikas Negi", "phone": "+91 54321 09876", "email": "vikas.bir@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Tandem Paragliding", "price": "₹3,000", "type": "Adventure"},
                            {"activity": "Mountain Biking", "price": "₹1,500", "type": "Stamina"},
                            {"activity": "Monastery Walk", "price": "₹500", "type": "Cultural"},
                        ],
                    },
                },
            ],
        },
        {
            "id": "beaches",
            "label": "Coastal Horizons",
            "description": "Over 7,000 kilometers of tropical bliss. From Portuguese heritage to azure backwaters.",
            "image": "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=1000",
            "children": [
                {
                    "id": "goa", "city": "Goa", "state": "Goa",
                    "description": "A kaleidoscope of cultures. Golden sands, baroque architecture, and a culinary heritage.",
                    "tags": ["Beach", "Nightlife", "Seafood"],
                    "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1080",
                    "details": {
                        "bestSeason": "November to February",
                        "mustTry": "Old Goa Church tour, Scuba at Grande Island, Beach Shacks.",
                        "activities": "Water Sports, Casino Cruise, Heritage Walk, Night Markets.",
                        "localFood": "Bebinca, Fish Recheado, Feni, Pork Vindaloo.",
                        "hiddenGem": "Chorao Island, Netravali Bubbling Lake.",
                        "climate": "Hot and Humid.",
                        "coords": "15.2993° N, 74.1240° E",
                        "rating": "4.6/5.0",
                        "complexityIdx": "0.22 (Low)",
                        "guide": {"name": "Joao Rodrigues", "phone": "+91 43210 98765", "email": "joao.goa@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Island Hopping Tour", "price": "₹2,500", "type": "Leisure"},
                            {"activity": "Scuba at Grande Island", "price": "₹4,000", "type": "Adventure"},
                            {"activity": "Heritage Portuguese Walk", "price": "₹900", "type": "Cultural"},
                        ],
                    },
                },
                {
                    "id": "varkala", "city": "Varkala", "state": "Kerala",
                    "description": "Where red sandstone cliffs bleed into the Arabian Sea.",
                    "tags": ["Cliff", "Quiet", "Temple"],
                    "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1000",
                    "details": {
                        "bestSeason": "October to March",
                        "mustTry": "Cliff-side Dining, Ayurvedic Massages, Surfing.",
                        "activities": "Surfing, Yoga, Cliff Walking, Cultural Shows.",
                        "localFood": "Kerala Sadhya, Banana Fritters, Seafood Thali.",
                        "hiddenGem": "Edava Beach, Kappil Lake.",
                        "climate": "Maritime tropical.",
                        "coords": "8.7379° N, 76.7163° E",
                        "rating": "4.8/5.0",
                        "complexityIdx": "0.35 (Smooth)",
                        "guide": {"name": "Rahul Nair", "phone": "+91 32109 87654", "email": "rahul.varkala@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Cliff-side Group Dinner", "price": "₹1,200", "type": "Leisure"},
                            {"activity": "Beginner Surfing Lesson", "price": "₹2,500", "type": "Adventure"},
                            {"activity": "Ayurvedic Spa Session", "price": "₹3,000", "type": "Wellness"},
                        ],
                    },
                },
                {
                    "id": "gokarna", "city": "Gokarna", "state": "Karnataka",
                    "description": "The untamed coast — a sacred temple town surrounded by rugged trekking paths.",
                    "tags": ["Trekking", "Sunset", "Beaches"],
                    "image": "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1000",
                    "details": {
                        "bestSeason": "October to March",
                        "mustTry": "5-beach trek, Mahabaleshwar Temple, Om Beach.",
                        "activities": "Beach Trekking, Temple visits, Meditation, Surfing.",
                        "localFood": "Toddy, Seafood, Local South Indian Meals.",
                        "hiddenGem": "Paradise Beach, Nirvana Beach.",
                        "climate": "Warm and humid.",
                        "coords": "14.5479° N, 74.3188° E",
                        "rating": "4.7/5.0",
                        "complexityIdx": "0.55 (Rough)",
                        "guide": {"name": "Manjunath Hegde", "phone": "+91 21098 76543", "email": "manju.gokarna@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "5-Beach Trek (Guided)", "price": "₹1,800", "type": "Hiking"},
                            {"activity": "Night Beach Camping", "price": "₹2,200", "type": "Adventure"},
                            {"activity": "Temple Culture Tour", "price": "₹1,000", "type": "Cultural"},
                        ],
                    },
                },
                {
                    "id": "havelock", "city": "Havelock", "state": "Andamans",
                    "description": "Asia's crowning coastal jewel. Radhanagar Beach — white sand meets turquoise horizon.",
                    "tags": ["Pristine", "Blue Water", "Asian Best"],
                    "image": "/src/assets/Havelock.jpg",
                    "details": {
                        "bestSeason": "November to May",
                        "mustTry": "Snorkeling at Elephant Beach, Scuba diving, Sunset at Radhanagar.",
                        "activities": "Snorkeling, Scuba, Jungle Trekking, Kayaking.",
                        "localFood": "Grilled Seafood, Coconut water, Tropical Fruits.",
                        "hiddenGem": "Neil Island, Sitapur Beach (Sunrise).",
                        "climate": "Tropical.",
                        "coords": "12.0343° N, 92.9818° E",
                        "rating": "4.9/5.0",
                        "complexityIdx": "0.68 (Island Logic)",
                        "guide": {"name": "Priya Das", "phone": "+91 10987 65432", "email": "priya.havelock@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Snorkeling at Elephant Beach", "price": "₹1,200", "type": "Water"},
                            {"activity": "Scuba Diving (Beginner)", "price": "₹4,500", "type": "Adventure"},
                            {"activity": "Private Boat Charter", "price": "₹8,000", "type": "Luxury"},
                        ],
                    },
                },
            ],
        },
        {
            "id": "roadtrips",
            "label": "Epic Expeditions",
            "description": "The open road is calling. Traverse royal desert sands and winding tea gardens.",
            "image": "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=1000",
            "children": [
                {
                    "id": "spiti", "city": "Spiti Valley", "state": "Himachal",
                    "description": "The Middle Land — a high-altitude sanctuary where time stands still.",
                    "tags": ["Off-road", "Remote", "Monasteries"],
                    "image": "/src/assets/Spity.jpg",
                    "details": {
                        "bestSeason": "June to September",
                        "mustTry": "Key Monastery, High-altitude camping, Fossils at Langza.",
                        "activities": "Monastery visits, Galaxy chasing, Motorcycling, Stargazing.",
                        "localFood": "Butter Tea, Tsampa, Spiti Saffron, SeaBuckthorn juice.",
                        "hiddenGem": "Dhankar Lake, Gue Mummy Temple.",
                        "climate": "Cold Desert.",
                        "coords": "32.2461° N, 78.0349° E",
                        "rating": "5.0/5.0",
                        "complexityIdx": "0.95 (Ultra)",
                        "guide": {"name": "Dorje Lama", "phone": "+91 88776 65544", "email": "dorje.spiti@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "4x4 Spiti Expedition", "price": "₹25,000", "type": "Extreme"},
                            {"activity": "Home-stay Culture Swap", "price": "₹1,500", "type": "Cultural"},
                            {"activity": "High Altitude Hiking", "price": "₹4,000", "type": "Hiking"},
                        ],
                    },
                },
                {
                    "id": "jaipur-jodhpur", "city": "The Royal Circuit", "state": "Rajasthan",
                    "description": "A journey through the land of Kings. Witness golden sunsets over desert forts.",
                    "tags": ["Desert", "Royal", "Culture"],
                    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1000",
                    "details": {
                        "bestSeason": "October to March",
                        "mustTry": "Amer Fort elephant ride, Mehrangarh Fort, Desert Camping.",
                        "activities": "Elephant Ride, Fort Exploration, Desert Safari, Folk Dance.",
                        "localFood": "Dal Baati Churma, Laal Maas, Mirchi Bada, Ghevar.",
                        "hiddenGem": "Panna Meena ka Kund, Royal Gaitore.",
                        "climate": "Arid desert climate.",
                        "coords": "26.9124° N, 75.7873° E",
                        "rating": "4.7/5.0",
                        "complexityIdx": "0.52 (Arid)",
                        "guide": {"name": "Vikram Singh Rathore", "phone": "+91 55443 32211", "email": "vikram.royal@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Amer Fort Elephant Ride", "price": "₹2,500", "type": "Royal"},
                            {"activity": "Desert Jeep Safari", "price": "₹3,000", "type": "Adventure"},
                            {"activity": "Cultural Folk Night", "price": "₹1,800", "type": "Cultural"},
                        ],
                    },
                },
            ],
        },
        {
            "id": "peaceful",
            "label": "Beauties Of Nature",
            "description": "Where the noise of the world fades into whispering pines. Find your inner peace.",
            "image": "/src/assets/senturies.jpg",
            "children": [
                {
                    "id": "muniar", "city": "Munnar", "state": "Kerala",
                    "description": "The tea capital of the Western Ghats — rolling emerald estates and cascading waterfalls.",
                    "tags": ["Tea Garden", "Calm", "Nature"],
                    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1000",
                    "details": {
                        "bestSeason": "September to March",
                        "mustTry": "Tea Museum, Anamudi Trek, Echo Point.",
                        "activities": "Tea Tasting, Mountain Trekking, Waterfall Visits, Shikara Ride.",
                        "localFood": "Appam with Stew, Karimeen Pollichathu, Kerala Sadhya.",
                        "hiddenGem": "Lakkam Waterfalls, Kolukkumalai Peak.",
                        "climate": "Cool Mountain air.",
                        "coords": "10.0889° N, 77.0595° E",
                        "rating": "4.8/5.0",
                        "complexityIdx": "0.25 (Calm)",
                        "guide": {"name": "Anu Jacob", "phone": "+91 22110 09988", "email": "anu.munnar@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Tea Estate Walk", "price": "₹800", "type": "Leisure"},
                            {"activity": "Elephant Junction", "price": "₹2,500", "type": "Nature"},
                        ],
                    },
                },
                {
                    "id": "dalhousie", "city": "Dalhousie", "state": "Himachal",
                    "description": "A window into the colonial past — pine-clad slopes with panoramic Dhauladhar views.",
                    "tags": ["Mountains", "Fresh Air", "British Era"],
                    "image": "/src/assets/Dalhousie.jpg",
                    "details": {
                        "bestSeason": "March to June",
                        "mustTry": "Khajjiar Meadow, Dainkund Peak, Kalatop Forest.",
                        "activities": "Trekking, Nature Walks, Forest Exploring, Wildlife Spotting.",
                        "localFood": "Sidu, Patande, Madra, Dham.",
                        "hiddenGem": "Sach Pass, Ganji Pahari Trek.",
                        "climate": "Mild summers, chilly winters.",
                        "coords": "32.5387° N, 75.9710° E",
                        "rating": "4.5/5.0",
                        "complexityIdx": "0.38 (Serene)",
                        "guide": {"name": "Sandeep Thakur", "phone": "+91 11009 98877", "email": "sandeep.dalhousie@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Khajjiar Adventure Pass", "price": "₹1,500", "type": "Adventure"},
                            {"activity": "Kalatop Forest Trek", "price": "₹2,000", "type": "Nature"},
                        ],
                    },
                },
                {
                    "id": "coorg", "city": "Coorg", "state": "Karnataka",
                    "description": "The Scotland of India — verdant coffee plantations and sandalwood forests.",
                    "tags": ["Coffee", "Mist", "Scotland of India"],
                    "image": "/src/assets/Coorg-1.jpg",
                    "details": {
                        "bestSeason": "October to March",
                        "mustTry": "Coffee Plantation tour, Abbey Falls.",
                        "activities": "Coffee Plantation Tour, Trekking, River Rafting, Bird Watching.",
                        "localFood": "Pandi Curry, Kadambattu, Akki Roti, Bamboo Shoot Curry.",
                        "hiddenGem": "Iruppu Falls, Mandalpatti Peak.",
                        "climate": "Cool and pleasant.",
                        "coords": "12.3375° N, 75.8069° E",
                        "rating": "4.7/5.0",
                        "complexityIdx": "0.22 (Mist)",
                        "guide": {"name": "Bopanna Kodava", "phone": "+91 99008 87766", "email": "bopanna.coorg@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Coffee Plantation Trail", "price": "₹1,200", "type": "Flavor"},
                            {"activity": "Abbey Falls Zip", "price": "₹1,500", "type": "Adventure"},
                        ],
                    },
                },
            ],
        },
        {
            "id": "budget",
            "label": "Backpacker's Bharat",
            "description": "Incredible adventures don't require infinite wealth. Discover the soul of India through ancient ruins.",
            "image": "/src/assets/backpacke.jpg",
            "children": [
                {
                    "id": "hampi", "city": "Hampi", "state": "Karnataka",
                    "description": "A boulder-strewn landscape from another era. Ruins of the Vijayanagara Empire.",
                    "tags": ["Ruins", "History", "UNESCO"],
                    "image": "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&q=80&w=1000",
                    "details": {
                        "bestSeason": "October to March",
                        "mustTry": "Vitthala Temple, Coracle Ride, Sunset at Matanga Hill.",
                        "activities": "Temple Hopping, Coracle Ride, Sunset Trekking, Bouldering.",
                        "localFood": "Hampi Special Thali, Badane Kaayi, Jowar Roti.",
                        "hiddenGem": "Anegundi (Monkey Palace), Hippie Island.",
                        "climate": "Hot in day, cool at night.",
                        "coords": "15.3350° N, 76.4600° E",
                        "rating": "4.9/5.0",
                        "complexityIdx": "0.48 (History)",
                        "guide": {"name": "Kiran Vijayanagar", "phone": "+91 77886 65544", "email": "kiran.hampi@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Vijayanagara Ruins Tour", "price": "₹1,200", "type": "History"},
                            {"activity": "Coracle Ride (Tungabhadra)", "price": "₹800", "type": "Water"},
                        ],
                    },
                },
                {
                    "id": "kasol", "city": "Kasol", "state": "Himachal",
                    "description": "The Little Israel of the Parvati Valley — a haven for mountain lovers.",
                    "tags": ["Youth", "Riverside", "Backpacking"],
                    "image": "https://images.unsplash.com/photo-1579294247411-cf0668630746?auto=format&fit=crop&q=80&w=1000",
                    "details": {
                        "bestSeason": "March to June & September to November",
                        "mustTry": "Chalal Trek, Malana Village tour, Israelis Cuisine.",
                        "activities": "Trekking to Kheerganga, Parvati Valley Walk, Israeli Food Tour.",
                        "localFood": "Israeli Platter, Hummus, Shakshuka, Nutella Pancakes.",
                        "hiddenGem": "Tosh Village, Kheer Ganga Hot Springs.",
                        "climate": "Cool mountain weather.",
                        "coords": "32.0100° N, 77.3150° E",
                        "rating": "4.6/5.0",
                        "complexityIdx": "0.42 (Vibe)",
                        "guide": {"name": "Ishant Parvati", "phone": "+91 66775 54433", "email": "ishant.kasol@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Kheerganga Trek (Guided)", "price": "₹2,500", "type": "Adventure"},
                            {"activity": "Tosh Village Walk", "price": "₹800", "type": "Nature"},
                        ],
                    },
                },
                {
                    "id": "pondicherry", "city": "Pondicherry", "state": "Tamil Nadu",
                    "description": "Windows of the French Quarter — bright yellow colonial buildings and silent shores.",
                    "tags": ["French", "Heritage", "Spiritual"],
                    "image": "https://images.unsplash.com/photo-1582512390192-34356e9c20f1?auto=format&fit=crop&q=80&w=1000",
                    "details": {
                        "bestSeason": "October to March",
                        "mustTry": "Auroville Mantrimandir, Promenade Beach, French Cuisine.",
                        "activities": "Cycling, Surfing at Serenity Beach, Meditation, Pottery.",
                        "localFood": "Croissants, Ratatouille, French Pastries, Seafood Platter.",
                        "hiddenGem": "Auroville Forest, Paradise Beach (Chunnambar).",
                        "climate": "Coastal tropical.",
                        "coords": "11.9416° N, 79.8083° E",
                        "rating": "4.7/5.0",
                        "complexityIdx": "0.28 (Slow Travel)",
                        "guide": {"name": "Pierre Francois", "phone": "+91 55664 43322", "email": "pierre.pondicherry@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "French Quarter Cycle Tour", "price": "₹1,000", "type": "Cultural"},
                            {"activity": "Auroville Experience", "price": "₹1,500", "type": "Spiritual"},
                        ],
                    },
                },
            ],
        },
        {
            "id": "wildlife",
            "label": "The Living Jungle",
            "description": "Step into the realm of the Royal Bengal Tiger and the One-Horned Rhino.",
            "image": "/src/assets/living%20jungle.jpg",
            "children": [
                {
                    "id": "jim-corbett", "city": "Jim Corbett", "state": "Uttarakhand",
                    "description": "The birthplace of tiger conservation in India.",
                    "tags": ["Tiger", "Jungle", "Safari"],
                    "image": "https://images.unsplash.com/photo-1521235042493-c5bef8b4ce29?auto=format&fit=crop&q=80&w=1000",
                    "details": {
                        "bestSeason": "November to June",
                        "mustTry": "Jeep Safari at Dhikala, Elephant Safari, River Kosi trekking.",
                        "activities": "Jeep Safari, Elephant Riding, Bird Watching, Nature Photography.",
                        "localFood": "Kumaoni Raita, Bhatt ki Churkani, Bal Mithai.",
                        "hiddenGem": "Sitabani Buffer Zone, Corbett Falls.",
                        "climate": "Subtropical monsoon.",
                        "coords": "29.5300° N, 78.7747° E",
                        "rating": "4.5/5.0",
                        "complexityIdx": "0.65 (Jungle)",
                        "guide": {"name": "Ravi Corbett", "phone": "+91 33442 21100", "email": "ravi.jim@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Premium Jeep Safari", "price": "₹4,500", "type": "Wildlife"},
                            {"activity": "Elephant Back Expedition", "price": "₹3,500", "type": "Adventure"},
                            {"activity": "Luxury Forest Stay", "price": "₹8,500", "type": "Group Tour"},
                        ],
                    },
                },
                {
                    "id": "ranthambore", "city": "Ranthambore", "state": "Rajasthan",
                    "description": "Where royalty meets the wild — ancient fort ruins overlooking tiger territory.",
                    "tags": ["Tiger", "Fort", "Desert Wildlife"],
                    "image": "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=1000",
                    "details": {
                        "bestSeason": "October to June",
                        "mustTry": "Zone 3-4 Tiger Safari, Fort Ruins exploration.",
                        "activities": "Tiger Safari, Bird Watching, Fort Walk, Photography.",
                        "localFood": "Dal Baati Churma, Rajasthani Thali.",
                        "hiddenGem": "Malik Talao Lake.",
                        "climate": "Hot and dry.",
                        "coords": "26.0173° N, 76.5026° E",
                        "rating": "4.6/5.0",
                        "complexityIdx": "0.58 (Wild)",
                        "guide": {"name": "Arjun Ranthambore", "phone": "+91 22331 10099", "email": "arjun.ranthambore@dekhoindia.in"},
                        "bookingOptions": [
                            {"activity": "Tiger Zone Safari", "price": "₹3,800", "type": "Wildlife"},
                            {"activity": "Fort Heritage Walk", "price": "₹1,200", "type": "History"},
                        ],
                    },
                },
            ],
        },
    ],
}


# ---------------------------------------------------------------------------
# 2. DFS TREE TRAVERSAL FUNCTIONS
# ---------------------------------------------------------------------------

def find_node_by_id(node: dict, target_id: str) -> Optional[dict]:
    """
    DFS: Find a node in the N-ary tree by its ID.
    Time Complexity: O(N) where N = total nodes.
    """
    if node.get("id") == target_id:
        return node
    for child in node.get("children", []):
        result = find_node_by_id(child, target_id)
        if result:
            return result
    return None


def get_path_to_node(node: dict, target_id: str, path: list = None) -> Optional[list]:
    """
    DFS: Returns a list of nodes from root to the target (breadcrumb path).
    """
    if path is None:
        path = []
    path = path + [node]
    if node.get("id") == target_id:
        return path
    for child in node.get("children", []):
        result = get_path_to_node(child, target_id, path)
        if result:
            return result
    return None


def is_leaf(node: dict) -> bool:
    """Returns True if the node has no children (a destination leaf)."""
    return not bool(node.get("children"))


def get_all_destinations(node: dict = None) -> list[dict]:
    """
    DFS: Collect all leaf nodes (cities) from the tree.
    """
    if node is None:
        node = TREE_DATA
    if is_leaf(node):
        return [node]
    results = []
    for child in node.get("children", []):
        results.extend(get_all_destinations(child))
    return results


# ---------------------------------------------------------------------------
# 3. TRIE (PREFIX TREE) IMPLEMENTATION
# ---------------------------------------------------------------------------

class TrieNode:
    def __init__(self):
        self.children: dict[str, "TrieNode"] = {}
        self.is_end: bool = False
        self.data: Optional[dict] = None  # store original node at end


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str, data: dict) -> None:
        """Insert a word (city name) into the trie, storing data at the leaf."""
        current = self.root
        for char in word.lower():
            if char not in current.children:
                current.children[char] = TrieNode()
            current = current.children[char]
        current.is_end = True
        current.data = data

    def _dfs_collect(self, node: TrieNode, results: list) -> None:
        """Collect all end nodes via DFS."""
        if node.is_end and node.data:
            results.append(node.data)
        for child in node.children.values():
            self._dfs_collect(child, results)

    def search(self, prefix: str) -> list[dict]:
        """
        Trie prefix search — O(L + K) where L = prefix length, K = results.
        Returns all city nodes matching the given prefix.
        """
        current = self.root
        for char in prefix.lower():
            if char not in current.children:
                return []
            current = current.children[char]
        results: list[dict] = []
        self._dfs_collect(current, results)
        return results


def build_trie_from_tree(node: dict = None) -> Trie:
    """Build a Trie from all leaf (city) nodes in the tree."""
    trie = Trie()
    if node is None:
        node = TREE_DATA
    for dest in get_all_destinations(node):
        city_name = dest.get("city") or dest.get("label") or ""
        if city_name:
            trie.insert(city_name, dest)
    return trie


# Singleton Trie – built once at import time
GLOBAL_TRIE: Trie = build_trie_from_tree()
