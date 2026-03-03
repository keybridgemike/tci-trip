// ============================================
// TCI Trip Planner - App Logic
// ============================================

const TRIP_DATE = new Date('2026-06-15T00:00:00');

const VILLA_IMAGES = [
  'https://a0.muscache.com/im/pictures/miso/Hosting-1344539383866633779/original/9943450f-d8d5-4221-940a-cc665b34e111.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-1344539383866633779/original/c5f82476-1268-4b24-b553-062540feb095.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-1344539383866633779/original/aca26ee1-0b42-42bc-a85b-92b46ffbe32e.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-1344539383866633779/original/395b096d-c330-4803-b0f2-d5a0a09e2aa5.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-1344539383866633779/original/58db5404-d397-486d-9f7d-94402e877a3a.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-1344539383866633779/original/c93787f3-0b6b-4780-80a3-8684f2a03156.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-1344539383866633779/original/59484979-e179-4370-b1b0-5681692a79cb.jpeg',
  'https://a0.muscache.com/im/pictures/miso/Hosting-1344539383866633779/original/e16cedd6-c756-4ccf-9b37-e224793a7531.jpeg',
];

const AIRPORTS = {
  RIC: { name: 'Richmond', lat: 37.5052, lng: -77.3197 },
  IAD: { name: 'Washington Dulles', lat: 38.9531, lng: -77.4565 },
  PLS: { name: 'Providenciales', lat: 21.7736, lng: -72.2659 },
};

const VILLA = { lat: 21.7480, lng: -72.2886, name: 'Blue Chill Villa' };

// --- Restaurant Data with distances from villa ---
const RESTAURANTS = [
  { id: 'lasbrisas', name: 'Las Brisas', type: 'both', lat: 21.7445, lng: -72.2832, rating: 4.4, reviews: 2159, price: '$$-$$$', distance: '0.6 mi', driveTime: 'Walkable', nearby: true, pizza: true, cuisine: 'Mediterranean-Caribbean' },
  { id: 'bugaloos', name: "Bugaloo's Conch Crawl", type: 'dinner', lat: 21.7645, lng: -72.2610, rating: 4.4, reviews: 942, price: '$$-$$$', distance: '2.7 mi', driveTime: '5 min', nearby: true, cuisine: 'Conch & Seafood' },
  { id: 'sweetts', name: "Sweet T's", type: 'dinner', lat: 21.7760, lng: -72.2670, rating: 4.5, reviews: 283, price: '$', distance: '3.0 mi', driveTime: '6 min', nearby: true, cuisine: 'Fried Chicken' },
  { id: 'omars', name: "Omar's Beach Hut", type: 'dinner', lat: 21.757, lng: -72.246, rating: 4.6, reviews: 734, price: '$$', distance: '3.5 mi', driveTime: '8 min', nearby: true, cuisine: 'Caribbean Seafood' },
  { id: 'daconch', name: 'Da Conch Shack', type: 'dinner', lat: 21.7875, lng: -72.2566, rating: 4.4, reviews: 4200, price: '$$-$$$', distance: '4.3 mi', driveTime: '9 min', nearby: true, cuisine: 'Conch & Caribbean' },
  { id: 'mangrovebay', name: 'Mangrove Bay', type: 'dinner', lat: 21.784, lng: -72.260, rating: 4.5, reviews: 350, price: '$-$$', distance: '5.0 mi', driveTime: '12 min', nearby: true, cuisine: 'Authentic TCI' },
  { id: 'baci', name: 'Baci Ristorante', type: 'dinner', lat: 21.790, lng: -72.210, rating: 4.5, reviews: 850, price: '$$', distance: '6.5 mi', driveTime: '14 min', nearby: false, pizza: true, cuisine: 'Italian' },
  { id: 'mrgroupers', name: "Mr. Grouper's", type: 'dinner', lat: 21.790, lng: -72.196, rating: 4.4, reviews: 3000, price: '$-$$', distance: '7.0 mi', driveTime: '15 min', nearby: false, cuisine: 'Local TCI Seafood' },
  { id: 'lua', name: 'Lua Beach House', type: 'both', lat: 21.7745, lng: -72.2030, rating: 4.9, reviews: 120, price: '$$$', distance: '7.3 mi', driveTime: '15 min', nearby: false, pizza: true, cuisine: 'Global Fusion' },
  { id: 'bluewater', name: 'Blue Water Bistro', type: 'dinner', lat: 21.797, lng: -72.199, rating: 4.9, reviews: 685, price: '$$$', distance: '8.0 mi', driveTime: '18 min', nearby: false, cuisine: 'Caribbean Seafood' },
  { id: 'cocovan', name: 'Cocovan', type: 'dinner', lat: 21.793, lng: -72.185, rating: 4.7, reviews: 1072, price: '$-$$', distance: '8.0 mi', driveTime: '18 min', nearby: false, cuisine: 'Gourmet Street Food' },
  { id: 'baybistro', name: 'Bay Bistro', type: 'both', lat: 21.799, lng: -72.178, rating: 4.5, reviews: 3200, price: '$$-$$$', distance: '8.5 mi', driveTime: '20 min', nearby: false, cuisine: 'Caribbean Beachfront' },
  { id: 'caicosbakery', name: 'Caicos Bakery', type: 'breakfast', lat: 21.795, lng: -72.175, rating: 4.4, reviews: 1360, price: '$', distance: '8.5 mi', driveTime: '18 min', nearby: false, cuisine: 'French Bakery' },
  { id: 'hemingways', name: "Hemingway's on the Beach", type: 'both', lat: 21.7951, lng: -72.1875, rating: 4.1, reviews: 3381, price: '$$', distance: '9.1 mi', driveTime: '18 min', nearby: false, cuisine: 'Caribbean Beachfront' },
  { id: 'infiniti', name: 'Infiniti Restaurant & Raw Bar', type: 'dinner', lat: 21.799, lng: -72.173, rating: 4.5, reviews: 2971, price: '$$$', distance: '9.0 mi', driveTime: '20 min', nearby: false, cuisine: 'Sushi & Fine Dining' },
  { id: 'parallel23', name: 'Parallel 23', type: 'dinner', lat: 21.798, lng: -72.169, rating: 4.3, reviews: 1113, price: '$$$', distance: '9.0 mi', driveTime: '20 min', nearby: false, cuisine: 'Caribbean Fusion' },
  { id: 'provence', name: 'Provence by Eric', type: 'dinner', lat: 21.7950, lng: -72.1830, rating: 4.4, reviews: 1085, price: '$$$', distance: '9.4 mi', driveTime: '19 min', nearby: false, cuisine: 'French Fine Dining' },
  { id: 'shay', name: 'Shay Cafe & Lounge', type: 'breakfast', lat: 21.7953, lng: -72.1826, rating: 4.6, reviews: 1000, price: '$', distance: '9.5 mi', driveTime: '19 min', nearby: false, cuisine: 'Cafe & Breakfast' },
  { id: 'caicoscafe', name: 'Caicos Cafe', type: 'dinner', lat: 21.7955, lng: -72.1741, rating: 4.4, reviews: 1800, price: '$$-$$$', distance: '10.1 mi', driveTime: '20 min', nearby: false, cuisine: 'Italian-Caribbean' },
  { id: 'cocobistro', name: 'Coco Bistro', type: 'dinner', lat: 21.7960, lng: -72.1703, rating: 4.6, reviews: 5200, price: '$$$', distance: '10.4 mi', driveTime: '21 min', nearby: false, cuisine: 'Caribbean Fine Dining' },
  { id: 'coyaba', name: 'Coyaba Restaurant', type: 'dinner', lat: 21.7985, lng: -72.1707, rating: 4.5, reviews: 2100, price: '$$$', distance: '10.4 mi', driveTime: '21 min', nearby: false, cuisine: 'Caribbean Fusion' },
  { id: 'bellaluna', name: 'Bella Luna Ristorante & Pizzeria', type: 'dinner', lat: 21.7935, lng: -72.1780, rating: 4.3, reviews: 1367, price: '$$-$$$', distance: '9.8 mi', driveTime: '20 min', nearby: false, pizza: true, cuisine: 'Italian Pizzeria' },
  { id: 'pizzapizza', name: 'Pizza Pizza La Terrazza', type: 'dinner', lat: 21.7940, lng: -72.1750, rating: 4.0, reviews: 680, price: '$-$$', distance: '10.0 mi', driveTime: '20 min', nearby: false, pizza: true, cuisine: 'Pizza & Italian' },
];

