/**
 * ==========================================
 * DEKHO BHARAT - CORE DSA ENGINE
 * ==========================================
 * 
 * DATA STRUCTURES USED:
 * 1. N-ary Tree: Hierarchical travel mapping (Root -> Category -> City).
 * 2. DFS (Depth First Search): Recursively finding paths and nodes.
 */

// --- LOCAL ASSET PATHS (Node-compatible) ---
const spitiImg = "/src/assets/Spity.jpg";
const dalhousieImg = "/src/assets/Dalhousie.jpg";
const coorgImg = "/src/assets/Coorg-1.jpg";
const indiaMapImg = "/src/assets/download%20(1).jpg";
const peacefulImg = "/src/assets/senturies.jpg";
const khajjiarImg = "/src/assets/dalhousie.webp";
const lehImg = "/src/assets/leh.jpg";
const andamanImg = "/src/assets/Andaman.jpg";
const gulmargImg = "/src/assets/gulmarg.jpg";
const birBillingImg = "/src/assets/Bir%20Billing.jpg";
const backpackerImg = "/src/assets/backpacke.jpg";
const rameswaramImg = "/src/assets/rameshwerm.jpg";
const jungleImg = "/src/assets/living%20jungle.jpg";
const havelockImg = "/src/assets/Havelock.jpg";

