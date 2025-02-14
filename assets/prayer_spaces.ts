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
 *   name: string,              // Required. Name of the building or location.
 *   room: string,              // Optional. Room details where the prayer space is located.
 *   accessCode: string,        // Optional. Access code for the prayer space if it is restricted.
 * }
 */

export const PRAYER_SPACES = [
    //Optometry
    {
        latitude: 43.4762946882343,
        longitude: -80.54555866989934,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'OPTOMETRY (OPT)',
        room: 'OPT 104B, OPT 1019',
    },
    //EC3
    {
        latitude: 43.476000852569726,
        longitude: -80.54212596130563,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'EAST CAMPUS 3 (EC3)',
        room: 'EC3 1038 (Spirituality Room)',
        accessCode: '338822'
    },
    //B.C. Matthews Hall
    {
        latitude: 43.47391532362776, 
        longitude: -80.54496542879988,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'B.C. MATTHEWS HALLS (BMH)',
        room: 'BMH 3023 (The Sanctuary)'
    },
    //V1
    {
        latitude: 43.47179673664587,
        longitude: -80.54984434596504,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'VILLAGE 1 (V1)',
        room: 'V1 191'
    },
    //SLC
    {
        latitude: 43.47218158418394, 
        longitude: -80.54530336620647,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'STUDENT LIFE CENTRE (SLC)',
        room: 'SLC 3252'
    },
    //MC
    {
        latitude: 43.472307391014084, 
        longitude: -80.54389961712978,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'MATHEMATICS AND COMPUTER (MC)',
        room: 'MC 2018',
        accessCode: 'Brothers: 326-819, Sisters: 182-065'
    },
    //ENGINEERING 5 (E5)
    {
        latitude: 43.47324379116738, 
        longitude: -80.53992567785423,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'ENGINEERING 5 (E5)',
        room: 'E5 3051, E5 6002',
        accessCode: '338822 (E5 3051)'
    },
    //CARL A. POLLOCK HALL (CPH)
    {
        latitude: 43.4710853633322, 
        longitude: -80.539291745965,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'CARL A. POLLOCK HALL (CPH)',
        room: 'CPH 2374B'
    },
    //TATHAM CENTRE (TC)
    {
        latitude: 43.46914901273443,  
        longitude: -80.54128576130607,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'TATHAM CENTRE (TC)',
        room: 'TC 0232 (always available even during in-person interview period)'
    },
    //SCHOOL OF ARCHITECTURE (ARC)
    {
        latitude: 43.358442593509565, 
        longitude: -80.31664902388343,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'SCHOOL OF ARCHITECTURE (ARC)',
        room: 'ARC 3001',
    },
    //DANA PORTER LIBRARY (DP)
    {
        latitude: 43.46989052459831, 
        longitude: -80.54237476130601,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'DANA PORTER LIBRARY (DP)',
        room: 'DP 702',
    },
    //DAVIS CENTRE (DC)
    {
        latitude: 43.47303627365034,  
        longitude: -80.54199367480014,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'DAVIS CENTRE (DC)',
        room: 'DC 3578, Outside DC 2599 (Brothers), Outside DC 3586 (Sisters)',
        accessCode: '338822 (DC 3578)'
    },
    //ENGINEERING 7 (E7)
    {
        latitude: 43.47315815932651,  
        longitude: -80.5395346324706,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'ENGINEERING 7 (E7)',
        room: 'E7 7462',
        accessCode: '338822'
    },
    //CLAUDETTE MILLAR HALL (CMH)
    {
        latitude: 43.470461064538675, 
        longitude: -80.53625834596508,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'CLAUDETTE MILLAR HALL (CMH)',
        room: 'CMH 1113',
        accessCode: 'Key from front desk (need WatCard)'
    },
    //RENISON UNIVERSITY COLLEGE (REN)
    {
        latitude: 43.46958040717249, 
        longitude: -80.5476754036356,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'RENISON UNIVERSITY COLLEGE (REN)',
        room: 'REN 0203B (Bryant Family Quiet Space), REN 0103',
    },
    //WATERLOO MASJID
    {
        latitude: 43.4591215709915, 
        longitude: -80.53542638339472,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'WATERLOO MASJID',
    },
    //WATERLOO MASJID
    {
        latitude: 43.4591215709915, 
        longitude: -80.53542638339472,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'WATERLOO MASJID',
    },
    //Islamic Centre of Waterloo - ICW
    {
        latitude: 43.46859691687561, 
        longitude: -80.58938648339414,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'ISLAMIC CENTRE OF WATERLOO',
    },
    //KITCHENER MASJID
    {
        latitude: 43.46485932319674, 
        longitude: -80.46047055576659,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'KITCHENER MASJID',
    },
    // Laurelwood Musallah
    {
        latitude: 43.469461079017826,
        longitude: -80.594664757775, 
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: 'LAURELWOOD MASJID',
    }
]