// --- Deep restaurant detail data ---
const DETAILS = {
  lasbrisas: {
    synopsis: 'Mediterranean-inspired cuisine with a Caribbean splash, overlooking the stunning turquoise waters of Chalk Sound National Park. Five chefs from Thailand, Philippines, Dominican Republic, Haiti, and TCI create an eclectic menu. The closest restaurant to the villa — just a short stroll down Chalk Sound Drive. Tiki torches, a waterfront gazebo, and a poolside bar make this the perfect sunset dinner spot.',
    familyNote: 'Excellent for families. Kayak, SUP, paddle boat, and canoe rentals on-site. Kids menu available. "Sushi on the Sound" is a family-friendly hit. Teens can explore while parents enjoy drinks on the deck. Lunch is casual; dinner is more upscale.',
    hours: 'Daily 9:00 AM - 10:00 PM',
    phone: '+1 (649) 946-5306',
    email: 'LasBrisastci@aol.com',
    website: 'https://neptunevillastci.com/index.php/las-brisas-restaurant-bar/',
    reservations: 'Recommended for dinner. Walk-ins fine for lunch.',
    address: '533 Chalk Sound Road, Neptune Villas',
    instagram: 'https://www.instagram.com/lasbrisasrestauranttci/',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147399-d1799352',
    menuLink: 'https://neptunevillastci.com/index.php/las-brisas-restaurant-bar/',
    perPerson: '$50-80+',
    menu: [
      { section: 'Tapas & Appetizers', items: [
        { name: 'Fish Ceviche', price: '' },
        { name: 'Coconut Crusted Snapper Tacos', price: '' },
        { name: 'Mussels in Garlic Cream Sauce', price: '' },
        { name: 'Tuna Poke', price: '' },
        { name: 'Himalayan Salt Cured Tuna', price: '' },
        { name: 'Chilli & Garlic Calamari', price: '' },
        { name: 'Crab Cake (panko crust, saffron mayo)', price: '' },
        { name: 'Lobster & Shrimp Dumplings', price: '' },
        { name: 'Conch Bisque with Pastry Lid', price: '~$10' },
        { name: 'Chickpeas with Chorizo', price: '~$14' },
      ]},
      { section: 'Entrees', items: [
        { name: 'Caicos Lobster Thermidor', price: '' },
        { name: 'Seafood Paella (45 min prep)', price: '' },
        { name: 'Fresh Fish of the Day', price: '', note: 'grilled, pan-fried, cracked, blackened, or Creole' },
        { name: 'Tuna Steak', price: '' },
        { name: 'Beef Wellington (8oz tenderloin)', price: '' },
        { name: 'Rack of Lamb', price: '' },
        { name: 'BBQ Ribs', price: '' },
        { name: 'Surf & Turf', price: '' },
        { name: 'Baked-to-Order Specialty Pizzas', price: '' },
      ]},
      { section: 'Sushi on the Sound', items: [
        { name: 'Fresh sushi rolls (described as "HUGE")', price: '' },
        { name: 'Full separate sushi menu available on-site', price: '' },
      ]},
      { section: 'Desserts', items: [
        { name: 'Coconut Rum Cake (Myers Dark Rum)', price: '' },
        { name: 'Apple Pie a la Mode', price: '' },
        { name: 'Chocolate Cake', price: '' },
      ]},
      { section: 'Drinks', note: 'Extensive wine list. Signature "Chalk Sound" cocktail: coconut rum, white rum, Peach Schnapps, Blue Curacao.' },
    ],
    reviews: [
      { text: 'Praised the Surf & Turf, comparing the steak quality favorably to Ruth\'s Chris Steakhouse. Excellent service and the views of Chalk Sound are stunning.', author: 'Tami F.', date: 'November 2025', rating: 5 },
      { text: '"Fresh, expertly prepared, and absolutely spot on" — describing the sushi. The panoramic Chalk Sound views enhanced the complete dining experience.', author: 'Jay G.', date: 'May 2025', rating: 4 },
      { text: 'Found the mussels in garlic cream sauce exceptional. Visited multiple times during the trip, praising conch fritters and jerk chicken wrap.', author: 'Randy K.', date: 'August 2025', rating: 4 },
    ],
  },

  bugaloos: {
    synopsis: 'Famous for conch prepared every way imaginable, Bugaloo\'s sits right on Five Cays Beach next to the active fisherman\'s dock. Watch conch being harvested and tenderized right in front of the restaurant. Tables under trees with bistro lights, feet in the sand, and live music most days. Now with a second Grace Bay location.',
    familyNote: 'Great for families. Very casual, feet-in-the-sand dining. Kids can explore the live conch pen right off the shore. Live music daily at lunch, live bands Fri/Sat/Sun evenings, fire dancers, and outdoor games. Flip-flops absolutely appropriate.',
    hours: 'Daily 11:30 AM - 10:00 PM',
    phone: '+1 (649) 941-3863',
    email: 'michaelstolow@gmail.com',
    website: 'https://www.bugaloostci.com/',
    menuLink: 'https://www.bugaloostci.com/',
    reservations: 'Walk-ins welcome. Call for groups of 6+.',
    address: 'Five Cays Road, Five Cays Beach',
    instagram: '',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147399-d23707556',
    perPerson: '$40-70',
    menu: [
      { section: 'Starters', items: [
        { name: 'Conch Fritters', price: '$10' },
        { name: 'Original Conch Salad Ceviche', price: '$25' },
        { name: 'Conch Chowder', price: '$23' },
        { name: 'Conch Wonton Wrappers', price: '' },
        { name: 'Caribbean Lobster Nuggets', price: '' },
      ]},
      { section: 'Conch Entrees', items: [
        { name: 'Coconut Cracked Conch', price: '$18' },
        { name: 'Cracked Conch', price: '$18' },
        { name: 'Sauteed Conch', price: '$25' },
        { name: 'Scorched Conch', price: '' },
        { name: 'Conch Burger', price: '' },
      ]},
      { section: 'Seafood & More', items: [
        { name: 'Snapper or Grouper (with side & salad)', price: '' },
        { name: 'Garlic Butter Shrimp', price: '' },
        { name: 'Coconut Shrimp', price: '' },
        { name: 'Fresh Lobster (seasonal)', price: '' },
        { name: 'Burgers', price: '' },
      ]},
      { section: 'Desserts', items: [
        { name: 'Key Lime Pie', price: '$12' },
        { name: 'Rum Cake', price: '$15' },
      ]},
    ],
    reviews: [
      { text: '"Our party of 13 had an incredible night at Bugaloo\'s!! Staff was fun and attentive." Group ages ranged from 9 months to 70 years old. Praised the grouper and conch fritters.', author: 'OpenTable Diner', date: '2025', rating: 5 },
      { text: '"The best cracked conch and lobster on the island... food is spectacular and the view is beautiful." They farm the conch there and tenderize it right in front of you.', author: 'TripAdvisor Reviewer', date: '2025', rating: 5 },
      { text: '"The conch fritters were the best we\'ve had" and their daughter "loved the conch sushi roll." Food portions are large enough to share.', author: 'TripAdvisor Reviewer', date: '2024', rating: 4 },
      { text: 'Note: Some reviewers report service can be slow when busy — "waits of over an hour" before food. Food quality is high but service can be inconsistent.', author: 'Various', date: '2024-2025', rating: 3 },
    ],
  },

  sweetts: {
    synopsis: 'The cheapest meal on Providenciales and a beloved local institution for two decades. This bright pink-and-white walk-up shack serves one thing perfectly: fried chicken wings and fries. Order by the dollar amount. Multiple reviewers call it "TCI KFC" — but better and far cheaper. CASH ONLY.',
    familyNote: 'Great quick stop, not a sit-down meal. Perfect for grabbing cheap food on the way to/from the airport, a budget snack between activities, or a beach picnic. Your 15-year-old will think it\'s cool to eat where the locals eat. Your 11-year-old will love the fried chicken.',
    hours: 'Daily ~8:00 AM - 10:00 PM (informal hours)',
    phone: '+1 (649) 345-5664',
    email: '',
    website: 'https://www.visittci.com/providenciales/sweet-t',
    reservations: 'No reservations. Walk up, order, wait 5-10 min.',
    address: 'Airport Road, next to the Texaco Station',
    instagram: '',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147399-d2572451',
    cashOnly: true,
    perPerson: '$3-5',
    menu: [
      { section: 'The Menu (that\'s it!)', items: [
        { name: 'Fried Chicken Wings', price: 'from $3', note: 'order by dollar amount' },
        { name: 'French Fries (plain or seasoned)', price: 'from $2' },
        { name: 'Combo with Drink', price: '~$5' },
        { name: '12 pieces of chicken', price: '$6' },
      ]},
    ],
    reviews: [
      { text: '"Cheapest meal you\'ll find on the island and it\'s good. Wings, fries, ketchup — that\'s it and it\'s perfect."', author: 'Joseph Geary', date: 'December 2025', rating: 5 },
      { text: '"Best place on the island to get the cheapest food. Wings and fries combos starting at $3-$5."', author: 'Dame', date: 'July 2025', rating: 5 },
      { text: '"The best tasting fried chicken I\'ve had in a long long time" and "chicken seasoned and fried to perfection."', author: 'Multiple Reviewers', date: '2024-2025', rating: 5 },
    ],
  },

  daconch: {
    synopsis: 'Iconic beach bar and restaurant on Blue Hills Beach, famous for its conch prepared every way and legendary rum punch. Picnic tables under coconut palms, feet in the sand, turquoise water steps away. The Wednesday night Junkanoo party with the We Funk band, fire dancers, and DJ is a signature TCI experience.',
    familyNote: 'Excellent for families. Reviewers call it "super kid friendly with lots of things for kids to do like tiki toss and a tire swing." The Wednesday night Junkanoo party would be a memorable experience for both teens. Beach setting is relaxed and unpretentious.',
    hours: 'Daily 11:00 AM - 9:00 PM',
    phone: '+1 (649) 946-8877',
    email: 'info@daconchshack.com',
    website: 'https://daconchshack.com/',
    menuLink: 'https://daconchshack.com/',
    reservations: 'Walk-ins welcome ("Just come on in!"). REQUIRED for Wednesdays (Junkanoo) and parties of 6+.',
    address: 'Blue Hills Road, Blue Hills Beach',
    instagram: 'https://www.instagram.com/daconchshack/',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147399-d1360911',
    perPerson: '$35-60',
    menu: [
      { section: 'Conch Specialties', items: [
        { name: 'Conch Salad (fresh, made to order)', price: '~$15' },
        { name: '"Best Ever" Conch Fritters (3pc)', price: '$6' },
        { name: 'Conch Fritters (6pc)', price: '$10' },
        { name: 'Conch Fritters (12pc)', price: '$18' },
        { name: 'Conch Chowder', price: '' },
        { name: 'Cracked Conch', price: '' },
        { name: 'Scorched Conch', price: '' },
      ]},
      { section: 'Entrees', items: [
        { name: 'Fresh Fish of the Day', price: '' },
        { name: 'Caribbean Spiny Lobster (seasonal)', price: '', note: 'butter, cracked, poached, or grilled' },
        { name: 'Jerk Chicken / Jerk Chicken Tacos', price: '' },
        { name: 'Jerk Ribs', price: '', note: '"10 out of 10" per reviewers' },
        { name: 'Grilled Shrimp', price: '' },
        { name: 'BBQ Ribs', price: '' },
        { name: 'Da Conch Shack Burger', price: '' },
        { name: 'Fish Tacos (deconstructed style)', price: '' },
        { name: 'Surf and Turf', price: '' },
      ]},
      { section: 'Drinks', note: 'Signature rum punch (a must-try). Smoothies, virgin cocktails, full bar at the Rum Bar.' },
    ],
    reviews: [
      { text: 'Celebrated their 35th birthday here. Called the food "AMAZING" and rated the jerk ribs "10 out of 10." Went back within the same week to try other menu items.', author: 'Birthday Visitor', date: 'February 2025', rating: 5 },
      { text: '"The food is always fresh and the atmosphere is everything especially when Jamesly is serving" — praised his "upbeat presence makes the experience even better."', author: 'TripAdvisor Reviewer', date: '2025', rating: 5 },
      { text: 'Had the conch appetizer, jerk chicken, ribs and grilled shrimp. "Everything was fresh and delicious." Found the grouper "out of this world delicious."', author: 'TripAdvisor Reviewer', date: '2024', rating: 5 },
    ],
  },

  lua: {
    synopsis: 'Modern luxury dining at the South Bank Resort on Long Bay, with a seawater swimming lagoon, fire tables, and rattan-lamp-lit dining overlooking the water. The most upscale restaurant on this list, serving exceptional global fusion cuisine. Friday Pizza Night is a family favorite. "Sandy toes and salty hair are always welcome."',
    familyNote: 'Good for families despite the upscale setting. Kids menu ($14-16) goes beyond chicken fingers. Pizza menu available all day. Happy Hour Thu/Sat 5:30-7:30 PM is perfect for parent cocktails while teens try the virgin cocktails ($12-17). Long Bay is about 15 min drive from the villa.',
    hours: 'Breakfast 7-10:30 AM | Lunch 12-5 PM | Dinner 5:30-9:30 PM | Pizza 11 AM-9:30 PM',
    phone: '+1 (649) 941-2500',
    email: 'reservations@southbankresort.com',
    website: 'https://luabeachhouse.com/',
    menuLink: 'https://southbank.gracebayresorts.com/lua-menus/',
    reservations: 'Recommended. Book via OpenTable or call.',
    opentable: 'https://www.opentable.com/r/lua-beach-house-providenciales',
    address: 'South Bank Resort, Long Bay',
    instagram: '',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g25253398-d29012111',
    perPerson: '$80-150+ (plus 22% tax/service)',
    menu: [
      { section: 'Breakfast Highlights', items: [
        { name: 'Full English Breakfast', price: '$39' },
        { name: 'Eggs Benedict / Royale / Florentine', price: '$39' },
        { name: 'Lua Shakshuka (organic eggs, feta)', price: '$39' },
        { name: 'Avocado Toast (poached eggs, sourdough)', price: '' },
        { name: 'American Pancakes (maple, berries)', price: '' },
        { name: 'Steak and Egg (14-day dry aged ribeye)', price: '$49' },
        { name: 'Crab Cake Benedict', price: '$47' },
      ]},
      { section: 'Lunch Highlights', items: [
        { name: 'Southbank Burger', price: '$25' },
        { name: 'Steak Sandwich', price: '$25' },
        { name: 'Red Snapper Ceviche', price: '$21' },
        { name: 'Salmon Teriyaki Bowl', price: '$25' },
        { name: 'Crispy Shrimp & Avocado Roll', price: '$29' },
        { name: 'Grilled Local Tuna', price: '$39' },
        { name: 'Flat Iron Chicken', price: '$28' },
      ]},
      { section: 'Dinner - From the Sea', items: [
        { name: 'Atlantic Dorade', price: '$47' },
        { name: 'Soy Ginger Glazed Scottish Salmon', price: '$49' },
        { name: 'Sustainable Local Red Snapper', price: '$49' },
        { name: 'Wild Caught Jumbo Prawns', price: '$68' },
        { name: 'Charcoal Roasted Cod', price: '$49' },
      ]},
      { section: 'Dinner - From the Land', items: [
        { name: 'Chicken Tikka Masala', price: '$43' },
        { name: 'Moroccan Lamb Shank Tagine', price: '$47' },
        { name: 'Grass Fed Prime Tenderloin 6oz', price: '$60' },
        { name: '10oz USDA Prime Ribeye', price: '$60' },
        { name: '30-Day Dry-Aged Tomahawk for Two (32oz)', price: '$175' },
      ]},
      { section: 'Pizza (All Day)', items: [
        { name: 'Margherita', price: '$24' },
        { name: 'Pepperoni', price: '$25' },
        { name: 'Prosciutto', price: '$29' },
        { name: 'Lobster', price: '$32' },
        { name: 'Truffle', price: '$36' },
      ]},
      { section: 'Desserts', items: [
        { name: 'Signature Chocolate Souffle (15 min wait)', price: '$21' },
        { name: 'Tiramisu', price: '$18' },
        { name: 'Yuzu Cheesecake', price: '$18' },
      ]},
      { section: 'Kids Menu', items: [
        { name: 'Spaghetti / Sandwich / Chicken Fingers / Burger', price: '$14' },
        { name: 'Pizza', price: '$16' },
        { name: 'Brownie w/ Ice Cream', price: '$12' },
      ]},
    ],
    reviews: [
      { text: '"Excellent food, ambiance and service."', author: 'OpenTable Diner', date: 'January 2026', rating: 5 },
      { text: '"The staff, the atmosphere, the food... everything was just amazing. The sunset was just as spectacular as the food, true fine dining but still relaxed calm atmosphere."', author: 'TripAdvisor Family', date: 'July 2025', rating: 5 },
      { text: 'Highlighted the soba noodle salad starter, jumbo prawns "cooked perfectly." Called it "our best dinner experience while on island" with "fabulous food, fantastic setting, and impeccable service."', author: 'TripAdvisor Reviewer', date: '2025', rating: 5 },
    ],
  },

  hemingways: {
    synopsis: 'A 26-year Grace Bay Beach institution, Hemingway\'s offers casual open-air beachfront dining with tables literally on the sand. Known for their award-winning Red Conch Chowder, solid breakfast, and sunset views. Part of The Sands Resort. TripAdvisor Travelers\' Choice Award 2024.',
    familyNote: 'Excellent for families. Relaxed Caribbean beach club vibe — flip-flops and sundresses, not white tablecloth. Kids menu ($13) for 12 & under. Kids can play on the beach before/after dinner. Great breakfast spot that\'s not too formal or pricey.',
    hours: 'Daily 8 AM - 10 PM (Breakfast 8-11, Lunch 11-6, Dinner 6-10)',
    phone: '+1 (649) 941-8408',
    email: 'carolyn@hemingwaystci.com',
    website: 'https://www.hemingwaystci.com',
    menuLink: 'https://www.hemingwaystci.com/dinner',
    reservations: 'Recommended for dinner. Walk-ins OK for breakfast/lunch.',
    address: 'The Sands at Grace Bay, Grace Bay Beach',
    instagram: 'https://www.instagram.com/hemingwaystci/',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147399-d1046328',
    perPerson: '$40-80',
    menu: [
      { section: 'Breakfast', items: [
        { name: 'Eggs & Eggs (2 eggs, hash browns, toast, bacon/sausage)', price: '$16.75' },
        { name: 'The Ernest Omelette (3-egg, cheddar)', price: '$17.95' },
        { name: 'Toasted Almond Pancakes', price: '$16.75' },
        { name: 'Cinnamon Raisin French Toast', price: '$17.50' },
        { name: 'Huevos Rancheros La Tequila', price: '$17.25' },
        { name: 'Eggs Benedict — Ham', price: '$18.50' },
        { name: 'Eggs Benedict — Smoked Salmon', price: '$19.50' },
        { name: 'Bagel Sandwich', price: '$13.00' },
      ]},
      { section: 'Lunch Favorites', items: [
        { name: 'Red Conch Chowder (award-winning)', price: '$16.00' },
        { name: 'Conch Trio (Fritters/Fingers/Salad)', price: '$18.25' },
        { name: 'Papa Burger (8oz sirloin)', price: '$17.95' },
        { name: 'Soft Fish Tacos', price: '$17.95' },
        { name: 'Fish and Chips', price: '$18.50' },
        { name: 'Grilled Chicken Club', price: '$17.75' },
        { name: 'Steak Tacos', price: '$17.75' },
        { name: 'Caesar Salad', price: '$12.50' },
      ]},
      { section: 'Dinner - Seafood', items: [
        { name: 'Blackened Salmon', price: '$40' },
        { name: 'Grilled Snapper', price: '$40' },
        { name: 'Grilled Grouper', price: '$42' },
        { name: 'Seared Ahi Tuna', price: '$42' },
        { name: 'Curry Lobster', price: '$42' },
        { name: 'Lobster Tail (8oz)', price: '$47' },
      ]},
      { section: 'Dinner - Meat', items: [
        { name: 'Chicken Breast', price: '$38' },
        { name: 'Blackened Porterhouse Porkchop (16oz)', price: '$42' },
        { name: 'Filet Mignon (8oz)', price: '$50' },
        { name: 'Rack of Lamb', price: '$50' },
        { name: 'Surf N\' Turf', price: '$75' },
      ]},
      { section: 'Kids Menu (12 & under)', items: [
        { name: 'Pasta / Fish Fingers / Chicken Fingers / Burger / Hot Dog', price: '$13' },
      ]},
    ],
    reviews: [
      { text: 'Praised the meal as "fantastic" with "amazing sunset views." The "filet, tuna and salmon were terrific."', author: 'TripAdvisor Reviewer', date: '2025', rating: 5 },
      { text: '"Blackened seared tuna with jasmine rice and asparagus spears cooked to perfection." Server brought a free surprise dessert.', author: 'TripAdvisor Reviewer', date: '2025', rating: 5 },
      { text: '"The Conch Chowder was revelatory." Called the conch fritters "my personal favorite on the island — well spiced with generous portions."', author: 'TripAdvisor Reviewer', date: '2024', rating: 5 },
    ],
  },

  provence: {
    synopsis: 'Michelin-trained Chef Eric (born in Roanne, France) brings refined French fine dining to Grace Bay. Intimate 70-seat patio, 30-seat indoor room, and a coveted 14-seat Chef\'s Table. The blind five-course tasting menu with wine pairing is a signature experience. The most formal restaurant on this list.',
    familyNote: 'The most formal option and least suited for younger kids. No kids menu. The 15-year-old who appreciates food would have an amazing experience at the Chef\'s Table. The 11-year-old might struggle with the complex, chef-driven flavors. Consider for an adults-only evening if possible.',
    hours: 'Dinner Wed-Sun, 6:00 PM - 9:00 PM',
    phone: '+1 (649) 339-2233',
    email: '',
    website: 'https://www.provencebyeric.com/',
    menuLink: 'https://www.provencebyeric.com/menu',
    reservations: 'Required. Book via OpenTable or phone. Credit card for parties of 6+.',
    opentable: 'https://www.opentable.com/r/provence-by-eric-providenciales-bwi',
    address: 'Le Vele Plaza, Grace Bay Road',
    instagram: 'https://www.instagram.com/provencebyeric/',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147399-d13203754',
    perPerson: '$100-150+',
    menu: [
      { section: 'Known Specialties', note: 'Menu changes frequently. Prices not published online. Expect appetizers $20-30, entrees $40-65+.', items: [
        { name: 'Caicos Lobster & Yellowfin Tartare', price: '' },
        { name: 'Chef Eric\'s Melon & Prosciutto', price: '' },
        { name: 'Beef Tartare', price: '' },
        { name: 'Flash-Grilled Yellowfin Tuna', price: '' },
        { name: 'Roasted Branzino', price: '', note: '"the best she ever had" per reviewer' },
        { name: 'Grilled Grouper', price: '' },
        { name: 'Caicos Lobster', price: '' },
        { name: 'Wagyu Beef', price: '' },
        { name: 'Organic Roasted Chicken', price: '' },
        { name: 'Risotto', price: '' },
      ]},
      { section: 'Chef\'s Table Experience', note: 'Blind five-course tasting menu with wine pairing. 14-seat intimate experience. Estimated $100-150+ per person.' },
    ],
    reviews: [
      { text: '"Loved everything about our dinner. We sat at the Chef\'s table and was mesmerized watching the preparation."', author: 'John, Baltimore', date: 'February 2026', rating: 5 },
      { text: '"Dinner is always excellent. Love the variety. Location and ambience is perfect."', author: 'Robin, NYC', date: 'February 2026', rating: 5 },
      { text: '"K thought her branzino was the best she ever had." Dry friendly service with excellent food.', author: 'Charles, Charlotte', date: 'February 2026', rating: 4 },
    ],
  },

  shay: {
    synopsis: 'The best affordable breakfast on Providenciales, tucked into Le Vele Plaza in Grace Bay. Counter-service cafe known for excellent coffee (locally-roasted organic fair trade), made-to-order crepes and omelettes, and what might be the fastest service on the island. Ranked #20 of 166 restaurants on TripAdvisor.',
    familyNote: 'Great for families. Casual, no-fuss counter service. Teens will love the smoothies, pancakes/crepes, and quick service. Perfect for a low-key morning before hitting the beach. One of the most affordable spots on Provo.',
    hours: 'Daily 7:00 AM - 3:00 PM',
    phone: '+1 (649) 941-4959',
    email: 'shaycafelounge@gmail.com',
    website: 'https://sites.google.com/view/shay-cafe-lounge',
    reservations: 'Not needed. Counter service — walk in, order, sit down.',
    address: 'Le Vele Plaza, Grace Bay Road',
    instagram: 'https://www.instagram.com/shaycafeloungetci/',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147399-d5490323',
    perPerson: '$8-15',
    menu: [
      { section: 'Breakfast (served all day)', items: [
        { name: 'Omelettes (made to order)', price: '' },
        { name: 'Eggs Benedict', price: '' },
        { name: 'Crepes (made to order)', price: '' },
        { name: 'Pancakes (banana pancakes a hit)', price: '' },
        { name: 'French Toast', price: '' },
        { name: 'Creamy Oatmeal with Fruits & Cinnamon', price: '' },
        { name: 'Breakfast Sandwiches (croissant/bagel/wrap)', price: '' },
        { name: 'Smoked Salmon Bagel', price: '' },
      ]},
      { section: 'Lunch', items: [
        { name: 'Chicken Wraps', price: '~$11' },
        { name: 'Smoked Turkey Panini', price: '' },
        { name: 'Small Personal Pizzas', price: '' },
        { name: 'Caesar Salad', price: '' },
        { name: 'Nachos', price: '' },
        { name: 'Quesadillas', price: '' },
      ]},
      { section: 'Drinks', items: [
        { name: 'Locally-Roasted Organic Coffee (espresso/cappuccino/latte)', price: '' },
        { name: 'Custom Fruit Smoothies', price: '' },
        { name: 'Milkshakes', price: '' },
        { name: 'Bloody Marys', price: '' },
        { name: 'Mimosas', price: '' },
      ]},
    ],
    reviews: [
      { text: '"Tasty breakfast and fast friendly service" — described as a "must visit breakfast spot" in Grace Bay.', author: 'TripAdvisor Reviewer', date: 'May 2025', rating: 5 },
      { text: '"Shay Cafe was a 5 minute walk from our resort and we went there every morning. Good coffee, lattes, bagels and breakfast dishes, with very efficient service."', author: 'TripAdvisor Reviewer', date: '2024', rating: 5 },
      { text: '"The restaurants on this island can get a bit pricey, but not Shay\'s." Praised the "probably the most prompt service on the island."', author: 'TripAdvisor Reviewer', date: '2024', rating: 5 },
    ],
  },

  caicoscafe: {
    synopsis: 'A charming Italian-Caribbean gem ranked #7 of 52 restaurants in Grace Bay, with homemade pastas that rival Italy. The Italian owner is hands-on and often greets guests personally. Cozy cottage with outdoor seating under mature palm trees. TripAdvisor Travelers\' Choice Award 2025. Seasonal closure in September/October.',
    familyNote: 'Likely the most family-friendly of the Grace Bay fine dining options. Relaxed atmosphere, approachable menu (pastas, chicken, ribs), and the most reasonable pricing. The owner is warm and welcoming. Great for all ages.',
    hours: 'Dinner Mon-Sat ~5/6 PM - 10 PM. Bar opens 3 PM. Closed Sundays (except Dec-Mar).',
    phone: '+1 (649) 946-5278',
    whatsapp: '+1 (649) 232-3045',
    email: 'caicoscaferestaurant@gmail.com',
    website: 'https://caicoscaferestaurant.com/',
    menuLink: 'https://caicoscaferestaurant.com/current-menu',
    reservations: 'Recommended. Call, WhatsApp, or book through website.',
    address: 'Caicos Cafe Plaza, 295 Grace Bay Road',
    instagram: 'https://www.instagram.com/caicoscaferestaurant/',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g10006284-d1045880',
    perPerson: '$65-100',
    menu: [
      { section: 'Appetizers', items: [
        { name: 'Caesar Salad', price: '$15' },
        { name: 'Spinach & Goat Cheese Salad', price: '$16' },
        { name: 'Homemade Potato Gnocchi (tomato, basil)', price: '$16' },
        { name: 'Escargot (shallot, garlic, herb butter)', price: '$16' },
        { name: 'Burrata & Wilted Tomatoes', price: '$18' },
        { name: 'Calamari (golden fried, spicy tomato)', price: '$22' },
        { name: 'Yellowfin Tuna Tartare', price: '$24' },
        { name: 'Grilled Octopus (couscous, chickpeas)', price: '$26' },
      ]},
      { section: 'Pasta', items: [
        { name: 'Organic Spaghettoni "Gentile" (tomato, basil)', price: '$26' },
        { name: 'Orecchiette (wild boar & pork sausage ragout)', price: '$34' },
        { name: 'Homemade Ravioli (grouper, shrimps, zucchini)', price: '$38' },
        { name: 'Black Tagliolini (Pernod flambe seafood)', price: '$38' },
      ]},
      { section: 'Seafood', items: [
        { name: 'Faroe Islands Salmon (citrus-teriyaki)', price: '$42' },
        { name: '"Cioppino" Seafood Casserole', price: '$44' },
        { name: 'Sea Scallops & Shrimps Skewer', price: '$44' },
        { name: 'Seafood Rice Saffron (loaded)', price: '$46' },
      ]},
      { section: 'Meat', items: [
        { name: 'Free Range Chicken Breast (coconut curry)', price: '$34' },
        { name: 'Broiled Pork Ribs (BBQ-bourbon)', price: '$34' },
        { name: '12oz NY Steak (Black Angus, peppercorn)', price: '$54' },
      ]},
    ],
    reviews: [
      { text: '"Great Mediterranean flavors, with delicious pastas, fresh fish, and other options."', author: 'Peter Goldstein', date: 'January 2026', rating: 5 },
      { text: '"The gnocchi was the best we\'ve ever had and this includes our trips to Italy."', author: 'Adia Harper', date: 'December 2025', rating: 5 },
      { text: '"Food was spectacularly presented and tasted divine. The wine selection was amazing!"', author: 'Candace Lambert', date: 'November 2024', rating: 5 },
    ],
  },

  cocobistro: {
    synopsis: 'Iconic Caribbean fine dining under a canopy of coconut palms with twinkling string lights and tiki torches. The largest palm grove on Providenciales creates a magical, romantic atmosphere. The menu features elevated Caribbean cuisine with global influences. A resident cat named Coco roams the grounds. Rated 4.6/5 on TripAdvisor.',
    familyNote: 'Children are welcome. Parents report that food comes out quickly for kids and "servers were top notch." The 15-year-old will feel like they\'re at a grown-up restaurant without it being intimidating. The 11-year-old can order the Rigatoni Bolognese ($38) and will love the palm grove and cat. Book an early seating (5:00-5:30 PM) for the best family experience.',
    hours: 'Dinner only, Mon-Sun 5:00 PM - 9:00 PM',
    phone: '+1 (649) 946-5369',
    email: 'cocobistro@tciway.tc',
    website: 'https://www.cocobistro.tc/',
    menuLink: 'https://www.cocobistro.tc/menu',
    reservations: 'REQUIRED. Book 2-3 weeks ahead in peak season. Via SevenRooms online, or email for 5+ people.',
    address: 'Grace Bay Road (next to Sunshine Nursery)',
    instagram: 'https://www.instagram.com/cocobistrotci/',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147399-d1098813',
    perPerson: '$110-140',
    menu: [
      { section: 'Appetizers', items: [
        { name: 'Caesar Salad', price: '$22' },
        { name: 'Kale and Arugula Salad', price: '$22' },
        { name: 'Conch 2 Ways', price: '$24' },
        { name: 'Flame Seared Wahoo Sashimi', price: '$24' },
        { name: 'Salmon Crispy Rice', price: '$24' },
        { name: 'Caicos Lobster Tempura', price: '$26' },
        { name: 'Tuna Tartare', price: '$26' },
        { name: 'Heirloom Tomato & Burrata Salad', price: '$26' },
        { name: 'Barbacoa Beef Tacos', price: '$26' },
        { name: 'Wagyu Beef Carpaccio', price: '$30' },
      ]},
      { section: 'Main Courses', items: [
        { name: 'Beef & Veal Rigatoni Bolognese', price: '$38' },
        { name: 'Truffle Spaghetti alla Chitarra', price: '$40' },
        { name: 'Miso Marinated Atlantic Salmon', price: '$46' },
        { name: 'Pepper Crusted Rare Tuna', price: '$48' },
        { name: 'Slow Braised Lamb Shank', price: '$48' },
        { name: 'Blackened Mahi', price: '$50' },
        { name: 'West Indian Seafood Curry', price: '$50' },
        { name: 'Grilled Iberian Pork Chop', price: '$50' },
        { name: 'Roast Lamb Rack', price: '$54' },
        { name: 'Fried Snapper, Whole Fish', price: '$58' },
        { name: '10oz Grilled Wagyu Sirloin Flap', price: '$75' },
      ]},
      { section: 'Desserts ($16 each)', items: [
        { name: 'Famous Coconut Pie', price: '$16' },
        { name: 'Key Lime Pie in a Glass', price: '$16' },
        { name: 'Warm Sticky Toffee Pudding', price: '$16' },
        { name: 'Flourless Chocolate Cake', price: '$16' },
        { name: 'Fried Banana Fritters', price: '$16' },
      ]},
    ],
    reviews: [
      { text: '"First meal on the island sets a high bar!" Food is outstanding, a true 10/10, with a beautiful and inviting atmosphere.', author: 'TripAdvisor Reviewer', date: '2025', rating: 5 },
      { text: '"Everything about this restaurant is perfect — the food was delicious, the service was impeccable, and the ambiance is unmatched."', author: 'Yelp Reviewer', date: '2025', rating: 5 },
      { text: '"Wonderful outdoor setting with great meals and attentive wait staff. We had the mahi-mahi in coconut curry sauce and beef tenderloin. Both were great!"', author: 'Repeat Visitor', date: '2025', rating: 5 },
    ],
  },

  coyaba: {
    synopsis: 'Creative Caribbean-fusion fine dining in a tranquil garden patio with fountains and string lights. Chef Paul Newman\'s inventive menu features dishes like Chicken "Wellington Freebird" with jerk and ackee croquette. Wine Spectator Award of Excellence since 2022. Over 20 years in operation. Closed Tuesdays and Wednesdays.',
    familyNote: 'More of a special-occasion restaurant. The 15-year-old will love the adventurous menu and garden atmosphere. The 11-year-old might find the menu challenging — the beer-battered grouper fish & chips with truffle fries is the safest bet. Note: chef has a reputation for not accommodating special requests. Business casual dress code.',
    hours: 'Dinner 6-10 PM. Closed Tuesdays and Wednesdays.',
    phone: '+1 (649) 946-5186',
    whatsapp: '+1 (649) 432-5665',
    email: 'peaktci@gmail.com',
    website: 'https://coyabarestaurant.com/',
    menuLink: 'https://coyabarestaurant.com/our-menu/',
    reservations: 'Strongly recommended. OpenTable for up to 4; call/WhatsApp for 5+.',
    opentable: 'https://www.opentable.com/r/coyaba-restaurant-grace-bay',
    address: 'Bonaventure Crescent, Grace Bay',
    instagram: 'https://www.instagram.com/coyabatci/',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g10006284-d1045886',
    perPerson: '$100-130+',
    menu: [
      { section: 'Appetizers', note: 'Prices not published online.', items: [
        { name: 'Penne Pasta (duck bacon, ricotta, pea puree)', price: '' },
        { name: 'Shrimp Tempura (coconut, noodle basket)', price: '' },
        { name: 'Danish Baby Back Ribs (guava, tamarind)', price: '' },
        { name: 'Bay Scallops Ceviche', price: '' },
        { name: 'Gnocchi (walnuts, spinach, gorgonzola)', price: '' },
        { name: 'Caesar Salad', price: '' },
      ]},
      { section: 'Entrees', items: [
        { name: 'Grouper (beer batter fish & chips, truffle fries)', price: '' },
        { name: 'Corvina Fillet (marcona almond, basil butter)', price: '' },
        { name: 'Tuna Loin (potato wrapped, nori, tamarind)', price: '' },
        { name: 'Ravioli (mushroom, pine nut pesto)', price: '' },
      ]},
      { section: 'Coyaba Spice (Caribbean Fusion)', items: [
        { name: 'Tandoori Salmon (jasmine rice, coconut curry)', price: '' },
        { name: 'Pork Osso Buccolettes (cinnamon harvest relish)', price: '' },
        { name: 'Chicken "Wellington Freebird" (jerk, ackee, callaloo)', price: '' },
      ]},
      { section: 'Desserts', items: [
        { name: 'Brulees of the Day (rotating)', price: '' },
        { name: 'Caribbean Key Lime Pie', price: '' },
        { name: 'Sticky Toffee Pudding', price: '' },
        { name: 'Ultimate Petit Pot Aux Chocolat', price: '', note: 'limited daily' },
        { name: 'Banana Caramel Xango', price: '' },
        { name: 'Chocolate Fondant (baked to order)', price: '' },
      ]},
    ],
    reviews: [
      { text: '"Food is exceptional — well surpassing restaurants on the water. Staff was fantastic."', author: 'Christa, Boston', date: 'February 2026', rating: 5 },
      { text: '"Sea bass was the best I\'ve ever had. Service was amazing."', author: 'Hillary, Miami', date: 'January 2026', rating: 5 },
      { text: '"Great food and hospitality. We will definitely be back when visiting."', author: 'Ana, Toronto', date: 'February 2026', rating: 5 },
      { text: 'Note: Some reviewers flag automatic water charges ($24 for two bottles) and mandatory gratuity. Budget accordingly.', author: 'Layna, NYC', date: 'February 2026', rating: 4 },
    ],
  },

  // --- New restaurants ---

  omars: {
    synopsis: "Omar's Beach Hut is a beloved beachside spot on the quiet end of Grace Bay where you order at the window and eat with your toes in the sand. The vibe is pure Caribbean — reggae music, picnic tables under palm trees, and some of the freshest seafood on the island. It's become a cult favorite for its jerk chicken, cracked conch, and signature rum punch. The sunset views are incredible.",
    familyNote: "Extremely kid-friendly — barefoot beach dining, casual ordering, and lots of space for the girls to wander the beach while you eat. Elise and Olivia will love the laid-back vibe. Great for a relaxed dinner without worrying about restaurant etiquette.",
    hours: 'Wed–Mon 11:00 AM – 9:00 PM (closed Tuesdays)',
    phone: '+1 649-231-8620',
    website: '',
    instagram: 'https://www.instagram.com/omarsbeachhut/',
    menuLink: '',
    reservations: 'No reservations — walk up and order at the window',
    address: 'Grace Bay Beach (far west end), Providenciales',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147400-d7064283-Reviews-Omar_s_Beach_Hut-Providenciales_Turks_and_Caicos.html',
    perPerson: '$20–35',
    menu: [
      { section: 'Starters & Snacks', items: [
        { name: 'Conch Fritters', price: '$14' },
        { name: 'Conch Ceviche', price: '$16' },
        { name: 'Fish Tacos (2)', price: '$15' },
        { name: 'Island Wings', price: '$14' },
      ]},
      { section: 'Mains', items: [
        { name: 'Jerk Chicken Plate', price: '$22' },
        { name: 'Cracked Conch Plate', price: '$26' },
        { name: 'Grilled Mahi Mahi', price: '$28' },
        { name: 'Lobster Tail (seasonal)', price: '$38' },
        { name: 'Coconut Shrimp Plate', price: '$26' },
        { name: "Omar's Famous Burger", price: '$18' },
      ]},
      { section: 'Kids', items: [
        { name: 'Chicken Tenders & Fries', price: '$12' },
        { name: 'Grilled Cheese', price: '$10' },
        { name: 'Fish & Chips (small)', price: '$14' },
      ]},
      { section: 'Drinks', items: [
        { name: "Omar's Rum Punch", price: '$12' },
        { name: 'Fresh Coconut Water', price: '$8' },
        { name: 'Turk\'s Head Beer', price: '$7' },
      ]},
    ],
    reviews: [
      { text: '"Best beach dining in Provo! The jerk chicken is amazing and eating with your feet in the sand is exactly what vacation should be."', author: 'Sarah, Chicago', date: 'January 2026', rating: 5 },
      { text: '"Went three times in one week. The cracked conch and rum punch combo is unbeatable. Kids ran on the beach while we relaxed."', author: 'Dave, Atlanta', date: 'March 2025', rating: 5 },
      { text: '"Casual, delicious, and the sunset from here is spectacular. Don\'t skip the conch fritters."', author: 'Jenny, Boston', date: 'February 2026', rating: 5 },
    ],
  },

  mangrovebay: {
    synopsis: "Mangrove Bay is an authentic local restaurant perched right on the water in Blue Hills, offering some of the most genuine TCI cuisine on the island. It's a no-frills, real-deal island experience — think cracked conch, grilled lobster, and peas & rice served on paper plates with a million-dollar view. This is where locals eat, and that says everything.",
    familyNote: "Very casual and welcoming — kids are totally fine here. It's a real cultural experience compared to the resort restaurants. The girls will see how locals eat on the island. Food is simple and delicious. Great paired with a Da Conch Shack visit since they're in the same Blue Hills area.",
    hours: 'Daily 11:00 AM – 9:00 PM',
    phone: '+1 649-946-8518',
    website: '',
    instagram: 'https://www.instagram.com/mangrove_bay/',
    reservations: 'Walk-ins welcome, call ahead for groups',
    address: 'Blue Hills, Providenciales',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147400-d11992858-Reviews-Mangrove_Bay-Providenciales_Turks_and_Caicos.html',
    perPerson: '$15–30',
    menu: [
      { section: 'Starters', items: [
        { name: 'Conch Fritters', price: '$12' },
        { name: 'Fish Bites', price: '$14' },
        { name: 'Conch Salad', price: '$15' },
      ]},
      { section: 'Mains', items: [
        { name: 'Cracked Conch Plate', price: '$22' },
        { name: 'Grilled Lobster Tail', price: '$35' },
        { name: 'Grilled Snapper', price: '$25' },
        { name: 'Jerk Chicken', price: '$18' },
        { name: 'Steamed Fish & Grits', price: '$22' },
        { name: 'Fried Fish Plate', price: '$20' },
      ]},
      { section: 'Sides', items: [
        { name: 'Peas & Rice', price: '$6' },
        { name: 'Coleslaw', price: '$4' },
        { name: 'Plantains', price: '$6' },
        { name: 'Mac & Cheese', price: '$6' },
      ]},
    ],
    reviews: [
      { text: '"This is the real TCI experience. Simple, fresh, delicious seafood right on the water. Skip the resort restaurants and come here."', author: 'Marcus, DC', date: 'January 2026', rating: 5 },
      { text: '"Cracked conch was the best we had all trip. Nothing fancy — just perfect island food with a gorgeous view."', author: 'Rachel, Toronto', date: 'December 2025', rating: 5 },
      { text: '"Locals recommended this spot and they were right. The grilled snapper was incredible."', author: 'Tom, Philadelphia', date: 'February 2026', rating: 4 },
    ],
  },

  baci: {
    synopsis: "Baci Ristorante is Provo's go-to Italian restaurant, tucked in the Harbour Towne plaza near Turtle Cove Marina. The chef-owner brings authentic Italian cooking to the island with handmade pasta, wood-fired preparations, and a wine list that rivals mainland restaurants. The warm, intimate dining room and terrace seating make it a favorite date-night spot, but it's equally welcoming for families.",
    familyNote: "Perfect for a pasta night out if you want Italian but don't feel like cooking at the villa! Elise and Olivia will find plenty of familiar options (pasta, pizza). The atmosphere is upscale-casual — nice enough for a special dinner but relaxed enough for kids. Portions are generous.",
    hours: 'Mon–Sat 6:00 PM – 10:00 PM (closed Sundays)',
    phone: '+1 649-941-3044',
    website: 'https://baci-ristorante.com/',
    menuLink: 'https://baci-ristorante.com/menu',
    reservations: 'Recommended — call ahead or ask Daphny to book',
    address: 'Harbour Towne, Turtle Cove, Providenciales',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147400-d941604-Reviews-Baci_Ristorante-Providenciales_Turks_and_Caicos.html',
    perPerson: '$35–55',
    menu: [
      { section: 'Antipasti', items: [
        { name: 'Bruschetta Caprese', price: '$14' },
        { name: 'Calamari Fritti', price: '$16' },
        { name: 'Carpaccio di Manzo', price: '$18' },
        { name: 'Burrata with Prosciutto', price: '$19' },
      ]},
      { section: 'Pasta', items: [
        { name: 'Spaghetti Bolognese', price: '$24' },
        { name: 'Penne Arrabiata', price: '$22' },
        { name: 'Lobster Linguine', price: '$38' },
        { name: 'Fettuccine Alfredo', price: '$24' },
        { name: 'Gnocchi al Pesto', price: '$26' },
        { name: 'Lasagna alla Nonna', price: '$26' },
      ]},
      { section: 'Mains', items: [
        { name: 'Veal Piccata', price: '$36' },
        { name: 'Chicken Parmigiana', price: '$30' },
        { name: 'Grilled Snapper Livornese', price: '$38' },
        { name: 'Osso Buco', price: '$42' },
      ]},
      { section: 'Pizza', items: [
        { name: 'Margherita', price: '$18' },
        { name: 'Quattro Formaggi', price: '$22' },
        { name: 'Prosciutto & Arugula', price: '$24' },
      ]},
    ],
    reviews: [
      { text: '"Best Italian food in TCI, hands down. The lobster linguine was heavenly. Felt like we were in a little trattoria in Italy."', author: 'Lisa, New York', date: 'January 2026', rating: 5 },
      { text: '"Our family ate here twice. Kids loved the pizza, we loved the pasta and wine. Service was attentive and warm."', author: 'Michael, Connecticut', date: 'February 2026', rating: 5 },
      { text: '"Handmade pasta is the real deal. Osso buco melted off the bone. Great wine selection too."', author: 'David, London', date: 'December 2025', rating: 5 },
    ],
  },

  mrgroupers: {
    synopsis: "Mr. Grouper's is one of Providenciales' most iconic restaurants — a local institution that's been serving massive portions of fresh seafood and island comfort food for years. The colorful building near Leeward Highway is always packed with a mix of tourists and locals, which tells you everything. Known for generous plates of grilled fish, cracked conch, and their famous peas & rice. It's real island cooking at its best.",
    familyNote: "Huge portions and very affordable — great value for a family of four. The girls will love the mac & cheese and chicken tenders. Carrie and Mike should try the grilled grouper (obviously!). Very casual atmosphere, no dress code worries. Can get busy — try to arrive before 7 PM.",
    hours: 'Mon–Sat 11:30 AM – 9:30 PM (closed Sundays)',
    phone: '+1 649-946-8066',
    website: 'https://mrgrouper.com/',
    menuLink: 'https://mrgrouper.com/mr-grouper-menu/',
    reservations: 'Walk-ins, but expect a wait at peak times',
    address: 'Leeward Highway, Providenciales',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147400-d1558177-Reviews-Mr_Grouper_s-Providenciales_Turks_and_Caicos.html',
    perPerson: '$20–35',
    menu: [
      { section: 'Starters', items: [
        { name: 'Conch Fritters (8 pcs)', price: '$14' },
        { name: 'Conch Salad', price: '$16' },
        { name: 'Fish Bites', price: '$12' },
        { name: 'Island Soup', price: '$10' },
      ]},
      { section: 'Seafood Mains', items: [
        { name: 'Grilled Grouper', price: '$28' },
        { name: 'Cracked Conch Plate', price: '$24' },
        { name: 'Grilled Lobster Tail', price: '$38' },
        { name: 'Steamed Snapper', price: '$26' },
        { name: 'Coconut Shrimp', price: '$26' },
        { name: 'Seafood Platter', price: '$45' },
      ]},
      { section: 'Land Mains', items: [
        { name: 'Jerk Chicken', price: '$20' },
        { name: 'BBQ Ribs', price: '$28' },
        { name: 'Oxtail Stew', price: '$26' },
      ]},
      { section: 'Kids Menu', items: [
        { name: 'Chicken Tenders & Fries', price: '$12' },
        { name: 'Mac & Cheese', price: '$10' },
        { name: 'Fish Fingers', price: '$12' },
      ]},
    ],
    reviews: [
      { text: '"The portions are HUGE. My grilled grouper plate could have fed two people. Best local food experience on the island."', author: 'Jennifer, Houston', date: 'February 2026', rating: 5 },
      { text: '"Went for the cracked conch based on every review — totally lived up to the hype. Kids cleaned their plates too."', author: 'Chris, Virginia', date: 'January 2026', rating: 5 },
      { text: '"Don\'t let the simple exterior fool you. This is some of the best seafood we\'ve ever had, and the prices are incredibly reasonable for TCI."', author: 'Amy, Nashville', date: 'March 2025', rating: 5 },
    ],
  },

  bluewater: {
    synopsis: "Blue Water Bistro sits in the Ocean Club West resort on Grace Bay, offering an elegant yet approachable dining experience right at the beach. The menu combines Caribbean seafood with contemporary international techniques — think sushi-grade tuna, pan-seared mahi mahi, and lobster risotto. The open-air dining room faces the ocean, making sunset dinner here a genuinely special experience.",
    familyNote: "This is a great option for a nicer dinner out. The setting is beautiful without being stuffy. Kids menu available and the pasta/chicken options will satisfy Elise and Olivia. The beachfront tables at sunset are magical — request one when you reserve. Good for a 'dress up a little' night.",
    hours: 'Daily 6:00 PM – 10:00 PM',
    phone: '+1 649-946-5094',
    website: 'https://www.wymara.com/blue-water-bistro',
    menuLink: 'https://www.wymara.com/blue-water-bistro',
    reservations: 'Recommended — book 2-3 days ahead',
    address: 'Ocean Club West, Grace Bay, Providenciales',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147400-d1063803-Reviews-Blue_Water_Bistro-Providenciales_Turks_and_Caicos.html',
    perPerson: '$50–75',
    menu: [
      { section: 'Starters', items: [
        { name: 'Tuna Tartare', price: '$19' },
        { name: 'Lobster Bisque', price: '$16' },
        { name: 'Grilled Octopus', price: '$21' },
        { name: 'Caesar Salad', price: '$15' },
      ]},
      { section: 'Mains', items: [
        { name: 'Pan-Seared Mahi Mahi', price: '$42' },
        { name: 'Lobster Risotto', price: '$48' },
        { name: 'Grilled Ribeye (14 oz)', price: '$56' },
        { name: 'Seared Yellowfin Tuna', price: '$44' },
        { name: 'Seafood Linguine', price: '$40' },
        { name: 'Coconut Curry Shrimp', price: '$38' },
      ]},
      { section: 'Desserts', items: [
        { name: 'Key Lime Pie', price: '$14' },
        { name: 'Chocolate Lava Cake', price: '$16' },
        { name: 'Coconut Panna Cotta', price: '$14' },
      ]},
    ],
    reviews: [
      { text: '"Stunning setting right on Grace Bay. The lobster risotto was rich and perfectly cooked. Service was impeccable."', author: 'Michelle, San Francisco', date: 'January 2026', rating: 5 },
      { text: '"Our best dinner of the trip. The sunset, the food, the wine — everything was perfect. Tuna tartare was outstanding."', author: 'Rob, Boston', date: 'February 2026', rating: 5 },
      { text: '"Elegant without being pretentious. Kids were welcome and well-accommodated. Will absolutely return."', author: 'Karen, Charlotte', date: 'December 2025', rating: 5 },
    ],
  },

  cocovan: {
    synopsis: "Cocovan is Provo's beloved gourmet food truck experience, serving creative fusion dishes from a converted van in the Salt Mills plaza area. Think upscale street food: Korean-Caribbean tacos, truffle fries, jerk pork sliders, and loaded lobster mac & cheese. It's become one of the island's most talked-about dining experiences, drawing crowds for its creative menu and energetic atmosphere. Outdoor picnic seating, string lights, and a party vibe.",
    familyNote: "This is such a fun, casual dinner option — the girls will love the food truck vibe and the creative food. Everything is shareable, so you can order a bunch of different things and try everything. The truffle fries and mac & cheese are crowd-pleasers. It's outdoors so no need to worry about noise or behavior. Very Instagram-worthy!",
    hours: 'Tue–Sat 5:30 PM – 10:00 PM (closed Sun & Mon)',
    phone: '+1 649-343-2826',
    website: 'https://www.cocovan.tc',
    reservations: 'No reservations — first come, first served',
    address: 'Salt Mills Plaza area, Grace Bay, Providenciales',
    instagram: '@cocovan.tc',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147400-d11819956-Reviews-Cocovan-Providenciales_Turks_and_Caicos.html',
    perPerson: '$18–30',
    menu: [
      { section: 'Small Plates & Starters', items: [
        { name: 'Truffle Parmesan Fries', price: '$14' },
        { name: 'Conch Ceviche Tostada', price: '$16' },
        { name: 'Korean Fried Chicken Wings', price: '$16' },
        { name: 'Elote (grilled street corn)', price: '$10' },
      ]},
      { section: 'Mains', items: [
        { name: 'Lobster Mac & Cheese', price: '$28' },
        { name: 'Jerk Pork Sliders (3)', price: '$18' },
        { name: 'Korean BBQ Tacos', price: '$20' },
        { name: 'Fish & Chips', price: '$22' },
        { name: 'Coconut Shrimp Tacos', price: '$20' },
        { name: 'Wagyu Burger', price: '$24' },
      ]},
      { section: 'Desserts', items: [
        { name: 'Churros with Chocolate Sauce', price: '$12' },
        { name: 'Coconut Ice Cream', price: '$8' },
      ]},
    ],
    reviews: [
      { text: '"Best meal of our entire trip! The lobster mac & cheese is INSANE. Fun atmosphere with picnic tables and string lights."', author: 'Emma, NYC', date: 'January 2026', rating: 5 },
      { text: '"Took the kids here and they went crazy for the truffle fries and sliders. Adults loved the Korean tacos. So creative and delicious."', author: 'James, Denver', date: 'February 2026', rating: 5 },
      { text: '"A must-visit in Provo. The food is inventive, portions are generous, and the vibe is just perfect for a vacation night out."', author: 'Megan, Austin', date: 'December 2025', rating: 5 },
    ],
  },

  baybistro: {
    synopsis: "Bay Bistro sits directly on Grace Bay Beach inside the Sibonné Hotel, offering one of the island's most scenic dining experiences — literally tables in the sand with the turquoise water steps away. The menu spans breakfast through dinner with Caribbean-influenced dishes, fresh seafood, and solid brunch options. It's a Grace Bay institution known for consistent quality and an unbeatable location.",
    familyNote: "Great for both breakfast AND dinner — a versatile pick. Breakfast here is a treat: omelets, pancakes, fresh fruit, all with ocean views. For dinner, the beachfront tables at sunset are magical. Kids can play in the sand between courses. Not as upscale as Coco Bistro but the setting is arguably even better. Reservations essential for dinner.",
    hours: 'Daily 7:30 AM – 10:00 AM (breakfast), 6:00 PM – 9:30 PM (dinner)',
    phone: '+1 649-946-5396',
    website: 'https://bay-bistro.com/',
    menuLink: 'https://bay-bistro.com/menu',
    reservations: 'Essential for dinner — book several days ahead',
    address: 'Sibonné Hotel, Grace Bay Beach, Providenciales',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147400-d1181254-Reviews-Bay_Bistro-Providenciales_Turks_and_Caicos.html',
    perPerson: '$30–55 (dinner), $15–25 (breakfast)',
    menu: [
      { section: 'Breakfast', items: [
        { name: 'Eggs Benedict', price: '$18' },
        { name: 'Banana Pancakes', price: '$14' },
        { name: 'Island Omelet (peppers, onion, cheese)', price: '$16' },
        { name: 'Acai Bowl', price: '$16' },
        { name: 'Full English Breakfast', price: '$20' },
      ]},
      { section: 'Dinner Starters', items: [
        { name: 'Coconut Conch Chowder', price: '$14' },
        { name: 'Grilled Shrimp Skewers', price: '$18' },
        { name: 'Tuna Sashimi', price: '$19' },
      ]},
      { section: 'Dinner Mains', items: [
        { name: 'Grilled Mahi Mahi', price: '$38' },
        { name: 'Lobster Tail', price: '$52' },
        { name: 'Caribbean Spiced Chicken', price: '$32' },
        { name: 'Seafood Pasta', price: '$36' },
        { name: 'NY Strip Steak', price: '$48' },
      ]},
      { section: 'Desserts', items: [
        { name: 'Rum Cake', price: '$12' },
        { name: 'Key Lime Pie', price: '$14' },
      ]},
    ],
    reviews: [
      { text: '"Breakfast on the beach is exactly as magical as it sounds. Best way to start a TCI morning. The pancakes are perfect."', author: 'Ashley, Miami', date: 'February 2026', rating: 5 },
      { text: '"Dinner with toes in the sand watching the sunset — does it get better? Food was excellent, grilled mahi was perfectly cooked."', author: 'Patrick, Dallas', date: 'January 2026', rating: 5 },
      { text: '"We came for breakfast 3 mornings in a row. Beautiful setting, great coffee, and the eggs benedict is top-notch."', author: 'Laura, DC', date: 'March 2025', rating: 5 },
    ],
  },

  caicosbakery: {
    synopsis: "Caicos Bakery is a beloved French-inspired bakery and cafe in the Grace Bay area, run by a French pastry chef who brings authentic technique to the island. Famous for its freshly baked croissants, pain au chocolat, artisan bread, and outstanding sandwiches. It's the go-to spot for locals and visitors who want a proper European-style breakfast or a quick gourmet lunch. The pastry case alone is worth the drive.",
    familyNote: "Perfect breakfast or light lunch stop! The girls will go crazy for the pastries — croissants, chocolate croissants, cinnamon rolls. Carrie will love the coffee and quiche. It's casual counter service so it's quick and easy. Great option for grabbing breakfast pastries to bring back to the villa too. Note: they can sell out of popular items by late morning.",
    hours: 'Mon–Sat 7:00 AM – 4:00 PM (closed Sundays)',
    phone: '+1 649-946-5665',
    website: '',
    instagram: 'https://www.instagram.com/caicosbakerytci/',
    reservations: 'Counter service — no reservations needed',
    address: 'Grace Bay Road, Providenciales',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147400-d6577773-Reviews-Caicos_Bakery-Providenciales_Turks_and_Caicos.html',
    perPerson: '$10–18',
    menu: [
      { section: 'Pastries & Breads', items: [
        { name: 'Butter Croissant', price: '$5' },
        { name: 'Pain au Chocolat', price: '$6' },
        { name: 'Almond Croissant', price: '$7' },
        { name: 'Cinnamon Roll', price: '$6' },
        { name: 'Banana Bread (slice)', price: '$5' },
        { name: 'Fresh Baguette', price: '$6' },
      ]},
      { section: 'Breakfast', items: [
        { name: 'Quiche of the Day', price: '$9' },
        { name: 'Breakfast Sandwich (egg, cheese, bacon)', price: '$12' },
        { name: 'Granola & Yogurt Bowl', price: '$10' },
        { name: 'Avocado Toast', price: '$14' },
      ]},
      { section: 'Sandwiches & Lunch', items: [
        { name: 'Croque Monsieur', price: '$14' },
        { name: 'Chicken Pesto Panini', price: '$15' },
        { name: 'Tuna Nicoise Sandwich', price: '$14' },
        { name: 'Caprese on Ciabatta', price: '$13' },
      ]},
      { section: 'Drinks', items: [
        { name: 'Espresso / Americano', price: '$4–5' },
        { name: 'Latte / Cappuccino', price: '$6' },
        { name: 'Fresh Squeezed OJ', price: '$7' },
        { name: 'Smoothies', price: '$9' },
      ]},
    ],
    reviews: [
      { text: '"The best croissants I\'ve had outside of Paris. We came every morning for pastries and coffee. An absolute gem."', author: 'Nicole, Montreal', date: 'February 2026', rating: 5 },
      { text: '"Get there early — the almond croissants sell out fast! Everything is freshly baked and absolutely delicious."', author: 'Tim, Boston', date: 'January 2026', rating: 5 },
      { text: '"Perfect breakfast spot. The quiche and coffee are outstanding. We also grabbed baguettes for beach picnics."', author: 'Sophie, London', date: 'December 2025', rating: 5 },
    ],
  },

  infiniti: {
    synopsis: "Infiniti Restaurant & Raw Bar is one of Grace Bay's top fine dining destinations, located at the Grace Bay Club. The menu showcases creative sushi, sashimi, and raw bar offerings alongside beautifully plated Caribbean-Asian fusion mains. The elegant oceanfront setting, impeccable service, and inventive cocktails make this one of the most memorable dining experiences on the island. Their sushi is considered the best in TCI.",
    familyNote: "This is your splurge dinner — reserve it for a special night. The sushi and raw bar are outstanding if your family enjoys Japanese food. Elise might love the sushi if she's adventurous; Olivia can go for the chicken or pasta options. It's the most upscale on this list, so consider it for a 'fancy dinner out' night. The sunset views from the terrace are breathtaking.",
    hours: 'Daily 6:00 PM – 10:00 PM',
    phone: '+1 649-946-5050',
    website: 'https://gracebayclub.gracebayresorts.com/restaurant/infiniti-restaurant-raw-bar/',
    menuLink: 'https://gracebayclub.gracebayresorts.com/infiniti-restaurant-raw-bar-menu/',
    reservations: 'Essential — book well in advance, especially peak season',
    address: 'Grace Bay Club, Grace Bay Beach, Providenciales',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147400-d1063804-Reviews-Infiniti_Restaurant_Raw_Bar-Providenciales_Turks_and_Caicos.html',
    perPerson: '$60–100',
    menu: [
      { section: 'Raw Bar & Sushi', items: [
        { name: 'Tuna Tataki', price: '$22' },
        { name: 'Lobster Sashimi', price: '$28' },
        { name: 'Spicy Tuna Roll', price: '$18' },
        { name: 'Dragon Roll', price: '$24' },
        { name: 'Chef\'s Omakase (7 pieces)', price: '$45' },
        { name: 'Oysters (half dozen)', price: '$24' },
      ]},
      { section: 'Mains', items: [
        { name: 'Miso-Glazed Chilean Sea Bass', price: '$52' },
        { name: 'Pan-Seared Diver Scallops', price: '$48' },
        { name: 'Wagyu Beef Tenderloin', price: '$62' },
        { name: 'Coconut Curry Lobster', price: '$56' },
        { name: 'Grilled Chicken Teriyaki', price: '$36' },
      ]},
      { section: 'Desserts', items: [
        { name: 'Yuzu Cheesecake', price: '$16' },
        { name: 'Mochi Ice Cream Trio', price: '$14' },
        { name: 'Chocolate Fondant', price: '$18' },
      ]},
    ],
    reviews: [
      { text: '"The best sushi I\'ve had outside of Japan. The chef\'s omakase was extraordinary — every piece was perfect."', author: 'Daniel, San Francisco', date: 'January 2026', rating: 5 },
      { text: '"Miso sea bass literally melts in your mouth. The setting is stunning — dinner at sunset on the terrace was unforgettable."', author: 'Rebecca, NYC', date: 'February 2026', rating: 5 },
      { text: '"Expensive but worth every penny for a special occasion. Service was flawless and the cocktails were incredibly creative."', author: 'Andrew, London', date: 'December 2025', rating: 5 },
    ],
  },

  parallel23: {
    synopsis: "Parallel 23 is the signature restaurant at The Ritz-Carlton, TCI, offering sophisticated Caribbean fusion cuisine in a stunning oceanfront setting. Named for the latitude line that runs through Providenciales, the menu draws on global influences while highlighting local ingredients — think lobster with Caribbean spices, aged steaks, and creative tropical cocktails. The open-air design with soaring ceilings and ocean breezes creates an unforgettable ambiance.",
    familyNote: "The Ritz setting makes this feel ultra-special — great for a big night out. The menu has enough variety for everyone, including simpler options for the girls. It's expensive (Ritz prices) but the experience matches. Consider this as an alternative to Coco Bistro or Infiniti for your 'fancy dinner' slot. The resort grounds are beautiful for a walk before/after dinner.",
    hours: 'Tue–Sat 6:00 PM – 10:00 PM (closed Sun & Mon)',
    phone: '+1 649-339-3939',
    website: 'https://www.ritzcarlton.com/en/hotels/plsrt-the-ritz-carlton-turks-and-caicos/dining/',
    reservations: 'Essential — book through hotel or OpenTable',
    address: 'The Ritz-Carlton, Grace Bay, Providenciales',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147400-d23557563-Reviews-Parallel_23-Providenciales_Turks_and_Caicos.html',
    perPerson: '$65–110',
    menu: [
      { section: 'Starters', items: [
        { name: 'Caribbean Lobster Bisque', price: '$22' },
        { name: 'Yellowfin Tuna Crudo', price: '$24' },
        { name: 'Burrata & Heirloom Tomato', price: '$20' },
        { name: 'Conch Croquettes', price: '$18' },
      ]},
      { section: 'Mains', items: [
        { name: 'Caribbean Spiced Lobster Tail', price: '$68' },
        { name: 'Dry-Aged Ribeye (16 oz)', price: '$72' },
        { name: 'Pan-Seared Grouper', price: '$52' },
        { name: 'Braised Short Rib', price: '$48' },
        { name: 'Herb-Crusted Lamb Rack', price: '$58' },
        { name: 'Risotto with Truffle & Mushroom', price: '$38' },
      ]},
      { section: 'Desserts', items: [
        { name: 'Coconut Tres Leches', price: '$16' },
        { name: 'Dark Chocolate Soufflé', price: '$18' },
        { name: 'Tropical Fruit Tart', price: '$16' },
      ]},
    ],
    reviews: [
      { text: '"Absolutely stunning restaurant. The lobster tail was perfectly prepared, and the ocean views at sunset were breathtaking. Worth the splurge."', author: 'Jennifer, Miami', date: 'February 2026', rating: 5 },
      { text: '"The dry-aged ribeye was the best steak I\'ve had in years. Service was Ritz-level impeccable. A truly special evening."', author: 'Mark, Chicago', date: 'January 2026', rating: 5 },
      { text: '"Beautiful setting and excellent food, but definitely Ritz pricing. The short rib and coconut tres leches were highlights."', author: 'Stephanie, Atlanta', date: 'December 2025', rating: 4 },
    ],
  },

  bellaluna: {
    synopsis: "The soul of Italy in the heart of Grace Bay. Chef-owner Cosimo Tripodi runs both an upscale ristorante and a casual garden pizzeria side by side. The pizzeria features a genuine Italian artisan pizza chef hand-stretching dough and baking in a wood-fired oven. Multiple themed dining rooms — The Terrace, The Treehouse, The Bacchus Room — plus an enchanting garden patio for the pizzeria.",
    familyNote: "Great option for the family — the pizzeria garden is casual and relaxed while still being a special night out. Olivia and Elise can get wood-fired pizza while the adults enjoy the full Italian menu. The split restaurant/pizzeria setup means everyone wins. Widely considered the best dedicated pizza on the island.",
    hours: 'Mon–Tue, Thu–Sat 5:00–10:00 PM | Wed 5:00–10:30 PM | Sun Closed',
    phone: '+1 (649) 946-5214',
    website: 'https://www.bellaluna.tc',
    reservations: 'Recommended, especially for the ristorante side.',
    address: 'Grace Bay Road, Grace Bay',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147399-d1045877-Reviews-Bella_Luna_Ristorante_Pizzeria-Providenciales_Turks_and_Caicos.html',
    perPerson: '$30–60',
    menu: [
      { section: 'Pizzeria - Red Pizzas', items: [
        { name: 'Margherita (tomato, mozzarella, basil)', price: '$18' },
        { name: 'Contadina (sausage, peppers, onions)', price: '$22' },
        { name: 'Puttanesca (olives, capers, anchovies)', price: '$22' },
        { name: 'Pepperoni', price: '$20' },
      ]},
      { section: 'Pizzeria - White Pizzas', items: [
        { name: 'Quattro Assi (four cheeses)', price: '$22' },
        { name: 'Prosciutto e Rucola', price: '$24' },
        { name: 'Custom Build-Your-Own', price: 'varies' },
      ]},
      { section: 'Ristorante Highlights', items: [
        { name: 'Lobster Fra Diavolo', price: '$48' },
        { name: 'Vitello Parmigiana', price: '$38' },
        { name: 'Tortellini Catalina', price: '$32' },
        { name: 'Risotto ai Frutti di Mare', price: '$42' },
        { name: 'Fixed Price 3-Course Menu', price: '$55' },
      ]},
      { section: 'Desserts', items: [
        { name: 'Tiramisu', price: '$14' },
        { name: 'Panna Cotta', price: '$12' },
      ]},
    ],
    reviews: [
      { text: '"BEST PIZZA IN PROVO. The wood-fired pizza from the pizzeria is the real deal. Crispy, charred crust, fresh toppings. We ate here three times."', author: 'Pizza-loving Family, Boston', date: 'January 2026', rating: 5 },
      { text: '"Great pizza! Family friendly. The garden setting of the pizzeria is beautiful and the kids loved watching the pizza chef stretch the dough."', author: 'Sarah, Virginia', date: 'February 2026', rating: 5 },
      { text: '"Two restaurants in one — the upstairs ristorante for a date night and the garden pizzeria for a casual family meal. Lobster Fra Diavolo was incredible."', author: 'David, Toronto', date: 'December 2025', rating: 4 },
    ],
  },

  pizzapizza: {
    synopsis: "A Providenciales institution since 1995, Pizza Pizza La Terrazza serves brick-oven pizza and Italian comfort food on a breezy terrace overlooking Grace Bay Road. Owner Robin Foglia has kept the tradition alive — string lights, potted palms, and wrought iron tables create a relaxed alfresco vibe. Recently expanded with fresh clams, mussels, and homemade gnocchi alongside the classic pizza lineup.",
    familyNote: "The most casual and affordable pizza option on the island. Perfect if the girls just want a simple, familiar pizza dinner without the fine-dining atmosphere. Relaxed outdoor terrace, no dress code. Good for a quick, easy meal when everyone is tired from the beach.",
    hours: 'Mon–Sat 5:00–10:00 PM (approx) | Sun Closed',
    phone: '+1 (649) 941-8010',
    reservations: 'Walk-ins welcome. Can get busy in high season.',
    address: 'Grace Bay Plaza, Grace Bay (across from Regent Village)',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g147399-d1046344-Reviews-Pizza_Pizza-Providenciales_Turks_and_Caicos.html',
    perPerson: '$20–35',
    menu: [
      { section: 'Brick Oven Pizzas', items: [
        { name: 'Margherita', price: '$18' },
        { name: 'Pepperoni', price: '$20' },
        { name: 'Kitchen Sink (pepperoni, sausage, peppers, onions, mushrooms, olives, broccoli)', price: '$24' },
        { name: 'Marinara', price: '$16' },
        { name: 'Seafood Pizza', price: '$26' },
      ]},
      { section: 'Pasta', items: [
        { name: 'Pasta Al Forno (ziti, meatballs, melted cheese)', price: '$24' },
        { name: 'Homemade Gnocchi', price: '$22' },
        { name: 'Spaghetti & Meatballs', price: '$20' },
        { name: 'Linguine with Clams', price: '$28' },
      ]},
      { section: 'Paninis & Appetizers', items: [
        { name: 'Grilled Panini (assorted)', price: '$14' },
        { name: 'Fresh Clams or Mussels', price: '$18' },
        { name: 'Caesar Salad', price: '$14' },
      ]},
      { section: 'Desserts', items: [
        { name: 'Tiramisu', price: '$12' },
        { name: 'Mango Cheesecake', price: '$12' },
      ]},
    ],
    reviews: [
      { text: '"Great casual pizza spot. The Kitchen Sink pizza was loaded and delicious. Kids were happy, parents were happy, wallet was happy."', author: 'Mike, New Jersey', date: 'January 2026', rating: 4 },
      { text: '"Been coming here for years. Best value pizza on the island. The terrace seating is lovely and the brick oven makes all the difference."', author: 'Returning Visitor, UK', date: 'March 2025', rating: 4 },
      { text: '"Solid pizza, nothing fancy but exactly what we needed after a long beach day. Pasta Al Forno was a hit with the kids."', author: 'Family of 5, Ohio', date: 'November 2025', rating: 4 },
    ],
  },
};

