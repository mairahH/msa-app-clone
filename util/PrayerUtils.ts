import {getTodaysPrayerTimes} from "../prayer-times-waterloo-masjid";
import databaseService from "../database/databaseService";
import { IqamahInformation } from "../database/types";

export function getNextPrayerNameAndTime(): { name: string, time: string, isUpcomingPrayer: boolean } {
    updatePrayerTimes();

    let nextPrayerIndex = 0;
    let isUpcomingPrayer: boolean = false;

    // Sets Fajr as prayer time between 12am and sunrise
    if (currentTimeInHours >= 0 && currentTimeInHours <= getHourFromTimeString(sunrise)) {
      nextPrayerIndex = 0;
      isUpcomingPrayer = true;
      if (currentTimeInHours >= getHourFromTimeString(Prayers[0]['Fajr']) && currentTimeInMinutes >= prayerTimeInMinutes[0]['Fajr']) {
        isUpcomingPrayer = false;
      }
    }
    // Sets Dhuhr/Jummah as prayer time after sunrise till Dhuhr 
    else if ((currentTimeInHours > getHourFromTimeString(sunrise) && (currentTimeInHours < getHourFromTimeString(Prayers[1]['Dhuhr'])))
             || (currentTimeInHours == getHourFromTimeString(Prayers[1]['Dhuhr']) && (currentTimeInMinutes < prayerTimeInMinutes[2]['Dhuhr']))) {
      isUpcomingPrayer = true;
      if (todaysPrayerTimes.is_jumuah) {
            nextPrayerIndex = 2;
        } else {
            nextPrayerIndex = 1;
        }
    } else if (prayerIndex == 5 && currentTimeInHours <= 23) {
      isUpcomingPrayer = false
      nextPrayerIndex = prayerIndex;
    }
    // sets prayer time to next prayer if 70% of current prayer time has passed, or else keeps current prayer time
    else {
        const prayerName = Object.keys(prayerTimeInMinutes[prayerIndex])[0];
        const prayerTime = prayerTimeInMinutes[prayerIndex][prayerName];

        const nextPrayerName = Object.keys(prayerTimeInMinutes[prayerIndex + 1])[0];
        const nextPrayerTime = prayerTimeInMinutes[prayerIndex + 1][nextPrayerName];

        const currentPrayerTimeThreshold = prayerTime + ((nextPrayerTime - prayerTime) * 0.70);

        if (currentTimeInMinutes >= currentPrayerTimeThreshold) {
          isUpcomingPrayer = true;
            switch (prayerIndex) {
                case 1:
                case 2:
                    nextPrayerIndex = 3;
                    break;
                case 3:
                    nextPrayerIndex = 4;
                    break;
                case 4:
                    nextPrayerIndex = 5;
                    break;
            }
        } else {
            isUpcomingPrayer = false;
            nextPrayerIndex = prayerIndex;
        }
    }

    const prayer = Prayers[nextPrayerIndex];
    const name = Object.keys(prayer)[0];
    const time = prayer[name];

    return {name, time, isUpcomingPrayer};
}

const Prayers: { [key: string]: string }[] = [
    {'Fajr': ''},
    {'Dhuhr': ''},
    {'Jumu\'ah': 'Tap for more'},
    {'Asr': ''},
    {'Maghrib': ''},
    {'Isha': ''}
];

let prayerIndex = 0;
let isTimeAfterSunriseBeforeDhuhr = false;

export const getCurrentTimeinHoursMinutes = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const currentTimeMinutes = hours >= 13 ? timeToMinutes(`${hours - 12}:${minutes}`) : timeToMinutes(`${hours}:${minutes}`);
    return (
        {
            'hours': hours,
            'currentTimeMinutes': currentTimeMinutes
        }
    )
}

export const getPrayerTimesAndIndex = () => {
    updatePrayerTimes();
    return {Prayers, prayerIndex, isTimeAfterSunriseBeforeDhuhr};
}

let todaysPrayerTimes: any;
let fajr;
let sunrise: any;
let dhuhr;
let asr;
let maghrib;
let isha;

// This stores the times of each prayer in minutes to compare with current time for current prayer selection
let prayerTimeInMinutes: { [key: string]: number }[];

let currentTime;
let currentTimeInHours: any;
let currentTimeInMinutes: any;

