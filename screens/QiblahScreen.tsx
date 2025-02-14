import * as Location from 'expo-location';
import { Magnetometer, Accelerometer } from 'expo-sensors';
import { Subscription } from 'expo-modules-core';
import PropTypes from 'prop-types';
import React, {
    useState,
    useEffect,
    useCallback,
    forwardRef,
    useImperativeHandle,
} from 'react';
import { Image, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { EmitterSubscription } from 'react-native';

export const useQiblaCompass = () => {
    const [subscription, setSubscription] = useState<EmitterSubscription | null>(null);
    const [magnetometer, setMagnetometer] = useState(0);
    const [qiblad, setQiblad] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFlat, setIsFlat] = useState(true);

    const initCompass = useCallback(async () => {
        const isAvailable = await Magnetometer.isAvailableAsync();
        if (!isAvailable) {
            setError('Compass is not available on this device');
            setIsLoading(false);
            return;
        }
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setError('Location permission not granted');
            setIsLoading(false);
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            calculate(latitude, longitude);
        } finally {
            setIsLoading(false);
            subscribe();
        }
    }, []);

    useEffect(() => {
        initCompass();

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        let accelerometerSubscription: Subscription;
        
        const subscribeToAccelerometer = async () => {
            Accelerometer.setUpdateInterval(10);
            accelerometerSubscription = Accelerometer.addListener(accelerometerData => {
                const { x, y, z } = accelerometerData;
                const isFlat = Math.abs(z) > 0.75 && Math.abs(x) < 0.25 && Math.abs(y) < 0.25;
                setIsFlat(isFlat);
            });
        };

        subscribeToAccelerometer();

        return () => {
            accelerometerSubscription?.remove();
        };
    }, []);

    const subscribe = () => {
        Magnetometer.setUpdateInterval(100);
        const subscription = Magnetometer.addListener((data) => {
            setMagnetometer(angle(data));
        });
        setSubscription(subscription as EmitterSubscription);
    };

    const unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const angle = (magnetometer: { x: any; y: any; z?: number; timestamp?: number; }) => {
        let angle = 0;
        if (magnetometer) {
            const { x, y } = magnetometer;
            if (Math.atan2(y, x) >= 0) {
                angle = Math.atan2(y, x) * (180 / Math.PI);
            } else {
                angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
            }
        }
        return Math.round(angle);
    };

    const direction = (degree: number) => {
        if (degree >= 22.5 && degree < 67.5) {
            return 'NE';
        } else if (degree >= 67.5 && degree < 112.5) {
            return 'E';
        } else if (degree >= 112.5 && degree < 157.5) {
            return 'SE';
        } else if (degree >= 157.5 && degree < 202.5) {
            return 'S';
        } else if (degree >= 202.5 && degree < 247.5) {
            return 'SW';
        } else if (degree >= 247.5 && degree < 292.5) {
            return 'W';
        } else if (degree >= 292.5 && degree < 337.5) {
            return 'NW';
        } else {
            return 'N';
        }
    };

    const degree = (magnetometer: number) => {
        return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
    };

    const calculate = (latitude: number, longitude: number) => {
        const PI = Math.PI;
        const latk = (21.4225 * PI) / 180.0;
        const longk = (39.8264 * PI) / 180.0;
        const phi = (latitude * PI) / 180.0;
        const lambda = (longitude * PI) / 180.0;
        const q =
            (180.0 / PI) *
            Math.atan2(
                Math.sin(longk - lambda),
                Math.cos(phi) * Math.tan(latk) -
                Math.sin(phi) * Math.cos(longk - lambda)
            );
        setQiblad(q);
    };

    const compassDirection = direction(degree(magnetometer));
    const compassDegree = degree(magnetometer);
    const compassRotate = 360 - degree(magnetometer);
    const kabaRotate = 360 - degree(magnetometer) + qiblad;

    const getKaabaImage = () => {
        if (!isFlat) {
            return require('../assets/images/red-kaaba.png');
        }
        const difference = Math.abs(compassDegree - qiblad);
        if (difference <= 70 || difference >= 290) {
            return require('../assets/images/green-kaaba.png');
        }
        return require('../assets/images/yellow-kaaba.png');
    };

    return {
        qiblad,
        compassDirection,
        compassDegree,
        compassRotate,
        kabaRotate,
        error,
        isLoading,
        reinitCompass: initCompass,
        isFlat,
        getKaabaImage,
    };
};

interface QiblahScreenProps {
    backgroundColor?: string;
    color?: string;
    textStyles?: React.CSSProperties;
    compassImage?: string;
    kaabaImage?: string;
}

export interface QiblahScreenRef {
    reinitCompass: () => Promise<void>;
}

const QiblahScreen = forwardRef<QiblahScreenRef, QiblahScreenProps>(
    (
        { backgroundColor = '#000000', color = '#FFFFFF', textStyles = {}, compassImage },
        ref
    ) => {
        const {
            qiblad,
            compassDirection,
            compassDegree,
            compassRotate,
            kabaRotate,
            error,
            isLoading,
            reinitCompass,
            isFlat,
            getKaabaImage,
        } = useQiblaCompass();

        useImperativeHandle(
            ref,
            () => {
                return {
                    reinitCompass,
                };
            },
            []
        );

        const getMessage = () => {
            if (!isFlat) {
                return "Place your device on a flat surface and rotate it until the background turns green";
            }
            const difference = Math.abs(compassDegree - qiblad);
            if (difference <= 70 || difference >= 290) {
                return "You're facing Mecca!";
            }
            return "Almost there!";
        };

        if (isLoading) {
            return (
                <View style={[styles.container, { backgroundColor }]}>
                    <ActivityIndicator size={50} color={color} />
                </View>
            );
        }

        return (
            <View style={[styles.container, { backgroundColor }]}>
                {error && (
                    <Text style={styles.errorText}>Error: {error}</Text>
                )}
                <View style={styles.contentContainer}>
                    <View style={[
                        styles.compassContainer,
                        {
                            transform: [
                                { rotate: `${kabaRotate}deg` },
                            ],
                        }
                    ]}>
                        <Image
                            source={getKaabaImage()}
                            style={styles.kaabaImage}
                        />
                    </View>
                    <Text style={[styles.messageText, { color }]}>{getMessage()}</Text>
                </View>
            </View>
        );
    }
);

QiblahScreen.propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    textStyles: PropTypes.object,
    compassImage: PropTypes.any,
    kaabaImage: PropTypes.any,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#f00',
        fontWeight: 'bold',
    },
    compassContainer: {
        width: 350,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    kaabaImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    messageText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default QiblahScreen;