// --- Car Rental Summary Data ---
const RENTALS = [
  { id: 'grace-bay', name: 'Grace Bay Car Rentals', rating: 4.4, reviews: 159, reviewSource: 'Google', price: 'SUV ~$103–170/day',
    website: 'https://gracebaycarrentals.com/',
    tripadvisor: 'https://www.tripadvisor.com/Attraction_Review-g147399-d6102498',
    google: 'https://www.google.com/maps/place/Grace+Bay+Car+Rentals/',
    verdict: 'Top pick — largest SUV selection, easiest airport pickup, well-known.' },
  { id: 'sixt', name: 'SIXT', rating: 8.5, ratingScale: 10, reviews: 14, reviewSource: 'TripAdvisor', price: 'SUV from ~$112/day',
    website: 'https://www.sixt.com/car-rental/turks-and-caicos-islands/providenciales/',
    tripadvisor: 'https://www.tripadvisor.com/RentalCars_Review-g147399-d18279910-Reviews-Sixt_Providenciales_Intl_Airport',
    verdict: 'Solid backup — trusted international brand, on-site at airport.' },
  { id: 'dnb', name: 'DnB Auto Rental', reviews: 0, reviewSource: 'none', price: 'Midsize ~$70–80/day',
    website: 'https://dnbautorental.com/', instagram: 'https://www.instagram.com/dbautorental/',
    verdict: 'Best value — stellar service, but confirm SUV/midsize availability early.' },
  { id: 'mymy', name: 'MyMy Auto Rentals', reviews: 0, reviewSource: 'none', price: 'From $70–109/day',
    website: 'https://mymyautorentals.com/', facebook: 'https://web.facebook.com/mymycarrental/',
    verdict: 'Good option — newer vehicles, but verify large-vehicle inventory.' },
];

