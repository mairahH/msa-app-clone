/**
 * This array contains information about prayer spaces on campus.
 * Each object in the array represents a prayer space with its coordinates, name, room details, and optional access code.
 * 
 * Template to add a prayer space:
 * {
 *   latitude: number,          // Required. Latitude of the prayer space location.
 *   longitude: number,         // Required. Longitude of the prayer space location.
 *   latitudeDelta: number,     // Required. Latitude span of the map region.
 *   longitudeDelta: number,    // Required. Longitude span of the map region.
 *   name: string,              // Required. Name of the food place.
 *   location: string,          // Required. Street address or building name.
 *   locationType: string,      // Required. Type of halal spot (On-campus/Off-campus, prefix 'lt').
 *   slaughterType: string      // Optional. Method used to slaughter (Look below for options, prefix 'st')
 *   halalLevel: string         // Optional. Whether all items are halal or not (Look below for options, prefix 'hl')
 * }
 */


//Options for the above parameters

let stMixed = 'Mixed (Hand/ Machine)'
let stHand = 'Hand-Slaughtered'
let stMachine = 'Machine-Slaughtered'
let stNA = 'N/A'
let stUnknown = 'Unknown'

let hlAll = 'All Halal'
let hlPartial = 'Partially Halal'
let hlVeg = 'Vegetarian'
let hlKosh = 'Kosher Dairy'

let ltOff = 'Off-Campus'
let ltOn = 'On-Campus'

let TBD = 'TBD'