// --- 1. THE KNOWLEDGE BASE (N-ary Tree Structure) ---
export const treeData = {
    id: 'dekho-india', // Root Node ID
    label: 'DEKHO BHARAT', // System Brand
    description: 'The definitive journey through the soul of world\'s most ancient civilization. From the sun-kissed coasts of the Indian Ocean to the eternal snows of the Himalayas, discover a land where every milestone is a masterpiece of history.',
    image: indiaMapImg, // Iconic India Map Illustration
    children: [
        {
            id: 'adventures',
            label: 'The Wild Adventures',
            description: 'Where the mountains touch the heavens. Explore high-altitude deserts, glacial lakes, and the adrenaline-soaked valleys of the Great Himalayan range.',
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000',
            children: [
                {
                    id: 'rishikesh',
                    city: 'Rishikesh',
                    state: 'Uttarakhand',
                    description: 'The Gateway to the Garhwal Himalayas. A sacred confluence of white-water adrenaline and silent spiritual depth. The world\'s capital for both Rafting and Yoga, where the Ganges flows with pristine emerald clarity.',
                    details: {
                        bestSeason: 'March to May & September to November',
                        mustTry: 'River Rafting, Ganga Aarti at Triveni Ghat, Bungee Jumping.',
                        activities: 'Cliff Jumping, Yoga Retreats, Ayurvedic Massage, Evening Aarti.',
                        localFood: 'Aloo Poori, Lassi, Chotiwala Special Thali.',
                        hiddenGem: 'Neer Garh Waterfall, Beatles Ashram (Chaurasi Kutia).',
                        climate: 'Pleasant subtropical mountain weather.',
                        coords: '30.0869° N, 78.2676° E',
                        rating: '4.8/5.0',
                        complexityIdx: '0.45 (Moderate)',
                        guide: { name: 'Amit Sharma', phone: '+91 98765 43210', email: 'amit.rishikesh@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'River Rafting', price: '₹1,500', type: 'Adventure' },
                            { activity: 'Bungee Jumping', price: '₹3,500', type: 'Extreme' },
                            { activity: 'Yoga Retreat (3 days)', price: '₹5,000', type: 'Spiritual' }
                        ]
                    },
                    tags: ['Rafting', 'Adventure', 'Yoga'],
                    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1000'
                },
                {
                    id: 'leh',
                    city: 'Leh',
                    state: 'Ladakh',
                    description: 'A lunar landscape on Earth. Ancient Buddhist monasteries perched on jagged cliffs, high-altitude passes that challenge the bravest riders, and the mystical blue waters of Pangong Tso.',
                    details: {
                        bestSeason: 'June to September',
                        mustTry: 'Magnetic Hill, Khardung La Pass ride, Stargazing at Hanle.',
                        activities: 'Mountain Biking, Monastery visits, River Rafting, Camping at Pangong.',
                        localFood: 'Thukpa, Skyu, Khambir, Apricot Jam.',
                        hiddenGem: 'Sangam (Indus & Zanskar), Hemis Monastery.',
                        climate: 'Cold desert climate with low oxygen.',
                        coords: '34.1526° N, 77.5771° E',
                        rating: '4.9/5.0',
                        complexityIdx: '0.88 (Extreme)',
                        guide: { name: 'Tenzin Gyatso', phone: '+91 87654 32109', email: 'tenzin.leh@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Motorcycle Tour (Pangong)', price: '₹12,000', type: 'Adventure' },
                            { activity: 'Star Gazing Session', price: '₹2,500', type: 'Experience' },
                            { activity: 'Monastery Tour', price: '₹1,800', type: 'Cultural' }
                        ]
                    },
                    tags: ['Biking', 'Himalayas', 'Lakes'],
                    image: lehImg
                },
                {
                    id: 'andaman',
                    city: 'Andaman',
                    state: 'Island',
                    description: 'An emerald archipelago in the Bay of Bengal. Home to the world\'s most pristine coral reefs and the echoes of India\'s freedom struggle at the Cellular Jail, surrounded by turquoise waters.',
                    details: {
                        bestSeason: 'October to May',
                        mustTry: 'Scuba Diving at Havelock, Bioluminescence at Havelock beach.',
                        activities: 'Scuba Diving, Sea Walk, Island Hopping, Kayaking.',
                        localFood: 'Seafood Platter, Coconut Prawn Curry, Grilled Fish.',
                        hiddenGem: 'Barren Island (Active Volcano), Limestone Caves.',
                        climate: 'Tropical marine climate.',
                        coords: '11.7401° N, 92.6586° E',
                        rating: '4.7/5.0',
                        complexityIdx: '0.62 (Tactical)',
                        guide: { name: 'Rajesh Kumar', phone: '+91 76543 21098', email: 'rajesh.andaman@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Scuba Diving at Havelock', price: '₹4,500', type: 'Adventure' },
                            { activity: 'Glass Bottom Boat Ride', price: '₹1,200', type: 'Leisure' },
                            { activity: 'Kayaking in Mangroves', price: '₹3,000', type: 'Nature' }
                        ]
                    },
                    tags: ['Scuba', 'Water Sports', 'Island'],
                    image: andamanImg
                },
                {
                    id: 'gulmarg',
                    city: 'Gulmarg',
                    state: 'J&K',
                    description: 'The "Meadow of Flowers" transformed into an Alpine wonderland. Boasting one of the world\'s highest cable cars and premier skiing slopes with deep powdery snow.',
                    details: {
                        bestSeason: 'December to March (for Snow) & April to June (for Greenery)',
                        mustTry: 'Gondola Ride, Heli-Skiing, Golfing in the highest course.',
                        activities: 'Skiing, Gondola Ride, Sledging, Hiking.',
                        localFood: 'Kashmiri Wazwan, Rogan Josh, Kahwa Tea.',
                        hiddenGem: 'Alpathar Lake, Strawberry Valley.',
                        climate: 'Alpine, heavy snowfall in winter.',
                        coords: '34.0484° N, 74.3805° E',
                        rating: '4.9/5.0',
                        complexityIdx: '0.74 (Technical)',
                        guide: { name: 'Sajad Ahmed', phone: '+91 65432 10987', email: 'sajad.gulmarg@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Guided Skiing Session', price: '₹5,500', type: 'Extreme' },
                            { activity: 'Gondola Ride (Phase 2)', price: '₹1,600', type: 'Sightseeing' },
                            { activity: 'Sledging Experience', price: '₹800', type: 'Adventure' }
                        ]
                    },
                    tags: ['Skiing', 'Snow', 'Gondola'],
                    image: gulmargImg
                },
                {
                    id: 'bir-billing',
                    city: 'Bir Billing',
                    state: 'Himachal',
                    description: 'The paragliding capital of Asia. Soar above the Dhauladhar range and find serenity in the silent bells of Tibetan monasteries and eco-friendly cafes.',
                    details: {
                        bestSeason: 'September to November & March to May',
                        mustTry: 'Tandem Paragliding, Trekking to Rajgundha, Monastery hopping.',
                        activities: 'Paragliding, Trekking, Mountain Biking, Cafe Hopping.',
                        localFood: 'Thukpa, Momos, Siddu, Local Honey.',
                        hiddenGem: 'Bangoru Waterfall, Deer Park Institute.',
                        climate: 'Mild mountain climate.',
                        coords: '32.0531° N, 76.7111° E',
                        rating: '4.8/5.0',
                        complexityIdx: '0.66 (High Alt)',
                        guide: { name: 'Vikas Negi', phone: '+91 54321 09876', email: 'vikas.bir@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Tandem Paragliding', price: '₹3,000', type: 'Adventure' },
                            { activity: 'Mountain Biking', price: '₹1,500', type: 'Stamina' },
                            { activity: 'Monastery Walk', price: '₹500', type: 'Cultural' }
                        ]
                    },
                    tags: ['Paragliding', 'Sky', 'Tibetan'],
                    image: birBillingImg
                }
            ]
        },
        {
            id: 'beaches',
            label: 'Coastal Horizons',
            description: 'Over 7,000 kilometers of tropical bliss. From Portuguese heritage to azure backwaters, surrender to the eternal rhythm of the waves.',
            image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=1000',
            children: [
                {
                    id: 'goa',
                    city: 'Goa',
                    state: 'Goa',
                    description: 'A kaleidoscope of cultures. Golden sands, baroque architecture, and a culinary heritage that blends Indian spices with European elegance. A blend of hippie vibe and luxury.',
                    details: {
                        bestSeason: 'November to February',
                        mustTry: 'Old Goa Church tour, Scuba at Grande Island, Beach Shacks.',
                        activities: 'Water Sports, Casino Cruise, Heritage Walk, Night Markets.',
                        localFood: 'Bebinca, Fish Recheado, Feni, Pork Vindaloo.',
                        hiddenGem: 'Chorao Island, Netravali Bubbling Lake.',
                        climate: 'Hot and Humid.',
                        coords: '15.2993° N, 74.1240° E',
                        rating: '4.6/5.0',
                        complexityIdx: '0.22 (Low)',
                        guide: { name: 'Joao Rodrigues', phone: '+91 43210 98765', email: 'joao.goa@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Island Hopping Tour', price: '₹2,500', type: 'Leisure' },
                            { activity: 'Scuba at Grande Island', price: '₹4,000', type: 'Adventure' },
                            { activity: 'Heritage Portuguese Walk', price: '₹900', type: 'Cultural' }
                        ]
                    },
                    tags: ['Beach', 'Nightlife', 'Seafood'],
                    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1080'
                },
                {
                    id: 'varkala',
                    city: 'Varkala',
                    state: 'Kerala',
                    description: 'Where red sandstone cliffs bleed into the Arabian Sea. A unique coastal sanctuary that offers both therapeutic springs and sunset serenity on the cliff-side cafes.',
                    details: {
                        bestSeason: 'October to March',
                        mustTry: 'Cliff-side Dining, Ayurvedic Massages, Surfing.',
                        activities: 'Surfing, Yoga, Cliff Walking, Cultural Shows.',
                        localFood: 'Kerala Sadhya, Banana Fritters, Seafood Thali.',
                        hiddenGem: 'Edava Beach, Kappil Lake.',
                        climate: 'Maritime tropical.',
                        coords: '8.7379° N, 76.7163° E',
                        rating: '4.8/5.0',
                        complexityIdx: '0.35 (Smooth)',
                        guide: { name: 'Rahul Nair', phone: '+91 32109 87654', email: 'rahul.varkala@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Cliff-side Group Dinner', price: '₹1,200', type: 'Leisure' },
                            { activity: 'Beginner Surfing Lesson', price: '₹2,500', type: 'Adventure' },
                            { activity: 'Ayurvedic Spa Session', price: '₹3,000', type: 'Wellness' }
                        ]
                    },
                    tags: ['Cliff', 'Quiet', 'Temple'],
                    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1000'
                },
                {
                    id: 'gokarna',
                    city: 'Gokarna',
                    state: 'Karnataka',
                    description: 'The untamed coast. A sacred temple town surrounded by rugged trekking paths and secluded half-moon beaches that remain untouched by mass tourism.',
                    details: {
                        bestSeason: 'October to March',
                        mustTry: 'Beach Trek (5-beach trek), Mahabaleshwar Temple, Om Beach.',
                        activities: 'Beach Trekking, Temple visits, Meditation, Surfing.',
                        localFood: 'Toddy, Seafood, Local South Indian Meals.',
                        hiddenGem: 'Paradise Beach (Hidden trek), Nirvana Beach.',
                        climate: 'Warm and humid.',
                        coords: '14.5479° N, 74.3188° E',
                        rating: '4.7/5.0',
                        complexityIdx: '0.55 (Rough)',
                        guide: { name: 'Manjunath Hegde', phone: '+91 21098 76543', email: 'manju.gokarna@dekhoindia.in' },
                        bookingOptions: [
                            { activity: '5-Beach Trek (Guided)', price: '₹1,800', type: 'Hiking' },
                            { activity: 'Night Beach Camping', price: '₹2,200', type: 'Adventure' },
                            { activity: 'Temple Culture Tour', price: '₹1,000', type: 'Cultural' }
                        ]
                    },
                    tags: ['Trekking', 'Sunset', 'Beaches'],
                    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1000'
                },
                {
                    id: 'havelock',
                    city: 'Havelock',
                    state: 'Andamans',
                    description: 'Asia\'s crowning coastal jewel. Radhanagar Beach offers a rare blend of dense tropical forests meeting crystal-clear turquoise horizons and white sand.',
                    details: {
                        bestSeason: 'November to May',
                        mustTry: 'Snorkeling at Elephant Beach, Scuba diving, Sunset at Radhanagar.',
                        activities: 'Snorkeling, Scuba, Jungle Trekking, Kayaking in Mangroves.',
                        localFood: 'Grilled Seafood, Coconut water, Tropical Fruits.',
                        hiddenGem: 'Neil Island, Sitapur Beach (Sunrise).',
                        climate: 'Tropical.',
                        coords: '12.0343° N, 92.9818° E',
                        rating: '4.9/5.0',
                        complexityIdx: '0.68 (Island Logic)',
                        guide: { name: 'Priya Das', phone: '+91 10987 65432', email: 'priya.havelock@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Snorkeling at Elephant Beach', price: '₹1,200', type: 'Water' },
                            { activity: 'Scuba Diving (Beginner)', price: '₹4,500', type: 'Adventure' },
                            { activity: 'Private Boat Charter', price: '₹8,000', type: 'Luxury' }
                        ]
                    },
                    tags: ['Pristine', 'Blue Water', 'Asian Best'],
                    image: havelockImg
                },
                {
                    id: 'tarkarli',
                    city: 'Tarkarli',
                    state: 'Maharashtra',
                    description: 'The Maldives of the West. Famous for its transparent waters, the historic Sindhudurg fort rising from the sea, and the vibrant Malvani coastal cuisine.',
                    details: {
                        bestSeason: 'October to March',
                        mustTry: 'Scuba Diving, Sindhudurg Fort visit, Malvani Thali.',
                        activities: 'Scuba Diving, Fort Exploring, Dolphin Spotting, Boat Ride.',
                        localFood: 'Malvani Fish Thali, Solkadhi, Fried Fish.',
                        hiddenGem: 'Devbag Beach, Sangam Point.',
                        climate: 'Humid coastal.',
                        coords: '16.0354° N, 73.4921° E',
                        rating: '4.5/5.0',
                        complexityIdx: '0.42 (Marine)',
                        guide: { name: 'Sameer Sawant', phone: '+91 99887 76655', email: 'sameer.tarkarli@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Deep Sea Scuba', price: '₹3,500', type: 'Water' },
                            { activity: 'Sindhudurg Fort Boat', price: '₹800', type: 'Heritage' },
                            { activity: 'Malvani Dinner Night', price: '₹1,500', type: 'Food' }
                        ]
                    },
                    tags: ['Scuba', 'Coast', 'Forts'],
                    image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&q=80&w=1000'
                }
            ]
        },
        {
            id: 'roadtrips',
            label: 'Epic Expeditions',
            description: 'The open road is calling. Traverse the royal desert sands, the winding tea gardens, and the engineering marvels that span the deep blue seas.',
            image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=1000',
            children: [
                {
                    id: 'spiti',
                    city: 'Spiti Valley',
                    state: 'Himachal',
                    description: 'The Middle Land. A high-altitude sanctuary where time stands still among 1000-year-old monasteries and the world\'s highest motorable roads and post offices.',
                    details: {
                        bestSeason: 'June to September',
                        mustTry: 'Key Monastery, High-altitude camping, Fossils hunting at Langza.',
                        activities: 'Monastery visits, Galaxy chasing, Motorcycling, Stargazing.',
                        localFood: 'Butter Tea, Tsampa, Spiti Saffron, SeaBuckthorn juice.',
                        hiddenGem: 'Dhankar Lake, Gue Mummy Temple.',
                        climate: 'Cold Desert.',
                        coords: '32.2461° N, 78.0349° E',
                        rating: '5.0/5.0',
                        complexityIdx: '0.95 (Ultra)',
                        guide: { name: 'Dorje Lama', phone: '+91 88776 65544', email: 'dorje.spiti@dekhoindia.in' },
                        bookingOptions: [
                            { activity: '4x4 Spiti Expedition', price: '₹25,000', type: 'Extreme' },
                            { activity: 'Home-stay Culture Swap', price: '₹1,500', type: 'Cultural' },
                            { activity: 'High Altitude Hiking', price: '₹4,000', type: 'Hiking' }
                        ]
                    },
                    tags: ['Off-road', 'Remote', 'Monasteries'],
                    image: spitiImg
                },
                {
                    id: 'kaza',
                    city: 'Kaza',
                    state: 'Spiti Valley',
                    description: 'The commercial hub of Spiti. Experience the high-altitude market, the colorful local festivals, and use it as a base camp for the world\'s highest villages.',
                    details: {
                        bestSeason: 'June to Mid-October',
                        mustTry: 'Kaza Market, Local Handicrafts, Seabuckthorn Tea.',
                        activities: 'Local Market Walk, Festival participation, Base camp for Kibber.',
                        localFood: 'Thukpa, Momos, Local Spiti Bread.',
                        hiddenGem: 'Sakya Tenggyu Monastery.',
                        climate: 'Extreme alpine.',
                        coords: '32.2227° N, 78.0700° E',
                        rating: '4.8/5.0',
                        complexityIdx: '0.75 (Base Camp)',
                        guide: { name: 'Karsang Spiti', phone: '+91 77665 54433', email: 'karsang.kaza@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Kibber High Alt Trek', price: '₹4,000', type: 'Adventure' },
                            { activity: 'Local Craft Workshop', price: '₹1,200', type: 'Cultural' },
                            { activity: 'Monastery Tour', price: '₹800', type: 'Spiritual' }
                        ]
                    },
                    tags: ['Market', 'Base Camp', 'Community'],
                    image: spitiImg
                },
                {
                    id: 'tabo',
                    city: 'Tabo Monastery',
                    state: 'Spiti Valley',
                    description: 'The "Ajanta of the Himalayas". A UNESCO World Heritage site featuring 10th-century mud-brick structures and priceless ancient frescoes and sculptures.',
                    details: {
                        bestSeason: 'May to October',
                        mustTry: 'Old Temple Complex, Meditation caves, Ancient Frescoes.',
                        activities: 'Monastery tour, Meditation, Photography, Heritage walk.',
                        localFood: 'Tibetan Stew, Butter Tea.',
                        hiddenGem: 'Tabo Caves (Meditation cells).',
                        climate: 'Arid mountain.',
                        coords: '32.0917° N, 78.3761° E',
                        rating: '4.9/5.0',
                        complexityIdx: '0.40 (Spiritual)',
                        guide: { name: 'Lobsang Sangay', phone: '+91 66554 43322', email: 'lobsang.tabo@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Mantra Meditation', price: '₹500', type: 'Soul' },
                            { activity: 'Ancient Fresco Tour', price: '₹700', type: 'Art' }
                        ]
                    },
                    tags: ['UNESCO', 'History', 'Frescoes'],
                    image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&q=80&w=1080'
                },
                {
                    id: 'jaipur-jodhpur',
                    city: 'The Royal Circuit',
                    state: 'Rajasthan',
                    description: 'A journey through the land of Kings. Witness the golden sun setting over desert forts and experience the hospitality that makes every guest feel like a God.',
                    details: {
                        bestSeason: 'October to March',
                        mustTry: 'Amer Fort elephant ride, Mehrangarh Fort, Desert Camping.',
                        activities: 'Elephant Ride, Fort Exploration, Desert Safari, Folk Dance.',
                        localFood: 'Dal Baati Churma, Laal Maas, Mirchi Bada, Ghevar.',
                        hiddenGem: 'Panna Meena ka Kund, Royal Gaitore.',
                        climate: 'Arid desert climate.',
                        coords: '26.9124° N, 75.7873° E',
                        rating: '4.7/5.0',
                        complexityIdx: '0.52 (Arid)',
                        guide: { name: 'Vikram Singh Rathore', phone: '+91 55443 32211', email: 'vikram.royal@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Amer Fort Elephant Ride', price: '₹2,500', type: 'Royal' },
                            { activity: 'Desert Jeep Safari', price: '₹3,000', type: 'Adventure' },
                            { activity: 'Cultural Folk Night', price: '₹1,800', type: 'Cultural' }
                        ]
                    },
                    tags: ['Desert', 'Royal', 'Culture'],
                    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1000'
                },
                {
                    id: 'western-ghats',
                    city: 'Tealand Trails',
                    state: 'Kerala',
                    description: 'A voyage through the lush, misty spine of the Western Ghats. Winding roads passing through rolling tea estates and aromatic spice plantations with hidden waterfalls.',
                    details: {
                        bestSeason: 'September to March',
                        mustTry: 'Munnar Tea Estates, Vagamon Meadows, Wildlife safari.',
                        activities: 'Tea Plantation Tour, Trekking, Wildlife Spotting, Spices Tour.',
                        localFood: 'Kerala Parotta with Chicken Curry, Puttu and Kadala Curry.',
                        hiddenGem: 'Kolukkumalai Tea Estate (Highest in the world), Vagamon Meadows.',
                        climate: 'Cool and misty.',
                        coords: '10.0889° N, 77.0595° E',
                        rating: '4.8/5.0',
                        complexityIdx: '0.45 (Curves)',
                        guide: { name: 'Suju Thomas', phone: '+91 44332 21100', email: 'suju.tealand@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Munnar Tea Tour', price: '₹1,200', type: 'Nature' },
                            { activity: 'Kolukkumalai Sunrise', price: '₹2,800', type: 'Extreme' }
                        ]
                    },
                    tags: ['Greenery', 'Curves', 'Tea Gardens'],
                    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1000'
                },
                {
                    id: 'pamban-bridge',
                    city: 'Rameswaram Drive',
                    state: 'Tamil Nadu',
                    description: 'Drive over the ocean. A legendary engineering feat that connects the spiritual mainland to the sacred island of Rameswaram via a bridge over turquoise waters.',
                    details: {
                        bestSeason: 'October to April',
                        mustTry: 'Drive on Pamban Bridge, Dhanushkodi ghost town, Ramanathaswamy Temple.',
                        activities: 'Temple Visit, Ocean Drive, Ghost Town Tour, Holy Dip.',
                        localFood: 'South Indian Filter Coffee, Fish Fry, Coconut Vadai.',
                        hiddenGem: 'Dhanushkodi Lands End, Ariyaman Beach.',
                        climate: 'Hot and humid.',
                        coords: '9.2784° N, 79.2201° E',
                        rating: '4.6/5.0',
                        complexityIdx: '0.33 (Ocean Drive)',
                        guide: { name: 'Ganesh Iyer', phone: '+91 33221 10099', email: 'ganesh.rameswaram@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Dhanushkodi 4x4 Trip', price: '₹3,500', type: 'Adventure' },
                            { activity: 'Temple Ritual Tour', price: '₹800', type: 'Spiritual' }
                        ]
                    },
                    tags: ['Ocean Drive', 'Engineering', 'Spiritual'],
                    image: rameswaramImg
                }
            ]
        },
        {
            id: 'peaceful',
            label: 'Beauties Of Nature',
            description: 'Where the noise of the world fades into the whispering pines and the aroma of freshly roasted coffee. Find your inner peace in the misty valleys.',
            image: peacefulImg,
            children: [
                {
                    id: 'muniar',
                    city: 'Munnar',
                    state: 'Kerala',
                    description: 'The tea capital of the Western Ghats. A rolling landscape of emerald estates, Cascading waterfalls, and home to the rare Nilgiri Tahr in Eravikulam.',
                    details: {
                        bestSeason: 'September to March',
                        mustTry: 'Tea Museum, Anamudi Trek, Echo Point.',
                        activities: 'Tea Tasting, Mountain Trekking, Waterfall Visits, Shikara Ride.',
                        localFood: 'Appam with Stew, Karimeen Pollichathu, Kerala Sadhya.',
                        hiddenGem: 'Lakkam Waterfalls, Kolukkumalai Peak.',
                        climate: 'Cool Mountain air.',
                        coords: '10.0889° N, 77.0595° E',
                        rating: '4.8/5.0',
                        complexityIdx: '0.25 (Calm)',
                        guide: { name: 'Anu Jacob', phone: '+91 22110 09988', email: 'anu.munnar@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Tea Estate Walk', price: '₹800', type: 'Leisure' },
                            { activity: 'Elephant Junction', price: '₹2,500', type: 'Nature' }
                        ]
                    },
                    tags: ['Tea Garden', 'Calm', 'Nature'],
                    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1000'
                },
                {
                    id: 'dalhousie',
                    city: 'Dalhousie',
                    state: 'Himachal',
                    description: 'A window into the colonial past. Pine-clad slopes offering panoramic views of the Dhauladhar range and peaceful forest trails to "Mini Switzerland".',
                    details: {
                        bestSeason: 'March to June',
                        mustTry: 'Khajjiar Meadow, Dainkund Peak, Kalatop Forest.',
                        activities: 'Trekking, Nature Walks, Forest Exploring, Wildlife Spotting.',
                        localFood: 'Sidu, Patande, Madra, Dham.',
                        hiddenGem: 'Sach Pass, Ganji Pahari Trek.',
                        climate: 'Mild summers, chilly winters.',
                        coords: '32.5387° N, 75.9710° E',
                        rating: '4.5/5.0',
                        complexityIdx: '0.38 (Serene)',
                        guide: { name: 'Sandeep Thakur', phone: '+91 11009 98877', email: 'sandeep.dalhousie@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Khajjiar Adventure Pass', price: '₹1,500', type: 'Adventure' },
                            { activity: 'Kalatop Forest Trek', price: '₹2,000', type: 'Nature' }
                        ]
                    },
                    tags: ['Mountains', 'Fresh Air', 'British Era'],
                    image: dalhousieImg
                },
                {
                    id: 'coorg',
                    city: 'Coorg',
                    state: 'Karnataka',
                    description: 'The Scotland of India. A verdant retreat famous for its sprawling coffee plantations, sandalwood forests, and the unique Kodava culture.',
                    details: {
                        bestSeason: 'October to March',
                        mustTry: 'Coffee Plantation tour, Abbey Falls, Abbey Falls.',
                        activities: 'Coffee Plantation Tour, Trekking, River Rafting, Bird Watching.',
                        localFood: 'Pandi Curry (Pork), Kadambattu, Akki Roti, Bamboo Shoot Curry.',
                        hiddenGem: 'Iruppu Falls, Mandalpatti Peak (Sunset).',
                        climate: 'Cool and pleasant.',
                        coords: '12.3375° N, 75.8069° E',
                        rating: '4.7/5.0',
                        complexityIdx: '0.22 (Mist)',
                        guide: { name: 'Bopanna Kodava', phone: '+91 99008 87766', email: 'bopanna.coorg@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Coffee Plantation Trail', price: '₹1,200', type: 'Flavor' },
                            { activity: 'Abbey Falls Zip', price: '₹1,500', type: 'Adventure' }
                        ]
                    },
                    tags: ['Coffee', 'Mist', 'Scotland of India'],
                    image: coorgImg
                },
                {
                    id: 'ziro',
                    city: 'Ziro Valley',
                    state: 'Arunachal',
                    description: 'A hidden valley of the Apatani tribe. A landscape of terraced rice fields and bamboo groves that becomes a global stage for soulful music every autumn.',
                    details: {
                        bestSeason: 'September to November',
                        mustTry: 'Ziro Music Festival, Tribal Village tour, Pine grooves.',
                        activities: 'Tribal Village Life, Music Festival, Hiking, Bamboo Handicrafts.',
                        localFood: 'Bamboo Shoot Pickles, Pika Pila, Rice Beer, Roasted Pork.',
                        hiddenGem: 'Meghna Cave Temple, Talley Valley Wildlife Sanctuary.',
                        climate: 'Subtropical.',
                        coords: '27.5956° N, 93.8427° E',
                        rating: '4.9/5.0',
                        complexityIdx: '0.55 (Tribal)',
                        guide: { name: 'Tapi Apatani', phone: '+91 88997 76655', email: 'tapi.ziro@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Tribal Village Tour', price: '₹2,000', type: 'Cultural' },
                            { activity: 'Ziro Music Pass', price: '₹3,500', type: 'Festival' }
                        ]
                    },
                    tags: ['Tribal Culture', 'Greenery', 'Music Festival'],
                    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200'
                }
            ]
        },
        {
            id: 'budget',
            label: 'Backpacker\'s Bharat',
            description: 'Incredible adventures don\'t require infinite wealth. Discover the soul of India through its ancient ruins, riverside cafes, and the French charm.',
            image: backpackerImg,
            children: [
                {
                    id: 'hampi',
                    city: 'Hampi',
                    state: 'Karnataka',
                    description: 'A boulder-strewn landscape from another era. The ruins of the Vijayanagara Empire offer a surreal journey through stone-carved temples and golden sunsets.',
                    details: {
                        bestSeason: 'October to March',
                        mustTry: 'Vitthala Temple, Coracle Ride in Tungabhadra, Sunset at Matanga Hill.',
                        activities: 'Temple Hopping, Coracle Ride, Sunset Trekking, Bouldering.',
                        localFood: 'Hampi Special Thali, Badane Kaayi, Jowar Roti.',
                        hiddenGem: 'Anegundi (Monkey Palace), Hippie Island.',
                        climate: 'Hot in day, cool at night.',
                        coords: '15.3350° N, 76.4600° E',
                        rating: '4.9/5.0',
                        complexityIdx: '0.48 (History)',
                        guide: { name: 'Kiran Vijayanagar', phone: '+91 77886 65544', email: 'kiran.hampi@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Vijayanagara Ruins Tour', price: '₹1,200', type: 'History' },
                            { activity: 'Coracle Ride (Tungabhadra)', price: '₹800', type: 'Water' }
                        ]
                    },
                    tags: ['Ruins', 'History', 'UNESCO'],
                    image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&q=80&w=1000'
                },
                {
                    id: 'kasol',
                    city: 'Kasol',
                    state: 'Himachal',
                    description: 'The Little Israel of the Parvati Valley. A haven for mountain lovers, offering riverside base camps for legendary trekking trails like Kheerganga.',
                    details: {
                        bestSeason: 'March to June & September to November',
                        mustTry: 'Chalal Trek, Malana Village tour, Israelis Cuisine.',
                        activities: 'Trekking to Kheerganga, Parvati Valley Walk, Israeli Food Tour.',
                        localFood: 'Israeli Platter, Hummus, Shakshuka, Nutella Pancakes.',
                        hiddenGem: 'Tosh Village, Kheer Ganga Hot Springs.',
                        climate: 'Cool mountain weather.',
                        coords: '32.0100° N, 77.3150° E',
                        rating: '4.6/5.0',
                        complexityIdx: '0.42 (Vibe)',
                        guide: { name: 'Ishant Parvati', phone: '+91 66775 54433', email: 'ishant.kasol@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Kheerganga Trek (Guided)', price: '₹2,500', type: 'Adventure' },
                            { activity: 'Tosh Village Walk', price: '₹800', type: 'Nature' }
                        ]
                    },
                    tags: ['Youth', 'Riverside', 'Backpacking'],
                    image: 'https://images.unsplash.com/photo-1579294247411-cf0668630746?auto=format&fit=crop&q=80&w=1000'
                },
                {
                    id: 'pondicherry',
                    city: 'Pondicherry',
                    state: 'Tamil Nadu',
                    description: 'Windows of the French Quarter. Bright yellow colonial buildings, silent shores, and the spiritual experiment of Auroville await the slow traveler.',
                    details: {
                        bestSeason: 'October to March',
                        mustTry: 'Auroville Mantrimandir, Promenade Beach, French Cuisine.',
                        activities: 'Cycling, Surfing at Serenity Beach, Meditation, Pottery.',
                        localFood: 'Croissants, Ratatouille, French Pastries, Seafood Platter.',
                        hiddenGem: 'Auroville Forest, Paradise Beach (Chunnambar).',
                        climate: 'Coastal tropical.',
                        coords: '11.9416° N, 79.8083° E',
                        rating: '4.7/5.0',
                        complexityIdx: '0.28 (Slow Travel)',
                        guide: { name: 'Pierre Francois', phone: '+91 55664 43322', email: 'pierre.pondicherry@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'French Quarter Cycle Tour', price: '₹1,000', type: 'Cultural' },
                            { activity: 'Auroville Experience', price: '₹1,500', type: 'Spiritual' }
                        ]
                    },
                    tags: ['French', 'Heritage', 'Spiritual'],
                    image: 'https://images.unsplash.com/photo-1582512390192-34356e9c20f1?auto=format&fit=crop&q=80&w=1000'
                },
                {
                    id: 'khajjiar',
                    city: 'Khajjiar',
                    state: 'Himachal',
                    description: 'A meadow in the heart of the forest. Surrounded by thick cedar woods, this rolling green carpet is the perfect place to listen to the silence.',
                    details: {
                        bestSeason: 'March to June',
                        mustTry: 'Zorbing in the meadow, Horse riding, Lake walk.',
                        activities: 'Horse Riding, Zorbing, Forest Trekking, Photography.',
                        localFood: 'Himachali Dham, Sidu, Babru.',
                        hiddenGem: 'Panchpula, Kalatop Wildlife Sanctuary.',
                        climate: 'Temperate.',
                        coords: '32.5458° N, 76.0645° E',
                        rating: '4.4/5.0',
                        complexityIdx: '0.15 (Zen)',
                        guide: { name: 'Megha Chamba', phone: '+91 44553 32211', email: 'megha.khajjiar@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Zorbing in Meadow', price: '₹500', type: 'Fun' },
                            { activity: 'Horse Riding (Full Loop)', price: '₹800', type: 'Adventure' }
                        ]
                    },
                    tags: ['Meadow', 'Lake', 'Silence'],
                    image: khajjiarImg
                }
            ]
        },
        {
            id: 'wildlife',
            label: 'The Living Jungle',
            description: 'Step into the realm of the Royal Bengal Tiger and the One-Horned Rhino. Witness the untamed majesty of India\'s pristine national parks.',
            image: jungleImg,
            children: [
                {
                    id: 'jim-corbett',
                    city: 'Jim Corbett',
                    state: 'Uttarakhand',
                    description: 'The birthplace of tiger conservation in India. A dense forest landscape where the tiger rules the shadows and the landscape changes from grasslands to deep river beds.',
                    details: {
                        bestSeason: 'November to June',
                        mustTry: 'Jeep Safari at Dhikala, Elephant Safari, River Kosi trekking.',
                        activities: 'Jeep Safari, Elephant Riding, Bird Watching, Nature Photography.',
                        localFood: 'Kumaoni Raita, Bhatt ki Churkani, Bal Mithai.',
                        hiddenGem: 'Sitabani Buffer Zone, Corbett Falls.',
                        climate: 'Subtropical monsoon.',
                        coords: '29.5300° N, 78.7747° E',
                        rating: '4.5/5.0',
                        complexityIdx: '0.65 (Jungle)',
                        guide: { name: 'Ravi Corbett', phone: '+91 33442 21100', email: 'ravi.jim@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Premium Jeep Safari', price: '₹4,500', type: 'Wildlife' },
                            { activity: 'Elephant Back Expedition', price: '₹3,500', type: 'Adventure' },
                            { activity: 'Luxury Forest Stay', price: '₹8,500', type: 'Group Tour' }
                        ]
                    },
                    tags: ['Tiger', 'Jungle', 'Safari'],
                    image: 'https://images.unsplash.com/photo-1521235042493-c5bef8b4ce29?auto=format&fit=crop&q=80&w=1000'
                },
                {
                    id: 'kaziranga',
                    city: 'Kaziranga',
                    state: 'Assam',
                    description: 'A swampy paradise for the prehistoric rhinoceros. Explore the tall elephant grass of the Brahmaputra floodplains, home to two-thirds of the world\'s rhino population.',
                    details: {
                        bestSeason: 'November to April',
                        mustTry: 'Elephant Safari, Bird watching, Orchid Park.',
                        activities: 'Elephant Safari, Jeep Safari, Bird Watching, River Cruise.',
                        localFood: 'Assamese Fish Curry, Masor Tenga, Bamboo Shoot Fry.',
                        hiddenGem: 'Hoollongapar Gibbon Sanctuary, Majuli Island (Nearby).',
                        climate: 'Tropical monsoonal.',
                        coords: '26.5775° N, 93.1711° E',
                        rating: '4.9/5.0',
                        complexityIdx: '0.72 (Swamp)',
                        guide: { name: 'Gogoi Assam', phone: '+91 22331 10099', email: 'gogoi.kaziranga@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Elephant Rhino Safari', price: '₹3,500', type: 'Wildlife' },
                            { activity: 'Jeep Safari (Central Zone)', price: '₹4,000', type: 'Adventure' }
                        ]
                    },
                    tags: ['Rhino', 'Swamps', 'Unesco World Heritage'],
                    image: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&q=80&w=1000'
                },
                {
                    id: 'gir',
                    city: 'Gir Forest',
                    state: 'Gujarat',
                    description: 'The only home of the Asiatic Lion. A unique dry deciduous forest where the king of the jungle roams free in the rugged hilly terrain of Saurashtra.',
                    details: {
                        bestSeason: 'December to March',
                        mustTry: 'Lion Safari, Crocodile breeding center, Bird watching.',
                        activities: 'Lion Safari, Crocodile Hatchery Visit, Bird Watching, Tribal Village Tour.',
                        localFood: 'Gujarati Thali, Dhokla, Thepla, Kathiawari Food.',
                        hiddenGem: 'Devalia Safari Park, Somnath Temple (Nearby).',
                        climate: 'Tropical dry.',
                        coords: '21.1243° N, 70.8242° E',
                        rating: '4.8/5.0',
                        complexityIdx: '0.62 (Bush)',
                        guide: { name: 'Siddharth Jadeja', phone: '+91 11220 09988', email: 'siddharth.gir@dekhoindia.in' },
                        bookingOptions: [
                            { activity: 'Asiatic Lion Safari', price: '₹5,000', type: 'Wildlife' },
                            { activity: 'Crocodile Breeding Visit', price: '₹800', type: 'Educational' }
                        ]
                    },
                    tags: ['Lion', 'Safari', 'Conservation'],
                    image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&q=80&w=1000'
                }
            ]
        }
    ]
};