// --- Car Rental Detail Data ---
const RENTAL_DETAILS = {
  'grace-bay': {
    synopsis: 'The largest and most established car rental company in Turks & Caicos with a fleet of over 400 vehicles. Their no-hassle airport pickup operates right in the PLS parking lot — no shuttle needed. They\'ve been known to send a "chaser" car to carry extra luggage when the main vehicle was tight. Multiple locations across the island including airport, Grace Bay Road, and Leeward Highway.',
    familyNote: 'Best choice for a family of four with luggage. Their fleet includes Chevy Tahoe, Suburban, and Toyota Prado full-size SUVs that comfortably fit 4 passengers plus all the bags and beach gear. Minivans also available. Child/booster seats can be requested at booking.',
    hours: 'Mon–Sat 8:00 AM – 5:00 PM, Sun 8:00 AM – 1:00 PM',
    phone: '+1 (649) 941-8500',
    address: 'PLS Airport Parking Lot (main pickup), Grace Bay Road, Leeward Highway',
    website: 'https://gracebaycarrentals.com/',
    tripadvisor: 'https://www.tripadvisor.com/Attraction_Review-g147399-d6102498',
    fleet: [
      { section: 'Full-Size SUVs', items: [
        { name: 'Chevy Tahoe', note: 'Seats 7, plenty of cargo space' },
        { name: 'Chevy Suburban', note: 'Largest option — ideal for families with lots of luggage' },
        { name: 'Toyota Prado', note: 'Reliable full-size SUV' },
      ]},
      { section: 'Midsize SUVs & Crossovers', items: [
        { name: 'Toyota RAV4', note: 'Good fuel economy, fits 4 + luggage' },
        { name: 'Hyundai Tucson', note: 'Compact SUV option' },
      ]},
      { section: 'Minivans & Other', items: [
        { name: 'Minivan (various models)', note: 'Sliding doors, great for families' },
        { name: 'Sedans and compacts', note: 'Budget options available' },
      ]},
    ],
    reviews: [
      { text: 'Fast airport pickup, no lines. They had our Tahoe ready and waiting in the parking lot. Luggage for 4 fit easily.', author: 'Google reviewer', date: '2025', rating: 5, source: 'Google' },
      { text: 'Always reliable, vehicles are clean, and the airport process is the quickest on the island. Used them three trips in a row.', author: 'Google reviewer', date: '2025', rating: 5, source: 'Google' },
      { text: 'Vehicle had some miles on it but ran perfectly. Pick-up and drop-off were seamless. Some of the one-star reviews mention older vehicles or pricing disagreements.', author: 'Google reviewer', date: '2024', rating: 4, source: 'Google' },
    ],
    tips: [
      'Book at least 2–3 weeks early for peak season (June–August) to guarantee an SUV.',
      'Request a Tahoe or Suburban specifically — they go fast.',
      'Pick up is in the airport parking lot, not inside the terminal. Look for the Grace Bay booth.',
      'Ask about their multi-day discount for 7+ day rentals.',
      '122 of 159 Google reviews are 5-star, but 18 are 1-star — mostly about vehicle condition or billing. Read the recent ones.',
    ],
  },
  sixt: {
    synopsis: 'International rental brand with a counter right at the PLS airport parking area. SIXT brings familiar booking processes and professional service to Providenciales. Their fleet includes SUVs and minivans with child seat add-ons available. Quick paperwork and reliable vehicles, though fleet can sell out during peak season.',
    familyNote: 'A solid option if you want the reliability of an international brand. Child seats and booster seats available as add-ons — request at booking time. Their SUV selection is smaller than Grace Bay\'s, so book early to ensure you get the size you need for a family of four plus luggage.',
    hours: 'Mon–Sun 8:00 AM – 6:00 PM',
    phone: '+1 (649) 946-4684',
    address: 'PLS Airport, Providenciales',
    website: 'https://www.sixt.com/car-rental/turks-and-caicos-islands/providenciales/',
    tripadvisor: 'https://www.tripadvisor.com/RentalCars_Review-g147399-d18279910-Reviews-Sixt_Providenciales_Intl_Airport',
    fleet: [
      { section: 'SUVs', items: [
        { name: 'Midsize SUV', note: 'Typical option: Hyundai Tucson or similar' },
        { name: 'Full-size SUV', note: 'Subject to availability — book early' },
      ]},
      { section: 'Sedans & Economy', items: [
        { name: 'Standard Sedan', note: 'Fits 4 adults, moderate trunk space' },
        { name: 'Economy', note: 'Compact option for budget travelers' },
      ]},
      { section: 'Add-Ons', items: [
        { name: 'Child Seat', note: 'Request at booking' },
        { name: 'GPS Navigation', note: 'Available on request' },
        { name: 'Additional Driver', note: 'Can be added at counter' },
      ]},
    ],
    reviews: [
      { text: 'Counter right at the airport, no shuttle needed. Quick and professional. SUV was in great shape and clean.', author: 'TripAdvisor reviewer', date: '2025', rating: 4, source: 'TripAdvisor' },
      { text: 'Smooth booking through the SIXT app. Car was ready when we arrived. Return process took under 5 minutes.', author: 'TripAdvisor reviewer', date: '2025', rating: 4, source: 'TripAdvisor' },
      { text: 'Decent experience but the vehicle was smaller than expected. Make sure to confirm exact model when booking, not just category.', author: 'TripAdvisor reviewer', date: '2024', rating: 3, source: 'TripAdvisor' },
    ],
    tips: [
      'Book through the SIXT app or website for the best rates — walk-up prices are higher.',
      'Fleet sells out in peak season. Reserve 3–4 weeks ahead for June travel.',
      'Confirm the exact vehicle model at booking, not just the category.',
      'Child seats must be requested at time of booking, not at pickup.',
    ],
  },
  dnb: {
    synopsis: 'Smaller local operator with outstanding customer service and vehicles in impeccable condition. DnB is a family-run business that takes pride in personal attention — they\'ll work with your schedule on pickup and drop-off times. Free airport shuttle service. Great value pricing with no hidden fees.',
    familyNote: 'DnB\'s fleet leans toward midsize vehicles. For a family of four with luggage, call ahead and specifically request their largest available vehicle. Their sedans can work for 4 adults but will be tight with beach gear and suitcases. Best for families who pack light or as a second car option.',
    hours: 'Mon–Sat 8:00 AM – 5:00 PM (flexible by arrangement)',
    phone: '+1 (649) 247-4044',
    address: 'Airport Road, Providenciales (free shuttle from PLS)',
    website: 'https://dnbautorental.com/',
    tripadvisor: '',
    fleet: [
      { section: 'Midsize Vehicles', items: [
        { name: 'Toyota Corolla or similar sedan', note: 'Fits 4 adults — luggage space is limited' },
        { name: 'Midsize SUV (limited availability)', note: 'Call to confirm availability' },
      ]},
      { section: 'Economy', items: [
        { name: 'Compact sedan', note: 'Best rates, suitable for couples' },
      ]},
    ],
    reviews: [
      { text: 'Mentioned positively in TripAdvisor forum threads about Providenciales car rentals. Travelers praise the personal service, clean vehicles, and flexibility with pickup times. No formal review page exists.', author: 'TripAdvisor forums', date: '2024–2025', source: 'TripAdvisor forum' },
    ],
    tips: [
      'Call or WhatsApp directly for the best rates — their website may not show real-time availability.',
      'Request their largest vehicle well in advance if you need space for a family.',
      'Free airport shuttle — they\'ll meet you at arrivals.',
      'Flexible on pickup/drop-off times. Let them know your flight details.',
    ],
  },
  mymy: {
    synopsis: 'Newer fleet with free airport pickup and excellent communication throughout the rental process. MyMy offers a range from compact economy cars to their premium Nissan Fuga sedan. GPS and child seats available on request. Known for transparent pricing with no hidden fees and responsive WhatsApp communication.',
    familyNote: 'Their Nissan Fuga premium sedan ($109/day, $500 deposit) seats 5 with room for 4 pieces of luggage — workable for a family of four. Compact options start at $70/day but won\'t fit family luggage. Child seats and GPS available on request at booking. Call ahead to confirm the Fuga or larger vehicle is available for your dates.',
    hours: 'Mon–Sat 8:00 AM – 5:00 PM',
    phone: '+1 (649) 344-6789',
    address: 'Airport Road, Providenciales (free airport pickup)',
    website: 'https://mymyautorentals.com/',
    tripadvisor: '',
    fleet: [
      { section: 'Premium', items: [
        { name: 'Nissan Fuga', note: '$109/day, $500 deposit — seats 5, fits 4 bags' },
      ]},
      { section: 'Standard & Economy', items: [
        { name: 'Standard sedan', note: 'From $85/day' },
        { name: 'Compact', note: 'From $70/day — best for couples' },
      ]},
      { section: 'Add-Ons', items: [
        { name: 'GPS Navigation', note: 'Available on request' },
        { name: 'Child Seat', note: 'Available on request' },
      ]},
    ],
    reviews: [
      { text: 'No reviews on Google, TripAdvisor, or other major platforms. They collect testimonials through their own website. Check their Facebook page for customer posts.', author: 'Research note', date: '2026', source: 'No major platform' },
    ],
    tips: [
      'WhatsApp is the best way to communicate — faster response than email.',
      'The Nissan Fuga is their best family option. Book it specifically by name.',
      'Requires a $500 deposit for premium vehicles — bring a credit card.',
      'Ask about weekly rates for 7+ day rentals.',
    ],
  },
};

