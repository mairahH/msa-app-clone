import React, { useEffect, useState } from "react"
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	useColorScheme,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import databaseService from "../database/databaseService"
import { JummahInformation } from "../database/types"
import Colors from "../constants/Colors"

const JummahScreen = () => {
	const navigation = useNavigation()
	const [jummahs, setJummahs] = useState<JummahInformation[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const colorScheme = useColorScheme()
	const colorPalette = colorScheme === "light" ? Colors.light : Colors.dark

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: 20,
			backgroundColor: colorPalette.background,
		},
		inlineTextContainer: {
			flex: 1,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		scrollView: {
			flex: 1,
		},
		jummahTitle: {
			fontSize: 20,
			color: colorPalette.text,
			fontWeight: "bold",
			marginBottom: 5,
		},
		jummahTime: {
			color:
				colorScheme === "light"
					? colorPalette.text
					: colorPalette.tint,
			fontSize: 16,
			marginBottom: 5,
			fontWeight: "bold",
		},
		jummahSubtextYellow: {
			color:
				colorScheme === "light"
					? colorPalette.text
					: colorPalette.tint,
			fontSize: 18,
			marginBottom: 5,
			fontWeight: "bold",
		},
		jummahSubtextWhite: {
			color: colorPalette.text,
			fontSize: 18,
			marginBottom: 5,
			fontWeight: "normal",
			marginLeft: 15,
			width: "100%",
			flex: 1,
			flexWrap: "wrap",
			textAlign: "right",
		},
		jummahBlock: {
			justifyContent: "space-around",
			marginRight: 20,
			marginLeft: 20,
			backgroundColor: colorPalette.accent,
			borderRadius: 5,
			marginVertical: 8,
			padding: 20,
		},
		jummahText: {
			fontSize: 16,
			marginBottom: 5,
		},
	})

	useEffect(() => {
		databaseService
			.getInstance()
			.getAllJummahs()
			.then((response) => {
				setJummahs(response)
				setIsLoading(false)
			})
			.catch((error) => {
				console.error(
					"An error occurred while fetching the jummahs:",
					error
				)
				setIsLoading(false)
			})
	}, [])

	useEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: colorPalette.background,
			},
			headerTintColor: colorPalette.text,
		})
	}, [navigation])

	if (isLoading) {
		return null
	}

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView}>
				{jummahs.map((jummah, index) => (
					<View key={index} style={styles.jummahBlock}>
						<View style={styles.inlineTextContainer}>
							<Text style={styles.jummahTitle}>
								{jummah.name}
							</Text>
							<Text style={styles.jummahTime}>
								{jummah.prayerTime}
							</Text>
						</View>
						<View>
							<Text> </Text>
						</View>
						<View style={styles.inlineTextContainer}>
							<Text style={styles.jummahSubtextYellow}>
								Location:
							</Text>
							<Text style={styles.jummahSubtextWhite}>
								{jummah.location}
							</Text>
						</View>
						<View style={styles.inlineTextContainer}>
							<Text style={styles.jummahSubtextYellow}>
								Khateeb:
							</Text>
							<Text style={styles.jummahSubtextWhite}>
								{jummah.khateeb}
							</Text>
						</View>
						<View style={styles.inlineTextContainer}>
							<Text style={styles.jummahSubtextYellow}>
								Topic:
							</Text>
							<Text style={styles.jummahSubtextWhite}>
								{jummah.topic}
							</Text>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	)
}

export default JummahScreen