// --- ALGORITHMS ---
export const findNodeById = (root, id) => {
    if (root.id === id) return root;
    if (root.children) {
        for (const child of root.children) {
            const result = findNodeById(child, id);
            if (result) return result;
        }
    }
    return null;
};

/**
 * THE PATH FINDER: (DFS Algorithm)
 * This function finds the path from 'Root' to 'Target'.
 * It works EXACTLY like the Java version in DekhoIndia.java.
 */
export const getPathToNode = (root, targetId) => {

    const getPath = (current, target, path) => {
        // 1. Add current node to path
        const newPath = [...path, current];

        // 2. Check: Is this the target?
        if (current.id === target) {
            return newPath;
        }

        // 3. Search children
        if (current.children) {
            for (const child of current.children) {
                const result = getPath(child, target, newPath);
                if (result) return result;
            }
        }

        // 4. Return null if not found
        return null;
    };

    return getPath(root, targetId, []);
};

/**
 * UTILITY: Is this a leaf node?
 */
export const isLeaf = (node) => {
    return !node.children || node.children.length === 0 || !!node.city;
};

/**
 * RECURSIVE FLATTENING: Extractions of all Leaf Nodes (Destinations)
 * This turns our Tree into a simple List.
 */
export const getAllDestinations = (node = treeData, list = []) => {
    if (isLeaf(node)) {
        if (node.city) list.push(node);
    } else if (node.children) {
        node.children.forEach(child => getAllDestinations(child, list));
    }
    return list;
};