export const HALAL_SPOTS = [
    {
        latitude: 43.50441110771526, 
        longitude: -80.5358798054801,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Mary Brown\'s Chicken',
        slaughterType: stMixed,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '622 King St N',
    },
    {
        latitude: 43.44674154962813, 
        longitude: -80.5707916406046,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Mary Brown\'s Chicken',
        slaughterType: stMixed,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '646 Erb St W',
    },
    {
        latitude: 43.47668245780599, 
        longitude: -80.52185660131619,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Roosters Fried Chicken & More',
        slaughterType: stUnknown,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '160 University Ave W Unit# 17',
    },
    {
        latitude: 43.47501664540951,  
        longitude: -80.52425110198004,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Osmow\'s Shawarma',
        slaughterType: stMachine,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '210 King St N',
    },
    {
        latitude: 43.505019348068295, 
        longitude: -80.53573562007175, 
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Osmow\'s Shawarma',
        slaughterType: stMachine,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '628 King St N',
    },
    {
        latitude: 43.50359183742192,  
        longitude: -80.5311770033758, 
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Double Taste Shawarma',
        slaughterType: stMachine,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '36 Northfield Dr E',
    },
    {
        latitude: 43.49553218799153,   
        longitude: -80.5014400036341,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Double Taste Shawarma',
        slaughterType: stMachine,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '373 Bridge St W',
    },
    {
        latitude: 43.496604405271036,    
        longitude: -80.55125000363401,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: '5 Star Shawarma and Pizza',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '585 Weber St N #4',
    },
    {
        latitude: 43.48632265715517,     
        longitude: -80.53951560558485,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'OnCoal Restaurant',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '464 Albert St',
    },
    // { Permanently closed?
    //     latitude: 43.47825347194213,     
    //     longitude: -80.51823025199019,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    //     name: 'Chic Pea Pita and Grill',
    //     slaughterType: stHand,
    //     halalLevel: hlAll,
    //     locationType: ltOff,
    //     location: TBD,
    // },
    {
        latitude: 43.48943626112446, 
        longitude: -80.49183329349204,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Uncle\'s Shawarma & Kabab',
        slaughterType: stUnknown,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '425 University Ave E',
    },
    {
        latitude: 43.4886113514607,  
        longitude: -80.49202721741256,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Tandoori Xpress',
        slaughterType: stUnknown,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '425 University Ave'
    },
    {
        latitude: 43.41571949498798,  
        longitude: -80.5109365036386,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Tandoori Xpress',
        slaughterType: stUnknown,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '685 Fischer-Hallman Rd L'
    },
    {
        latitude: 43.484455198009606,   
        longitude: -80.52625961260776,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Urwa\'s Pakistani and Indian Cuisine',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '402 King St N'
    },
    {
        latitude: 43.482099429473244,    
        longitude: -80.5268620337957,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Bianca\'s Pizza',
        slaughterType: stUnknown,
        halalLevel: hlPartial,
        locationType: ltOff,
        location: '363 King St N'
    },
    {
        latitude: 43.476687437854544,     
        longitude: -80.52535359450874,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Gino\'s Pizza',
        slaughterType: stUnknown,
        halalLevel: hlPartial,
        locationType: ltOff,
        location: '253 King St N Unit 2'
    },
    {
        latitude: 43.471744594340144,     
        longitude: -80.53870537970153,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Lazeez Shawarma',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '170 University Ave W'
    },
    {
        latitude: 43.477588759835356,      
        longitude: -80.52564650536856,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Lazeez Shawarma',
        slaughterType: stUnknown,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '255 King St N'
    },
    {
        latitude: 43.47728592721738,       
        longitude: -80.5257315310485,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'The Poke Box',
        halalLevel: 'seafood',
        locationType: ltOff,
        location: '255 King St N #3'
    },
    {
        latitude: 43.477304698186984,        
        longitude: -80.52573350026493,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'The Chef Signature',
        slaughterType: stUnknown,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '255 King St N Unit 10'
    },
    {
        latitude: 43.47676813652392,         
        longitude: -80.52531415628273,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Sultan\'s Mediterranean Grill',
        locationType: ltOff,
        location: '253 King St N Unit: FC2'
    },
    {
        latitude: 43.47668840315704,          
        longitude: -80.5254839760156,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Burger Factory',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '253 King St N Unit FC3 Great Food Hall'
    },
    {
        latitude: 43.42022443032925,           
        longitude: -80.45109395480083,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Fresh Burrito',
        slaughterType: stMachine,
        halalLevel: hlPartial,
        locationType: ltOff,
        location: '652 A Fairway Rd S'
    },
    {
        latitude: 43.47269774240927,           
        longitude: -80.53785828655964,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Fresh Burrito',
        slaughterType: stMachine,
        halalLevel: hlPartial,
        locationType: ltOff,
        location: '170 University Ave W'
    },
    {
        latitude: 43.40559947604301,            
        longitude: -80.4981592482826,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Fresh Burrito',
        slaughterType: stMachine,
        halalLevel: hlPartial,
        locationType: ltOff,
        location: '1188 Fischer-Hallman Rd'
    },
    {
        latitude: 43.47626858044477,             
        longitude: -80.52539472925855,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Fresh Burrito',
        slaughterType: stMachine,
        halalLevel: hlPartial,
        locationType: ltOff,
        location: '247 King St N'
    },
    {
        latitude: 43.47622975362848,              
        longitude: -80.52548928221273,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Church\'s Texas Chicken',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '247 King St N Unit 4'
    },
    {
        latitude: 43.465542620644506,            
        longitude: -80.52167035157473,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Masala Bay',
        slaughterType: stUnknown,
        halalLevel: hlPartial,
        locationType: ltOff,
        location: '3B Regina St N'
    },
    {
        latitude: 43.47541664323215,           
        longitude: -80.53565437300594,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Kabob Place',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '280 Lester St #108'
    },
    {
        latitude: 43.47812639999843,           
        longitude: -80.5186909711543,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Popeyes',
        slaughterType: stMachine,
        halalLevel: hlPartial,
        locationType: ltOff,
        location: '85 University Ave E'
    },
    {
        latitude: 43.476507378176755,              
        longitude: -80.52325995889603,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Royal Paan',
        slaughterType: stUnknown,
        halalLevel: 'Vegetarian',
        locationType: ltOff,
        location: '27 University Ave E'
    },
    {
        latitude: 43.472594302857345,               
        longitude: -80.53624190318072,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Kabob Shack',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '150 University Ave W Unit 5B'
    },
    {
        latitude: 43.40716701559519,                
        longitude: -80.50020978779051,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Marble Slab Creamery',
        slaughterType: stNA,
        halalLevel: 'Kosher Dairy',
        locationType: ltOff,
        location: '1170 Fischer-Hallman Rd #250'
    },
    {
        latitude: 43.472133339510044,                  
        longitude: -80.53725068221505,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Shawerma Plus',
        slaughterType: stUnknown,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '160 University Ave W'
    },
    {
        latitude:  43.47220665911886,                   
        longitude: -80.53732113518055,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Aunty\'s Kitchen',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '160 University Ave W'
    },
    {
        latitude:  43.47236618287877,                    
        longitude: -80.53747620570354,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'D Spot Desserts',
        slaughterType: stNA,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '160 University Ave W Unit 14'
    },
    {
        latitude:  43.47218077572839,                     
        longitude: -80.53794748343734,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Shinwa Asian Cuisine',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '160 University Ave W'
    },
    {
        latitude:  43.4722690229217,                       
        longitude: -80.53903371455657,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'iPotato',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '170 University Ave W #21'
    },
    {
        latitude:  43.469282545531286,                         
        longitude: -80.5161355134947,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'iShawarma',
        slaughterType: stUnknown,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '66 Bridgeport Rd E'
    },
    {
        latitude:  43.44099400000001,                           
        longitude: -80.50660387116488,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Highland Halal Shawarma',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '200 Highland Rd W'
    },
    {
        latitude:  43.439228617103474,                            
        longitude: -80.51014987320856,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Indo Hakka Corner',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '324 Highland Rd W'
    },
    {
        latitude:  43.463017300000004,                             
        longitude: -80.52363756441756,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Odd Burger',
        slaughterType: stNA,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '75 King St S'
    },
    {
        latitude: 43.49780247971652,                              
        longitude: -80.55006227870145,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Karahi Point',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '655 Parkside Dr Unit 1'
    },
    {
        latitude: 43.450534557316786,                               
        longitude: -80.490648150675,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Ace Shawarma & Burgers',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '82 King St W'
    },
    {
        latitude: 43.472605739465976,                               
        longitude: -80.53807886441096,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Slap Burgers',
        slaughterType: stHand,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '170 University Ave W #32'
    },
    {
        latitude: 43.47639779273131,                               
        longitude: -80.52989915337112,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Bogda',
        slaughterType: stUnknown,
        halalLevel: hlAll,
        locationType: ltOff,
        location: '62 Balsam St B103'
    },
    {
        latitude: 43.47204632272793,                               
        longitude: -80.54524785797462,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Brubakers Food Court',
        locationType: ltOn,
        location: 'Student Life Centre (SLC)'
    },
    {
        latitude: 43.471712538934604,                                
        longitude: -80.5453541938156,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Tim Hortons',
        locationType: ltOn,
        location: 'Student Life Centre (SLC)'
    },
    {
        latitude: 43.471887875273275,                               
        longitude: -80.54532392733172,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Jugo Juice',
        locationType: ltOn,
        location: 'Student Life Centre (SLC)'
    },
    {
        latitude: 43.47321377458944,                                
        longitude: -80.5421481808587,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'DC Bytes',
        locationType: ltOn,
        location: 'Davis Centre (DC)'
    },
    {
        latitude: 43.47279626519494,                                 
        longitude: -80.54227391259437,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Tim Hortons',
        locationType: ltOn,
        location: 'Davis Centre (DC)'
    },
    {
        latitude: 43.47317775327808,                                 
        longitude: -80.54214410571512,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Chatime',
        locationType: ltOn,
        location: 'Davis Centre (DC)'
    },
    {
        latitude: 43.469314343503925,                                  
        longitude: -80.54026638269008,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'South Side Marketplace',
        locationType: ltOn,
        location: 'South Campus Hall (SCH)'
    },
    {
        latitude: 43.4692613871564,                                  
        longitude: -80.5403970503557,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Tim Hortons',
        locationType: ltOn,
        location: 'South Campus Hall (SCH)'
    },
    {
        latitude: 43.46973110093371,                                   
        longitude: -80.54091119888061,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Graduate House',
        locationType: ltOn,
        location: 'Graduate Student Association (GSA)'
    },
    {
        latitude: 43.47213035738376,                                    
        longitude: -80.54392910828504,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'MC Coffee and Donut Shop',
        locationType: ltOn,
        location: 'Mathematics and Computers (MC)'
    },
    {
        latitude: 43.47068139374128,                                     
        longitude: -80.53913668035341,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'ENG Coffee and Donut Shop',
        locationType: ltOn,
        location: 'Carl A. Pollock Hall (CPH)'
    },
    {
        latitude: 43.47288489260669,                                      
        longitude: -80.53968577765963,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'ENG Coffee and Donut Shop',
        locationType: ltOn,
        location: 'Engineering 7 (E7)'
    },
    {
        latitude: 43.467816622358555,                                       
        longitude: -80.54171948832875,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'H³ Café',
        locationType: ltOn,
        location: 'Hagey Hall (HH)'
    },
    {
        latitude: 43.46772675005859,                                       
        longitude: -80.54173074808166,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Liquid Assets Café',
        locationType: ltOn,
        location: 'Hagey Hall (HH)'
    },
    {
        latitude: 43.46879366679521,                                        
        longitude: -80.54258596216211,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'ML\'s Diner',
        locationType: ltOn,
        location: 'Modern Languages (ML)'
    },
    {
        latitude: 43.469070658129006,                                        
        longitude: -80.5428194259623,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Tim Hortons',
        locationType: ltOn,
        location: 'Modern Languages (ML)'
    },
    {
        latitude: 43.46968281805905,                                         
        longitude: -80.54202355675709,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Browsers Café',
        locationType: ltOn,
        location: 'Dana Porter Library (DP)'
    },
    {
        latitude: 43.46833504920708,                                          
        longitude: -80.54358207629245,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Ev3rgreen Café',
        locationType: ltOn,
        location: 'Environment 3 (EV3)'
    },
    {
        latitude: 43.471807649095275,                                          
        longitude: -80.54217572064132,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'CEIT Café',
        locationType: ltOn,
        location: 'Centre for Environmental and Information Technology (CEIT)'
    },
    {
        latitude: 43.475398242682374,                                          
        longitude: -80.54852449812559,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Jugo Juice',
        locationType: ltOn,
        location: 'Columbia Icefield (CIF)'
    },
    {
        latitude: 43.471780987222964,                                          
        longitude: -80.55003553792683,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'Mudie\'s',
        locationType: ltOn,
        location: 'Village 1 (V1)'
    },
    {
        latitude: 43.47028466563744,                                          
        longitude: -80.55411871537906,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'REVelation',
        locationType: ltOn,
        location: 'Ron Eydt Village (REV)'
    },
    {
        latitude: 43.47011867726943,                                          
        longitude: -80.5359166378004,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'The Market',
        locationType: ltOn,
        location: 'Claudette Millar Hall (CMH)'
    },
    {
        latitude: 43.47888057807456,
        longitude: -80.52621348918348,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'LA Sweet Spot - The Best Dessert',
        locationType: ltOff,
        location: '318 Spruce St #103'
   },
]