export const updatePrayerTimes = () => {
    currentTime = getCurrentTimeinHoursMinutes();
    currentTimeInHours = currentTime.hours;
    currentTimeInMinutes = currentTime.currentTimeMinutes;

    todaysPrayerTimes = getTodaysPrayerTimes();
    fajr = todaysPrayerTimes.fajr_start;
    sunrise = todaysPrayerTimes.sunrise;
    dhuhr = todaysPrayerTimes.dhuhr_start;
    asr = todaysPrayerTimes.asr_start;
    maghrib = todaysPrayerTimes.magrib_start;
    isha = todaysPrayerTimes.isha_start;

    prayerTimeInMinutes = [
        {'Fajr': fajr},
        {'Sunrise': sunrise},
        {'Dhuhr': dhuhr},
        {'Asr': asr},
        {'Maghrib': maghrib},
        {'Isha': isha}
    ];

    Prayers[0]['Fajr'] = fajr + ' am';
    Prayers[1]['Dhuhr'] = dhuhr + ' pm';
    Prayers[3]['Asr'] = asr + ' pm';
    Prayers[4]['Maghrib'] = maghrib + ' pm';
    Prayers[5]['Isha'] = isha + ' pm';

    // Updates the prayerTimeInMinutes with the minute times of each prayer
    for (const prayer of prayerTimeInMinutes) {
        for (const [prayerName, prayerTime] of Object.entries(prayer)) {
            prayer[prayerName] = timeToMinutes(prayerTime.toString());
        }
    }
  
// For prayers Dhur to Isha
  if ((currentTimeInHours > getHourFromTimeString(Prayers[1]['Dhuhr'])) 
      || (currentTimeInHours == getHourFromTimeString(Prayers[1]['Dhuhr']) && currentTimeInMinutes >= prayerTimeInMinutes[2]['Dhuhr'])) {
    if (currentTimeInMinutes >= prayerTimeInMinutes[2]['Dhuhr'] && currentTimeInMinutes < prayerTimeInMinutes[3]['Asr']) {
      if (todaysPrayerTimes.is_jumuah) {
        if (prayerIndex != 2) { // To avoid infinite loops of re-renders
            prayerIndex = 2;
            isTimeAfterSunriseBeforeDhuhr = false; // Turns on highlighter for selected prayer block
        }
      } else {
        if (prayerIndex != 1) { // To avoid infinite loops of re-renders
            prayerIndex = 1;
            isTimeAfterSunriseBeforeDhuhr = false; // Turns on highlighter for selected prayer block
        }
      }
    } else if (currentTimeInMinutes >= prayerTimeInMinutes[3]['Asr'] && currentTimeInMinutes < prayerTimeInMinutes[4]['Maghrib']) {
        if (prayerIndex != 3) {
            prayerIndex = 3;
        }
    } else if (currentTimeInMinutes >= prayerTimeInMinutes[4]['Maghrib'] && currentTimeInMinutes < prayerTimeInMinutes[5]['Isha']) {
        if (prayerIndex != 4) {
            prayerIndex = 4;
        }
    } else if (currentTimeInMinutes >= prayerTimeInMinutes[5]['Isha']) {
        if (prayerIndex != 5) {
            prayerIndex = 5;
        }
    }
  } else if 
  ((currentTimeInHours > getHourFromTimeString(sunrise) && (currentTimeInHours < getHourFromTimeString(Prayers[1]['Dhuhr'])))
             || (currentTimeInHours == getHourFromTimeString(Prayers[1]['Dhuhr']) && (currentTimeInMinutes < prayerTimeInMinutes[2]['Dhuhr']))) { //
    // For Sunrise to Dhuhr
    // In this case, we show Dhuhr timing in top section, but it's prayer block is not highlighted until its actually Dhuhr time.
    if (todaysPrayerTimes.is_jumuah) {
      if (prayerIndex != 2) { // To avoid infinite loops of re-renders
        prayerIndex = 2;
        isTimeAfterSunriseBeforeDhuhr = true; // Turns off highlighter for all prayer blocks
      }
    } else {
      if (prayerIndex != 1) { // To avoid infinite loops of re-renders
        prayerIndex = 1;
        isTimeAfterSunriseBeforeDhuhr = true; // Turns off highlighter for all prayer blocks
      }
    }
  } 
  else {
    if (currentTimeInMinutes < prayerTimeInMinutes[0]['Fajr']) { // For Isha to Fajr
      if (prayerIndex != 5) {
        prayerIndex = 5;
      }
    } else if (currentTimeInMinutes >= prayerTimeInMinutes[0]['Fajr'] && currentTimeInMinutes < prayerTimeInMinutes[1]['Sunrise']) { // For Fajr to Sunrise
      if (prayerIndex != 0) {
        prayerIndex = 0;
      }
    }
  }
};


// Function converts formatted time to minutes for comparison with prayer times
export function timeToMinutes(time: string) {
    let [hours, minutes] = (time).split(':').map(Number);
    if (hours == 12) {
      hours = 0 // The value of hours is changed to 0 as the minute cycle resets every 12 hours
    }
    return hours * 60 + minutes;
}

const getHourFromTimeString = (timeString: string): number => {
    const [time, period] = timeString.split(" ");
    let [hour, minute] = time.split(":").map(Number);
    if (period == "pm" && hour != 12) hour += 12;
    if (period == "am" && hour == 12) hour = 0;
    return hour;
};

// function to get today's iqamah time information
export async function getIqamahTimesToday(): Promise<IqamahInformation[]> {
  const result = await databaseService.getInstance().getIqamahTimesToday()
  return result;
}