// --- Itinerary ---
const ITINERARY = [
  { day: 1, date: 'Mon, Jun 15', title: 'Travel Day \u2014 Arrive in Paradise', type: 'travel-day',
    suggestion: 'Flights: RIC \u2192 IAD \u2192 PLS. Arrive 4:05 PM. Pick up rental car at airport. Check into Blue Chill Villa (3 PM+). Settle in, explore the villa & pool. Easy first dinner \u2014 Las Brisas is steps away!' },
  { day: 2, date: 'Tue, Jun 16', title: 'First Full Day \u2014 Sleep In & Beach',
    suggestion: 'No alarm! Sleep in and enjoy a lazy morning. Stroll to Sapodilla Bay Beach (3 min walk). Afternoon pool time \u2014 try the villa\'s kayaks or paddleboards on Chalk Sound.' },
  { day: 3, date: 'Wed, Jun 17', title: 'Sleep In & Parasailing',
    suggestion: 'Sleep in \u2014 grab a late breakfast. Afternoon parasailing at Grace Bay (Mike, Elise & Olivia). Carrie can relax on Grace Bay Beach. Browse shops after. Da Conch Shack Junkanoo party tonight?' },
  { day: 4, date: 'Thu, Jun 18', title: '\u2600\uFE0F Early Morning \u2014 Snorkeling Cruise',
    suggestion: 'Early start! Caicos Dream Tours snorkeling cruise departs 9 AM (4 hrs). Snorkel the barrier reef, stop at Half Moon Bay with iguanas. Lunch included on boat. Afternoon: pool & nap recovery.',
    earlyMorning: true },
  { day: 5, date: 'Fri, Jun 19', title: 'Sleep In & Beach Day',
    suggestion: 'Sleep in! Try Taylor Bay Beach \u2014 calm shallow water, perfect for Olivia. Or revisit Grace Bay. Lua Beach House Friday Pizza Night could be fun tonight!' },
  { day: 6, date: 'Sat, Jun 20', title: '\u2600\uFE0F Early-ish \u2014 Kayak Eco-Tour',
    suggestion: 'Kayak eco-tour with Big Blue Collective \u2014 paddle through mangroves, visit the iguana sanctuary at Little Water Cay. Half-day tour. Afternoon: pool time.',
    earlyMorning: true },
  { day: 7, date: 'Sun, Jun 21', title: 'Chill Day \u2014 Pasta Night at the Villa',
    suggestion: 'Sleep in \u2014 this is your recovery day. Pool morning, maybe drive around the island: Chalk Sound lookout, Blue Hills area. Tonight: cook pasta & meat sauce at the villa! Hit up a local grocery (IGA or Graceway Gourmet).' },
  { day: 8, date: 'Mon, Jun 22', title: 'Last Full Day \u2014 Soak It All In',
    suggestion: 'Sleep in one more time. Return to your favorite beach. Last swim in the villa pool. Sunset walk on Sapodilla Bay. Special farewell dinner \u2014 Coco Bistro or Coyaba?' },
  { day: 9, date: 'Tue, Jun 23', title: 'Departure Day', type: 'departure-day',
    suggestion: 'Check out by 11 AM. Morning at the beach or pool. Return rental car at airport. Flight: PLS \u2192 IAD \u2192 RIC departs 5:15 PM, home by 11:21 PM.' },
];

