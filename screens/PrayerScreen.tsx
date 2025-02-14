import { StyleSheet, ScrollView, TouchableOpacity, Image, useColorScheme } from "react-native"

import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"
import { useEffect, useState } from "react"
import { FontAwesome6 } from "@expo/vector-icons"

import "@fontsource/montserrat"
import { toHijri } from "hijri-converter"
import { useNavigation } from "@react-navigation/native"
import {
	getPrayerTimesAndIndex,
	getNextPrayerNameAndTime,
	getIqamahTimesToday,
} from "../util/PrayerUtils"
import { IqamahInformation } from "../database/types"
import Colors from "../constants/Colors"
import Svg, { Path } from "react-native-svg"
const athanIcon = require("../assets/images/athan.png")
const iqamahIcon = require("../assets/images/iqamah.png")

interface IqamahTime {
	time: string
	location: string
}

export default function PrayerScreen() {
	const [prayerIndex, setPrayerIndex] = useState(0)
	const [currentPrayerName, setCurrentPrayerName] = useState("Fajr")
	const [prayerTimes, setPrayerTimes] = useState<{ [key: string]: string }[]>([
		{ Fajr: "" },
		{ Dhuhr: "" },
		{ "Jumu'ah": "Tap for more" },
		{ Asr: "" },
		{ Maghrib: "" },
		{ Isha: "" },
	])

	const [iqamahTimes, setIqamahTimes] = useState<Record<string, IqamahTime>>({
		Fajr: { time: "", location: "SLC 3252" },
		Dhuhr: { time: "", location: "SLC 3252" },
		Asr: { time: "", location: "SLC 3252" },
		Maghrib: { time: "", location: "SLC 3252" },
		Isha: { time: "", location: "SLC 3252" },
	})

	const [afterSunriseBeforeDhuhr, setAfterSunriseBeforeDhuhr] = useState(false)

	const colorScheme = useColorScheme()
	const colorPalette = colorScheme === "light" ? Colors.light : Colors.dark

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colorPalette.background,
		},
		content: {
			alignItems: "center",
			justifyContent: "center",
			paddingTop: 60,
			paddingBottom: 30,
		},
		title: {
			fontSize: 20,
			fontWeight: "bold",
		},
		separator: {
			marginVertical: 30,
			height: 1,
			width: "80%",
		},

		prayerBlock: {
			justifyContent: "space-around",
			width: "90%",
			backgroundColor: colorPalette.accent2,
			borderRadius: 5,
			marginVertical: 5,
			paddingVertical: 17,
			paddingHorizontal: 25,
		},

		upcomingPrayerBlock: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-around",
			width: "90%",
			backgroundColor: colorScheme === "light" ? colorPalette.accent : colorPalette.tint,
			borderRadius: 15,
			marginVertical: 8,
			paddingHorizontal: 24,
			paddingTop: 16,
			paddingBottom: 12,
			lineHeight: 1.5,
			flex: 1,
			color: "black",
			position: "relative",
		},

		upcomingPrayerBlockText: {
			backgroundColor: "transparent",
		},

		kaabaContainer: {
			position: "absolute",
			top: 10,
			right: 10,
			zIndex: 1,
		},

		kaabaImage: {
			width: 40,
			height: 40,
			resizeMode: "contain",
		},

		upcomingPrayer: {
			color: "black",
			fontSize: 14,
			fontWeight: "400",
			alignSelf: "flex-start",
			paddingBottom: 0,
		},

		upcomingPrayerName: {
			color: "black",
			fontSize: 38,
			fontWeight: "900",
			alignSelf: "flex-start",
		},

		upcomingPrayerTime: {
			color: "black",
			fontSize: 36,
			fontWeight: "800",
			alignSelf: "flex-start",
		},

		upcomingJummahTime: {
			color: "black",
			fontSize: 24,
			fontWeight: "900",
			alignSelf: "flex-start",
		},

		iqamahTime: {
			fontSize: 17,
			alignSelf: "flex-start",
			justifyContent: "flex-start",
			paddingTop: 8,
			paddingBottom: 10,
			fontWeight: "500",
			color: "black",
			fontSize: 20,
			fontWeight: "400",
			marginRight: 10,
		},

		PrayerTimeAndLocation: {
			backgroundColor: "transparent",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
			marginTop: 10,
		},

		locationAndKaaba: {
			flexDirection: "row",
			alignItems: "center",
		},

		location: {
			color: "black",
			fontSize: 18,
			fontWeight: "400",
			textAlign: "right",
		},

		selectedPrayerBlock: {
			justifyContent: "space-around",
			width: "90%",
			backgroundColor: colorPalette.tint2,
			borderRadius: 5,
			marginVertical: 5,
			paddingVertical: 17,
			paddingHorizontal: 25,
		},

		titleTimeContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			backgroundColor: colorPalette.accent2,
			width: "100%",
		},

		selectedTitleTimeContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			backgroundColor: colorPalette.tint2,
			width: "100%",
		},

		prayerTitle: {
			fontSize: 19,
			color: colorPalette.text,
			fontWeight: "bold",
		},

		dateBlock: {
			alignItems: "center",
			justifyContent: "center",
			width: "90%",
			backgroundColor: colorPalette.accent3,
			color: colorPalette.text,
			borderRadius: 10,
			marginVertical: 7,
			padding: 15,
		},

		islamicCalendar: {
			fontSize: 16,
			fontWeight: "bold",
			marginBottom: 10,
		},

		gregorianCalendar: {
			fontSize: 16,
			fontWeight: "bold",
		},

		prayerTimeOuterContainer: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			backgroundColor: "transparent",
		},
		prayerTimeInnerContainer: {
			flexDirection: "column",
			alignItems: "flex-start",
			backgroundColor: "transparent",
		},
		athanContainer: {
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: "transparent",
		},
		iqamahContainer: {
			flexDirection: "row",
			alignItems: "flex-start",
			justifyContent: "flex-end",
			backgroundColor: "transparent",
			marginRight: 28,
			marginTop: 14,
		},

		arrowIcon: {
			color: "white",
			tintColor: colorPalette.text,
			fontSize: 14,
		},
		dropdownContent: {
			marginTop: 8,
			paddingVertical: 8,
			paddingHorizontal: 7,
			borderRadius: 5,
			backgroundColor: "transparent",
		},
		secondaryTime: {
			fontSize: 19,
			color: colorPalette.text,
			fontWeight: "bold",
		},
		largerIconTouchable: {
			marginVertical: 5,
			width: 28,
			display: "flex",
			flexDirection: "row",
			justifyContent: "flex-end",
		},
		iqamahTimeLocationBlock: {
			backgroundColor: "transparent",
		},
		prayerTitleContainer: {
			width: 100,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "flex-end",
			backgroundColor: "transparent",
		},
		athanIqamahIconContainer: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			width: 40,
			backgroundColor: "transparent",
		},
		iqamahIcon: {
			width: 25,
			height: 25,
			marginTop: 2,
		},
		athanIcon: {
			width: 28,
			height: 30,
		},
		prayerLocation: {
			fontSize: 13,
			marginTop: 5,
		},
		mainBannerIqamahTime: {
			color: "black",
		},
	})

	const updatePrayerPage = () => {
		let { Prayers, prayerIndex, isTimeAfterSunriseBeforeDhuhr } = getPrayerTimesAndIndex()
		setPrayerIndex(prayerIndex)
		setPrayerTimes(Prayers)
		setCurrentPrayerName(Object.keys(prayerTimes[prayerIndex])[0])
		setAfterSunriseBeforeDhuhr(isTimeAfterSunriseBeforeDhuhr)

		getIqamahTimesToday()
			.then((iqamahData: IqamahInformation[]) => {
				if (iqamahData) {
					const data = iqamahData[0]
					setIqamahTimes({
						Fajr: {
							time: data.fajrTime.toLowerCase(),
							location: data.fajrLocation,
						},
						Dhuhr: {
							time: data.dhuhrTime.toLowerCase(),
							location: data.dhuhrLocation,
						},
						Asr: { time: data.asrTime.toLowerCase(), location: data.asrLocation },
						Maghrib: {
							time: data.maghribTime.toLowerCase(),
							location: data.maghribLocation,
						},
						Isha: {
							time: data.ishaTime.toLowerCase(),
							location: data.ishaLocation,
						},
					})
				}
			})
			.catch((error) => {
				console.error("Error fetching iqamah times:", error)
			})
	}

	const PrayerBlock: React.FC<prayerBlockProps> = ({ title, time, selectedPrayer }) => {
		const [isExpanded, setIsExpanded] = useState(false)
		const navigation = useNavigation()

		const prayerBlockStyle =
			selectedPrayer == true ? styles.selectedPrayerBlock : styles.prayerBlock
		const titleTimeContainerStyle =
			selectedPrayer == true
				? styles.selectedTitleTimeContainer
				: styles.titleTimeContainer

		const handlePress = (title: string, navigation: any) => {
			if (title === `Jumu'ah`) {
				navigation.navigate("Jummah")
			} else {
				setIsExpanded(!isExpanded)
			}
		}

		const titleTimeContainer = (
			<View style={titleTimeContainerStyle}>
				<Text style={styles.prayerTitle}>{title}</Text>
				{title === "Jumu'ah" ? (
					<Text style={styles.prayerTitle}>{time}</Text>
				) : (
					<View style={styles.prayerTimeOuterContainer}>
						<View style={styles.prayerTimeInnerContainer}>
							<View style={styles.athanContainer}>
								<Image source={athanIcon} style={styles.athanIcon} />
								<View style={styles.prayerTitleContainer}>
									<Text style={styles.prayerTitle}>{time}</Text>
								</View>
							</View>
						</View>
						<TouchableOpacity
							onPress={() => handlePress(title, navigation)}
							style={styles.largerIconTouchable}
							activeOpacity={0.5}
						>
							<FontAwesome6
								name={isExpanded ? "chevron-up" : "chevron-down"}
								style={styles.arrowIcon}
							/>
						</TouchableOpacity>
					</View>
				)}
			</View>
		)

		if (title === "Jumu'ah") {
			return (
				<TouchableOpacity
					onPress={() => handlePress(title, navigation)}
					style={prayerBlockStyle}
					activeOpacity={0.5}
				>
					{titleTimeContainer}
				</TouchableOpacity>
			)
		}

		return (
			<TouchableOpacity onPress={() => handlePress(title, navigation)} activeOpacity={1}>
				<View style={prayerBlockStyle}>
					{titleTimeContainer}
					{isExpanded && (
						<View style={styles.iqamahContainer}>
							<Image source={iqamahIcon} style={styles.iqamahIcon} />
							{/* This is where we will be adding the iqamah times. The values are hard-coded for now. It will become one View block */}
							<View style={styles.prayerTitleContainer}>
								<View style={styles.iqamahTimeLocationBlock}>
									<Text style={styles.secondaryTime}>
										{iqamahTimes[title].time}
									</Text>
									<Text style={styles.prayerLocation}>
										({iqamahTimes[title].location})
									</Text>
								</View>
							</View>
						</View>
					)}
				</View>
			</TouchableOpacity>
		)
	}

	interface upcomingPrayerBlockProps {
		currentPrayerName: string
		currentPrayerTime: string
	}

	const UpcomingPrayerBlock: React.FC<upcomingPrayerBlockProps> = ({
		currentPrayerName,
		currentPrayerTime,
	}) => {
		const navigation = useNavigation()
		const kaabaImage = require("../assets/images/kaaba.png")

		// This stores the prayer time we would like to display at top - Current or Upcoming (if 70% time of prayer has passed)
		const [currentUpcomingPrayerName, setCurrentUpcomingPrayerName] =
			useState(currentPrayerName)
		const [currentUpcomingPrayerTime, setCurrentUpcomingPrayerTime] =
			useState(currentPrayerTime)
		const [isUpcomingPrayer, setIsUpcomingPrayer] = useState(false)

		useEffect(() => {
			// Function to update prayer name at intervals
			const updatePrayerName = () => {
				const { name, time, isUpcomingPrayer } = getNextPrayerNameAndTime()
				setCurrentUpcomingPrayerName(name)
				setCurrentUpcomingPrayerTime(time)
				setIsUpcomingPrayer(isUpcomingPrayer)
			}

			// Call the function immediately to set initial prayer name
			updatePrayerName()

			// Schedule the function to run every 60 seconds
			const intervalId = setInterval(updatePrayerName, 60 * 1000)

			// Clean up function to clear the interval when component unmounts
			return () => clearInterval(intervalId)
		}, [])

		const upcomingPrayerBlockText = (
			<View style={styles.upcomingPrayerBlockText}>
				<View style={styles.kaabaContainer}>
					<TouchableOpacity onPress={() => navigation.navigate("Qiblah")}>
						<Image source={kaabaImage} style={styles.kaabaImage} />
					</TouchableOpacity>
				</View>
				{isUpcomingPrayer && (
					<Text style={styles.upcomingPrayer}>Upcoming Prayer: </Text>
				)}
				<Text
					style={[
						styles.upcomingPrayerName,
						!isUpcomingPrayer
					]}
				>
					{currentUpcomingPrayerName}
				</Text>
				<View style={styles.PrayerTimeAndLocation}>
					<Text
						style={
							currentUpcomingPrayerName === "Jumu'ah"
								? styles.upcomingJummahTime
								: styles.upcomingPrayerTime
						}
					>
						{currentUpcomingPrayerTime}
					</Text>
					<Text style={styles.location}>Waterloo</Text>
				</View>
			</View>
		)

		if (currentUpcomingPrayerName == "Jumu'ah") {
			return (
				<TouchableOpacity
					style={styles.upcomingPrayerBlock}
					activeOpacity={0.5}
					onPress={() => handlePress(currentUpcomingPrayerName, navigation)}
				>
					{upcomingPrayerBlockText}
				</TouchableOpacity>
			)
		}

		return currentUpcomingPrayerName === "Jumu'ah" ? (
			<TouchableOpacity
				style={styles.upcomingPrayerBlock}
				activeOpacity={0.5}
				onPress={() => handlePress(currentUpcomingPrayerName, navigation)}
			>
				{upcomingPrayerBlockText}
			</TouchableOpacity>
		) : (
			<View style={styles.upcomingPrayerBlock}>{upcomingPrayerBlockText}</View>
		)
	}

	interface DateBlockProps {
		islamicDate: string
	}

	const DateBlock = () => {
		const [currentDate, setCurrentDate] = useState(new Date())
		const [islamicDate, setIslamicDate] = useState("")

		useEffect(() => {
			const today = new Date()

			const hijriMonths = [
				"Muharram",
				"Safar",
				"Rabi Al-Awwal",
				"Rabi Al-Thani",
				"Jumada Al-Awwal",
				"Jumada Al-Thani",
				"Rajab",
				"Sha’ban",
				"Ramadan",
				"Shawwal",
				"Dhu Al-Qi’dah",
				"Dhu Al-Hijjah",
			]

			// Calculate the time remaining until midnight
			const timeUntilMidnight =
				new Date(
					today.getFullYear(),
					today.getMonth(),
					today.getDate() + 1, // Next day
					0,
					0,
					0 // 12:00 AM
				).getTime() - today.getTime()

			const updateDates = () => {
				const today = new Date()
				setCurrentDate(today) // Update regular date

				// Convert to Hijri date and update Islamic date
				const hijri = toHijri(
					today.getFullYear(),
					today.getMonth() + 1,
					today.getDate()
				)
				const formattedIslamicDate = `${hijri.hd} ${hijriMonths[hijri.hm - 1]} ${
					hijri.hy
				}`
				setIslamicDate(formattedIslamicDate)
			}

			// Call updateDates immediately to set the initial values
			updateDates()

			// Set a timeout to update the date at midnight
			const midnightTimeout = setTimeout(() => {
				updateDates()

				// Set an interval to update the date every 24 hours
				setInterval(() => {
					// Call updateDates immediately to set the initial values
					updateDates()
				}, 24 * 60 * 60 * 1000) // Every 24 hours
			}, timeUntilMidnight)

			// Cleanup the timeout when component unmounts
			return () => clearTimeout(midnightTimeout)
		}, [])

		const options: Intl.DateTimeFormatOptions = {
			weekday: "short",
			month: "long",
			day: "numeric",
			year: "numeric",
		}
		const formattedDate: string = currentDate.toLocaleDateString("en-CA", options)

		return (
			<View style={styles.dateBlock}>
				<Text style={styles.islamicCalendar}>{islamicDate} AH</Text>
				<Text style={styles.gregorianCalendar}>{formattedDate}</Text>
			</View>
		)
	}

	const handlePress = (title: string, navigation: any) => {
		if (title === `Jumu'ah`) {
			navigation.navigate("Jummah")
		}
	}

	useEffect(() => {
		updatePrayerPage()
		const intervalId = setInterval(() => {
			updatePrayerPage()
		}, 60000) // 60000 milliseconds = 1 minute

		// Clear the interval on component unmount
		return () => clearInterval(intervalId)
	}, [])

	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<UpcomingPrayerBlock
					currentPrayerName={currentPrayerName}
					currentPrayerTime={prayerTimes[prayerIndex][currentPrayerName]}
				/>

				<DateBlock />
				{prayerTimes.map((prayer, index) => {
					const prayerName = Object.keys(prayer)[0]
					const prayerTime = prayer[prayerName]

					const selectedPrayer =
						prayerIndex == index && afterSunriseBeforeDhuhr == false

					return (
						<PrayerBlock
							key={index}
							title={prayerName}
							time={prayerTime}
							selectedPrayer={selectedPrayer}
						/>
					)
				})}
			</View>
		</ScrollView>
	)
}

interface prayerBlockProps {
	title: string
	time: string
	selectedPrayer: boolean
}
