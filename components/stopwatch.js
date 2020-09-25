import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Roboto_300Light, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Montserrat_500Medium, Montserrat_400Regular, Montserrat_300Light } from '@expo-google-fonts/montserrat';
import Timer from 'react-compound-timer'

export default function StopWatch() {

    const [leftButton, setLeftButton] = useState({ text: 'Start' })
    const [rightButton, setRightButton] = useState({ text: 'Reset' })
    const [laps, setLaps] = useState([])

    const [loaded] = useFonts({
        Roboto_300Light, Roboto_500Medium,
        Montserrat_500Medium, Montserrat_400Regular, Montserrat_300Light
    });
    if (!loaded) {
        return null; // TODO: App Loading
    }

    const leftButtonHandler = (timerState, start, stop) => {
        switch (timerState) {
            case 'INITED':
            case 'STOPPED':
                start()
                setLeftButton({ text: 'Stop' })
                setRightButton({ text: 'Lap' })
                break;
            case 'PLAYING':
                stop()
                setRightButton({ text: 'Reset' })
                setLeftButton({ text: 'Resume' })
                break;
            default:
                break;
        }
    }

    const rightButtonHandler = (timerState, time, reset) => {
        switch (timerState) {
            case 'INITED':
            case 'STOPPED':
                reset()
                setLeftButton({ text: 'Start' })
                setLaps([])
                break;
            case 'PLAYING':
                lapsHandler(time)
                break;
            default:
                break;
        }
    }

    const lapsHandler = (time) => {
        const maxLapsId = Math.max(...laps.map(currentLaps => currentLaps.id));
        const finalId = laps.length > 0 ? maxLapsId + 1 : 1;

        setLaps((prevLaps) => {
            return [
                { id: (finalId).toString(), time: time },
                ...prevLaps
            ]
        })
    }

    return (
        <Timer
            initialTime={0}
            lastUnit="m"
            timeToUpdate={1}
            direction="forward"
            startImmediately={false}
            formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
        >
            {({ start, stop, reset, getTimerState, getTime }) => (
                <View style={styles.container}>
                    <View style={styles.timer}>
                        <Text style={[styles.timerText, styles.colorYellow]}>
                            {/* Minutes */}
                            <Timer.Minutes />
                            {/* Seconds */}
                            <Text style={styles.colorGray}>.</Text><Timer.Seconds />
                            {/* Milliseconds */}
                            <Text style={[styles.colorGray, styles.timerTextMilli]}>.<Timer.Milliseconds formatValue={(value) => `${(parseInt(value / 10) < 10 ? `0${parseInt(value / 10)}` : parseInt(value / 10))}`} /></Text>
                        </Text>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonBordered]}
                            onPress={() => { leftButtonHandler(getTimerState(), start, stop) }}
                        >
                            <Text style={styles.colorYellow}>{leftButton.text}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { rightButtonHandler(getTimerState(), getTime(), reset) }}
                        >
                            <Text style={styles.colorYellow}>{rightButton.text}{/*Next*/}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.laps}>
                        <FlatList
                            data={laps}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.lap}>
                                    <Text style={styles.lapText}>Lap {item.id}</Text>
                                    <Text style={[styles.lapText, styles.lapTime]}>
                                        <Timer
                                            formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
                                            initialTime={item.time}
                                            lastUnit="m"
                                            startImmediately={false} >
                                            <Timer.Minutes />.<Timer.Seconds />.<Timer.Milliseconds formatValue={(value) => `${(parseInt(value / 10) < 10 ? `0${parseInt(value / 10)}` : parseInt(value / 10))}`} />
                                        </Timer>
                                    </Text>

                                </View>
                            )}
                        >
                        </FlatList>
                    </View>
                </View>
            )}
        </Timer>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1f38',
    },
    timer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    timerText: {
        fontSize: 50,
        fontFamily: 'Roboto_500Medium',
        letterSpacing: 2,
    },
    timerTextMilli: {
        fontSize: 40,
        fontFamily: 'Roboto_300Light',
        letterSpacing: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 20,
        marginHorizontal: 20,
        fontFamily: 'Montserrat_400Regular',
    },
    buttonBordered: {
        borderColor: '#ffe500',
        borderWidth: 1,
        borderRadius: 25
    },
    laps: {
        flex: 1,
        backgroundColor: '#2c314f',
        margin: 20,
        borderRadius: 25,
    },
    lap: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    lapText: {
        flex: 1,
        color: 'white',
        fontSize: 18,
        fontFamily: 'Montserrat_500Medium',
    },
    lapTime: {
        textAlign: 'right', alignSelf: 'stretch',
        fontFamily: 'Roboto_500Medium',
    },
    colorYellow: {
        color: '#ffe500',
    },
    colorGray: {
        color: '#777777',
    },
});