/**
 * THE DISCOVERY CHAIN (Circular Linked List Logic)
 * We treat all cities as a chain. Recommendation = Next cities in the chain.
 */
export const getRecommendations = (currentNodeId, count = 3) => {
    const all = getAllDestinations();

    // 1. Find where we are in the list
    const currentIndex = all.findIndex(d => d.id === currentNodeId);

    // 2. Get the NEXT cities (Circular loop)
    const recommendations = [];
    for (let i = 1; i <= count; i++) {
        const nextIndex = (currentIndex + i) % all.length;
        recommendations.push(all[nextIndex]);
    }

    return recommendations;
};

// --- TRIE IMPLEMENTATION FOR PREFIX SEARCH ---
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.nodeData = null; // Store the actual city node reference
    }
}

export class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(cityNode) {
        let current = this.root;
        const word = cityNode.city.toLowerCase();
        for (const char of word) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isEndOfWord = true;
        current.nodeData = cityNode;
    }

    search(prefix) {
        let current = this.root;
        for (const char of prefix.toLowerCase()) {
            if (!current.children[char]) return [];
            current = current.children[char];
        }

        const results = [];
        this._collectWords(current, results);
        return results;
    }

    _collectWords(node, results) {
        if (node.isEndOfWord) results.push(node.nodeData);
        for (const child in node.children) {
            this._collectWords(node.children[child], results);
        }
    }
}

export const buildTrieFromTree = (root) => {
    const trie = new Trie();
    const destinations = getAllDestinations(root);
    destinations.forEach(dest => trie.insert(dest));
    return trie;
};