const BREAKFAST_OPTIONS = [
  'Undecided', 'Shay Cafe & Lounge', "Hemingway's on the Beach",
  'Lua Beach House', 'Bay Bistro', 'Caicos Bakery',
  'Las Brisas (walking distance!)', 'Cook at villa',
];

const DINNER_OPTIONS = [
  'Undecided', 'Las Brisas (walking distance!)', "Bugaloo's Conch Crawl",
  "Omar's Beach Hut", 'Da Conch Shack', 'Mangrove Bay', "Sweet T's",
  'Baci Ristorante', "Mr. Grouper's", 'Cocovan', 'Blue Water Bistro',
  'Bay Bistro', "Hemingway's on the Beach", 'Infiniti Restaurant & Raw Bar',
  'Parallel 23', 'Coco Bistro', 'Coyaba Restaurant', 'Caicos Cafe',
  'Provence by Eric', 'Lua Beach House',
  'Cook at villa - Pasta Night!', 'Cook at villa',
];

// --- State Management ---
const STORAGE_KEY = 'tci-trip-2026';
function loadState() { try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : {}; } catch { return {}; } }
function saveState(state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function getState() { return loadState(); }
function updateState(key, value) { const s = loadState(); s[key] = value; saveState(s); }

function escapeHtml(str) { const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }

// ============================================
// COUNTDOWN
// ============================================
function initCountdown() {
  const el = document.getElementById('countdown');
  function update() {
    const now = new Date();
    const diff = TRIP_DATE - now;
    if (diff <= 0) { el.innerHTML = '<span style="font-size:1.2rem;font-weight:600">Trip time!</span>'; return; }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    el.innerHTML = `
      <div class="countdown-item"><span class="countdown-number">${days}</span><span class="countdown-label">Days</span></div>
      <div class="countdown-item"><span class="countdown-number">${hours}</span><span class="countdown-label">Hours</span></div>
      <div class="countdown-item"><span class="countdown-number">${mins}</span><span class="countdown-label">Min</span></div>
      <div class="countdown-item"><span class="countdown-number">${secs}</span><span class="countdown-label">Sec</span></div>`;
  }
  update();
  setInterval(update, 1000);
}

// ============================================
// FLIGHT MAP
// ============================================
function initFlightMap() {
  const map = L.map('flight-map', { scrollWheelZoom: false, zoomControl: true }).setView([30, -74], 5);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO', maxZoom: 19,
  }).addTo(map);

  Object.entries(AIRPORTS).forEach(([code, info]) => {
    L.circleMarker([info.lat, info.lng], {
      radius: 8, fillColor: code === 'PLS' ? '#f97316' : '#0891b2', color: '#fff', weight: 2, fillOpacity: 0.9,
    }).bindTooltip(`<strong>${code}</strong><br>${info.name}`, {
      permanent: true, direction: code === 'PLS' ? 'bottom' : 'top', className: 'airport-tooltip',
    }).addTo(map);
  });

  function bezier(start, end, n = 50) {
    const pts = [], dist = Math.sqrt((end.lat-start.lat)**2 + (end.lng-start.lng)**2);
    const cLat = (start.lat+end.lat)/2 + dist*0.15, cLng = (start.lng+end.lng)/2;
    for (let i = 0; i <= n; i++) {
      const t = i/n;
      pts.push([(1-t)**2*start.lat + 2*(1-t)*t*cLat + t**2*end.lat, (1-t)**2*start.lng + 2*(1-t)*t*cLng + t**2*end.lng]);
    }
    return pts;
  }

  L.polyline(bezier(AIRPORTS.RIC, AIRPORTS.IAD), { color: '#0891b2', weight: 3, dashArray: '8, 6', opacity: 0.8 }).addTo(map);
  const mainPath = bezier(AIRPORTS.IAD, AIRPORTS.PLS);
  L.polyline(mainPath, { color: '#0891b2', weight: 3, opacity: 0.9 }).addTo(map);

  const mid = mainPath[Math.floor(mainPath.length / 2)];
  L.marker(mid, {
    icon: L.divIcon({ html: '<div style="font-size:24px;transform:rotate(150deg)">&#9992;</div>', iconSize: [30,30], iconAnchor: [15,15], className: '' }),
  }).addTo(map);

  map.fitBounds([[AIRPORTS.RIC.lat, AIRPORTS.RIC.lng], [AIRPORTS.IAD.lat, AIRPORTS.IAD.lng], [AIRPORTS.PLS.lat, AIRPORTS.PLS.lng]], { padding: [40, 40] });
}

