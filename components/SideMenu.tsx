import {StyleSheet, Animated, Dimensions, Easing, TouchableHighlight, Image, useColorScheme} from "react-native"
import { useRef, useEffect } from "react"
import { View, Text } from "./Themed"
import * as Linking from 'expo-linking'
import Colors from "../constants/Colors";

const UWMSALogo = require("../assets/images/UWMSA-logo.png")
const InstagramLogo = require("../assets/images/instagram-logo.png")
const WhatsappLogo = require("../assets/images/whatsapp-logo.png")
const FacebookLogo = require("../assets/images/facebook-logo.png")
const DiscordLogo = require("../assets/images/discord-logo.png")
const TwitchLogo = require("../assets/images/twitch-logo.png")

const pages = [
    { name: "About Us", url: "https://uwmsa.com/pages/our-mission" },
    { name: "Linktree", url: "https://linktr.ee/uwmsa"},
    { name: "Substreams", url: "https://uwmsa.com/pages/subteams" },
    { name: "Donate", url: "https://wusa.ca/product/muslim-students-association-donation/" },
    { name: "Volunteer", url: "https://docs.google.com/forms/d/e/1FAIpQLSc7SM3lb714Z2_8xj_Oe7W_DDAEaC5Bm-aam8l_F6MDnqaEUA/viewform" },
    { name: "Incident Report", url: "https://docs.google.com/forms/d/1GoxhY_Pp0nh985BSfeVegHcP1HDj5FOHjqddkKjDyWY/viewform" },
    { name: "Feedback", url: "https://docs.google.com/forms/d/e/1FAIpQLSfPkSymwzqVdA4crWe3EPCBHbBHTZXIYgYDl6AQsXjU_Wv61A/viewform" },
    { name: "Contact Us", url: "https://uwmsa.com/pages/contact" }
];


const socialMediaLinks = {
    Instagram: "https://www.instagram.com/uwmsa/",
    Whatsapp: "https://chat.whatsapp.com/Kp9zeWTY8cmDxPHvhCRI7o",
    Facebook: "https://www.facebook.com/msawaterloo",
    Discord: "https://discord.gg/nQZtrhxJsX",
    Twitch: "https://m.twitch.tv/uw_msa/home"
}

export default function SideMenu({ setRenderSideMenu  }: { setRenderSideMenu: any }){

    const width = useRef(new Animated.Value(Dimensions.get("window").width*-0.81)).current;

    const colorScheme = useColorScheme();
    const colorPalette = colorScheme === 'light' ? Colors.light : Colors.dark;

    const styles = StyleSheet.create({
        container: {
            width: Dimensions.get("window").width*0.6067,
            height: "100%",
            backgroundColor: colorScheme === 'light' ? colorPalette.background : colorPalette.accent,
            position: "absolute",
            zIndex: 2,
            transform: [{translateX: -Dimensions.get("window").width*0.81}],
            opacity: 1
        },
        backView: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "15%",
            height: "6.67%"
        },
        MSALogoView: {
            width: "100%",
            height: "20.4%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            transform: [{translateY: Dimensions.get("window").height*-0.025}]
        },
        MSALogo: {
            height: "100%",
            resizeMode: "contain"
        },
        pagesLinkView: {
            height: "40%",
            width: "100%",
            backgroundColor: "transparent",
            alignSelf: "flex-end",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "column"
        },
        pageLink: {
            width: "76.7%",
            height: `${200/15}%`,
            backgroundColor: "transparent",
            borderBottomWidth: Dimensions.get("window").height*0.001,
            borderBottomColor: colorPalette.text
        },
        bubblesOuterView: {
            width: "100%",
            height: Dimensions.get("window").height*0.15,
            backgroundColor: "transparent",
            marginTop: "3%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        },
        bubblesView: {
            width: "85%",
            height: "50%",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
            marginTop: 60
        },
        bubble: {
            height: Dimensions.get("window").height*0.0625,
            width: Dimensions.get("window").height*0.0625,
            borderRadius: 1000,
            backgroundColor: "#D9D9D9"
        },
        bubbleImage: {
            width: "100%",
            height: "100%",
            resizeMode: "contain"
        },
        bubblesViewBottom: {
            width: "50%",
            height: "50%",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row"
        },
        bubbleSpacing: {
            alignSelf: "center",
        }
    });

    useEffect(() => {
      Animated.timing(width, {
        toValue: Dimensions.get("window").width*0.0005,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.bezier(.7,0,.3,1)
      }).start();
    }, [width])

    const removeSideMenu = () => {
        Animated.timing(width, {
            toValue: Dimensions.get("window").width*-0.81,
            duration: 150,
            useNativeDriver: true,
            easing: Easing.bezier(.7,0,.3,1)
        }).start(() => setRenderSideMenu(false))
    }

    const handlePress = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL: ", err));
    }

    return (
        <Animated.View style={{...styles.container, transform: [{translateX: width}]}}>
            <View style={{marginBottom: 50}}></View>
            <TouchableHighlight
                style={styles.backView}
                underlayColor={colorScheme === 'light' ? colorPalette.accent : colorPalette.background}
                onPress={() => removeSideMenu()}>
                <Text style={{fontFamily: "Baloo Tamma 2", fontSize: 25}}>x</Text>
            </TouchableHighlight>
            <View style={styles.MSALogoView}>
                <Image source={UWMSALogo} style={styles.MSALogo}/>
            </View>
            <View style={styles.pagesLinkView}>
                {pages.map(page => (
                    <TouchableHighlight
                        style={styles.pageLink}
                        key={page.name}
                        underlayColor={colorScheme === 'light' ? colorPalette.accent : colorPalette.background}
                        onPress={() => {
                        removeSideMenu()
                        handlePress(page.url)
                    }}>
                        <Text style={{fontSize: 20, fontFamily: "Baloo Tamma 2", fontWeight: "100"}}>{page.name}</Text>
                    </TouchableHighlight>
                ))}
            </View>
            <View style={styles.bubblesOuterView}>
                    <View style={styles.bubblesView}>
                        {[{logo: InstagramLogo, url: socialMediaLinks.Instagram}, {logo: WhatsappLogo, url: socialMediaLinks.Whatsapp}, {logo: FacebookLogo, url: socialMediaLinks.Facebook}].map(item => (
                            <TouchableHighlight style={styles.bubble} onPress={() => handlePress(item.url)} key={item.url}>
                                <Image source={item.logo} style={styles.bubble}/>
                            </TouchableHighlight>
                        ))}
                    </View>
                    <View style={styles.bubblesViewBottom}>
                        <TouchableHighlight 
                            style={[styles.bubble, styles.bubbleSpacing]} 
                            onPress={() => handlePress(socialMediaLinks.Discord)}
                        >
                            <Image source={DiscordLogo} style={styles.bubbleImage} />
                        </TouchableHighlight>

                        <TouchableHighlight 
                            style={[styles.bubble, styles.bubbleSpacing]} 
                            onPress={() => handlePress(socialMediaLinks.Twitch)}
                        >
                            <Image source={TwitchLogo} style={styles.bubbleImage} />
                        </TouchableHighlight>
                    </View>
            </View>
        </Animated.View>
    )
}