// This is a singleton class that handles all the requests to the backend server.
// You can use the existing get and post methods to make new functions that interact with the backend.
class databaseService {
  private static instance: databaseService;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl = 'http://backend.uwmsa.com:3000';
  }

  public static getInstance(): databaseService {
    if (!databaseService.instance) {
      databaseService.instance = new databaseService();
    }

    return databaseService.instance;
  }

  public async get(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  public async post(endpoint: string, body: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  public async addPushToken(pushToken: string): Promise<any> {
    return this.post('pushToken', { pushToken });
  }

  public async getAllAnnouncements(): Promise<any> {
    return this.get('announcements');
  }

  public async getAllEvents(): Promise<any> {
    return this.get('events');
  }

  public async getAllJummahs(): Promise<any> {
    return this.get('jummahs');
  }

  public async getIqamahTimesToday(): Promise<any> {
    return this.get('iqamahToday');
  }
}

export default databaseService;