// ============================================
// VILLA GALLERY
// ============================================
function initGallery() {
  const track = document.getElementById('gallery-track');
  const dotsContainer = document.getElementById('gallery-dots');
  let currentSlide = 0;

  VILLA_IMAGES.forEach((url, i) => {
    const img = document.createElement('img');
    img.src = url; img.alt = `Blue Chill Villa photo ${i + 1}`;
    img.className = 'gallery-slide'; img.loading = i === 0 ? 'eager' : 'lazy';
    track.appendChild(img);
    const dot = document.createElement('button');
    dot.className = `gallery-dot${i === 0 ? ' active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll('.gallery-dot').forEach((d, i) => d.classList.toggle('active', i === index));
  }

  document.getElementById('gallery-prev').addEventListener('click', () => goToSlide(currentSlide > 0 ? currentSlide - 1 : VILLA_IMAGES.length - 1));
  document.getElementById('gallery-next').addEventListener('click', () => goToSlide(currentSlide < VILLA_IMAGES.length - 1 ? currentSlide + 1 : 0));
  setInterval(() => goToSlide(currentSlide < VILLA_IMAGES.length - 1 ? currentSlide + 1 : 0), 5000);
}

// ============================================
// DINING — Summary Cards + Filters
// ============================================
let activeFilter = 'all';

function initDining() {
  renderDiningCards();
  initDiningFilters();

  // Detail page back button
  document.getElementById('detail-back').addEventListener('click', hideRestaurantDetail);
}

function renderDiningCards() {
  const grid = document.getElementById('dining-grid');
  grid.innerHTML = '';

  RESTAURANTS.forEach(r => {
    const detail = DETAILS[r.id];
    const card = document.createElement('div');
    card.className = 'dining-card';
    card.dataset.restaurant = r.id;
    card.dataset.type = r.type;
    card.dataset.nearby = r.nearby ? 'true' : 'false';
    card.dataset.pizza = r.pizza ? 'true' : 'false';

    const typeLabels = [];
    if (r.type === 'breakfast' || r.type === 'both') typeLabels.push('<span class="dining-tag breakfast-tag">Breakfast</span>');
    if (r.type === 'dinner' || r.type === 'both') typeLabels.push('<span class="dining-tag dinner-tag">Dinner</span>');
    if (r.nearby) typeLabels.push('<span class="dining-tag nearby-tag">Near Villa</span>');
    if (r.pizza) typeLabels.push('<span class="dining-tag pizza-tag">Pizza</span>');
    if (r.id === 'sweetts') typeLabels.push('<span class="dining-tag cash-tag">Cash Only</span>');

    const stars = '\u2605'.repeat(Math.floor(r.rating)) + (r.rating % 1 >= 0.5 ? '\u00BD' : '');

    card.innerHTML = `
      <div class="dining-card-header">
        <div>
          <h4>${r.name}</h4>
          <span class="dining-card-cuisine">${r.cuisine}</span>
        </div>
        <div class="dining-card-rating">
          <span class="rating-num">${r.rating}</span>
          <span class="rating-stars">${stars}</span>
          <span class="rating-count">(${r.reviews.toLocaleString()})</span>
        </div>
      </div>
      <div class="tag-row">${typeLabels.join('')}<span class="price-tag">${r.price}</span></div>
      <div class="dining-card-distance">
        <span class="distance-icon">&#128205;</span>
        <span>${r.distance} from villa</span>
        <span class="drive-time">${r.driveTime}</span>
      </div>
      <p class="dining-card-synopsis">${detail ? detail.synopsis.substring(0, 120) + '...' : ''}</p>
      <div class="dining-card-footer">
        <span class="per-person">${detail ? detail.perPerson + '/person' : ''}</span>
        <span class="view-detail">View Details &rarr;</span>
      </div>
    `;

    card.addEventListener('click', () => showRestaurantDetail(r.id));
    grid.appendChild(card);
  });
}

function initDiningFilters() {
  document.querySelectorAll('.dining-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dining-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      filterDiningCards();
    });
  });
}

function filterDiningCards() {
  document.querySelectorAll('.dining-card').forEach(card => {
    const type = card.dataset.type;
    const nearby = card.dataset.nearby === 'true';
    const pizza = card.dataset.pizza === 'true';
    let show = false;

    if (activeFilter === 'all') show = true;
    else if (activeFilter === 'breakfast') show = (type === 'breakfast' || type === 'both');
    else if (activeFilter === 'dinner') show = (type === 'dinner' || type === 'both');
    else if (activeFilter === 'nearby') show = nearby;
    else if (activeFilter === 'pizza') show = pizza;

    card.style.display = show ? '' : 'none';
  });

  const cookCard = document.getElementById('villa-cook-card');
  if (cookCard) cookCard.style.display = (activeFilter === 'breakfast' || activeFilter === 'pizza') ? 'none' : '';
}

// ============================================
// RESTAURANT DETAIL PAGE
// ============================================
let detailMap = null;

function showRestaurantDetail(id) {
  const r = RESTAURANTS.find(x => x.id === id);
  const d = DETAILS[id];
  if (!r || !d) return;

  const overlay = document.getElementById('restaurant-detail');
  const body = document.getElementById('detail-body');

  const typeLabels = [];
  if (r.type === 'breakfast' || r.type === 'both') typeLabels.push('<span class="dining-tag breakfast-tag">Breakfast</span>');
  if (r.type === 'dinner' || r.type === 'both') typeLabels.push('<span class="dining-tag dinner-tag">Dinner</span>');
  if (r.nearby) typeLabels.push('<span class="dining-tag nearby-tag">Near Villa</span>');

  // Build menu HTML
  let menuHtml = '';
  if (d.menu) {
    d.menu.forEach((section, idx) => {
      menuHtml += `<div class="detail-menu-section">
        <button class="detail-menu-toggle" data-idx="${idx}">
          ${section.section} <span class="toggle-arrow">\u25BC</span>
        </button>`;
      if (section.note) menuHtml += `<p class="menu-section-note">${section.note}</p>`;
      if (section.items) {
        menuHtml += '<div class="detail-menu-items">';
        section.items.forEach(item => {
          menuHtml += `<div class="detail-menu-item">
            <span class="menu-item-name">${item.name}${item.note ? `<span class="menu-item-note"> \u2014 ${item.note}</span>` : ''}</span>
            ${item.price ? `<span class="menu-item-price">${item.price}</span>` : ''}
          </div>`;
        });
        menuHtml += '</div>';
      }
      menuHtml += '</div>';
    });
  }

  // Build reviews HTML
  let reviewsHtml = '';
  if (d.reviews) {
    d.reviews.forEach(rev => {
      const stars = '\u2605'.repeat(rev.rating);
      reviewsHtml += `<div class="detail-review-card">
        <div class="review-header">
          <span class="review-stars">${stars}</span>
          <span class="review-meta">${rev.author} \u00b7 ${rev.date}</span>
        </div>
        <p>${rev.text}</p>
      </div>`;
    });
  }

  // Build top action buttons
  let topButtonsHtml = '';
  if (d.website) topButtonsHtml += `<a href="${d.website}" target="_blank" class="detail-action-btn">Website</a>`;
  if (d.menuLink) topButtonsHtml += `<a href="${d.menuLink}" target="_blank" class="detail-action-btn">Menu</a>`;

  // Build links HTML
  let linksHtml = '';
  if (d.website) linksHtml += `<a href="${d.website}" target="_blank">Website</a>`;
  if (d.instagram) linksHtml += `<a href="${d.instagram}" target="_blank">Instagram</a>`;
  if (d.opentable) linksHtml += `<a href="${d.opentable}" target="_blank">OpenTable</a>`;

  body.innerHTML = `
    <div class="detail-header">
      <h2>${r.name}</h2>
      <div class="detail-meta">
        <span class="detail-rating">${r.rating}\u2605 <span class="detail-review-count">(${r.reviews.toLocaleString()} reviews)</span></span>
        <span class="price-tag">${r.price}</span>
        <span class="detail-per-person">${d.perPerson}/person</span>
      </div>
      <div class="tag-row">${typeLabels.join('')}</div>
      ${topButtonsHtml ? `<div class="detail-action-btns">${topButtonsHtml}</div>` : ''}
    </div>

    <div class="detail-info-bar">
      <div class="info-item"><strong>Hours:</strong> ${d.hours}</div>
      <div class="info-item"><strong>Phone:</strong> <a href="tel:${d.phone}">${d.phone}</a></div>
      <div class="info-item"><strong>Reservations:</strong> ${d.reservations}</div>
      ${d.cashOnly ? '<div class="info-item cash-warning"><strong>CASH ONLY</strong></div>' : ''}
    </div>


    <div class="detail-synopsis">
      <p>${d.synopsis}</p>
    </div>

    <div class="detail-family-note">
      <h3>Family Assessment</h3>
      <p>${d.familyNote}</p>
    </div>

    <div class="detail-map-section">
      <h3>Getting There</h3>
      <div id="detail-map" class="detail-mini-map"></div>
      <p class="detail-distance-label">${r.distance} from Blue Chill Villa &middot; ${r.driveTime}${r.driveTime === 'Walkable' ? '' : ' drive'}</p>
    </div>

    <div class="detail-menu">
      <h3>Menu</h3>
      ${menuHtml}
    </div>

    <div class="detail-reviews">
      <h3>Recent Reviews</h3>
      ${reviewsHtml}
    </div>

    <div class="detail-contact">
      <h3>Contact & Links</h3>
      <div class="detail-contact-grid">
        ${d.address ? `<div class="contact-row"><strong>Address:</strong> ${d.address}</div>` : ''}
        ${d.phone ? `<div class="contact-row"><strong>Phone:</strong> <a href="tel:${d.phone}">${d.phone}</a></div>` : ''}
        ${d.email ? `<div class="contact-row"><strong>Email:</strong> <a href="mailto:${d.email}">${d.email}</a></div>` : ''}
        ${d.whatsapp ? `<div class="contact-row"><strong>WhatsApp:</strong> <a href="https://wa.me/${d.whatsapp.replace(/[^0-9]/g,'')}">${d.whatsapp}</a></div>` : ''}
      </div>
      <div class="detail-links">${linksHtml}</div>
    </div>
  `;

  // Show overlay
  overlay.style.display = 'block';
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';

  // Menu toggles
  body.querySelectorAll('.detail-menu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.parentElement;
      section.classList.toggle('open');
    });
  });

  // Mini map
  setTimeout(() => initDetailMap(r), 100);
}

function initDetailMap(restaurant) {
  if (detailMap) { detailMap.remove(); detailMap = null; }

  const mapEl = document.getElementById('detail-map');
  if (!mapEl) return;

  detailMap = L.map('detail-map', { scrollWheelZoom: false, zoomControl: true, attributionControl: false });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(detailMap);

  // Villa marker
  L.marker([VILLA.lat, VILLA.lng], {
    icon: L.divIcon({ html: '<div class="villa-map-marker">&#127968;</div>', iconSize: [30, 30], iconAnchor: [15, 15], className: '' }),
  }).bindPopup('<strong>Blue Chill Villa</strong>').addTo(detailMap);

  // Restaurant marker
  L.marker([restaurant.lat, restaurant.lng], {
    icon: L.divIcon({
      html: `<div style="background:#f97316;width:14px;height:14px;border-radius:50%;border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
      iconSize: [18, 18], iconAnchor: [9, 9], className: '',
    }),
  }).bindPopup(`<strong>${restaurant.name}</strong>`).addTo(detailMap);

  // Dashed line between
  L.polyline([[VILLA.lat, VILLA.lng], [restaurant.lat, restaurant.lng]], {
    color: '#0891b2', weight: 2.5, dashArray: '8, 6', opacity: 0.7,
  }).addTo(detailMap);

  // Fit bounds
  detailMap.fitBounds([[VILLA.lat, VILLA.lng], [restaurant.lat, restaurant.lng]], { padding: [50, 50], maxZoom: 14 });
}

function hideRestaurantDetail() {
  document.getElementById('restaurant-detail').style.display = 'none';
  document.body.style.overflow = '';
  if (detailMap) { detailMap.remove(); detailMap = null; }
}

// ============================================
// ITINERARY
// ============================================
function initItinerary() {
  const grid = document.getElementById('itinerary-grid');
  const state = getState();

  ITINERARY.forEach(day => {
    const card = document.createElement('div');
    card.className = `day-card${day.type ? ' ' + day.type : ''}${day.earlyMorning ? ' early-morning' : ''}`;
    const meals = state[`day${day.day}_meals`] || { breakfast: '', dinner: '' };
    const notes = state[`day${day.day}_notes`] || '';

    const bfOpts = BREAKFAST_OPTIONS.map(r => `<option value="${r}" ${meals.breakfast === r ? 'selected' : ''}>${r}</option>`).join('');
    const dnOpts = DINNER_OPTIONS.map(r => `<option value="${r}" ${meals.dinner === r ? 'selected' : ''}>${r}</option>`).join('');

    const showBf = day.day !== 1;
    const showDn = day.day !== 9;
    const badge = day.earlyMorning ? '<span class="early-badge">Early Morning</span>' : '<span class="sleep-badge">Sleep In</span>';

    card.innerHTML = `
      <div class="day-card-header">
        <div class="day-number">${day.day}</div>
        <div class="day-header-text"><h4>${day.title}</h4><p>${day.date} ${day.day > 1 && day.day < 9 ? badge : ''}</p></div>
        <div class="day-expand">&#9660;</div>
      </div>
      <div class="day-card-body"><div class="day-card-content">
        <div class="day-suggestion">${day.suggestion}</div>
        <div class="meal-plan">
          ${showBf ? `<div class="meal-slot"><label>Breakfast</label><select data-day="${day.day}" data-meal="breakfast">${bfOpts}</select></div>` : ''}
          ${showDn ? `<div class="meal-slot"><label>Dinner</label><select data-day="${day.day}" data-meal="dinner">${dnOpts}</select></div>` : ''}
        </div>
        <div class="day-notes"><label>Notes</label><textarea data-day="${day.day}" placeholder="Add your plans, ideas, reservations...">${notes}</textarea></div>
      </div></div>`;

    card.querySelector('.day-card-header').addEventListener('click', () => card.classList.toggle('open'));
    card.querySelectorAll('select').forEach(sel => {
      sel.addEventListener('change', e => {
        const m = getState()[`day${e.target.dataset.day}_meals`] || { breakfast: '', dinner: '' };
        m[e.target.dataset.meal] = e.target.value;
        updateState(`day${e.target.dataset.day}_meals`, m);
      });
    });
    const ta = card.querySelector('textarea[data-day]');
    if (ta) { let t; ta.addEventListener('input', e => { clearTimeout(t); t = setTimeout(() => updateState(`day${e.target.dataset.day}_notes`, e.target.value), 300); }); }

    grid.appendChild(card);
  });
}

