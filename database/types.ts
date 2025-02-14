export interface Event {
  eventId?: number;
  name: string;
  eventDate: Date;
  time: string;
  instructor?: string;
  guestSpeaker?: string;
  location: string;
  description: string;
  imageUrls: string[];
  signUpUrl: string;
}

export interface Announcement {
  announcementId?: number;
  title: string;
  text: string;
  sentAt?: Date;
}

export interface JummahInformation {
  jummahId: number;
  name: string;
  prayerTime: string;
  location: string;
  khateeb: string;
  topic: string;
}

export interface IqamahInformation {
  iqamahId?: number;
  date: Date;
  fajrTime: string;
  dhuhrTime: string;
  asrTime: string;
  maghribTime: string;
  ishaTime: string;
  fajrLocation: string;
  dhuhrLocation: string;
  asrLocation: string;
  maghribLocation: string;
  ishaLocation: string;
}