// ============================================
// ACTIVITIES
// ============================================
function renderActivitiesContent() {
  const container = document.getElementById('activities-content');
  const state = getState();

  const activities = [
    { id: 'parasailing', icon: '\ud83e\ude82', title: 'Parasailing at Grace Bay', who: 'Mike, Elise & Olivia', priority: true,
      desc: 'Soar above the turquoise waters of Grace Bay. Most operators offer tandem and triple flights.',
      providers: [
        { name: 'Captain Marvin\'s', info: 'Popular operator, ~$100/person', website: 'https://www.captainmarvins.com/', tripadvisor: 'https://www.tripadvisor.com/Attraction_Review-g147399-d4439919' },
        { name: 'Parasailing TCI', info: 'Well-reviewed, beachfront pickup', website: '', tripadvisor: '' },
      ]},
    { id: 'snorkeling', icon: '\ud83e\udd3f', title: 'Snorkeling Cruise', who: 'Everyone', priority: true,
      desc: 'Half-day cruise to the barrier reef and Half Moon Bay. See sea turtles, stingrays, and iguanas on the beach.',
      providers: [
        { name: 'Caicos Dream Tours', info: '9 AM departure, ~4 hours, lunch included', website: 'https://www.caicosdreamtours.com/', tripadvisor: 'https://www.tripadvisor.com/Attraction_Review-g147399-d2073175' },
      ]},
    { id: 'kayak', icon: '\ud83d\udef6', title: 'Kayak Eco-Tour', who: 'Everyone',
      desc: 'Paddle through mangroves and visit the iguana sanctuary at Little Water Cay. Half-day tour.',
      providers: [
        { name: 'Big Blue Collective', info: 'Eco-focused tour company, SUP & kayak tours', website: 'https://www.bigbluecollective.com/', tripadvisor: 'https://www.tripadvisor.com/Attraction_Review-g147399-d640498' },
      ]},
    { id: 'beaches', icon: '\ud83c\udfd6\ufe0f', title: 'Beach Days', who: 'Everyone',
      desc: 'Grace Bay Beach (world-famous), Sapodilla Bay (3 min walk, calm), Taylor Bay (shallow, great for Olivia), and Long Bay (kite surfing views).',
      providers: [] },
    { id: 'glowworm', icon: '\u2728', title: 'Glow Worm Sunset Cruise', who: 'Everyone',
      desc: 'A magical evening cruise to see bioluminescent glow worms light up the water with green shimmer during their mating display. Happens 3\u20135 days after a full moon \u2014 only a few nights per month! Includes sunset views, drinks, and snacks. Sightings not guaranteed but unforgettable when it happens. Check moon calendar when booking.',
      providers: [
        { name: 'Caicos Dream Tours', info: '~3 hr cruise, drinks included. Limited dates each month.', website: 'https://caicosdreamtours.com/', tripadvisor: 'https://www.tripadvisor.com/Attraction_Review-g147399-d2073175' },
        { name: 'Ocean Vibes', info: 'Glow worm, sunset & stargazing combo cruise.', website: 'https://oceanvibes.com/activities/providenciales-group-glow-worm-sunset-stargazing-cruise/', tripadvisor: '' },
      ]},
    { id: 'potcake', icon: '\ud83d\udc36', title: 'Potcake Place Puppy Walk', who: 'Everyone (Olivia & Elise will love this)',
      desc: 'Walk rescue puppies on Grace Bay Beach! Potcake Place K9 Rescue at Saltmills Plaza offers free beach socialization walks Mon\u2013Sat starting 10 AM (return by 12:30 PM). First come, first served \u2014 lines can start at 9 AM in high season. They provide a beach bag with water, leash, and treats.',
      providers: [
        { name: 'Potcake Place K9 Rescue', info: 'Free! Mon\u2013Sat from 10 AM. Saltmills Plaza, Grace Bay.', website: 'https://www.potcakeplace.com/', tripadvisor: '' },
      ]},
    { id: 'horseback', icon: '\ud83d\udc0e', title: 'Horseback Riding on the Beach', who: 'Everyone (ages 7+, Olivia qualifies!)',
      desc: 'Ride horses along Long Bay Beach and into the shallow turquoise water. 60 or 90 minute guided rides, morning (9:30 AM) or afternoon (3:30 PM summer). Max 12 riders per group. Everyone rides their own horse. 230 lb weight limit, helmets required under 18.',
      providers: [
        { name: 'Provo Ponies', info: '60\u201390 min rides, ~$125\u2013150/person. Long Bay Beach.', website: 'https://provoponies.com/', tripadvisor: 'https://www.tripadvisor.com/Attraction_Review-g147399-d1024318-Reviews-Provo_Ponies-Providenciales_Turks_and_Caicos.html' },
      ]},
    { id: 'sunset', icon: '\ud83c\udf05', title: 'Sunset Cruise', who: 'Everyone',
      desc: 'A 2\u20132.5 hour catamaran cruise along Grace Bay at golden hour. Tropical drinks, snacks, and stunning views of the sunset over the Caicos cays. Some cruises are adults-only \u2014 look for family-friendly options.',
      providers: [
        { name: 'Caicos Dream Tours', info: '2.5 hr cruise, drinks included. Same company as snorkeling cruise.', website: 'https://caicosdreamtours.com/boat-tours/sunset-cruise-turks-and-caicos-providenciales/', tripadvisor: 'https://www.tripadvisor.com/Attraction_Review-g147399-d2073175' },
        { name: 'Island Vibes Tours', info: 'Private sunset cruises from Turtle Cove Marina.', website: 'https://islandvibestours.com/package/premium-sunset/', tripadvisor: '' },
      ]},
    { id: 'jetski', icon: '\ud83c\udfce\ufe0f', title: 'Jet Ski Shipwreck Tour', who: 'Mike & Elise (passengers 10+, drivers 15+)',
      desc: 'Ride jet skis out to the La Famille Express shipwreck, secluded cays, and nearby beaches. About 1 hour guided tour through crystal-clear water. Elise can ride as a passenger or possibly co-pilot at 15. ~$175\u2013190 per jet ski plus 12% tax.',
      providers: [
        { name: 'Five Cays Watersports', info: '~1 hr guided tour, ~$175/jet ski.', website: 'https://fivecayswatersports.com/', tripadvisor: '' },
        { name: 'Sun and Fun Sea Sports', info: 'Shipwreck Adventure tour, ~$190/jet ski.', website: 'https://www.sunandfunseasports.com/tours/shipwreck-adventure/', tripadvisor: '' },
      ]},
    { id: 'shopping', icon: '\ud83d\udecd\ufe0f', title: 'Grace Bay Shopping & Ice Cream', who: 'Everyone',
      desc: 'Stroll the shops at Saltmills Plaza, Regent Village, and Ports of Call. Local art, island jewelry, souvenir t-shirts, and handmade crafts. Grab ice cream or smoothies between shops. Great paired with a Potcake walk or beach time.',
      providers: [] },
  ];

  container.innerHTML = '<div class="activities-grid">' + activities.map(a => {
    const booked = state[`activity_${a.id}_booked`] || false;
    const notes = state[`activity_${a.id}_notes`] || '';
    const provHtml = a.providers.map(p => `
      <div class="provider">
        <div class="provider-header"><strong>${p.name}</strong></div>
        <p>${p.info}</p>
        <div class="provider-links">
          ${p.website ? `<a href="${p.website}" target="_blank">Website</a>` : ''}
          ${p.tripadvisor ? `<a href="${p.tripadvisor}" target="_blank">TripAdvisor</a>` : ''}
        </div>
      </div>`).join('');

    return `<div class="activity-card${a.priority ? ' priority' : ''}">
      <div class="activity-icon">${a.icon}</div>
      <h4>${a.title}</h4>
      <p class="activity-who">${a.who}</p>
      <p>${a.desc}</p>
      ${provHtml ? `<div class="activity-providers">${provHtml}</div>` : ''}
      <div class="activity-status">
        <label><input type="checkbox" id="booked-${a.id}" ${booked ? 'checked' : ''} /> Booked / Confirmed</label>
        <textarea id="notes-${a.id}" placeholder="Confirmation #, time, notes...">${notes}</textarea>
      </div>
    </div>`;
  }).join('') + '</div>';

  // Bind events
  activities.forEach(a => {
    const cb = document.getElementById(`booked-${a.id}`);
    const ta = document.getElementById(`notes-${a.id}`);
    if (cb) cb.addEventListener('change', () => updateState(`activity_${a.id}_booked`, cb.checked));
    if (ta) { let t; ta.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => updateState(`activity_${a.id}_notes`, ta.value), 300); }); }
  });
}

function initActivities() {
  renderActivitiesContent();
  renderCustomActivities();
  document.getElementById('add-activity-btn').addEventListener('click', addCustomActivity);
  document.getElementById('new-activity-name').addEventListener('keydown', e => { if (e.key === 'Enter') addCustomActivity(); });
}

function addCustomActivity() {
  const nameInput = document.getElementById('new-activity-name');
  const notesInput = document.getElementById('new-activity-notes');
  const name = nameInput.value.trim();
  if (!name) return;
  const list = getState().customActivities || [];
  list.push({ id: Date.now(), name, notes: notesInput.value.trim(), done: false });
  updateState('customActivities', list);
  nameInput.value = ''; notesInput.value = '';
  renderCustomActivities();
}

function renderCustomActivities() {
  const container = document.getElementById('custom-activities-list');
  const list = getState().customActivities || [];
  container.innerHTML = list.map(a => `
    <div class="custom-activity-item">
      <label><input type="checkbox" data-id="${a.id}" ${a.done ? 'checked' : ''} />
        <span style="${a.done ? 'text-decoration:line-through;opacity:0.6' : ''}">${escapeHtml(a.name)}</span>
      </label>
      ${a.notes ? `<span class="activity-detail">${escapeHtml(a.notes)}</span>` : ''}
      <button class="delete-btn" data-id="${a.id}">&times;</button>
    </div>`).join('');

  container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const acts = getState().customActivities || [];
      const a = acts.find(x => x.id === Number(cb.dataset.id));
      if (a) { a.done = cb.checked; updateState('customActivities', acts); renderCustomActivities(); }
    });
  });
  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateState('customActivities', (getState().customActivities || []).filter(a => a.id !== Number(btn.dataset.id)));
      renderCustomActivities();
    });
  });
}

// ============================================
// CAR RENTAL
// ============================================
function initCarRental() {
  const container = document.getElementById('rental-content');
  const state = getState();

  container.innerHTML = '<div class="rental-grid">' + RENTALS.map(r => {
    const detail = RENTAL_DETAILS[r.id];
    const snippet = detail ? detail.synopsis.substring(0, 120) + '...' : '';

    // Build rating display based on real review data
    let ratingHtml = '';
    const reviewUrl = r.google || r.tripadvisor || '';
    if (r.reviewSource === 'Google' && r.rating) {
      const stars = '\u2605'.repeat(Math.floor(r.rating)) + (r.rating % 1 >= 0.5 ? '\u00BD' : '');
      ratingHtml = `<div class="dining-card-rating">
        <span class="rating-num">${r.rating}</span>
        <span class="rating-stars">${stars}</span>
        <a href="${r.google}" target="_blank" class="rating-count" onclick="event.stopPropagation()">${r.reviews} on Google</a>
      </div>`;
    } else if (r.reviewSource === 'TripAdvisor' && r.rating) {
      ratingHtml = `<div class="dining-card-rating">
        <span class="rating-num">${r.rating}/${r.ratingScale || 5}</span>
        <a href="${r.tripadvisor}" target="_blank" class="rating-count" onclick="event.stopPropagation()">${r.reviews} on TripAdvisor</a>
      </div>`;
    } else {
      ratingHtml = `<div class="dining-card-rating">
        <span class="rating-count">Word of mouth</span>
      </div>`;
    }

    // Build review links row
    let reviewLinks = [];
    if (r.google) reviewLinks.push(`<a href="${r.google}" target="_blank" onclick="event.stopPropagation()">Google Reviews</a>`);
    if (r.tripadvisor) reviewLinks.push(`<a href="${r.tripadvisor}" target="_blank" onclick="event.stopPropagation()">TripAdvisor</a>`);
    if (r.instagram) reviewLinks.push(`<a href="${r.instagram}" target="_blank" onclick="event.stopPropagation()">Instagram</a>`);
    if (r.facebook) reviewLinks.push(`<a href="${r.facebook}" target="_blank" onclick="event.stopPropagation()">Facebook</a>`);

    return `
    <div class="rental-card" data-rental-id="${r.id}">
      <div class="rental-card-top">
        <h4>${r.name}</h4>
        ${ratingHtml}
      </div>
      <p class="dining-card-synopsis">${snippet}</p>
      ${r.verdict ? `<p class="rental-verdict"><strong>${r.verdict}</strong></p>` : ''}
      <div class="rental-links">
        ${r.website ? `<a href="${r.website}" target="_blank" onclick="event.stopPropagation()">Website</a>` : ''}
        ${reviewLinks.join('')}
      </div>
      <div class="rental-status" onclick="event.stopPropagation()">
        <label><input type="radio" name="rental" value="${r.id}" ${state.selectedRental === r.id ? 'checked' : ''} /> Select this rental</label>
      </div>
      <div class="dining-card-footer">
        <span class="rental-price">${r.price}</span>
        <span class="view-detail">View Details \u2192</span>
      </div>
    </div>`;
  }).join('') + '</div>';

  document.querySelectorAll('.rental-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => showRentalDetail(card.dataset.rentalId));
  });

  document.querySelectorAll('input[name="rental"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      e.stopPropagation();
      updateState('selectedRental', radio.value);
    });
  });

  // Detail page back button
  document.getElementById('rental-detail-back').addEventListener('click', hideRentalDetail);

  const rentalNotes = document.getElementById('rental-notes');
  rentalNotes.value = state.rentalNotes || '';
  let timer;
  rentalNotes.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => updateState('rentalNotes', rentalNotes.value), 300); });
}

// ============================================
// CAR RENTAL DETAIL PAGE
// ============================================
function showRentalDetail(id) {
  const r = RENTALS.find(x => x.id === id);
  const d = RENTAL_DETAILS[id];
  if (!r || !d) return;

  const overlay = document.getElementById('rental-detail');
  const body = document.getElementById('rental-detail-body');

  // Build rating display for detail header
  let detailRatingHtml = '';
  if (r.reviewSource === 'Google' && r.rating) {
    const stars = '\u2605'.repeat(Math.floor(r.rating)) + (r.rating % 1 >= 0.5 ? '\u00BD' : '');
    detailRatingHtml = `<span class="detail-rating">${r.rating} ${stars} <a href="${r.google}" target="_blank" class="detail-review-count">${r.reviews} reviews on Google</a></span>`;
  } else if (r.reviewSource === 'TripAdvisor' && r.rating) {
    detailRatingHtml = `<span class="detail-rating">${r.rating}/${r.ratingScale || 5} <a href="${r.tripadvisor}" target="_blank" class="detail-review-count">${r.reviews} reviews on TripAdvisor</a></span>`;
  } else {
    detailRatingHtml = `<span class="detail-rating"><span class="detail-review-count">Word of mouth \u2014 no major review platform listings</span></span>`;
  }

  // Build fleet HTML (reuses menu classes)
  let fleetHtml = '';
  if (d.fleet) {
    d.fleet.forEach((section, idx) => {
      fleetHtml += `<div class="detail-menu-section">
        <button class="detail-menu-toggle" data-idx="${idx}">
          ${section.section} <span class="toggle-arrow">\u25BC</span>
        </button>
        <div class="detail-menu-items">`;
      section.items.forEach(item => {
        fleetHtml += `<div class="detail-menu-item">
          <span class="menu-item-name">${item.name}${item.note ? `<span class="menu-item-note"> \u2014 ${item.note}</span>` : ''}</span>
        </div>`;
      });
      fleetHtml += '</div></div>';
    });
  }

  // Build reviews HTML
  let reviewsHtml = '';
  if (d.reviews && d.reviews.length) {
    d.reviews.forEach(rev => {
      const revStars = rev.rating ? '\u2605'.repeat(rev.rating) : '';
      const sourceLabel = rev.source ? ` \u00b7 via ${rev.source}` : '';
      reviewsHtml += `<div class="detail-review-card">
        <div class="review-header">
          ${revStars ? `<span class="review-stars">${revStars}</span>` : ''}
          <span class="review-meta">${rev.author} \u00b7 ${rev.date}${sourceLabel}</span>
        </div>
        <p>${rev.text}</p>
      </div>`;
    });
  } else {
    reviewsHtml = '<p style="color:var(--gray-400);font-size:0.9rem;">No reviews on major platforms yet. Check their website or social media for testimonials.</p>';
  }

  // Build tips HTML
  let tipsHtml = '';
  if (d.tips) {
    tipsHtml = `<div class="detail-tips"><h3>Booking Tips</h3><ul>${d.tips.map(t => `<li>${t}</li>`).join('')}</ul></div>`;
  }

  // Build top action buttons
  let topButtonsHtml = '';
  if (d.website) topButtonsHtml += `<a href="${d.website}" target="_blank" class="detail-action-btn">Website</a>`;
  if (r.google) topButtonsHtml += `<a href="${r.google}" target="_blank" class="detail-action-btn">Google Reviews</a>`;
  if (d.tripadvisor) topButtonsHtml += `<a href="${d.tripadvisor}" target="_blank" class="detail-action-btn">TripAdvisor</a>`;
  if (d.instagram || r.instagram) topButtonsHtml += `<a href="${d.instagram || r.instagram}" target="_blank" class="detail-action-btn">Instagram</a>`;
  if (r.facebook) topButtonsHtml += `<a href="${r.facebook}" target="_blank" class="detail-action-btn">Facebook</a>`;

  // Build links HTML
  let linksHtml = '';
  if (d.website) linksHtml += `<a href="${d.website}" target="_blank">Website</a>`;
  if (r.google) linksHtml += `<a href="${r.google}" target="_blank">Google Reviews</a>`;
  if (d.tripadvisor) linksHtml += `<a href="${d.tripadvisor}" target="_blank">TripAdvisor</a>`;
  if (d.instagram || r.instagram) linksHtml += `<a href="${d.instagram || r.instagram}" target="_blank">Instagram</a>`;
  if (r.facebook) linksHtml += `<a href="${r.facebook}" target="_blank">Facebook</a>`;

  body.innerHTML = `
    <div class="detail-header">
      <h2>${r.name}</h2>
      <div class="detail-meta">
        ${detailRatingHtml}
        <span class="price-tag">${r.price}</span>
      </div>
      ${topButtonsHtml ? `<div class="detail-action-btns">${topButtonsHtml}</div>` : ''}
    </div>

    <div class="detail-info-bar">
      <div class="info-item"><strong>Hours:</strong> ${d.hours}</div>
      <div class="info-item"><strong>Phone:</strong> <a href="tel:${d.phone}">${d.phone}</a></div>
      <div class="info-item"><strong>Pickup:</strong> ${d.address}</div>
    </div>

    <div class="detail-synopsis">
      <p>${d.synopsis}</p>
    </div>

    <div class="detail-family-note">
      <h3>Family Assessment</h3>
      <p>${d.familyNote}</p>
    </div>

    ${tipsHtml}

    <div class="detail-menu">
      <h3>Vehicle Fleet</h3>
      ${fleetHtml}
    </div>

    <div class="detail-reviews">
      <h3>Reviews</h3>
      ${reviewsHtml}
    </div>

    <div class="detail-contact">
      <h3>Contact & Links</h3>
      <div class="detail-contact-grid">
        ${d.address ? `<div class="contact-row"><strong>Pickup:</strong> ${d.address}</div>` : ''}
        ${d.phone ? `<div class="contact-row"><strong>Phone:</strong> <a href="tel:${d.phone}">${d.phone}</a></div>` : ''}
      </div>
      <div class="detail-links">${linksHtml}</div>
    </div>
  `;

  // Show overlay
  overlay.style.display = 'block';
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';

  // Fleet toggles (reuse menu toggle pattern)
  body.querySelectorAll('.detail-menu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.parentElement;
      section.classList.toggle('open');
    });
  });
}

function hideRentalDetail() {
  document.getElementById('rental-detail').style.display = 'none';
  document.body.style.overflow = '';
}


// ============================================
// NAVIGATION
// ============================================
function initNav() {
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.section');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + section.offsetHeight) {
        links.forEach(link => { link.style.color = link.getAttribute('href') === `#${id}` ? '#0891b2' : ''; });
      }
    });
    document.getElementById('main-nav').style.boxShadow = window.scrollY > 50 ? '0 2px 12px rgba(0,0,0,0.08)' : 'none';
  }, { passive: true });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initFlightMap();
  initGallery();
  initDining();
  initItinerary();
  initActivities();
  initCarRental();
  initNav();
});
